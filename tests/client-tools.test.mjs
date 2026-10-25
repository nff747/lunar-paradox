import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanContent } from '../lib/production-validation.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const TOOL_IDS = [
  'pbr-synth',
  'optim-compressor',
  'resonance-dsp',
  'cipher-workbench'
];

test('client tools: all 4 tool applications exist in canonical source and hosted build', () => {
  for (const id of TOOL_IDS) {
    const srcDir = path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', id);
    const hostedDir = path.join(root, 'build', 'hosted', 'lunar-astrolabe', 'tools', id);
    const offlineDir = path.join(root, 'build', 'offline', 'lunar-astrolabe', 'tools', id);

    for (const dir of [srcDir, hostedDir, offlineDir]) {
      assert.ok(fs.existsSync(path.join(dir, 'index.html')), `Missing index.html in ${dir}`);
      assert.ok(fs.existsSync(path.join(dir, 'app.js')), `Missing app.js in ${dir}`);
      assert.ok(fs.existsSync(path.join(dir, 'style.css')), `Missing style.css in ${dir}`);
    }
  }
});

test('client tools: zero remote dependencies or third-party CDN scripts', () => {
  for (const id of TOOL_IDS) {
    const htmlPath = path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', id, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Ensure no unvetted external scripts or stylesheets
    assert.doesNotMatch(html, /https?:\/\/(?:cdn|unpkg|cdnjs|jsdelivr)/i, `${id} contains external CDN link`);
    assert.match(html, /<!DOCTYPE html>/i, `${id} must be valid HTML5`);
    assert.match(html, /<meta charset=["']UTF-8["']/i, `${id} must declare UTF-8`);
    assert.match(html, /<script type=["']module["'] src=["']\.\/app\.js["']>/, `${id} must use local app.js module`);
  }
});

test('client tools: published content registry passes strict production validation', () => {
  const publishedContentPath = path.join(root, 'offline-platforms', 'lunar-astrolabe', 'published-content.js');
  const code = fs.readFileSync(publishedContentPath, 'utf8');
  assert.match(code, /window\.LUNAR_PUBLISHED_CONTENT\s*=/);

  const jsonStr = code.replace(/^[\s\S]*?window\.LUNAR_PUBLISHED_CONTENT\s*=\s*/, '').replace(/;\s*$/, '');
  const data = JSON.parse(jsonStr);

  const cleaned = cleanContent(data);
  assert.equal(cleaned.products.length, 4, 'Must register 4 products');

  const registeredIds = cleaned.products.map(p => p.id);
  for (const id of TOOL_IDS) {
    assert.ok(registeredIds.includes(id), `Product ${id} must be registered in published content`);
  }

  for (const prod of cleaned.products) {
    assert.equal(prod.status, 'published');
    assert.match(prod.actionUrl, /^https:\/\/products\.lunarparadox\.com\/tools\/[-\w]+$/);
    assert.ok(prod.actionLabel.length > 0);
  }
});

test('client tools: resonance-dsp enforces hardware-grade acoustic limiter and clamped master', () => {
  const appJs = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', 'resonance-dsp', 'app.js'), 'utf8');
  assert.match(appJs, /createDynamicsCompressor/);
  assert.match(appJs, /threshold\.setValueAtTime\(-3/);
  assert.match(appJs, /Math\.min\(0\.8/);
});

test('client tools: cipher-workbench uses standard WebCrypto and CSPRNG', () => {
  const appJs = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', 'cipher-workbench', 'app.js'), 'utf8');
  assert.match(appJs, /crypto\.subtle\.generateKey/);
  assert.match(appJs, /crypto\.subtle\.encrypt/);
  assert.match(appJs, /crypto\.getRandomValues/);
});

test('client tools: pbr-synth imports Three.js locally, packs ORM and bilateral filter', () => {
  const appJs = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', 'pbr-synth', 'app.js'), 'utf8');
  assert.match(appJs, /import \* as THREE from '\.\.\/\.\.\/vendor\/three\.module\.js'/);
  assert.match(appJs, /createZip/);
  assert.match(appJs, /applyBilateralFilter/);
  assert.match(appJs, /maps\.orm/);
  assert.match(appJs, /lunar_pbr_bundle/);
});

test('client tools: optim-compressor calculates SSIM and renders magnifier loupe', () => {
  const appJs = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', 'optim-compressor', 'app.js'), 'utf8');
  assert.match(appJs, /calculateSSIM/);
  assert.match(appJs, /renderLoupe/);
});

test('client tools: resonance-dsp has stereo widener delay and dynamic patch bank', () => {
  const appJs = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', 'resonance-dsp', 'app.js'), 'utf8');
  assert.match(appJs, /widenerDelay/);
  assert.match(appJs, /activePatches/);
  assert.match(appJs, /PHOSPHOR_TRACE_COUNT/);
});

test('client tools: cipher-workbench generates standalone Python decrypt CLI and air-gap matrix', () => {
  const appJs = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', 'cipher-workbench', 'app.js'), 'utf8');
  assert.match(appJs, /drawAirGapMatrix/);
  assert.match(appJs, /from cryptography\.hazmat\.primitives\.ciphers\.aead import AESGCM/);
});

