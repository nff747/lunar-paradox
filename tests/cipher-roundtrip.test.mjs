import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

function setup() {
  const elements = new Map(), downloads = [];
  function element(id) {
    if (!elements.has(id)) elements.set(id, { id, value:'', textContent:'', dataset:{}, style:{}, files:[], listeners:{}, classList:{add(){},remove(){}}, setAttribute(){}, addEventListener(type, fn){this.listeners[type]=fn;}, click(){if(this.href) downloads.push(this.href); else return this.listeners.click?.({});}, remove(){} });
    return elements.get(id);
  }
  const document = { getElementById:element, querySelectorAll:()=>[], body:{appendChild(){}}, createElement:()=>element('anchor') };
  const urls = new Map(); let n = 0;
  class FileReader { readAsArrayBuffer(file) { this.onload({target:{result:file.bytes.buffer.slice(file.bytes.byteOffset,file.bytes.byteOffset+file.bytes.byteLength)}}); } }
  const context = {document, crypto:webcrypto, TextEncoder, TextDecoder, Uint8Array, Blob, FileReader, navigator:{clipboard:{writeText:async()=>{}}}, URL:{createObjectURL(blob){const key=`blob:${++n}`;urls.set(key,blob);return key;}, revokeObjectURL(){}}, setTimeout(){}, alert(msg){context.alerts.push(msg);}, alerts:[], console, btoa, atob};
  vm.runInNewContext(fs.readFileSync('offline-platforms/lunar-astrolabe/tools/cipher-workbench/app.js','utf8'), context);
  return { element, urls, downloads, context };
}

test('cipher encrypts binary files and reopens its own encrypted download without leaking the passphrase', async () => {
  const {element:e,urls,downloads,context} = setup();
  const original = Uint8Array.from([0, 255, 1, 128, 10, 42]);
  e('cipher-file-input').files = [{name:'input.bin',size:original.length,bytes:original}];
  e('cipher-file-input').listeners.change();
  e('cipher-passphrase').value = 'unique secret $ " \\';
  await e('btn-run-cipher').listeners.click();
  assert.ok(e('cipher-output-text').value);
  assert.ok(!e('cli-script-output').textContent.includes(e('cipher-passphrase').value));
  assert.match(e('cli-script-output').textContent, /getpass/);
  e('btn-download-cipher').listeners.click();
  const encrypted = new Uint8Array(await urls.get(downloads.at(-1)).arrayBuffer());
  e('btn-mode-decrypt').listeners.click();
  e('cipher-file-input').files = [{name:'payload.enc',size:encrypted.length,bytes:encrypted}];
  e('cipher-file-input').listeners.change();
  e('cipher-passphrase').value = 'wrong';
  await e('btn-run-cipher').listeners.click();
  assert.equal(e('cipher-output-text').value, '');
  assert.ok(context.alerts.length);
  e('cipher-passphrase').value = 'unique secret $ " \\';
  await e('btn-run-cipher').listeners.click();
  e('btn-download-cipher').listeners.click();
  assert.deepEqual(new Uint8Array(await urls.get(downloads.at(-1)).arrayBuffer()), original);
});
