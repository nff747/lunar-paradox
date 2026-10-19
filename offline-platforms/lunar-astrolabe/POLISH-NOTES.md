> Historical visual-polish notes from 17 October. See VALIDATION.md for the current 18 October bug/integration review.

# Astrolabe polish — 2026-10-17

Reference inspected directly:
`/home/n1khy/Pictures/design/f9800fd9-3c1a-4bb4-ac18-0c7a7a07dec9.jpeg`

The reference has a predominantly matte cratered left crescent, irregular fine lavender/gold triangles across the horns, weathered narrow inclined instrument tracks, and a strongly directional narrow gold eclipse limb above a darker violet halo. Its HUD frames the object without covering the central instrument.

## Implemented

- Replaced the regular wire lathe grid/jitter with non-uniform parameter samples and locally shortest triangle diagonals. Wire triangles decreased from 3,536 to 3,264; no extra wire topology was added.
- Kept the closed horn volume, object-space dissolution, crater surface, actual independent gyroscopes and pointer/camera movement.
- Added real sloped shoulders to the metallic band geometry. Varied seven engraved glyph forms and their wear/scale; brought glyphs onto the physical upper track face. Index marks now have slight geometric depth instead of being flat planes.
- Narrowed eclipse limb/scattering, reduced broad volume radiance, reduced bloom spread and concentrated the directional gold hotspot.
- Reduced secondary desktop desk from 42% to `clamp(300px,29vw,390px)`, preserving the scene-oriented layout and mobile stacked view. Kept the root viewport scale and enclosing-sky fixes.
- Removed duplicate header sound/reset controls from the Simulation workbench. Native timeline/footer remain Explore controls; the workbench owns its controls when open.
- Shortened product copy. Technical measurement/model notes remain accessible under Data details; real diagnostics and all storage actions remain.
- Edited only scene index/experience files and these notes; no shared backend or session bridge edits.

## Checks run

- `node --check outputs/lunar-astrolabe/dist/experience.js`: passed.
- `python3 work/refinement/check-platforms.py`: syntax/assets/separate-platform checks passed.
- `node work/runtime/test_astrolabe_surface.mjs`: finite positions/normals/UVs; 82,689 rock vertices, 163,840 rock triangles, 45 sculpted impacts.
- Production wire and instrument geometry executed in a Node VM using the bundled Three.js: all finite; closed wire seam maximum error `5.57539447552588e-15`; 3,264 wire triangles; beveled band 3,374 vertices / 4,800 triangles.
- `node work/runtime/test_scene_physics.mjs`: existing production fracture and fluid equation tests still pass.

## Limits

No browser used by this agent. Root must check the latest GPU shaders, actual visual balance, route responsiveness and frame pacing. The scene remains an authored real-time rendition with sampled emission, rasterized shading and analytic orbital motion; these edits do not establish exact photographic matching, full physical light transport or device-independent 60 FPS.
