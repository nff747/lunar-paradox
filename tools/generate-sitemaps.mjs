import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const today = new Date().toISOString().split('T')[0];

const masterUrls = [
  { loc: 'https://lunarparadox.com/', priority: '1.0', changefreq: 'weekly' },
  { loc: 'https://lunarparadox.com/privacy', priority: '0.50', changefreq: 'monthly' },
  
  { loc: 'https://products.lunarparadox.com/', priority: '0.95', changefreq: 'weekly' },
  { loc: 'https://products.lunarparadox.com/pbr-synth', priority: '0.85', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/optim-compressor', priority: '0.85', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/resonance-dsp', priority: '0.85', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/cipher-workbench', priority: '0.85', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/products/hyper-splat-engine', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/products/neural-texture-engine', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/products/turbo-ring-ipc', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/products/spatial-glass-ui', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/products/tensor-cloth-wgsl', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://products.lunarparadox.com/products/meshlet-culling-wgsl', priority: '0.80', changefreq: 'monthly' },
  
  { loc: 'https://labs.lunarparadox.com/', priority: '0.90', changefreq: 'weekly' }
];

function buildXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const item of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${item.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';
  return xml;
}

const masterXml = buildXml(masterUrls);
await fs.writeFile(path.join(root, 'sitemap.xml'), masterXml);

const productsUrls = masterUrls.filter(u => u.loc.includes('products.lunarparadox.com'));
const productsXml = buildXml(productsUrls);
await fs.writeFile(path.join(root, 'sitemap-products.xml'), productsXml);

const labsUrls = masterUrls.filter(u => u.loc.includes('labs.lunarparadox.com'));
const labsXml = buildXml(labsUrls);
await fs.writeFile(path.join(root, 'sitemap-labs.xml'), labsXml);

const robotsTxt = `# Legitimate Search Engines & AI Discovery Crawlers
User-agent: *
Allow: /
Disallow: /api/admin/
Disallow: /api/private/

# XML Sitemaps
Sitemap: https://lunarparadox.com/sitemap.xml
Sitemap: https://products.lunarparadox.com/sitemap.xml
Sitemap: https://labs.lunarparadox.com/sitemap.xml
`;
await fs.writeFile(path.join(root, 'robots.txt'), robotsTxt);

console.log('Sitemaps and robots.txt successfully generated.');
