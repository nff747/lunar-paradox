#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const PLATFORMS = path.join(ROOT, 'offline-platforms');

console.log('[Lunar Paradox] Starting build process...');

// Clean dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.name.endsWith('.zip') || entry.name.endsWith('.tar.gz') || entry.name === '.lunar-data' || entry.name === '__pycache__') {
      continue;
    }
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Root / lunarparadox.com -> Syzygy
console.log('Copying Syzygy to root...');
copyDir(path.join(PLATFORMS, 'lunar-syzygy'), DIST);

// 2. /labs & labs.lunarparadox.com -> Gravity
console.log('Copying Gravity to dist/labs...');
copyDir(path.join(PLATFORMS, 'lunar-gravity'), path.join(DIST, 'labs'));

// 3. /products & products.lunarparadox.com -> Astrolabe
console.log('Copying Astrolabe to dist/products...');
copyDir(path.join(PLATFORMS, 'lunar-astrolabe'), path.join(DIST, 'products'));

// 4. /studio & studio.lunarparadox.com -> Syzygy
console.log('Copying Syzygy to dist/studio...');
copyDir(path.join(PLATFORMS, 'lunar-syzygy'), path.join(DIST, 'studio'));

// 5. Create platforms alias directory
fs.mkdirSync(path.join(DIST, 'platforms'), { recursive: true });

// 6. Copy SEO assets (robots.txt, sitemap.xml)
['robots.txt', 'sitemap.xml'].forEach(file => {
  const src = path.join(ROOT, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST, file));
    console.log(`Copied ${file} to dist/`);
  }
});

console.log('[Lunar Paradox] Build completed successfully.');
