/**
 * Submit all canonical URLs to the IndexNow protocol.
 * Instantly triggers indexing on Bing, DuckDuckGo, Yahoo, Yandex, and Microsoft Copilot AI.
 */
const KEY = 'dde56fa386cb4658a58b46b8ee03020a';

const submissions = [
  {
    host: 'lunarparadox.com',
    key: KEY,
    keyLocation: `https://lunarparadox.com/${KEY}.txt`,
    urlList: [
      'https://lunarparadox.com/',
      'https://lunarparadox.com/privacy'
    ]
  },
  {
    host: 'products.lunarparadox.com',
    key: KEY,
    keyLocation: `https://products.lunarparadox.com/${KEY}.txt`,
    urlList: [
      'https://products.lunarparadox.com/',
      'https://products.lunarparadox.com/pbr-synth',
      'https://products.lunarparadox.com/optim-compressor',
      'https://products.lunarparadox.com/resonance-dsp',
      'https://products.lunarparadox.com/cipher-workbench',
      'https://products.lunarparadox.com/products/hyper-splat-engine',
      'https://products.lunarparadox.com/products/neural-texture-engine',
      'https://products.lunarparadox.com/products/turbo-ring-ipc',
      'https://products.lunarparadox.com/products/spatial-glass-ui',
      'https://products.lunarparadox.com/products/tensor-cloth-wgsl',
      'https://products.lunarparadox.com/products/meshlet-culling-wgsl'
    ]
  },
  {
    host: 'labs.lunarparadox.com',
    key: KEY,
    keyLocation: `https://labs.lunarparadox.com/${KEY}.txt`,
    urlList: [
      'https://labs.lunarparadox.com/'
    ]
  }
];

async function submitIndexNow() {
  console.log('Sending IndexNow pings to https://api.indexnow.org/indexnow ...');
  for (const sub of submissions) {
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(sub)
      });
      console.log(`[IndexNow] Host ${sub.host} (${sub.urlList.length} URLs) -> HTTP ${res.status} ${res.statusText}`);
      if (res.status === 200 || res.status === 202) {
        console.log(`  ✔ Successfully submitted to IndexNow for ${sub.host}`);
      } else {
        const text = await res.text().catch(() => '');
        console.warn(`  ⚠ Response body: ${text}`);
      }
    } catch (err) {
      console.error(`  ✖ Failed to submit for ${sub.host}:`, err.message);
    }
  }
}

submitIndexNow();
