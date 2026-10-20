const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
console.log('=== [PRO TOOL 1: DEEP AST & SYNTAX ORACLE] ===\n');

let errorCount = 0;
let fileCount = 0;

function auditJS(filePath, code, contextName = '') {
  fileCount++;
  const label = contextName || path.relative(ROOT, filePath);
  
  // Check if it is an ES module
  const isModule = filePath.endsWith('.mjs') || /^\s*(import|export)\b/m.test(code);
  
  if (isModule) {
    try {
      new vm.SourceTextModule(code, { initializeImportMeta: () => {} });
      // console.log(`  [PASS: ESM] ${label}`);
    } catch (err) {
      errorCount++;
      console.error(`  [FAIL: ESM] ${label}: ${err.message}`);
    }
  } else {
    try {
      new vm.Script(code, { filename: label });
      // console.log(`  [PASS: SCRIPT] ${label}`);
    } catch (err) {
      errorCount++;
      console.error(`  [FAIL: SCRIPT] ${label}: ${err.message}`);
    }
  }
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', 'dist', '.git', '.lunar-data', '__pycache__'].includes(entry.name)) {
        scanDir(full);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.mjs'))) {
      const code = fs.readFileSync(full, 'utf8');
      auditJS(full, code);
    } else if (entry.isFile() && entry.name === 'index.html') {
      const html = fs.readFileSync(full, 'utf8');
      const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
      let match;
      let scriptIdx = 0;
      while ((match = scriptRegex.exec(html)) !== null) {
        scriptIdx++;
        const attrs = match[1];
        const scriptContent = match[2].trim();
        const isModule = /type=["']module["']/i.test(attrs);
        if (scriptContent.length > 0) {
          auditJS(isModule ? 'inline.mjs' : 'inline.js', scriptContent, `${path.relative(ROOT, full)} -> <script #${scriptIdx}${isModule ? ' type="module"' : ''}> (${(scriptContent.length/1024).toFixed(1)} KB)`);
        }
      }
    }
  }
}

scanDir(path.join(ROOT, 'offline-platforms'));

console.log(`\nAudited ${fileCount} JS scripts/blocks. Result: ${errorCount === 0 ? 'ALL PASSED (0 syntax errors)' : `${errorCount} ERRORS FOUND`}`);
if (errorCount > 0) process.exit(1);
