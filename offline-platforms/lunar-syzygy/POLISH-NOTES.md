> Historical visual-polish notes from 17 October. See VALIDATION.md for the current 18 October bug/integration review.

# Syzygy composition and secondary routes

Scope: outputs/lunar-syzygy/dist/index.html, experience.js, experience.css.
No shared bridge, backend, atlas or cohesive-solver changes.

## Reference observations

The reference's solar limb is asymmetric and white at its hot edge, with a gold
penumbra and dark, granular crater basins. The main headline stays sharp over the
dark half, but solar light crosses part of “TWO” near the left limb. The lower
headline is occluded by the planet. The split is relatively narrow, irregular and
filled with individual pieces; its faces read as mineral rock, not smooth cuts.
The reference does not specify a temporal or acoustic sequence.

## Changes

- Neutralized the warm rock's base reflectance from strongly brown to muted warm
  gray; retained grazing warm illumination and crater/horizon shading.
- Tightened the white hotspot and reduced the broad scatter/veil and lens ghosts.
  This retains the actual HDR/bloom pipeline without a global blur/filter.
- Applied a small projected occlusion mask only to the front headline at the
  existing live solar hotspot. The scene supplies the visible light beneath it.
  Other letter edges stay crisp. There is no second canvas, scene image,
  framebuffer readback or extra GPU render pass.
- Reduced visual half translation .205 to .145 and visual yaw .045 to .032,
  consistently in the shared fracture displacement, corona, prominence offsets
  and reported fractureGap. Both shell and wall meshes use the shared function.
- fractureGap = .29*q + 3*sin(.032*q) reports the rendered center-opening estimate:
  approximately .386 U at full opening, formerly approximately .545 U.
  This is an art-directed render gap, separate from the normalized cohesive
  generalized coordinate q, which remains unchanged. It is not a new physical
  calibration.
- Ejecta continue to originate on the shared undeformed fissure plane and depart
  as the fracture opens; they are not rigidly attached to either displaced half.
  Their masses, impulses, force integration and energy accounting are unchanged.
- Mission is now a compact editorial sheet with keyboard-accessible LAB / STUDIO /
  PRODUCTS selection, concise intent and actual in-app destinations. No invented
  projects, client claims, business counts or external routes were added.
- Data has four primary observations, a chart, export, saved views and View / Sound.
  Secondary model accounting and renderer values sit inside Instrument Details.
  Detailed modelling discussion is kept here instead of occupying the scene.
- Secondary desktop sheets leave the live scene visible and orbitable on the right.
  Mobile sheets remain readable at full available width.

## Verification and costs

- node --check outputs/lunar-syzygy/dist/experience.js: passed.
- python3 work/refinement/check-platforms.py: scene syntax/assets and independent
  navigation passed.
- node work/runtime/test_scene_physics.mjs: production cohesive equations remain
  finite, deterministic, joined at startup, separated on hold, rejoined on release;
  isolated energy residual below 3.1e-13. No integrator equations were modified.
- No geometry/particle counts, texture sizes, bloom passes or shader noise-octave
  counts increased. Projection mask reads one headline rectangle and updates four
  CSS custom properties at most 12.5 times/second, only on the hero route.
- Browser rendering, actual visual acceptance and current sustained FPS remain
  root QA gates. A local CSS occlusion is an optical composition approximation;
  it does not simulate volumetric light transport through DOM typography.
- Photographic equivalence, unrecorded original audio/motion, a calibrated lunar
  FEM/fluid solver and cross-device locked FPS remain unestablished.
