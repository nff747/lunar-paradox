# Lunar Paradox — experience audit and repair order

18 October 2026. Source and local browser review of the current build. This is a candid quality audit, not client acceptance. The three independent roles remain Syzygy = Brand/Studio, Gravity = Labs, Astrolabe = Products.

## Findings in the audited pre-repair build

1. **Syzygy reads like a textured object opening on a hinge.** The half-body movement is almost rigid and front-facing, so a technically volumetric mesh still looks flat. Its lighting and surface finish remain short of the reference. Confirmed in the live hold sequence.
2. **Ejecta repeat.** Every particle returns to its fracture origin when its lifetime wraps, making repeated emissions look like a looping effect rather than one rupture. Confirmed in source.
3. **The shell normals ignore fracture rotation.** The vertex shader changes positions but keeps the original normal direction. This weakens volume and makes illumination less coherent as the halves move. Confirmed in source.
4. **Camera motion is shallow or decorative.** Syzygy barely reveals the fracture wall. The other landings depend on scroll offsets and tiny pointer motion, while their autonomous motion largely runs on a fixed loop. More animation alone does not create a directed sequence.
5. **Camera shots stop at every waypoint.** The same eased interpolation contains a dead interval at both ends of each segment, producing pauses unrelated to a meaningful reveal. Confirmed in all three scene engines.
6. **Too much glow can hide material.** Broad bloom and billboard scattering reduce edge/detail contrast. The supplied reference also uses stylized optics; reducing every glow would lose its intent. This needs selective art direction, not another filter.
7. **Gravity's silhouettes still look authored.** Long repeated slab-like masses and their regular planar structure do not reproduce the reference's varied eroded broken geology. Current browser review confirms the mismatch.
8. **Gravity's ceiling/floor depth is uneven.** Reflections, fog and crater scale still give a constructed-scene impression; the reference has denser layered atmospheric depth. Not fixed by a camera path alone.
9. **Astrolabe's wire and instrument detail are repetitive.** Regular triangles, clean bands and simplified engravings lack the reference's irregular craftsmanship and dense construction. Current browser review confirms the gap.
10. **Astrolabe's motion lacks a focal hierarchy.** Rings, particles and light continue together, while camera attention is weakly related to the object. It needs an establishing view, relief/depth reveal and return to an intelligible composition.
11. **The company landings cover the strongest object.** Oversized generic headings ('Explore what could be', 'Ideas, made useful') and verbose decks overlap the 3D composition. Confirmed in the Labs and Products browser views.
12. **Empty collections get a large decorative box.** 'No experiments/products published yet' occupies a glass panel without useful content. The truthful empty state should be a compact status, not a feature card. Do not fill it with invented releases.
13. **Secondary pages use repeated marketing language and identical entrances.** Studio capabilities are legitimate, but repeated vague headings and cards obscure the actual commissioning journey. The generic 18px stagger is polish rather than spatial choreography.
14. **Two interface systems coexist.** Company navigation and legacy scene workspaces remain different visual systems. Utilities are useful privately, but exposing engineering explanation, controls and overlapping panels as primary content weakens the commercial presentation.
15. **HUD microtype is often too small.** Reference microtype is not an excuse for unreadable controls. Physical phone, keyboard and contrast coverage remains incomplete.
16. **Audio is a reconstruction.** Procedural drones/events exist, but no original recording was supplied. They have not been sound-designed or mixed against a client-approved sonic reference.

17. **False precision in decorative data.** Syzygy labelled pointer-driven numbers as latitude/longitude and displayed zero object angles while the hero was locked. Gravity used an unverified version stamp. This was interface decoration, not useful telemetry.

## What works and must be preserved

- Real Three.js geometry, live shaders, local assets, instanced particles, lighting and synthesized audio; the supplied reference screenshots are not scene backdrops.
- Initially joined Syzygy; HOLD opens the fracture and release rejoins it. ENTER independently navigates to company home.
- Separate Brand/Studio, Labs and Products experiences, without a unified story or business items assigned to every rock/ring.
- Local publishing and actual application → owner approval → configured estimate logic. Empty content and pricing remain empty until real records are supplied.
- Existing pause/reduced-motion/input guards, persistence and offline launchers. These need regression checks when changed.

## Repair order for this pass

1. Syzygy: staged camera approach, depth-separated opposing half poses, corrected normals, a single fracture emission with staggered releases, less broad bloom, and preserved independent controls.
2. Gravity and Astrolabe: continuous camera paths without waypoint dead zones, restrained autonomous camera movement that yields to inspection/reading, and scene-specific scroll framing.
3. Remove oversized catalogue filler, boxed empty states and repetitive Studio headlines while preserving truthful publication states and useful infrastructure.
4. Browser-review the actual changes, test critical input/route/state behavior, and regenerate the offline delivery with existing user data preserved.

## Still not complete or proven

- Exact reference geometry, crater placement, material realism, typography, reflections and atmospheric structure.
- A final sculpted/geological asset pass for Gravity or detailed mechanical asset pass for Astrolabe.
- Original animation/audio matching, full planetary fracture, fluid dynamics or physical light transport.
- Sustained performance on every state/device; universal 60 FPS is not established by short samples.
- Actual phones, exhaustive browser/accessibility coverage and direct file execution.
- Hosted identity/recovery, email notifications, public abuse controls, payment/contract workflow and deployment. Local backend tests are not production readiness.
- Real products, experiments, client case studies, rates and company contact details supplied by the owner. Content cannot be made real through UI decoration.
- Final visual/client acceptance.

Resolved in this pass: 2, 3, 5, 11, 12 and 17. Partially improved: 1, 4, 6, 10 and 13. Items 7, 8, 9, 14, 15 and 16 remain open. See EXPERIENCE-REPAIR.md for the verified changes and limits.
