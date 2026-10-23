import test from 'node:test';import assert from 'node:assert/strict';
import {versionCode} from '../tools/hosted-assets.mjs';
test('hosted inline imports and shared module imports keep one engine identity',()=>{
 const html=`<script type="importmap">{"imports":{"three":"./vendor/three.module.js"}}</script><script type="module">import * as THREE from './vendor/three.module.js';import './module.js';</script><link href="./company.css">`;
 const updated=versionCode(html,'123abc456def');
 assert.equal((updated.match(/\.\/vendor\/three.module\.js\?v=123abc456def/g)||[]).length,2);
 assert.match(versionCode(`import * as THREE from '../../vendor/three.module.js';`,'123abc456def'),/three\.module\.js\?v=123abc456def/);
 assert.match(versionCode(`import 'three/addons/postprocessing/EffectComposer.js';`,'123abc456def'),/EffectComposer\.js\?v=123abc456def/);
 assert.match(updated,/company\.css\?v=123abc456def/);
 assert.equal(versionCode(updated,'123abc456def'),updated);
});
test('versioning preserves external services, existing query strings and API paths',()=>{
 const source=`import 'https://example.test/sdk.js';fetch('/api/apply');const image='./assets/moon.jpg';import './thing.js?existing=1';`;
 assert.equal(versionCode(source,'123abc456def'),source);
 assert.throws(()=>versionCode(source,'invalid'));
});
