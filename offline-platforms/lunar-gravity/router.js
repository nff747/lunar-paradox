/* Lunar Paradox — Unified Cross-Platform Router & Interconnect Engine
   Provides canonical route ownership, environment-adaptive URL resolution,
   and deterministic cross-platform navigation for Syzygy, Gravity, and Astrolabe. */
(()=>{
  'use strict';

  const PLATFORMS = {
    syzygy: {
      id: 'syzygy',
      name: 'Syzygy',
      subdomain: 'lunarparadox.com',
      path: '/',
      defaultScene: 'realms',
      defaultCompany: 'home',
      sceneRoutes: new Set(['realms', 'mission', 'data', 'simulation']),
      companyRoutes: new Set(['home', 'studio', 'commission', 'estimate', 'applications', 'manage'])
    },
    gravity: {
      id: 'gravity',
      name: 'Gravity',
      subdomain: 'labs.lunarparadox.com',
      path: '/labs/',
      defaultScene: 'explore',
      defaultCompany: 'labs',
      sceneRoutes: new Set(['explore', 'observatory', 'telemetry', 'archive', 'simulation']),
      companyRoutes: new Set(['labs'])
    },
    astrolabe: {
      id: 'astrolabe',
      name: 'Astrolabe',
      subdomain: 'products.lunarparadox.com',
      path: '/products/',
      defaultScene: 'explore',
      defaultCompany: 'products',
      sceneRoutes: new Set(['explore', 'astrolabe', 'simulation', 'data', 'archive']),
      companyRoutes: new Set(['products'])
    }
  };

  function cleanRoute(raw) {
    return String(raw || '').replace(/^#\/?/, '').split('?')[0];
  }

  function getOwningPlatform(route, currentScene) {
    const r = cleanRoute(route);
    if (!r) return currentScene || 'syzygy';
    const prefix = r.split('/')[0];

    // Dynamic resource detail routes
    if (prefix === 'experiment') return 'gravity';
    if (prefix === 'product') return 'astrolabe';

    // Universal company routes supported by all platforms
    if (['security', 'pricing'].includes(prefix)) {
      return currentScene || 'syzygy';
    }

    // Direct company route matches
    if (PLATFORMS.gravity.companyRoutes.has(prefix)) return 'gravity';
    if (PLATFORMS.astrolabe.companyRoutes.has(prefix)) return 'astrolabe';
    if (PLATFORMS.syzygy.companyRoutes.has(prefix)) return 'syzygy';

    // Unique scene routes
    if (['observatory', 'telemetry'].includes(r)) return 'gravity';
    if (['astrolabe'].includes(r)) return 'astrolabe';
    if (['realms', 'mission'].includes(r)) return 'syzygy';

    // Shared scene routes (simulation, explore, data, archive)
    if (currentScene && PLATFORMS[currentScene]?.sceneRoutes.has(r)) {
      return currentScene;
    }

    if (['explore', 'archive'].includes(r)) return 'gravity';
    if (['data'].includes(r)) return 'syzygy';
    if (r === 'simulation') return currentScene || 'syzygy';

    return currentScene || 'syzygy';
  }

  function resolvePlatformUrl(targetPlatform, targetHash, currentScene) {
    const hash = cleanRoute(targetHash);
    const scene = currentScene || document.body?.dataset?.scene || 'syzygy';

    // Same platform: in-page hash
    if (targetPlatform === scene) {
      return '#/' + hash;
    }

    // 1. File protocol: relative sibling paths
    if (location.protocol === 'file:') {
      const inDist = location.pathname.includes('/dist/');
      const base = inDist ? `../../lunar-${targetPlatform}/dist/` : `../lunar-${targetPlatform}/`;
      return new URL(`${base}index.html#/${hash}`, location.href).href;
    }

    const host = location.hostname;

    // 2. Subdomain mode (production custom domain)
    if (host.endsWith('lunarparadox.com')) {
      const targetConfig = PLATFORMS[targetPlatform];
      const protocol = location.protocol === 'http:' ? 'http:' : 'https:';
      return `${protocol}//${targetConfig.subdomain}/#/${hash}`;
    }

    // 3. Path-based mode (e.g. Vercel deployment, localhost path mounts)
    const path = location.pathname;
    if (path.includes('/labs') || path.includes('/products') || path.includes('/studio') || path === '/' || path === '') {
      if (targetPlatform === 'gravity') return `/labs/#/${hash}`;
      if (targetPlatform === 'astrolabe') return `/products/#/${hash}`;
      if (targetPlatform === 'syzygy') return `/#/${hash}`;
    }

    // 4. Fallback for standalone local server platform routing
    return `/platforms/${targetPlatform}/index.html#/${hash}`;
  }

  function checkCrossPlatformRedirect(currentScene) {
    const scene = currentScene || document.body?.dataset?.scene;
    if (!scene) return false;
    const currentHash = cleanRoute(location.hash);
    if (!currentHash) return false;

    const owner = getOwningPlatform(currentHash, scene);
    if (owner && owner !== scene) {
      const destination = resolvePlatformUrl(owner, currentHash, scene);
      console.log(`[Lunar Router] Cross-platform redirect: '${currentHash}' on ${scene} -> ${owner} (${destination})`);
      location.replace(destination);
      return true;
    }
    return false;
  }

  const router = {
    PLATFORMS,
    cleanRoute,
    getOwningPlatform,
    resolvePlatformUrl,
    checkCrossPlatformRedirect
  };

  if (typeof window !== 'undefined') {
    window.lunarRouter = router;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = router;
  }
})();
