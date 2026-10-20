> Current revision: experience repair, 18 October 2026. Earlier sections below describe historical builds and are not proof for this source revision. See EXPERIENCE-REPAIR.md and EXPERIENCE-AUDIT.md for current changes, checks and remaining limits.

# Sequential completion: visual corrections — 18 October 2026

Three independent platforms. Each keeps its own story. No unified story mode.

This is the current verified visual-correction batch. Exact reference matching, photographic realism and client acceptance remain open. The first broad visual-fidelity item is still IN PROGRESS; individual narrative completion and the later work items have not been marked done.

## Implemented and reviewed

Gravity: all four ocean margins extend beyond the supported camera envelope using a continuous monotone mapping. The dense central wave patch and vertex allocation remain intact. A modeled fractured survey escarpment joins the terrain and grid datum. Hanging rocks have broader irregular erosion, deeper corner loss, oblique broken caps and revised light-facing orientations. Lunar albedo is now independent from the height texture. The survey HUD is capped on tall screens; the main waveform shows the actual six-second macro-wave displacement at the liquid current, in millimetres. Engine diagnostics remain in the diagnostic workspace. Wide and inverted Ocean views were rendered and checked.

Syzygy: replaced the warped straight hemisphere division with two spherical surface partitions meeting at a solved irregular cut curve. Both opposing cut walls share the exact exterior boundary and complementary interior relief. Rim vertices receive the same texture/impact displacement as the outer shell. The baseline closed geometry is spherical, all triangles are nondegenerate, and total enclosed volume is within 0.021% of the analytic sphere at this tessellation. Hold-driven fracture, all 240 fragments and release-driven rejoining remain active.

Astrolabe: increased the sculpted crater field to 76 accepted impacts in the production geometry test, including fine, medium and larger bowls. Bowl/rim relief is deeper. Crescent wire triangles fell from 3,952 to 2,760, with restrained rear-facing light and varied filament strength. Extra impact generation uses its own deterministic stream. Existing engraved bands, bounded precession and actual moving 3D planes remain. A fresh encoded renderer PNG was saved, its CRCs and decompression validated, and the nonblank scene visually inspected. The OS download flow was not retested.

## Current render evidence

Each current export was reviewed separately on the desktop in-app Chromium browser, WebGL2 / ANGLE / AMD Radeon 780M. No warning/error log entries were observed in the representative sessions. Each sample used Ultra, pixel ratio 1.5, viewport 1024 × 572, no hidden time and unchanged settings.
- Gravity: 60.01 s, 3575 intervals, 59.6 FPS average, p95 17.1 ms, 17 intervals above 33.34 ms. SHA-256: aa47241fcd49c90c838f8086abab81d1e585b9a084f4d05b10e1b9e8e4cc9c40
- Syzygy: 60.01 s, 3573 intervals, 59.5 FPS average, p95 17.1 ms, 14 intervals above 33.34 ms. SHA-256: 9d23a5094a985161522acc61e88c6ddb28f24f73d1dedcaebe9ea43ae4af6966
- Astrolabe: 60.01 s, 3572 intervals, 59.5 FPS average, p95 17.1 ms, 18 intervals above 33.34 ms. SHA-256: 207e511157b67e7fae7398d8d6948e75de3b2f0720dcb9a149ef0ab6b524f750

Syzygy completed four actual fracture/rejoin cycles, reached opening 1.0 and all 240 fragments, then returned to zero opening. Its opened-state screenshot was captured during a separate additional sequence. Moving-scene samples are desktop evidence, not a locked 60 FPS or cross-device guarantee.

All 13 targeted validation commands passed; source-checks.json contains the actual outputs and source hashes. These include real HTTP/SQLite backend tests, shared service tests, production reduced physics/input/route regressions, new cut/terrain geometry checks and syntax/assets. Stubbed DOM/audio checks do not certify real-device graphics or audible quality.

Current PNG/JSON evidence is in previews/ in the full collection. Independent scene ZIPs contain validation text and BUILD.json but not the shared evidence directory. tested-bundles.json identifies the exact browser-reviewed HTML. Older evidence is preserved separately in workspace history and previous-delivery backups.

## Still open

- Exact models, crater distributions, erosion, fracture breakup, liquid reflections, atmospheric depth, typography/HUD match and final visual acceptance.
- Independent narrative progression, discoveries/endings, richer secondary content and complete interaction choreography.
- Fully cold startup, prolonged sessions across all states, physical phones, additional browser engines and exhaustive accessibility/control verification.
- Direct file execution remains unverified after the earlier tool security block. Use the tested HTTP/SQLite launchers.
- Original motion/audio cannot be reconstructed exactly from silent stills. Current motion and sound are authored interpretations.
- Full planetary fracture, fluid dynamics and physical light transport are not implemented; the defined real-time reduced models remain.
- Final client acceptance and complete project finalisation.


## Company infrastructure — 2026-10-18

Added company navigation and independent destinations: Syzygy brand/Studio/commission briefs, Gravity Labs, Astrolabe Products. SCENE retains existing tools. Local publisher supports draft, private preview, publish, archive, backup merge and public-only static snapshot export. Empty collections contain no sample work. Local commissioning briefs download as text and are stored by the launcher; external message delivery and public hosting/authentication are not configured. The local server mounts sibling experiences while isolating scene settings/runtime. Direct file execution remains unverified. See COMPANY-INFRASTRUCTURE.md for workflow and limitations. This change does not establish new visual-fidelity or sustained-FPS claims.
