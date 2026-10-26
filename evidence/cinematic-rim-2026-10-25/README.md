# Cinematic rim and lighting refinement — 25 October 2026

Local source and offline exports updated. No production deployment performed.

## Changes
- Syzygy: 18 staggered, growing magnetic prominence arches with flowing bright knots, turbulence and fading lifecycles. Shared rigid fracture transform anchors them to the gold body.
- Corona: body-local geometry and per-triangle parent IDs prevent stretching luminous strips across the split. Preserve the existing linear composite/tone mapping.
- Rock: world-light-relative rim response, more legible directional fracture walls, restrained cross-canyon fill and slow residual vein cooling. Gold/charcoal-violet palette and hold/rejoin mechanics preserved.
- Syzygy sound: quiet opening-linked plasma texture inside the existing limiter; spatial listener follows camera forward/up rather than fixed global axes.
- Gravity: corrected planar reflection look target; subtle bank during bounded descent and depth-linked sound filtering.
- Astrolabe: deeper scroll approach, lateral reveal, slight roll and eased chapter-specific camera offsets. Audio filter follows approach depth.
- All scenes: short state-driven captions with fades; suppressed over company content and for reduced motion. No loading captions, invented metrics or products.

## Verification
- Full build and local installation succeeded, with generated dependency manifests and CSP hashes.
- 71 automated tests passed; git diff whitespace check passed.
- Browser: all three scenes rendered; no console errors/warnings observed in these samples.
- Syzygy: hold commits, remains open after release, scroll changes bounded inspection position, explicit tap rejoins. Audio enable and mute status verified via settings UI.
- Astrolabe: chapter selection changed phase and caption; updated camera rendered without errors.
- Gravity: initial scene and ocean transition rendered; reflection shader did not report errors.
- Screenshot: syzygy-open.png shows corrected open-state light attachment.

## Limits
- Direct file:// navigation was blocked by browser URL policy; offline exports built but direct-file playback was not verified in this pass.
- These are short browser checks, not sustained device benchmarks. Hidden tabs were throttled; no cross-device FPS claim.
- Audio initialization/status was checked, not an independent listening or speaker-mix assessment.
- These effects are authored real-time visual/sound approximations, not solar plasma or planetary-scale fracture simulations.
