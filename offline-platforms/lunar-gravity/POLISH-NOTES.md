> Historical visual-polish notes from 17 October. See VALIDATION.md for the current 18 October bug/integration review.

# Gravity focused polish

Source ownership: only Gravity index.html, experience.js, experience.css.
Shared backend, session bridge, solver constants and renderer postfilters were not changed.

## Visible geometry

- Mercury geometry keeps the original 240 × 210 subdivisions: 50,851 vertices and 100,800 triangles.
- Only local Z < −24 is remapped. The central droplet/impact patch keeps its coordinates.
- Last local row now reaches Z −270 (world Z −260), widening to X ±332.5; the fog horizon conceals the finite geometry instead of exposing the former world-Z −22 straight edge.
- Analytic wave normals still sample the actual local X/Z. Reflection camera clipping/plane and contact coordinates are unchanged.
- Eleven slab variants gain a persistent one-sided shoulder and a narrower torn toe. Their sharp transitions have dedicated geometry rows. Broad body faces use lower-amplitude erosion to avoid swollen/wobbling silhouettes.
- Shoulder heights and dimensions vary deterministically per mass. Existing caps, jagged endpoints, lower buttress and photogrammetry materials remain.
- Cartographic skirt now samples the actual displaced floor by bilinear reuse of the existing vertex buffer. It starts 0.035 units below terrain, follows the clipped perimeter and relaxes to the outer datum. The former 1.25-unit discontinuity below the floor is removed.

## Product restraint

- Observatory sidebar: max 340px / 34vw, operations sidebar: 250px; mobile retains a full-width sheet below an interactive scene.
- Simulation uses its dedicated controls; the duplicated legacy footer is hidden only on that route.
- Shorter immersive copy. Fluid/storage/matrix explanations live in closed disclosures.
- Shared settings trigger now reads View / Sound.
- Initial frame history contains zero unobserved slots rather than fabricated 16.67ms intervals; charts filter those slots.

## Checks run

- node --check experience.js: passed.
- check-platforms.py: Gravity module syntax, local assets and separate navigation passed.
- test_scene_physics.mjs: production fluid dispersion limits and exact analytic contact height passed; no solver extraction markers or constants changed.
- Executed actual production makeMonolith function with bundled Three.js on all eleven variants: all positions/normals finite, all indices in range, 769–961 vertices (nearest left mass includes 8 extra buttress vertices), 1,128–1,410 triangles.
- Executed production sea remapping with actual Three.js: all coordinates finite, bounds and original vertex/index counts confirmed.

## Root visual gates

No browser was used by this agent. Root must check:
- Extended ceiling disappears into atmospheric fog with no bright planar cutoff on normal, orbit and inspection views.
- Coarse stretched far rows do not create visible wavering bands; only the remote sea should be affected.
- Shoulder silhouettes read as heavy fractured basalt, not repeated terraces or pointed cones.
- Skirt lines join the clipped terrain without visible z-fighting or an overly bright wire carpet.
- Reduced sidebars remain comfortable at desktop, narrow desktop and mobile sizes; operations remains fully scrollable.

## Background occlusion correction after root GPU review

Root observed a persistent straight ceiling cutoff despite the extended sea. The old opaque background card at world Z -85 wrote depth in front of remote sea geometry.

- Replaced that finite card with a camera-centred radius-170 sphere (camera far plane 180), BackSide, depthTest=false, depthWrite=false, renderOrder=-100.
- Sky position follows the actual observation camera before rendering. Existing reflection hide/restore continues to exclude the sky from the mirrored near-field target.
- Added one scalar far aerial transmittance, exp(-0.025 * max(distance - 40, 0)), after existing scattering, converging remote surfaces and sky toward the same deep-gray haze.
- Near mercury and basalt within 40 units retain their existing physical shading. No extra scattering iterations, texture fetches, fullscreen passes or particles were added.
- Updated atmosphere shader program cache key.
- Root must GPU-check absence of the former card cutoff and visibility of the sea at varied camera angles.

Root GPU follow-up: the first extended sea still met an opaque z=-85 backdrop. It was replaced by a non-depth-writing enclosing sky. Far extinction retains the existing in-scattering term rather than flattening all distant mist into a uniform gray; no extra volume samples were added. Final browser captures test this correction.

Root terrain follow-up: deeper primary crater (.47 -> .98 units) with real terrain self-shadowing. Its custom depth pass mirrors the visible perimeter discard; no invisible rectangular floor casts a shadow. Basin node follows the actual sampled terrain height. Off-frustum or hidden projected callouts no longer accept pointer/keyboard focus.
