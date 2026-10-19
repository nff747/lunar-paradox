# Experience repair — 18 October 2026

This is a first corrective pass, not a declaration of final visual quality. See EXPERIENCE-AUDIT.md for the complete defect and unfinished-work list.

## Changes

- Syzygy: corrected normals after fracture rotation; opposing depth/tilt and a stronger constrained camera reveal; corrected one-sided illumination of the cut interior instead of lighting its backfaces; staggered single-event ejecta rather than lifetime respawning; reduced broad bloom; reused the existing relief texture for fine surface terms to remove redundant per-pixel procedural calculations. The joined state, release/rejoin and independent ENTER action remain.
- All three: replaced dead intervals at camera waypoints with continuous cubic pose interpolation. Reduced-motion paths stay direct. Forms and the local publisher no longer drive decorative background scroll travel.
- Gravity: restrained camera travel when idle, yielding to direct dragging, focus and ocean inspection; the scroll path now changes the viewing target toward ceiling, monolith and crater regions. Reflected camera orientation follows the actual viewing direction.
- Astrolabe: restrained camera arcs yielding to dragging/isolated rings; scroll changes ring phase and the dissolution boundary; pointer damping uses elapsed time; hidden documents no longer submit the scene render loop.
- Labs/Products: removed large generic marketing headings, long decks and boxed empty collections. Compact truthful publication counts remain; no fake experiments, products or business data were added. Studio headings now describe its actual capability categories directly. Syzygy readouts now show actual camera position/FOV and opening instead of pseudo latitude/longitude; Gravity’s arbitrary version stamp is removed.

## Evidence

- Syntax/assets passed for all three scene sources.
- Existing client runner: 18 tests passed. Local backend: 30 tests passed.
- Actual Three.js cut-geometry checks passed: finite, nondegenerate, complementary surfaces, coincident joined seam and enclosed volume.
- Eight spatial-route tests passed after updating the isolated fixture for the live camera dependencies and rejoined return state.
- Production ejecta loop: one release per fragment across a 20-second simulation, finite transforms, pause and rejoin checks passed.
- Camera paths: exact authored poses, finite continuous interpolation and motion through interior waypoints passed. Navigation cancellation, reading scroll and HOLD/ENTER separation checks passed.
- Browser: a continuous 12-second Syzygy hold reported one rupture and 240 total fragment releases, then rejoined without navigation. ENTER independently opened company home. That sample reported 57 FPS; this is a renderer counter, not guaranteed presentation rate or sustained cross-device coverage.
- Gravity and Astrolabe landings showed no empty cards; PageDown/PageUp drove reversible progress 0 → 0.5 → 0. Their sampled counters were 56–60 FPS while viewed individually. Representative sampled warning/error logs were empty.
- Astrolabe at a 390×844 desktop viewport had a 390px document width and all three company navigation links inside the viewport. This is not a physical-phone test.

## Limits

No exact reference-match, photographic-realism, full-physics or locked-60-FPS claim. The main unresolved visual work is geological/sculpted detail in Gravity, surface and mechanical craftsmanship in Astrolabe, and Syzygy's still simplified two-body rupture. Original audio/motion were not supplied. Full control/accessibility/device coverage, direct file execution, hosted identity/notifications/payment, genuine content and client acceptance remain open. Use local launchers for the tested HTTP/SQLite workflow.
