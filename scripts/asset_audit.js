const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
console.log('=== [PRO TOOL 2: ASSET INTEGRITY & RESOURCE RESOLVER] ===\n');

let missingCount = 0;
let checkedCount = 0;

const platforms = ['lunar-syzygy', 'lunar-gravity', 'lunar-astrolabe'];

for (const plat of platforms) {
  const dir = path.join(ROOT, 'offline-platforms', plat);
  console.log(`Checking platform: ${plat}`);
  
  // Read all text files in platform
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (!fs.statSync(full).isFile() || (!f.endsWith('.html') && !f.endsWith('.js') && !f.endsWith('.css'))) {
      continue;
    }
    const content = fs.readFileSync(full, 'utf8');
    
    // Match asset patterns like 'assets/...', './assets/...', or url(...)
    const matches = content.matchAll(/(?:(?:src|href)=["']|url\(["']?|['"])(\.?\/?assets\/[^"'\)\s]+)(?:["']|\))/g);
    const seen = new Set();
    for (const match of matches) {
      const relPath = match[1].replace(/^\.\//, '').replace(/^\//, '');
      if (seen.has(relPath)) continue;
      seen.add(relPath);
      checkedCount++;
      
      const targetDisk = path.join(dir, relPath);
      if (!fs.existsSync(targetDisk)) {
        // Check if it's inlined via data URI in index.html (some textures are inlined in HP object)
        const isEmbedded = content.includes(`"${relPath}":"data:`) || content.includes(`'${relPath}':'data:`);
        if (!isEmbedded) {
          missingCount++;
          console.error(`  [MISSING] in ${f}: '${relPath}' (looked at: ${targetDisk})`);
        } else {
          // console.log(`  [INLINED] in ${f}: '${relPath}'`);
        }
      }
    }
  }
}

console.log(`\nChecked ${checkedCount} resource references. Result: ${missingCount === 0 ? 'ALL ASSETS PRESENT (0 missing)' : `${missingCount} MISSING ASSETS`}`);
if (missingCount > 0) process.exit(1);
