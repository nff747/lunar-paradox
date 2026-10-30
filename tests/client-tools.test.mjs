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
  assert.equal(cleaned.products.length, 10, 'Must register 10 products (4 tools + 6 open-source projects)');

  const registeredIds = cleaned.products.map(p => p.id);
  for (const id of TOOL_IDS) {
    assert.ok(registeredIds.includes(id), `Product ${id} must be registered in published content`);
  }

  for (const prod of cleaned.products) {
    assert.equal(prod.status, 'published');
    assert.match(prod.actionUrl, /^https:\/\/(?:products\.lunarparadox\.com\/(?:tools\/)?[-\w]+|github\.com\/nff747\/[-\w]+)$/);
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

test('client tools: cipher-workbench generates standalone Python decrypt CLI and clean keypair export', () => {
  const appJs = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', 'cipher-workbench', 'app.js'), 'utf8');
  assert.match(appJs, /lastPublicExport/);
  assert.match(appJs, /from cryptography\.hazmat\.primitives\.ciphers\.aead import AESGCM/);
});

test('client tools: CANONICAL_CONTENT exports 10 products and matches published snapshot', async () => {
  const { CANONICAL_CONTENT } = await import('../lib/canonical-content.js');
  assert.equal(CANONICAL_CONTENT.products.length, 10);
  assert.equal(CANONICAL_CONTENT.revision, 0);
  assert.ok(CANONICAL_CONTENT.products.every(p => p.status === 'published'));
});

test('client tools: company load protects canonical products from empty server response', () => {
  for (const scene of ['astrolabe', 'gravity', 'syzygy']) {
    const code = fs.readFileSync(path.join(root, 'offline-platforms', `lunar-${scene}`, 'company.js'), 'utf8');
    assert.match(code, /if\(\(!validated\.products\|\|!validated\.products\.length\)&&fallback\.products\?\.length\)validated\.products=fallback\.products;/, scene);
  }
});test('client tools: optim-compressor and pbr-synth integrate telemetry, feedback widgets and benchmarks', () => {
  for (const id of ['optim-compressor', 'pbr-synth']) {
    const html = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', id, 'index.html'), 'utf8');
    const appJs = fs.readFileSync(path.join(root, 'offline-platforms', 'lunar-astrolabe', 'tools', id, 'app.js'), 'utf8');

    assert.match(html, /feedback-strip/, `${id} must contain feedback widget`);
    assert.match(html, /feedback-yes/, `${id} must contain feedback yes button`);
    assert.match(html, /feedback-no/, `${id} must contain feedback no button`);
    assert.match(html, /benchmark-callout/, `${id} must contain reproducible benchmark callout`);
    assert.match(html, /studio-bridge/, `${id} must contain cross-tool studio bridge`);

    assert.match(appJs, /recordFunnelStep/, `${id} must record zero-knowledge funnel steps`);
    assert.match(appJs, /recordToolFeedback/, `${id} must record aggregate user feedback`);
    assert.match(appJs, /performance\.mark/, `${id} must record startup performance marks`);
    assert.match(appJs, /time-to-usable/, `${id} must measure time to usable metric`);
  }
});

