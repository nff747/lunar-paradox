import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {transform} from 'esbuild';
for(const scene of ['syzygy','gravity','astrolabe'])test(`${scene}: production scene module parses before any packaging`,async()=>{
  const html=await fs.readFile(new URL(`../offline-platforms/lunar-${scene}/scene-source.html`,import.meta.url),'utf8');
  const blocks=[...html.matchAll(/<script\s+type=["']module["'](?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];assert.equal(blocks.length,1);
  await transform(blocks[0][1],{loader:'js',target:'es2022'});
});
