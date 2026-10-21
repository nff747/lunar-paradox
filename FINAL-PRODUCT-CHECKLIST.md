# Lunar Paradox — final product execution checklist

Plan edition 1 · 19 October 2026 · Planning artifact, not a completion report.

## Authority and purpose

This checklist consolidates the accepted conversation decisions, the three supplied visual references, the inspected application source, and the useful parts of the earlier plans. It is the execution specification for finalizing Lunar Paradox. Earlier V3.x plans remain historical context; their conflicting instructions and unsupported completion claims do not override this document. The references remain the visual targets. User instructions supplied later take precedence and must be recorded as a change to this checklist before dependent implementation continues.

The outcome is three independently usable, real-time 3D platforms with one coherent brand and working company services. The short film is a supporting sales artifact, not the final website. A passing film cannot close the production tasks below. The aspirational standard is exceptional visual craft, motion, originality, usability, engineering and content across the entire visitor journey. No award, universal ranking, customer outcome or device-independent frame-rate guarantee is a completion criterion.

Only planning and supporting checklist artifacts are being produced in this turn. Website changes, deployments, purchased services, outreach and legal execution are future actions governed by the tasks below and their actual authorization requirements.

## Fixed product contracts

1. Syzygy owns BRAND / HOME, STUDIO and COMMISSIONS. Gravity owns LABS. Astrolabe owns PRODUCTS. Preserve Lunar Paradox and the reference-derived names; do not invent replacement brands.
2. The platforms have separate entry points and independently initialized scenes. Share source packages, content contracts and identity infrastructure where useful; connect experiences with normal accessible links. Do not introduce a unified three-act scene, a compulsory tour or a persistent all-scenes renderer.
3. Syzygy initially presents a joined planet. HOLD builds charge. Early release cancels toward joined. Crossing the committed failure threshold starts rupture once; it completes and latches open. Explicit REJOIN returns to joined. ENTER independently opens company content. This intentionally supersedes the older automatic-rejoin-on-every-release contract.
4. Hero framing and inspection are bounded. No unrestricted orbit, arbitrary zoom/pan or auto-navigation from the fracture. Wheel, touch and keyboard inspection have finite limits and yield to reading, scrolling and form input.
5. Preserve TWO REALMS / ONE AXIS. After ENTER, make the business understandable using the agreed applied-technology positioning and useful calls to action. Commissioning remains application first, owner acceptance second, service selection and server estimate third.
6. Labs and Products provide publishing and discovery infrastructure. Invent no experiments, products, customers, launch dates, awards, revenue, team size, pricing or research status. A privately planned project does not justify a public 'active programme' claim.
7. The supplied JPEGs are references, not backgrounds or projected impostors for the live hero objects. Real geometry must survive all allowed camera movement. A fallback image may be offered explicitly for unsupported/reduced modes without claiming it is live 3D.
8. Worlds have internal artistic consistency, not claims of literal astrophysical accuracy. Gravity inversion, planetary reassembly and a crescent cradling an eclipse are designed fiction. Use principled motion and light approximations; do not market them as complete continuum, fluid or path-tracing solvers.
9. No Awwwards filler badge, invented telemetry, oversized empty cards, generic filler routes, default chromatic filtering or pervasive cursor tricks. Each displayed control and label has a real purpose, value source and state.
10. Preserve offline use and the user's local data. Public operation requires a separately verified hosted service; a local SQLite launcher is not that proof. Build both from the same agreed source tree.

## Current evidence and the gaps it does not close

- On 19 October the Downloads repository was inspected: commit c1a4ab9 follows 760f42e, with a clean worktree at that inspection. The original Codex workspace is separate. Repository cleanliness is not a security, reproducibility or product-quality certificate.
- The delivered package contains real Three.js r170 scenes, local fonts/textures, company routes, publishing, application review and server-priced estimates. Current build tooling and many tests reside outside the new Downloads Git repository.
- Earlier local test and browser receipts exist under the Codex workspace. They are historical baselines, not blanket acceptance of the upcoming changes or hosted service. Original reference animation/audio, physical-phone coverage and direct file execution are not established.
- The visual review identifies material realism, Syzygy's two-body breakup, Gravity's geological silhouettes/scale and Astrolabe's repetitive construction as unresolved quality gaps. Prior fixes to normals, ejecta recurrence and some interface filler must be preserved and rechecked.
- Current source still requires the new latched state; Astrolabe has a source-derived 600-second motion-wrap concern. Hosted authentication/recovery, authenticated publishing, revision-bound estimates and delivery operations require work.
- Confirmed business inputs are user-reported: no usable business cash, founder plus interns, UK-based, unregistered business, approximately USD 12,000 monthly combined personal/company costs. No assumption that all costs are company debt or tax-deductible. Capacity, prices, payment fees, available device access and buyer demand remain unvalidated.

## Source map to reconcile before modifying the applications

- Versioned delivery root: /home/n1khy/Downloads/lunar paradox.
- Delivered scene sources: offline-platforms/lunar-syzygy/scene-source.html; lunar-gravity/scene-source.html; lunar-astrolabe/scene-source.html. Their index.html files are generated standalone bundles.
- Prior editable source: /home/n1khy/Documents/Codex/2026-10-16/so/outputs/lunar-*/dist/index.html and associated scene assets/modules.
- Shared company source: work/company-build/company.js, company.css and commissions.js in the Codex workspace. Backend/build tooling: work/runtime/lunar_backend.py, build-standalone.mjs, package.json and package-lock.json. Packaging: work/refinement/package-offline.py and verify-offline.py.
- Private runtime data: offline-platforms/.lunar-data. Never print secrets, distribute this folder or overwrite it during export. Compare database logical records for preservation, not only SQLite file bytes.
- Current master: /home/n1khy/Downloads/lunar paradox/FINAL-PRODUCT-CHECKLIST.md. Documents/plans links to this same master. JSON, Canvas and browser checklist are generated views, not independent status authorities.

The first implementation gate chooses one editable source location and imports the required tooling into the repository. Until that gate passes, neither source location may silently overwrite the other.

## How the executor must use this checklist

Every task has a stable ID, concrete work, acceptance conditions and evidence requirements. All product tasks start unchecked because this plan does not certify their final state. Existing work may satisfy a task only after re-verification; do not rebuild already adequate components for the sake of checking a box.

Record progress in the master beside the task: Status (planned / active / blocked / verified / approved exclusion), implementation commit or source hash, evidence paths, test environment and any remaining limitation. Use [x] only for verified work. An approved exclusion retains an unchecked box plus the explicit exclusion record; it must not inflate verified counts. Rendered checklist views are read-only to prevent unsynchronized click-to-complete claims.

Within each implementation slice: inspect current files and user changes; identify the relevant task IDs; implement; run proportionate verification; inspect visual output where applicable; record evidence; update the checklist; then take the next ready slice. Test logical/state invariants with code, visual quality with captures and observation, commercial truth with actual records. Do not write tests that merely reproduce trivial implementation details.

Necessary bug fixes are in scope under the affected task. New features, arbitrary polish, extra brands, speculative services and integrations require an explicit change record and user direction. For an unforeseen blocker, record the failure, attempt in-scope remedies and continue independent tasks. Do not bypass access controls or invent a pass to complete a milestone.

## Execution order and dependencies

Gate 0 — Baseline and custody: resolve repository/source ownership, recoverable data protection and the business/content input register. Foundation tasks F and the relevant build tasks Q precede implementation.

Gate 1 — Art and interaction contract: complete design tasks D, reference measurements, scene state diagrams, route specification and device-test plan. Lock the Syzygy capture shot without freezing untested arbitrary shader/camera numbers.

Gate 2 — Syzygy finished vertical slice: shared resource/lifecycle foundations, Syzygy asset and interaction tasks V, its company routes P and relevant Q checks. Fix joined/charging/rupture/open/rejoin, ENTER, scrolling, mobile and reduced-motion as one coherent slice. A capture candidate may be made here; unfinished production tasks remain open.

Gate 3 — Gravity finished vertical slice: complete its geology, ocean, droplets, camera, HUD, Labs browsing and corresponding tests. Preserve the accepted Syzygy slice. Finish before beginning the Astrolabe scene overhaul, except independent shared/infrastructure tasks.

Gate 4 — Astrolabe finished vertical slice: complete crescent, eclipse, instruments, alignment, Products browsing and corresponding tests. Verify long-session continuity and meaningful empty-publishing behavior.

Gate 5 — Company operations: finish approved-applicant estimate flow, admin publishing, identity/recovery, data lifecycle, service integrations and commercial factual content. Shared schema and API work can begin after Gate 0; final acceptance waits for actual routes and connected services.

Gate 6 — Whole product QA and offline release: run the full user journey, accessibility, asset, performance, packaging and restore checks. Do not infer this gate from isolated scene screenshots.

Gate 7 — Hosted staging and public release: reconcile real deployment/domain/contact/trading details, inspect sanitized staging, test real-provider behavior with safe test accounts, prepare rollback, then publish only with user authorization. No outreach is sent merely because a checklist entry exists.

Gate 8 — Handover: deliver source, build instructions, evidence, maintenance procedures and acceptance record. The optional reel/business-development branch does not replace this gate or gate private local product development on whether a sale occurs.

One operator's time is shared across all four work tracks. 'Parallel' means delegated or interleaved work with explicit owners; it does not multiply founder capacity. No paid assets, hosting subscriptions or services are assumed available at zero cash. Record measured effort after the first complete slice and reforecast the remaining tasks. This document promises scope and evidence, not an uncalibrated completion date.

## Proposed quality budgets to confirm at Gate 1

- Desktop candidate: 1920×1080 CSS viewport, DPR 1, named GPU/CPU/OS/browser, 60 Hz presentation; record startup, complete interaction and long-run behavior. After confirming display cadence, target warm p95 frame interval no worse than 1.1× refresh interval, under 1% intervals over 1.5× refresh interval, and no recurring application-attributable >50 ms hitch. Report raw results and causes. Faster-than-60-Hz hardware must not fail for being faster. These are proposed release budgets, not current passes.
- Mobile candidate: measured physical iOS and Android devices, actual viewport/browser/DPR and power conditions; aim at 60 Hz where sustainable, provide an explicitly selected/adaptive 30 Hz quality tier where necessary. For a 30 Hz tier apply the same relative cadence thresholds against 33.33 ms and preserve input responsiveness. Never advertise the fallback as 60 FPS.
- Startup candidate: useful navigation and company copy within 2 s and first meaningful 3D interaction within 5 s on a recorded cold-cache 20 Mbps / 80 ms test profile. Real low-end/mobile profiles must be reported separately; failed targets require reducing initial payload or documenting a user-approved target change. No fake progress or 'ready' before required interaction assets exist.
- Endurance candidate: each scene runs at least 15 minutes with repeated interactions; sample first/middle/end, memory/resources and thermal trend. Distinguish rAF intervals from GPU timers and recording overhead. Test context restoration, tab resume and failing asset/API paths separately.
- Interface target: WCAG 2.2 AA for applicable public controls and content; target 44×44 CSS-pixel primary touch regions, readable content at 200% zoom, keyboard alternatives to holds/drags, reduced-motion and mute support. Decorative HUD microtype may simplify/disappear on small screens; essential information must remain available in readable content.
- Visual acceptance: compare the reference framing at matching aspect ratio with reference landmarks, unfiltered full-size captures and motion clips; record geometry, scale, light, tone, typography, atmosphere and interface judgments separately. Aesthetic acceptance remains a human decision. No fabricated percentage of reference fidelity.

## Evidence and decision register

Keep task evidence under evidence/<task-id>/ in the agreed repository or its documented private evidence store. A receipt includes source/build hash, command or manual procedure, device/browser/viewport, date, observed result, asset provenance and limitations. Redact personal data and secrets. Retain source images and unedited test recordings separately from promotional edits. Use private access for material containing client assets.

Owner-dependent inputs, collected together when their dependent work approaches: real contact/trading identity, public capabilities and published records, prices/currency/tax treatment, applicant-facing decision wording, deployment/domain/provider accounts, data retention decisions, access to physical devices and final visual acceptance. Build adapters and schemas meanwhile; do not synthesize those facts. No provider choice or purchase is implied by mentioning a required integration.

Optional effects are bounded experiments: local heat shimmer, restrained surface labels, phone tilt, film grain/lens streak, spatial audio accents. Compare an enabled/disabled capture once; retain only if they improve legibility/material/interaction and pass budgets. Remove an unsuccessful experiment and record that decision. Core visual identity cannot depend on phone sensors, custom cursors, autoplay sound or full postprocessing.

## Task groups

F = foundation and scope; D = design and choreography; V = real-time scenes/assets/audio; P = company services/backend/content; Q = verification/build/release; O = commercial preparation; Z = final acceptance. The group order in this document is organizational; use the gate dependencies above when choosing the next task.

## Foundation, scope and source custody

- [ ] **F001 — Establish a fresh execution baseline**
  - Do: Record current Git branch/commit/status in Downloads, actual runtime entry URLs, source hashes and active processes. Inspect local instructions and overlapping user changes before edits.
  - Accept: The executor can identify exactly which files and build are being changed; no dirty user work is silently discarded.
  - Evidence: Baseline receipt with status and hashes, excluding credentials.

- [ ] **F002 — Reconcile the two source trees**
  - Do: Compare delivered scene-source.html and shared modules against Codex outputs/work source. Choose one canonical editable tree inside the repository; import required current changes without treating generated index.html as authoring source.
  - Accept: A documented source-to-generated-output map exists for all three scenes, company modules and backend; there is no competing edit path.
  - Evidence: Comparison report and source map reviewed before migration.

- [ ] **F003 — Preserve user data and recovery material**
  - Do: Inventory database/owner-key locations and archive files; create a recoverable private backup with restrictive permissions before any migration. Preserve logical content, application decisions, estimates and saved views.
  - Accept: Existing records and credentials survive migration; no archive is deleted as incidental cleanup and no private file enters release output.
  - Evidence: Private backup/restore receipt and redacted logical record checksums.

- [ ] **F004 — Record the definitive interaction contracts**
  - Do: Encode the charter's HOLD/latch/REJOIN/ENTER, constrained inspection and three-app decisions in state and route specs. Search legacy docs, hints and tests for contradictory release-to-close or free-orbit instructions.
  - Accept: One contract governs code, tests, button labels and help text; only clearly marked historical receipts retain superseded behavior.
  - Evidence: Contract document and contradiction inventory with disposition.

- [ ] **F005 — Import build and verification tooling**
  - Do: Bring the standalone builder, packaging/verification scripts, backend, dependency manifests/locks and essential tests into the chosen tree. Replace hard-coded Codex paths with project-relative configuration.
  - Accept: Tooling operates from a path containing spaces without reliance on the old workspace or global undocumented modules.
  - Evidence: Clean checkout build log and dependency inventory.

- [ ] **F006 — Define public, private and generated boundaries**
  - Do: Classify scene assets, company copy, financial plans, private evidence, applicant data, admin keys, generated bundles, release archives and cache folders. Restrict the web server's document root to public artifacts.
  - Accept: Business simulations, contract drafts, key files, source maps containing secrets and applicant records cannot be downloaded through public routes.
  - Evidence: Path policy, asset manifest and attempted forbidden-path checks.

- [ ] **F007 — Verify repository secret hygiene**
  - Do: Check tracked files and reachable history for credentials/private data using content-aware inspection as well as extension rules. Avoid printing secret values; resolve real findings by removal/rotation appropriate to exposure.
  - Accept: No discovered credential or private record remains accessible in the intended shared history; ignores include relevant sidecars and backups.
  - Evidence: Redacted scan scope/result and any remediation receipt.

- [ ] **F008 — Set the asset and licence register**
  - Do: Register source, authorship, permission, licence, local path, dimensions, format and intended use for every texture, mesh, font and sound. Keep the user reference images out of public assets unless their use is permitted.
  - Accept: Every shipped asset has a defensible provenance record; paid/unlicensed assets are not assumed available.
  - Evidence: Asset register and included notices.

- [ ] **F009 — Separate facts, targets and measurements**
  - Do: Label current business inputs as user-reported, device access as observed/unknown, prices/capacity as hypotheses and benchmark results as measured. Remove unsupported debt, physics, contact-verification and world-ranking claims.
  - Accept: Internal and public documents cannot mistake a proposal for a result.
  - Evidence: Fact register with source/date and corrected assertion list.

- [ ] **F010 — Define scope change control**
  - Do: Maintain a short decision log citing the task, requested change, dependency and trade-off. Keep necessary bug fixes under existing IDs; require user direction for new commercial features or changed platform roles.
  - Accept: Future work follows this checklist; no new framework, narrative, provider or service appears through incidental polish.
  - Evidence: Decision-log template and first scope freeze entry.

- [ ] **F011 — Establish a bounded first slice**
  - Do: Select a joined-to-open Syzygy path and its exact visible geometry, UI and audio. Schedule early rough capture, implementation cutoff and review within the agreed effort/timebox; name whether hours mean working or elapsed time.
  - Accept: A small end-to-end slice can prove the main risk; the clock cannot silently reset after every defect, and one founder is not scheduled on four simultaneous jobs.
  - Evidence: Shot specification, owner/capacity allocation and actual start record.

- [ ] **F012 — Register decisions requiring real inputs**
  - Do: Create one list for identity/contact, publishable records, rates, tax handling, hosting/domain accounts, hardware access and acceptance reviewers; connect each to the first dependent task.
  - Accept: Missing information blocks only dependent work; no placeholder goes live as a fact.
  - Evidence: Input register with owner, status and affected IDs.

- [ ] **F013 — Establish evidence-based task completion**
  - Do: Configure task receipts with commit/hash, environment, tests/captures, result and limitations. Require human visual judgment for appearance and actual provider tests for connected services.
  - Accept: A checkbox cannot be closed merely because code exists, unit tests pass or a plan describes the desired behavior.
  - Evidence: Receipt format and one completed baseline example.

- [ ] **F014 — Make three independent app boundaries explicit**
  - Do: Define shared packages and per-scene ownership; plan navigation and resource disposal without loading all three renderers at once. Distinguish shared session/content APIs from shared WebGL lifetimes.
  - Accept: Any scene can load directly and independently; navigating away releases its expensive work and ordinary links retain browser behavior.
  - Evidence: Dependency map and direct-entry/resource-lifetime tests.

- [ ] **F015 — Preserve reproducibility of procedural assets**
  - Do: Pin generator versions, seeds, scale/coordinate conventions and exported map settings for crater, fracture, terrain, rings and particles. Store authored source and build parameters with exported results.
  - Accept: Regeneration produces comparable assets without random visual drift or an unavailable previous machine.
  - Evidence: Seeded regeneration checksums and visual comparison.

- [ ] **F016 — Define final scope versus research backlog**
  - Do: Keep complete planetary FEA, fluid simulation, spectral path tracing, automatic world ranking, a unified story, live ecommerce/subscriptions and fabricated launch content outside this release. Keep relevant art-directed approximations in scope.
  - Accept: Delivery is finite; omitted research cannot be called implemented and is not silently added to the critical path.
  - Evidence: Scope boundary linked to the fixed charter.

## Art direction, reference matching and whole-journey choreography

- [ ] **D001 — Build the reference observation sheet**
  - Do: Inspect all three original-resolution references, distinguish scene geometry from compositing/UI, and annotate principal silhouettes, horizon, light direction, scale, shadows, color balance, text bounds and focal hierarchy.
  - Accept: Each platform has a concrete visual target with uncertain/hidden geometry explicitly authored rather than falsely recovered from pixels.
  - Evidence: Annotated reference sheets with source filenames and aspect ratios.

- [ ] **D002 — Select a small external benchmark set**
  - Do: Choose a few current inspectable examples for material craft, motion, accessibility and commercial clarity. Record what each teaches; avoid copying their identity or claiming a ranking.
  - Accept: Benchmarks compare specific observable qualities and include practical task usability as well as spectacle.
  - Evidence: Dated links and a short criterion note for each; no unbounded inspiration search.

- [ ] **D003 — Define a shared identity system**
  - Do: Establish typography hierarchy, spacing scale, line weights, icon language, status treatments and restrained gold/violet/silver roles. Preserve scene-specific emphasis: solar divide, monochrome inversion, celestial instrument.
  - Accept: Company content and scene HUD feel related without identical layouts or forced recoloring of the references.
  - Evidence: Design tokens and representative desktop/mobile components over each world.

- [ ] **D004 — Choose and test licensed fonts**
  - Do: Compare available licensed display and technical fonts against reference proportions at actual rendered sizes. Use a real monospace where required; subset/convert only when licence permits and retain fallback metrics.
  - Accept: Headline density, microtype hierarchy and numeric alignment fit; no global tracking value is used blindly and loading does not disrupt layout.
  - Evidence: Type specimen, licences, font-load captures and fallback comparison.

- [ ] **D005 — Resolve headline depth ordering**
  - Do: Prototype reference-like typography framing and light/planet occlusion in Syzygy. Separate primary accessible DOM copy from rendering masks; define joined/open and narrow-screen layouts.
  - Accept: TWO REALMS / ONE AXIS remains readable, light has depth, and the planet's most important contour is not unintentionally buried.
  - Evidence: Matched reference overlays and joined/open/motion captures.

- [ ] **D006 — Create composition-safe layouts**
  - Do: Specify safe zones for each scene's subject, company navigation, accessible controls, node labels and reading panels across wide desktop, laptop, portrait phone and landscape phone.
  - Accept: No large panel accidentally hides the principal object; essential controls avoid safe-area insets and browser chrome.
  - Evidence: Layout frames at agreed viewports and actual-device checks later.

- [ ] **D007 — Define complete motion states**
  - Do: Document scene loading, readiness, idle, interaction, inspection, reading, pause, hidden, reduced-motion, error and restored states, including all transitions and input ownership.
  - Accept: Camera, objects, audio and UI cannot compete because two unrelated animations own the same property.
  - Evidence: State diagrams and transition ownership table.

- [ ] **D008 — Author the Syzygy shot sequence**
  - Do: Set establishing, anticipation, local failure, separation, suspended inspection and rejoin beats. Map camera position/target, focal emphasis, UI visibility, light, sound and event triggers on one normalized timeline.
  - Accept: The principal rupture reads at real playback speed; no sudden camera cut hides weak geometry in ordinary interactive operation.
  - Evidence: Storyboard, timeline and ungraded blocking capture.

- [ ] **D009 — Author the Gravity shot sequence**
  - Do: Establish the impossible ceiling, reveal mass/scale, follow upward liquid and resolve the crater. Associate inspection viewpoints with actual features while keeping Labs content access direct.
  - Accept: Orientation remains intelligible and the camera never exposes ocean boundaries or passes through monoliths.
  - Evidence: Bounded path/storyboard and camera-clearance visualization.

- [ ] **D010 — Author the Astrolabe shot sequence**
  - Do: Establish the crescent/eclipsed core, reveal rock depth and engraved instruments, approach the solid-to-wire boundary and return to alignment. Establish a hierarchy among ring, camera and light motion.
  - Accept: Motion reveals construction and scale; rings do not obscure the core simultaneously or spin without a focal purpose.
  - Evidence: Storyboard and continuous blocking capture including alignment.

- [ ] **D011 — Define route-specific spatial transitions**
  - Do: Design entrances/returns for company home, Studio, application, Labs list/detail and Products list/detail. Use short, cancellable choreography and preserve form focus/scroll; cross-platform links remain normal page navigation.
  - Accept: Every transition explains the destination, works with back/forward, and has an immediate reduced-motion equivalent.
  - Evidence: Transition inventory and representative recordings.

- [ ] **D012 — Set an input-priority hierarchy**
  - Do: Give text input, buttons, dialogs, menus and content scrolling priority over scene gestures. Distinguish click from drag and wheel reading from bounded inspection; support Escape/back without losing entered data.
  - Accept: Editing an application, selecting text or scrolling an article never ruptures, resets or moves the camera accidentally.
  - Evidence: Interaction conflict tests and manual keyboard/touch walkthrough.

- [ ] **D013 — Provide understandable interaction instructions**
  - Do: Show brief contextual instructions for charge, inspect, align, pause and rejoin only when relevant; change the trigger label/state after commitment. Provide a keyboard-operable activation alternative to prolonged physical hold.
  - Accept: First-time users can discover control without a tutorial wall or permanent implementation jargon.
  - Evidence: First-use observations and accessible control descriptions.

- [ ] **D014 — Plan useful HUD information**
  - Do: Assign every visible datum to measured scene state, real published content or clearly labelled simulation value. Remove fake pressure/coordinates/version/FPS values; move debugging into a private development view.
  - Accept: The visual density of references survives with purposeful information, and essential content is readable outside tiny labels.
  - Evidence: HUD data-source register and desktop/mobile screen comparison.

- [ ] **D015 — Design node-label placement and occlusion**
  - Do: Specify projected anchor positions, offscreen clamping, leader-line bends, overlap priority, occlusion, hover/focus targets and accessible equivalent list. Avoid label flicker at depth boundaries.
  - Accept: Callouts feel attached to 3D features and stay usable without obscuring the scene or stealing input.
  - Evidence: Captures through every allowed camera interval and keyboard node navigation.

- [ ] **D016 — Design company reading surfaces**
  - Do: Create selective reading zones with sufficient contrast and restrained scene motion. Use typographic hierarchy and space instead of a wall of glass cards; permit direct entry without the spectacle.
  - Accept: Long descriptions, estimates and policies can be read without animated lighting reducing contrast or repeated ornamental filler.
  - Evidence: Desktop/phone reading layouts and contrast checks.

- [ ] **D017 — Design every non-happy-path interface**
  - Do: Specify form validation, pending review, declined/accepted states, unavailable pricing, expired access, unavailable media, offline service, missing entry and recoverable errors in the same visual language.
  - Accept: The service remains understandable and polished when nothing is available or something fails; errors do not reveal internal implementation details.
  - Evidence: Complete state gallery with real recovery actions.

- [ ] **D018 — Define restrained effect experiments**
  - Do: Compare local heat shimmer, limited optical streak, fine dithering/grain and optional tilt individually against a clean baseline. Measure cost and inspect text/detail; disable broad RGB splitting and unnecessary full-screen shake.
  - Accept: Each retained effect improves a documented visual quality and has a reduced-quality/motion fallback; failed experiments are removed.
  - Evidence: Enabled/disabled captures, timings and keep/remove decision.

- [ ] **D019 — Define the sonic identity**
  - Do: Specify quiet idle, anticipatory tension, material failure, suspended space and gentle rejoin using original/permitted sound design. Set loudness/peak targets after listening; use a small event vocabulary instead of sounds on every hover.
  - Accept: Each platform has a coherent related character; mute loses no information and no surprise blast is required for impact.
  - Evidence: Sound palette, event map and listening notes across headphones/laptop/phone.

- [ ] **D020 — Preserve physical coherence in stylized scenes**
  - Do: Document scene scale/time conventions, light sources, movement causes and where fiction intentionally departs from physics. Make debris impulses, water response and ring motion consistent within those rules.
  - Accept: Artistic effects feel caused, while public copy avoids false scientific guarantees or fake instrumentation.
  - Evidence: Short scene rules and motion/lighting consistency review.

- [ ] **D021 — Design consent and settings without clutter**
  - Do: Place sound, motion, quality and help in one accessible location with sensible defaults. Make immediate pause/mute discoverable; ask sensor permission only after explicit tilt enablement if tilt survives its experiment.
  - Accept: No duplicated control systems or unnecessary permission prompt appears on first visit.
  - Evidence: Settings flow and state persistence walkthrough.

- [ ] **D022 — Define independent visual acceptance**
  - Do: Name the owner/reviewer and recruit available independent viewers when possible. Compare reference fidelity and original motion separately; ask people to find Labs, Products and the commission application without hints.
  - Accept: Documented observations cover craft and task comprehension; absent reviewers are reported rather than invented.
  - Evidence: Dated review notes, exact build/captures and actionable disagreements.

- [ ] **D023 — Remove abandoned interface layers**
  - Do: Inventory legacy Observatory/Telemetry/Archive panels and duplicate settings. Retain useful scene inspection privately or as intentional public controls; retire filler navigation with sensible old-link redirects.
  - Accept: Every public navigation item has a substantive, role-appropriate destination; no generic workbench competes with the company interface.
  - Evidence: Before/after route and control inventory.

- [ ] **D024 — Make motion interruption and restoration deliberate**
  - Do: Specify what happens when the visitor pauses, opens a panel, navigates, backgrounds the tab, returns, resizes or switches quality during each cinematic beat.
  - Accept: Resume preserves meaningful state without repeating a burst, skipping a required transition or jumping the camera.
  - Evidence: Interruption matrix and recordings of representative edge cases.

## Shared art direction and asset foundation

- [ ] **V001 — Establish a reproducible reference comparison set**
  - Do: Preserve the three supplied JPEGs as review-only references, record their dimensions and hashes, and associate each with its correct independent platform. Produce normalized comparison canvases at the reference aspect ratio plus the chosen desktop and phone viewport sizes; distinguish the joined Syzygy opening state from its reference split state.
  - Accept: A reviewer can identify the intended source, viewport, scene state and application revision for every comparison. No reference screenshot is loaded as the live scene background or substituted for the hero geometry.
  - Evidence: Reference manifest, comparison layout definitions and one uncropped source-to-current comparison per scene.

- [ ] **V002 — Annotate the composition and visual hierarchy**
  - Do: Mark principal silhouettes, focal centre, object extent, negative space, horizon, eclipse core, fracture path, foreground/background depth layers, typography bounds and HUD safe regions. Record what must remain visually dominant as the camera moves and where business navigation must remain legible.
  - Accept: Each scene has an explicit composition map and observable failure examples; text, scene geometry and interface priorities agree. Percentage anchors guide calibration rather than being presented as proof of photographic equivalence.
  - Evidence: Annotated reference overlays and a signed-off composition sheet for joined, peak action and settled views.

- [ ] **V003 — Inventory authoritative asset and scene sources**
  - Do: Identify editable mesh generators or model source, texture originals, material transforms, font sources, audio sources, shader files and generated exports. Record current asset sizes, dimensions, duplicates, import conventions and which canonical code produces each delivered scene.
  - Accept: Every runtime asset can be traced to an editable source or documented external original; generated standalone bundles are not accidentally treated as the sole editable source. Missing source assets are recorded as production work.
  - Evidence: Asset/source manifest with local paths, hashes, dimensions, roles and generation commands.

- [ ] **V004 — Establish asset rights and provenance**
  - Do: Preserve licence and attribution evidence for lunar imagery, basalt materials, fonts, libraries and future audio/model imports. Inspect actual files and source records; distinguish reference inspiration from redistributable production material. Prefer existing licensed resources and procedural authorship before any paid acquisition.
  - Accept: All distributable assets have an identified licence and permitted usage; no invented photogrammetry provenance or unapproved paid font/model dependency enters the build.
  - Evidence: Production credits, per-asset provenance entries and redistribution review tied to exact asset hashes.

- [ ] **V005 — Define consistent coordinate, scale and transform conventions**
  - Do: Document world axes, object-local axes, scene scale, authored camera space, material UV orientation, light directions and normal-map convention. Maintain stable local attachment frames for fracture pieces, ocean impacts, callouts and ring components.
  - Accept: Imports, mirrored cameras, shader displacement, CPU physics and projected labels agree on axes and scale. Normal maps light correctly under rotating test lights; no unexplained sign flips remain.
  - Evidence: Coordinate guide and diagnostic views of axes, normals, attachment markers and light directions.

- [ ] **V006 — Create a material evaluation scene**
  - Do: Build an internal review scene using the production colour pipeline and representative grazing, frontal and back lighting. Evaluate rock, fresh fracture, brass, obsidian, mercury and emissive filament samples at their actual on-screen scale.
  - Accept: Rock reads as rough mineral mass, metal reflects its surroundings, fresh interiors differ from weathered crust and emission retains structure. The review scene exposes rather than hides defects with bloom.
  - Evidence: Material contact sheet with bloom off/on, roughness and normal visualizations and camera/light settings.

- [ ] **V007 — Author surface detail at distinct spatial scales**
  - Do: Assign silhouette-changing geology to geometry; medium craters, shelves and erosion to displacement or sculpted relief; fine grain to normal/roughness maps; colour variation to mineral patterns. Remove high-frequency detail that duplicates large forms or resembles uniformly distributed noise.
  - Accept: Large, medium and small structures remain distinguishable in close-up and at landing-page scale. Repeated tiling, uniform pitting, stretched craters and smooth plastic highlights are absent from approved views.
  - Evidence: Three-distance material crops and a map showing which detail scales are represented by geometry, textures and shaders.

- [ ] **V008 — Set texture budgets from projected use**
  - Do: Calculate useful texture resolution from the largest approved camera footprint and UV density. Inspect colour versus normal/height data colour-space settings, mip generation, anisotropy, packing and seam handling. Remove duplicate embedded font/asset payloads in the production pipeline while keeping an independently verified offline package.
  - Accept: Textures retain required close-up detail without gratuitous dimensions or duplicate transfer. Colour maps use the correct transfer function and numeric maps remain linear; minified surfaces do not shimmer.
  - Evidence: Texture-budget sheet, UV density views and measured pre/post decoded memory and transferred payload where available.

- [ ] **V009 — Evaluate compressed delivery with visual comparisons**
  - Do: Trial KTX2/Basis or other supported texture formats on representative albedo, normal and mask assets; configure compatible loaders/transcoder files and hardware fallbacks. Compare source and decoded results at approved grazing angles before selecting compression settings.
  - Accept: No visible block damage to fracture normals, purple veins, brass engraving or mercury highlights. Actual transfer/decode/upload costs are recorded; there is no promised universal compression ratio or GPU format.
  - Evidence: Compression matrix with byte sizes, target devices, decoded-format observations and side-by-side image crops.

- [ ] **V010 — Define mesh detail levels without silhouette loss**
  - Do: Prepare close, middle and distant geometry variants only where projected detail warrants them. Preserve the fracture lip, crater rim, monolith tip, crescent horns and ring silhouette; use hysteresis and stable switching or crossfades as appropriate.
  - Accept: Supported camera paths contain no mesh popping, dissolving holes, changing slab sockets or detached labels. Lower tiers retain the same scene identity and major action timing.
  - Evidence: Mesh counts, screen-error comparisons and camera-path captures across every detail transition.

- [ ] **V011 — Consolidate colour management and exposure**
  - Do: Trace linear input, HDR render targets, bloom extraction, tone mapping and display encoding end to end. Preserve or replace the existing explicit Syzygy composite curve deliberately; avoid applying renderer tone mapping on top of it. Match exposure and black/white levels scene by scene rather than forcing identical lighting.
  - Accept: Tone mapping and display encoding occur exactly once along each production path. Gold highlights retain colour, violet detail is not crushed and dark rock remains legible without a grey veil.
  - Evidence: Render-pipeline diagram, test ramp results and exposure-locked reference comparison frames.

- [ ] **V012 — Allocate lighting by visual purpose**
  - Do: Give each scene a documented key, fill, edge and environmental contribution. Select shadow casters, shadow-map bounds, contact cues and ambient occlusion conservatively; calibrate light scale against geometry and materials, including moving pieces and interior walls.
  - Accept: Light reveals shape and depth without washing away texture. Shadows do not swim, detach, flicker or pass through exposed geometry on approved trajectories.
  - Evidence: Light-isolation captures, shadow diagnostics and final lighting rationale per scene.

- [ ] **V013 — Assign every optical effect a controlled purpose**
  - Do: Tune bloom threshold/radius, corona, fog, flare and optional local distortion independently. Retain heat distortion only if it improves the fictional art direction and remains localized; do not label vacuum shimmer as measured atmospheric physics. Omit grain, chromatic aberration and custom cursor effects unless an A/B review justifies them.
  - Accept: Turning secondary optics off still leaves convincing geometry and materials. Effects do not create glowing mesh edges, blur text, hide the fault wall or reproduce the cheap filtering the user rejected.
  - Evidence: Effect-by-effect A/B gallery, performance costs and final enable/disable decisions.

- [ ] **V014 — Define authored camera and motion conventions**
  - Do: Establish camera ownership, damped pointer parallax, scroll progression, easing, look-at targets, field-of-view changes and motion priorities for all three independent experiences. Define bounded inspection envelopes and scene-specific mobile framing; make reduced-motion rules explicit.
  - Accept: One controller owns the camera at a time. No public route permits arbitrary free orbit, pan or zoom that exposes unfinished construction; reading or completing a form does not fight camera input.
  - Evidence: Camera-state specification, per-scene path diagrams and input-priority matrix.

## Syzygy — complete the signature rupture before proceeding to the next hero

- [ ] **V015 — Freeze the Syzygy composition and shot requirements**
  - Do: Author an establishing joined view, charging view, first failure, reference-like open view and bounded canyon inspection. Calibrate body extent, left solar rim, right violet crust, fracture width, debris density and typography placement against the supplied hero reference. Freeze the short capture sequence separately from the full interactive experience.
  - Accept: The joined state is recognizably one planet; the sustained-open state retains the reference's proportions and negative space. Camera values are justified by framing, not an arbitrary permanent focal length.
  - Evidence: Approved storyboard, camera keyframes, aspect-ratio variants and annotated split-state overlay.

- [ ] **V016 — Design a fracture partition that supports real missing pieces**
  - Do: Define asymmetric primary masses plus medium perimeter slabs within a shared watertight partition. Match the jagged central fault and reference silhouette while varying slab thickness, shelf direction and break depth; assign stable IDs and parent attachment transforms.
  - Accept: Each detached slab occupies an actual region of the assembled body. The primary geometry contains the matching socket after detachment; duplicated shells or pasted-on debris do not impersonate missing crust.
  - Evidence: Exploded partition view, per-piece IDs, socket correspondence visualization and assembled wireframe.

- [ ] **V017 — Build and validate primary body geometry**
  - Do: Produce closed exterior and fracture interior geometry for both primary masses with consistent winding, shared boundary positions, UVs and normals. Preserve the approved outer spherical silhouette while preventing mirror-identical cut profiles.
  - Accept: Joined seams coincide within a documented tolerance; no holes, inverted triangles, zero-area faces or non-finite vertices exist. Volume/depth remains convincing across every approved camera point.
  - Evidence: Geometry validation receipt, joined seam measurements and solid/wireframe inspection captures.

- [ ] **V018 — Build detachable slabs and their interior faces**
  - Do: Create several visually important slabs with unique broad planes, broken corners and layered interiors, sized by the shot rather than an arbitrary count. Include socket wall detail and material continuity so a piece reads as belonging to its origin before it leaves.
  - Accept: Slow-motion separation reveals matching opposing faces and vacated gaps; no overlapping duplicate rock, hollow parent edge or slab popping from nowhere is visible.
  - Evidence: Slab-by-slab origin/release/clearance captures and attachment-transform checks.

- [ ] **V019 — Preserve detail and shading across fracture transforms**
  - Do: Transform surface normals, tangents, relief sampling and local light directions consistently for every moving mass and slab. Share boundary displacement rules between exterior, interior walls and shadow/depth passes; handle discontinuities at legitimate sharp breaks.
  - Accept: Highlights and shadows rotate with rock rather than sticking to the pre-fracture sphere. Joined surface detail aligns across the fault and interior shadow/depth silhouettes match colour rendering.
  - Evidence: Moving directional-light test, boundary close-ups and depth/normal debug captures.

- [ ] **V020 — Give primary masses independent motion**
  - Do: Assign asymmetric pivots, staged translation, independent pitch/yaw/roll and carefully damped angular motion. Use a normalized authored mechanical model with explicit parameters; tune the primary separation to show depth and mass without excessive opening.
  - Accept: The motion avoids shared-door hinges, mirrored rotations and rubber deformation. Both bodies separate along coherent three-dimensional trajectories while retaining the approved split composition.
  - Evidence: Top/side/front motion trails, parameter record and an uninterrupted moving comparison against the old two-shell motion.

- [ ] **V021 — Implement the explicit rupture state machine**
  - Do: Model JOINED, CHARGING, RUPTURE, SUSTAINED_OPEN and REJOINING as explicit states with transition guards. Release before commitment returns through elastic recovery; release after commitment does not close the body. Track charge, fracture progression and camera progress separately.
  - Accept: Each valid input produces one defined transition; a committed rupture reaches latched open exactly once. Rapid repeat input cannot duplicate a burst, skip cleanup, trigger navigation or strand the interface.
  - Evidence: State-transition tests, readable event trace and normal/early-release/repeated-input recordings.

- [ ] **V022 — Make the hold gesture robust across input methods**
  - Do: Support pointer capture, touch hold and focused keyboard activation; suppress unwanted page scrolling only while a valid scene gesture owns input. Clear pre-commit holds on pointer cancel, lost capture, route changes, window blur and visibility loss. Keep form fields and native buttons exempt from global shortcuts.
  - Accept: No stuck charging after interruptions, no touch double-trigger and no spacebar interference with forms. Users can achieve the same state through keyboard and touch; hold guidance and focus states remain readable.
  - Evidence: Input matrix covering mouse, touch emulation, keyboard, cancellation and focus/visibility interruptions.

- [ ] **V023 — Direct anticipation and elastic recovery**
  - Do: Choreograph restrained surface strain, localized crack activation, narrow FOV/dolly changes, low-amplitude camera tension and rising audio. Bind cues to actual state progress; early release unwinds them coherently without a fracture sound or debris burst.
  - Accept: The planet feels under load before failure without inflating, wobbling or shaking text. Early release visibly communicates recovery and returns to a clean joined state.
  - Evidence: Half-charge/release and near-threshold/release captures with synchronized state and audio traces.

- [ ] **V024 — Stage propagation of the first fault**
  - Do: Establish a spatial release sequence along the fault, activating local seams, slab attachment failures and emission at their locations. Use consistent failure thresholds and brief pauses only where they communicate material resistance.
  - Accept: Failure begins locally and propagates; all pieces do not explode at once from the origin. No cut opens before its interior exists, and no emission leaks from unbroken crust.
  - Evidence: Slow-motion fault progression with active-edge markers and normal-speed capture.

- [ ] **V025 — Transfer local motion into released slabs and chips**
  - Do: At release, derive each body's initial world pose and velocity from its parent motion, including angular contribution omega cross radius, plus a bounded authored fracture impulse. Scale angular speed and response by piece size or a documented mass proxy; avoid claiming a calibrated planetary solver.
  - Accept: Detachment is position/velocity continuous and fragments travel away from their actual local origin. Large slabs feel heavier than chips, and tuning does not generate impossible instantaneous reversals.
  - Evidence: Release-pose continuity checks, velocity arrows and comparison of large/medium/small fragment motion.

- [ ] **V026 — Build a one-event instanced chip system**
  - Do: Render varied small chips using instancing or equivalent batched geometry, with seeded shape variation, staggered release times and per-piece life state. Emit each eligible chip once per rupture; make resource counts independent of repeated user attempts.
  - Accept: Chips do not respawn in the same opening, loop through their origins or grow the draw-call count each cycle. Size, distribution and silhouette support the reference rather than resembling uniform confetti.
  - Evidence: Long-held-open recording, release counters, resource counts across repeated cycles and seeded reproducibility checks.

- [ ] **V027 — Add collision clearance and bounded debris behavior**
  - Do: Validate medium slabs against primary bodies and camera corridor with collision proxies or conservative clearance constraints. Handle the few perceptually important contacts using damped response; avoid expensive full-scene rigid-body claims when authored trajectories suffice.
  - Accept: No major rock visibly passes through another mass, the camera or typography-critical foreground. Debris remains bounded over prolonged inspection and does not produce unstable numerical explosions.
  - Evidence: Swept-path clearance review, prolonged-state capture and overlap diagnostics.

- [ ] **V028 — Shape dust and fine ejecta without a smoke filter**
  - Do: Emit layered, depth-aware fines from local failure shelves with a short burst, slow settling/drift appropriate to the fictional environment and seeded motion. Keep particle overdraw bounded; mask and soften sprite edges where used for fine dust without substituting billboards for hero rocks.
  - Accept: Fine material adds scale without hiding the interior or becoming a uniform purple fog. Particles respect depth and disappear through a coherent lifecycle rather than popping.
  - Evidence: Dust on/off comparison, overdraw view and foreground/background occlusion capture.

- [ ] **V029 — Finish left solar rock, right obsidian and fresh interiors**
  - Do: Art-direct contrasting hemispheres using crater structure, mineral variation, roughness and local illumination. Give fresh fractured interiors distinct layered rock, cavities and narrow heated edges; preserve naturally irregular vein branching and believable dark regions.
  - Accept: The warm half is not uniformly painted brown or blown white; the cold half is not purple plastic. The exposed canyon contains physical depth and intermediate values rather than a black cutout or luminous flat plane.
  - Evidence: Exposure-locked close-ups of each material, bloom-disabled views and reference comparison.

- [ ] **V030 — Calibrate corona, flare and local crack emission**
  - Do: Tie solar corona position to the actual body/rim, keep dominant flare direction coherent with the light source, and drive violet fracture response from local state. Keep shader modulation bounded and modest; optional audio reactivity must use normalized envelope data.
  - Accept: Bright edges move with their geometry, emission has spatial structure and no lens effect reads as a full-screen rainbow filter. Silent mode retains an equally intentional visual rhythm.
  - Evidence: Joined/open camera sweep, emission-only and combined views, audio-on/off comparison.

- [ ] **V031 — Resolve giant typography and lighting depth order**
  - Do: Preserve TWO REALMS / ONE AXIS and the reference's scale hierarchy. Plan text placement, physical moon occlusion and the bright rim's interaction with letters using a clean layer/depth strategy; choreograph the post-hold text reveal without splitting readability into arbitrary fragments.
  - Accept: Typography is legible at landing and reduced-motion states, the planet retains visual priority and no halo appears accidentally clipped by DOM layers. Brand and commission copy appears in its intended route with ENTER remaining independent.
  - Evidence: Desktop/phone screenshots, overlay boundary inspection and the complete text/rupture sequence.

- [ ] **V032 — Author the sustained-open cinematic corridor**
  - Do: Provide a clamped camera path with coherent look-at targets through approved fault-edge, interior and suspended-slab views. Combine modest pointer parallax with scroll or an explicit inspection control; use damping and progress ownership to prevent wheel momentum from overshooting.
  - Accept: The open body remains latched while visitors inspect. Every reachable view has complete geometry, sensible clipping and good lighting; arbitrary orbit/pan/zoom is unavailable in the public experience.
  - Evidence: Entire corridor capture in both directions, path bounds and reachable-state screenshots.

- [ ] **V033 — Define interruption and route behavior for the latched state**
  - Do: Specify what happens when ENTER, company navigation, back/forward, pause, capture or a modal is used during each rupture state. Preserve a coherent visual state and restore relevant progress deliberately; camera controllers and route transitions must not compete.
  - Accept: ENTER never starts charging or requires holding. Navigation during charging cancels safely; navigation after commitment neither duplicates fracture nor silently resets state contrary to the declared route policy.
  - Evidence: Transition matrix and route/input regression recordings at every state boundary.

- [ ] **V034 — Implement deterministic explicit rejoin**
  - Do: Add a visible accessible REJOIN control in the open state. Capture or reconstruct authoritative home transforms and use controlled reverse paths for major slabs, primary bodies and chips; clear all release flags and motion history only after closure completes. Treat rejoin as a deliberate fictional reset.
  - Accept: Rejoin has no teleporting slab, inward clipping, lingering debris or crack seam. Ten consecutive open/rejoin cycles reproduce the same joined geometry and resource counts; REJOIN does not submit or navigate a form.
  - Evidence: Multi-cycle recording, transform/state reset checks and close-up joined seam comparison.

- [ ] **V035 — Provide a complete reduced-motion Syzygy treatment**
  - Do: Replace shake, rapid camera travel and fine particle motion with a direct, legible state change or short restrained transition; provide a simple activate/rejoin action without requiring prolonged hold. Preserve the distinct joined/open art direction and business access.
  - Accept: The user can understand and operate the experience with motion reduction enabled at startup or changed during a session. No full cinematic path or audio autoplay is forced by activation.
  - Evidence: Reduced-motion interaction recording, preference-change test and keyboard walkthrough.

- [ ] **V036 — Recompose Syzygy for touch and narrow screens**
  - Do: Author a portrait composition with deliberate planet crop, text breaks, hold/rejoin placement and safe-area spacing. Scale details by projected size; reserve vertical scrolling for content outside the active scene gesture and provide a useful alternative to hover inspection.
  - Accept: All primary actions fit without overlap, the split remains comprehensible and the fracture corridor avoids camera clipping at narrow aspect ratios. No desktop micro-HUD becomes an illegible wall of text.
  - Evidence: Portrait/landscape phone captures on named hardware plus resize/orientation transitions.

- [ ] **V037 — Verify Syzygy first-use and long-session behavior**
  - Do: Warm representative joined, first-failure, slab, dust, interior and postprocessing variants through the actual renderer; measure startup, first rupture and repeat rupture separately. Exercise pause, tab backgrounding and graphics recovery while holding and while latched.
  - Accept: The first activation contains no unexplained material pop or missing asset. Long sessions avoid accumulating events, meshes or audio voices; resumed time does not leap forward into an invalid scene.
  - Evidence: Cold/warm timing receipts, representative performance trace, interruption capture and resource trend log.

- [ ] **V038 — Accept the complete Syzygy signature before widening scope**
  - Do: Review the full normal-speed journey, not only stills, against material depth, fracture silhouette, integrity, pacing, sustained attention and truthful claims. Separate a deterministic showreel render from the tested interactive build; fix failed criteria and rerun the affected capture.
  - Accept: The user-approved moving sequence no longer reads as a rigid cookie/clamshell split. The hero and all reachable inspection states pass the selected device and interaction gates; any remaining limitation is recorded rather than silently declared final.
  - Evidence: Final Syzygy acceptance sheet, unedited live run, showreel candidate and revision-linked defect closure list.

## Gravity — geological scale, liquid ceiling and purposeful Labs inspection

- [ ] **V039 — Freeze Gravity framing and spatial scale**
  - Do: Map the reference's dominant foreground monoliths, distant ranks, mercury ceiling, low crater horizon, tilted orbital ellipse and slim right HUD. Author establishing, ceiling, rock-face, liquid-column and crater views within a bounded camera envelope.
  - Accept: The composition feels like an immense suspended environment with a readable foreground/middle/background hierarchy. The camera does not expose the edge of a small ceiling plane or a flat terrain patch.
  - Evidence: Annotated framing sheet, plan/side layout and storyboard comparison.

- [ ] **V040 — Replace repetitive monolith silhouettes with authored geology**
  - Do: Sculpt or generate distinct large masses with erosion, layered breaks, blunt and sharp shelves, asymmetrical cross-sections and varied attachment widths. Match the reference's hanging geological slabs rather than turning every object into a cone or repeating one rectangular prism.
  - Accept: Foreground masses remain distinguishable by silhouette without textures; visible repetition and uniform blade profiles are absent from accepted views.
  - Evidence: Unlit silhouette contact sheet, individual mesh views and before/after scene comparison.

- [ ] **V041 — Resolve rock attachment and depth construction**
  - Do: Model credible ceiling intersections, overhangs, rear faces, exposed interior strata and intermediate depth ranks. Keep important silhouettes complete within all permitted inspection angles and vary large-to-small scale relationships deliberately.
  - Accept: Rocks appear embedded in or emerging from the suspended field, not placed against a backdrop. No hollow cap, backface hole, floating seam or repeated depth spacing breaks the illusion.
  - Evidence: Attachment close-ups, camera corridor sweep and solid/depth render comparisons.

- [ ] **V042 — Finish monolith mineral materials**
  - Do: Refine existing basalt source maps and UV/triplanar projection for scale, orientation and variation; vary cavity, edge wear, moisture/specular response and fracture interior without painting every edge white. Recompute normals and depth-pass displacement coherently.
  - Accept: Rock remains dark and heavy while grazing light reveals geological structure. Materials do not look metallic, stretched, uniformly chipped or independently scaled on neighboring faces.
  - Evidence: Material/light contact sheet and close-ups of multiple distinct monoliths.

- [ ] **V043 — Sculpt the crater floor at several scales**
  - Do: Author the main basin, raised irregular rim, wall terraces, radial ejecta and surrounding smaller impacts as coherent geology. Allocate geometry to visible relief, avoid evenly distributed noise and correct texture-to-geometric crater conflicts.
  - Accept: The main crater reads immediately in the establishing view and retains depth during descent. Surrounding terrain supports scale rather than appearing as a carpet of bumps.
  - Evidence: Height/slope visualization, grazing-light views and camera descent recording.

- [ ] **V044 — Integrate ground stones and the survey-grid skirt**
  - Do: Place instanced fragments using terrain height, slope and geological clustering; vary orientation and material consistently. Blend the terrain edge into the wire survey skirt through a coherent boundary and perspective, retaining the reference's deliberate geographic treatment.
  - Accept: Stones sit on the terrain without hovering or uniform random distribution. The grid does not Z-fight, cut through visible rocks or reveal a scalloped paper-thin floor edge.
  - Evidence: Contact-shadow close-ups, skirt boundary views and geometry/depth debug frames.

- [ ] **V045 — Conceal the constructed ceiling horizon**
  - Do: Extend or reshape the ceiling and distant environment as required by the approved frustum, then integrate depth fog and far-field lighting. Test every bounded view for visible straight edges, hard corners, backfaces or disconnected fog cards.
  - Accept: The ceiling reads as an extensive suspended ocean; its construction boundary is not visible at establishing, inspection or narrow-screen camera extremes.
  - Evidence: Frustum/horizon coverage map and full-range camera captures.

- [ ] **V046 — Refine mercury geometry and surface normals together**
  - Do: Coordinate large crossing surface waves, intermediate ripples and fine capillary normals in shared world coordinates. Maintain normals consistent with macro-displacement, choose amplitudes and speeds for the scene scale and budget the normal-field update independently.
  - Accept: The ceiling has layered liquid motion without boiling noise, visible tiling, geometry/normal disagreement or identical sine bands. Pausing freezes all related wave fields coherently.
  - Evidence: Wave-only diagnostic views and normal/paused/restarted motion recording.

- [ ] **V047 — Correct and validate the planar reflection camera**
  - Do: Derive the reflected camera position, full viewing target/up direction and clipping plane from the actual active camera pose. Inspect the current mixed use of camera-forward and global lookAt coordinates; make pose calculation internally consistent and preserve renderer state around the extra pass.
  - Accept: Reflections match nearby monoliths and moving particles across camera roll, ceiling inspection and resize. No stale target drift, recursive ocean reflection, clipped foreground geometry or corrupted render state remains.
  - Evidence: Reflection-camera diagnostic overlay, multi-pose comparison and pass-state regression test.

- [ ] **V048 — Art-direct conductor response and reflection quality**
  - Do: Tune mercury roughness, environment contribution, planar coverage, ripple distortion and exposure using the production material pipeline. Scale reflection resolution/update frequency by measured quality tiers; do not substitute an arbitrary Fresnel constant for a claim of exact mercury optics.
  - Accept: The ceiling resembles reflective liquid with distinct deformed highlights, not chrome foil or a flat painted texture. Lower tiers preserve the composition and avoid obvious reflection stepping.
  - Evidence: Reflection-resolution comparison, moving-highlight crops and per-tier pass timings.

- [ ] **V049 — Rebuild the rising liquid column for depth and coherence**
  - Do: Preserve instanced rendering for droplets, with varied radius, depth, speed and phase tied to the defined inverted field. Use volume-consistent shape variation, local surface highlights and a distribution that rises through the approved central channel without uniform particle-sheet appearance.
  - Accept: Droplets read as liquid bodies across foreground and background, accelerate coherently and do not appear to spawn at the camera. Instance count and render submissions remain bounded.
  - Evidence: Side/front trajectory views, particle-size histogram, normal-speed capture and draw-call receipt.

- [ ] **V050 — Tie impacts and optional cursor response to real locations**
  - Do: Generate surface ripples from actual droplet ceiling intersections; cap and recycle wave events. Where cursor interaction is retained, raycast the ceiling or a deliberate interaction plane and apply a bounded local ripple/deflection field with touch alternatives.
  - Accept: Ripples originate where droplets meet the ceiling, without global flashes or continually growing buffers. Pointer feedback is discoverable, optional and inactive when controls or reading content own input.
  - Evidence: Impact-coordinate overlay, repeated-event memory check and pointer/touch response capture.

- [ ] **V051 — Build atmosphere from depth rather than broad overlay**
  - Do: Refine distance extinction, localized light shafts and sparse suspended fine particles; place fog regions to support monolith depth while protecting the darkest foreground shapes and silver crater detail. Check fog contribution in mirrored passes.
  - Accept: Foreground, middle and distance separate convincingly without covering the scene in uniform grey. Fog does not reveal card boundaries, erase geology or make reflections appear from a different environment.
  - Evidence: Fog-isolation views, depth-layer comparison and motion capture through approved viewpoints.

- [ ] **V052 — Make orbital paths and callouts physically anchored**
  - Do: Construct the tilted ellipse in real 3D with consistent near/far occlusion and restrained glow. Project genuine feature positions to accessible label controls; hide or fade occluded/offscreen nodes and route leader lines to avoid collisions with HUD and company navigation.
  - Accept: Orbit lines wrap convincingly around the environment. Labels follow actual features, remain readable, and do not claim fabricated scientific units or turn every monolith into an invented experiment.
  - Evidence: Occlusion/leader-line captures and keyboard activation of each supported feature node.

- [ ] **V053 — Author the Gravity inspection sequence**
  - Do: Build constrained transitions from the establishing composition to ceiling, monolith and crater focus using position and look-at paths with deliberate pace. Decide whether the existing inverted ocean roll contributes enough to retain; if retained, keep it bounded, reversible and suppressed for reduced motion.
  - Accept: Scroll and focus input produce purposeful spatial reveals, not tiny perpetual bobbing or arbitrary orbit. Returning from any focus restores a coherent establishing state without a snap.
  - Evidence: Full focus/return sequence, camera curves and reduced-motion comparison.

- [ ] **V054 — Recompose Gravity for Labs content and mobile**
  - Do: Reserve scene-space for the Labs index/detail presentation while letting meaningful content scrolling own the page. Collapse secondary HUD elements on narrow screens, keep feature inspection accessible and show real collection data only when published.
  - Accept: Laboratories remain the commercial role of Gravity; visual inspection does not imply every rock is an experiment. Phone views preserve liquid, rock and crater hierarchy while content and controls remain usable.
  - Evidence: Labs empty/published-state compositions, phone portrait/landscape captures and focus-order walkthrough.

- [ ] **V055 — Accept Gravity geology, reflection and motion together**
  - Do: Review the complete landing/inspection/content journey against the reference and test reflection, droplets, fog and terrain during pause, resize and prolonged use. Separate subjective art approval from device-specific performance measurements.
  - Accept: Visible slab repetition, ceiling edges, flat terrain impressions and mismatched reflections are resolved in all public camera states. No performance or realism claim exceeds recorded results.
  - Evidence: Gravity acceptance sheet, unedited reference-device run, comparison contact sheet and closed-defect record.

## Astrolabe — crafted geometry, coherent alignment and Products presentation

- [ ] **V056 — Freeze the astrolabe hierarchy and silhouettes**
  - Do: Map crescent outer and inner contour, sharp horn locations, eclipse diameter/offset, ring ellipses, wire transition and surrounding negative space. Author establishing, stone-relief, instrument-detail and eclipse-alignment views without centering every object into a generic symmetrical badge.
  - Accept: The crescent cradles the eclipse and the ring assembly supports the reference composition. At each approved aspect ratio the central object retains an unmistakable hierarchy.
  - Evidence: Annotated reference overlays and four-view storyboard.

- [ ] **V057 — Refine the closed crescent volume**
  - Do: Improve thickness variation, horn taper, cross-section asymmetry and inner-wall relief of the custom geometry. Preserve closed topology, robust tips and complete rear surfaces visible through the bounded camera corridor.
  - Accept: The crescent reads as sculpted lunar mass rather than a bent tube or cropped photograph. Horns remain sharp without degenerate faces, pinched shading or screen-space spikes.
  - Evidence: Solid untextured rotation within approved bounds, topology checks and horn close-ups.

- [ ] **V058 — Sculpt lunar geology specifically for the crescent**
  - Do: Place varied impact basins, overlapping rims, fractured shelves and mineral relief according to the crescent's surface and lighting. Correct stretched texture coordinates along the swept geometry; bake repeatable fine detail from traceable sources where appropriate.
  - Accept: Craters retain plausible shapes and scale on both the outer body and concave interior. Surface detail does not follow obvious longitudinal bands or repeat identical dents.
  - Evidence: UV/distortion view, grazing-light close-ups and three-distance geology comparison.

- [ ] **V059 — Author intentional wire structure**
  - Do: Replace mechanically repetitive wire tessellation where necessary with an authored triangulation hierarchy that respects the crescent volume, horn taper and transition density. Preserve actual three-dimensional geometry and stable anti-aliased line rendering.
  - Accept: Wire density varies deliberately like the reference, retains depth during parallax and avoids uniform triangular wallpaper, moire or shimmering line noise.
  - Evidence: Wire-only perspective views, close/far screen captures and a slow camera reveal.

- [ ] **V060 — Synchronize the solid-to-wire dissolution boundary**
  - Do: Use shared boundary coordinates and state across colour, depth, shadow and wire passes. Layer controlled overlap, edge fragments and violet/gold filament response; ensure the boundary moves with the same geometry and does not reveal an empty gap.
  - Accept: Solid rock transitions organically into wire with consistent occlusion and no abrupt half-plane cut, Z-fighting, ghost shadow or luminous outline unrelated to the surface.
  - Evidence: Boundary sweep capture, depth/shadow comparisons and paused intermediate-state close-ups.

- [ ] **V061 — Construct instrument bands as crafted assemblies**
  - Do: Give principal brass/stone rings designed cross-sections, joints, layered rails, mounting pieces, engraved scales and occasional distinct emblems. Detail should follow plausible assembly logic rather than adding identical torus bands until the image looks busy.
  - Accept: Close inspection reveals construction and purposeful variation. Thin distant ornament remains restrained; no unsupported historical or scientific significance is implied by decorative markings.
  - Evidence: Component breakdown, instrument-detail macro views and geometry/material attribution record.

- [ ] **V062 — Finish brass, stone and filament material response**
  - Do: Calibrate metal roughness, subtle wear, local inclusions, cavity shading and line colour under the eclipse and environment lights. Keep geometric engravings visible through grazing reflections and reserve warm gold for the intended focal edges.
  - Accept: Rings feel like crafted material instead of flat grey tubes, yellow paint or glossy plastic. The rock/wire/brass material hierarchy remains clear with bloom disabled.
  - Evidence: Material-isolation frames and moving-light detail comparison.

- [ ] **V063 — Build a spatially consistent eclipse and corona**
  - Do: Preserve the physical occluder, finite corona representation and inner bright limb; tune angular colour, asymmetry, core darkness and light spill to match the reference. Evaluate shadow and occultation against moving rings and the crescent without claiming full stellar light transport.
  - Accept: The eclipse reads as a black volume surrounded by structured light, not a bright sticker or flat glowing doughnut. Foreground objects occlude correctly and halos do not expose plane edges.
  - Evidence: Occlusion sweep, emission-only frame, three-quarter eclipse view and exposure-locked reference crop.

- [ ] **V064 — Separate continuous motion from display timeline wrapping**
  - Do: Replace direct dependence of ring quaternions on the current modulo-600 display clock with a continuous motion clock or mathematically continuous phase representation. Define how timeline scrubbing, reset, saved state and chapter changes intentionally select pose.
  - Accept: No ring or camera jumps at the ten-minute display wrap. Identical scrub positions reconstruct the specified pose; playback resumes smoothly from the user's selection without accumulating precision drift.
  - Evidence: Automated wrap-boundary pose comparison, actual crossing capture and deterministic seek tests.

- [ ] **V065 — Choreograph ring rotation with focal hierarchy**
  - Do: Direct independent spin, precession and brief settling behavior around the eclipse; preserve mechanical clearances and intended interpenetration only where the design explicitly calls for impossible geometry. Vary pace by interaction state rather than running all rings at permanent equal prominence.
  - Accept: Motion reveals construction and guides attention toward alignment. Rings do not move like synchronized screensavers or produce chaotic tangles in the approved framing.
  - Evidence: Ring-axis diagram, motion curves and complete idle-to-alignment-to-idle capture.

- [ ] **V066 — Make the waveform scrubber a meaningful control**
  - Do: Bind timeline position to explicit ring/phase/dissolution state using one documented mapping. Implement pointer and keyboard seeking, dragging feedback, paused scrubbing, playback resumption and safe value clamping; display actual progress rather than unrelated decorative time.
  - Accept: Every supported seek updates the visible assembly predictably and does not fight the autoplay controller. The waveform is either related to actual audio or clearly an interaction/progress graphic without false measurement claims.
  - Evidence: Seek-state table and keyboard/touch/mouse scrub recordings.

- [ ] **V067 — Implement bounded direct ring manipulation where it earns its place**
  - Do: Provide raycast selection and constrained angular drag for designated interactive rings, with a visible affordance and equivalent slider/buttons. Suspend automatic rotation only for the manipulated component and resume through a smooth handoff; keep whole-camera free orbit disabled.
  - Accept: The user can distinguish ring manipulation from camera inspection and page scrolling. Dragging never selects hidden backfaces unexpectedly or causes a ring to jump at angular wrap.
  - Evidence: Raycast diagnostics, accessibility-equivalent operation and edge-case drag captures.

- [ ] **V068 — Define alignment success, feedback and reset**
  - Do: Specify a bounded alignment target using geometric/angular tolerances, hysteresis and a brief dwell to reject accidental threshold flicker. Choreograph a restrained lock, eclipse response and meaningful completion state; connect Products navigation independently from decorative victory effects.
  - Accept: Alignment has a discoverable purpose, a reproducible success condition and a clear reset/continue action. No fabricated product achievement, arbitrary pressure value or compulsory game blocks access to the company catalogue.
  - Evidence: Success/failure boundary tests and full alignment/reset interaction recording.

- [ ] **V069 — Author astrolabe camera inspection and node callouts**
  - Do: Move through the establishing composition, lunar relief, wire boundary and instrument views using a bounded spline with coherent targets. Anchor projected nodes to real features, manage occlusion and avoid leader-line collisions with the chapter spine and product interface.
  - Accept: Inspection reveals three-dimensional craftsmanship; camera and ring drag controllers do not compete. Every node is reachable by keyboard/touch and returns to a composed overview.
  - Evidence: Camera-path recording, node visibility matrix and focus/return walkthrough.

- [ ] **V070 — Integrate the Products role without invented inventory**
  - Do: Reserve scene space for a clear Products identity and truthful published entries supplied by the content system. Place any real product overview or detail transition within the existing visual language; use ordinary links for cross-platform navigation and keep technical controls secondary.
  - Accept: A visitor can understand where products will live and access real published information without a fake catalogue, placeholder roadmap, fabricated launch status or ring-to-product mapping.
  - Evidence: Empty/published product state mock-data tests clearly labelled as fixtures, route compositions and navigation review.

- [ ] **V071 — Recompose astrolabe controls for mobile and reduced motion**
  - Do: Scale or selectively simplify fine instrument detail and HUD density for portrait displays. Provide large scrubber controls, a non-drag alignment alternative and a reduced-motion pose progression; keep ring/scene controls clear of browser gestures and safe areas.
  - Accept: The crescent and eclipse remain recognizable, primary controls are reachable and small-screen wirework remains stable. Reduced-motion users can inspect and complete the interaction without continuous spinning or camera travel.
  - Evidence: Named-phone captures, reduced-motion walkthrough and orientation/focus regression results.

- [ ] **V072 — Accept astrolabe craftsmanship and long-running motion**
  - Do: Review the entire Products/inspection/alignment journey against the reference, including clock-wrap boundaries and repeated seek/reset cycles. Assess solid relief, wire density, ring assembly, eclipse light, legibility and performance together.
  - Accept: The scene consistently reads as live three-dimensional craft; repetitive wire/torus construction, time-wrap jumps and static-photo impressions are resolved. Remaining device limits are explicit.
  - Evidence: Astrolabe acceptance sheet, unedited long-state run, comparison contact sheet and defect closure record.

## Shared audio, lifecycle and final moving-image acceptance

- [ ] **V073 — Define a distinct sonic identity for each experience**
  - Do: Author a sonic palette for Syzygy strain/release, Gravity liquid/space and Astrolabe mechanical alignment. Decide foreground event, environmental bed and interface cue roles; document sound provenance and explain internal intent without claiming silent references contain original audio.
  - Accept: Each scene has a recognizable restrained identity and an intentional silent experience. Continuous drones do not mask speech, interface meaning or the principal material events.
  - Evidence: Sound cue sheet, licensed/source asset manifest and separate stem previews.

- [ ] **V074 — Implement user-controlled audio lifecycle**
  - Do: Start or resume audio only after an eligible user gesture, provide visible mute/volume controls, persist preferences appropriately and handle autoplay denial, interrupted audio contexts and tab backgrounding. Decide whether route changes fade or stop audio and enforce that policy consistently.
  - Accept: No surprise playback, duplicate audio contexts, stuck tones or abrupt loud resumes. Muting silences every event and bed; browser permission failure leaves all visual interactions usable.
  - Evidence: Audio lifecycle tests and muted/foreground/background/route-change recordings.

- [ ] **V075 — Mix material tension and impact for real playback systems**
  - Do: Layer low-frequency weight with controlled mid-bass harmonics, textured strain, crack transients and decay tails. Tune on headphones, laptop speakers and an actual phone; keep frequencies and envelopes adjustable rather than prescribing a single 32 Hz fundamental everywhere.
  - Accept: Failure has weight on small speakers without buzzing or clipping; tension grows before release and silence has room afterward. Reset feedback remains deliberate and never becomes a punitive or moralizing message.
  - Evidence: Listening checklist for named playback devices, peak/loudness measurements and accepted mix exports.

- [ ] **V076 — Budget spatial voices and connect them to events**
  - Do: Pool a small bounded set of spatial voices, initially capped at six unless profiling justifies another limit. Prioritize nearby or high-mass events, update listener transforms from the active camera, fade stolen voices and disconnect completed nodes; use a master gain/dynamics stage tuned against peaks.
  - Accept: No voice per decorative particle, no crackling under repeated rupture and no accumulating connected nodes. Spatial direction tracks the visible event and concurrency remains at the declared cap.
  - Evidence: Active-voice trace, audio resource trend and worst-case repeated-event recording.

- [ ] **V077 — Synchronize audio, light and motion to one event timeline**
  - Do: Drive significant fracture, impact, lock and rejoin cues from authoritative scene events with timestamps; schedule audio with its own clock and compensate predictable latency where possible. Bound analyser-derived modulation so sound changes accents without destabilizing camera or material state.
  - Accept: Audible events align perceptually with visible cause, pause/rejoin does not replay stale cues and silent mode follows the same intended motion narrative.
  - Evidence: Combined waveform/frame event timeline and normal/pause/resume/reseek captures.

- [ ] **V078 — Verify render resource and context lifecycle**
  - Do: Dispose superseded geometries, materials, textures, render targets, event listeners and audio nodes on scene rebuilds or teardown. Handle resize and device-pixel-ratio changes without retaining obsolete buffers; define recoverable WebGL context-loss behavior and preserve user progress where safe.
  - Accept: Repeated transitions and resizing settle at a stable resource baseline. Context loss gives a usable recovery path, with no black permanent canvas or apparently functional controls commanding a dead renderer.
  - Evidence: Resource-count trend, resize stress receipt and context-loss/recovery walkthrough.

- [ ] **V079 — Measure first-use readiness and adaptive rendering**
  - Do: Instrument asset transfer, decode, first render, material warm-up and first useful interaction separately; warm actual representative passes rather than assuming three frames suffice. Set quality from measured capabilities and sustained frame behavior with hysteresis; preserve core geometry and timing when reducing secondary costs.
  - Accept: The experience becomes useful promptly on the defined test conditions, quality changes do not oscillate or cause stalls, and optional effects cannot delay basic navigation or business access indefinitely.
  - Evidence: Cold/warm startup waterfall, tier transitions, CPU/GPU distinction and before/after transfer records.

- [ ] **V080 — Validate frame pacing through representative action states**
  - Do: Run named-device/browser sequences covering idle, first interaction, full rupture, reflections, ring alignment, reading views and prolonged operation. Record resolution, DPR, quality, display refresh, capture overhead, P50/P95/P99 and long-frame counts; use GPU timers where available and label unavailable measurements.
  - Accept: Approved tiers meet their stated measured targets without hidden slow phases or thermal-duration claims based on short samples. Load, pause and background periods are excluded transparently rather than erasing unexplained stalls.
  - Evidence: Raw timing records, environment manifest and concise state-by-state performance report.

- [ ] **V081 — Review typography, HUD and scene layering as one composition**
  - Do: Check actual licensed font metrics, heading weights, tracking, microtype sizes, control contrast, overlay depth, leader lines and safe areas across all three completed scenes. Remove award filler marks, fake numerical precision and redundant public debug scaffolding; retain private diagnostics separately.
  - Accept: Main text and controls remain legible at all supported sizes and motion states. Each HUD supports its platform role while sharing the Lunar Paradox identity, and no decorative panel obscures the most important visual object.
  - Evidence: State/viewport contact sheet, font licence reference and final overlay inventory.

- [ ] **V082 — Produce a truthful capture package from the accepted build**
  - Do: Export the agreed short sequence with controlled frame pacing, colour and audio, and retain an unedited real-time take on named hardware. If deterministic frame rendering is used, label it distinctly; use the actual product states and geometry without compositing away unresolved defects.
  - Accept: The capture is visually intact and accompanying claims match demonstrated properties. A short showcase does not imply unsupported arbitrary viewpoints, physical solvers, device coverage or features still absent from the product.
  - Evidence: Master video, accessible playback copy, raw/live take, capture settings and claim-to-evidence sheet.

- [ ] **V083 — Run a cross-scene craft and consistency review**
  - Do: Compare the accepted scenes together for material scale, contrast, motion restraint, sound levels, camera comfort, control semantics and company-route transitions. Have independent reviewers perform both appreciation and practical tasks; record observations without inventing review scores or testimonials.
  - Accept: No scene feels like a lower-quality unrelated demo, and the commercial interfaces match the craft of the hero scenes. Weak recurring findings become specific fixes with affected captures rerun.
  - Evidence: Cross-scene review record, consented reviewer notes and resolved visual/interaction defects.

- [ ] **V084 — Freeze and hand off the accepted visual baseline**
  - Do: Archive the final source revision, build configuration, asset manifest, licensed credits, approved camera/light/material parameters, audio mix and acceptance evidence. Verify the delivered offline and production variants use that same baseline; document intentional differences such as asset loading strategy.
  - Accept: Another build reproduces the approved appearance and behavior without hidden local files. Completion is stated only for verified targets; unsupported devices, absent original recordings and real physical-simulation limits remain accurate in internal documentation.
  - Evidence: Revision-tagged acceptance package, source-to-delivery hash manifest and clean rebuild comparison.

## Product boundaries and ownership

- [ ] **P001 — Record the three platform responsibilities**
  - Do: Fix Syzygy as brand/home, Studio and commissions; Gravity as Labs; Astrolabe as Products. Record which app owns each route and the shared design/data contracts.
  - Accept: Each public destination has one owner; ordinary links connect independent pages; no camera journey or business object forces users through another scene.
  - Evidence: Versioned route/responsibility manifest reviewed against all primary navigation links.

- [ ] **P002 — Map every existing route to a final destination**
  - Do: Inventory `realms`, `home`, `studio`, `commission`, `estimate`, `applications`, `labs`, `products`, `manage`, all detail routes and older scene utility routes. Classify retain, redirect, private-only or retire, with explicit replacement behavior.
  - Accept: No bookmarked route becomes a silent blank panel, accidental public admin entry or loop; legacy routes resolve intentionally.
  - Evidence: Route matrix with test cases for direct entry, reload, back, forward and invalid identifiers.

- [ ] **P003 — Define online and offline capabilities explicitly**
  - Do: Publish an internal capability matrix for public HTTPS, authenticated admin, local HTTP launcher and standalone file export. Decide which local records are local-only and how an owner explicitly imports approved content.
  - Accept: A local application is never described as delivered to the remote company; disconnected mode cannot issue a live approval or authoritative new price.
  - Evidence: Capability matrix plus screenshots of online, disconnected and local-only submission states.

- [ ] **P004 — Maintain one editable source of company behavior**
  - Do: Locate canonical company JS/CSS, commissioning code, API code and content schemas; make build tooling copy/compile those into all three destinations. Document generated files.
  - Accept: One source edit produces matching company behavior in each app; fixes never depend on hand-editing a bundled export.
  - Evidence: Source-to-artifact manifest, clean build log and cross-app artifact hashes.

- [ ] **P005 — Establish the content truth register**
  - Do: For every public capability, metric, availability label, work example, research claim and product stage, record its owner, supporting evidence, publication permission and review status.
  - Accept: No fake clients, inventory, awards, users, case studies, restricted programmes or live status claims enter public content. `Private programme` is used only for a real programme.
  - Evidence: Content register covering the release copy and an audit of rendered text against approved entries.

- [ ] **P006 — Establish unresolved configuration decisions**
  - Do: List actual decisions needed for domains, hosting, database operation, authentication, email, public identity/contact, retention, service definitions and rates. Mark cost, dependency and decision owner without selecting paid providers by assumption.
  - Accept: Each unresolved choice blocks only its dependent task; no placeholder credentials, invented legal entity, fabricated address or assumed subscription ships.
  - Evidence: Decision register with approved values or explicit blocked status and affected task IDs.

- [ ] **P007 — Define commissioning semantics before styling**
  - Do: Preserve application → human review → accepted scope selection → server estimate → separate scope discussion. Define acceptance as eligibility to estimate, not a contract, guaranteed slot or payment request.
  - Accept: Every button label, status, receipt and API response follows those semantics; ENTER and HOLD remain unrelated to application approval.
  - Evidence: Journey specification and approved state copy, checked against API state transitions.

- [ ] **P008 — Freeze the final feature boundary**
  - Do: List required public journeys and owner operations; exclude speculative shops, subscriptions, accounts, teams, product dashboards and payments until real offerings need them. Define optional upload and analytics decisions separately.
  - Accept: The final release can explain every exposed feature by a current user task; technical readiness never masquerades as business inventory.
  - Evidence: Scope register linking each feature to an acceptance task and explicit out-of-scope entries.

## Public information architecture and interface journeys

- [ ] **P009 — Finalize company navigation and visual hierarchy**
  - Do: Keep recognizable Lunar Paradox identity with LABS, STUDIO and PRODUCTS, plus Syzygy's independent ENTER. Put scene utilities beneath a secondary control; add only real-purpose corporate links.
  - Accept: New visitors can distinguish business destinations from scene controls, identify the current app and find commissioning without interpreting fictional telemetry.
  - Evidence: Desktop/narrow viewport navigation captures and task-based navigation review.

- [ ] **P010 — Make cross-platform navigation robust**
  - Do: Centralize destination URL construction for public domains/paths, local launcher mounts and sibling offline folders. Avoid loading another complete renderer into the current page merely for navigation.
  - Accept: Links resolve correctly from each app and nested detail route; no stale port, absolute development path or missing sibling is silently ignored.
  - Evidence: Link-crawl results in hosted staging and complete offline distribution, with explicit handling of single-app exports.

- [ ] **P011 — Finish Syzygy's company introduction**
  - Do: Retain TWO REALMS / ONE AXIS in the visual entrance. Make ENTER reveal the approved company proposition and concise explanation of experimentation/application, followed by Explore the Lab and Work with Us.
  - Accept: Visitors can state what Lunar Paradox does and choose a next step; company copy remains readable without covering the important scene silhouette unnecessarily.
  - Evidence: Annotated typography/layout captures and an observed first-visit comprehension check.

- [ ] **P012 — Finish the Studio offer presentation**
  - Do: Present actual capabilities with outcomes, scope boundaries and a short application process; give Prototype and Performance Spike separate definitions if approved. Avoid invented prices, availability, testimonials or delivery promises.
  - Accept: A prospect understands what can be commissioned, what information to provide and what happens next; no capability opens a generic duplicate filler panel.
  - Evidence: Approved Studio copy, destination checks and user walkthrough of a relevant commission.

- [ ] **P013 — Design the application route as a complete composition**
  - Do: Design form width, spacing, hierarchy, progress, errors and confirmation using the shared visual language. Quiet background motion and protect text contrast while keeping a purposeful connection to Syzygy.
  - Accept: The form is readable and usable from keyboard, touch and narrow layouts; it feels finished with both empty and long answers.
  - Evidence: Form screenshots for pristine, filled, invalid, submitting and confirmed states at supported layout sizes.

- [ ] **P014 — Preserve reading and input behavior during choreography**
  - Do: Give form focus, selected text, editable fields, modal content and normal scrolling priority over camera gestures. Cancel stale route animations and background capture when navigating.
  - Accept: Space in a field never charges the planet, a wheel over a form never changes scope or moves the camera, and interrupted navigation never leaves an invisible clickable panel.
  - Evidence: Interaction tests for typing, selection, scrolling, rapid navigation and browser history during animations.

- [ ] **P015 — Specify route transition and focus restoration**
  - Do: Define enter/exit timing, heading focus, back-link focus, scroll restoration and reduced-motion alternatives. Keep focus order aligned with the visible route and return focus to the triggering control after overlays.
  - Accept: Keyboard users never land behind a hidden panel; Back restores a meaningful reading position without retriggering a dramatic introduction.
  - Evidence: Keyboard/screen-reader navigation recording and automated hidden-focus checks.

- [ ] **P016 — Provide useful loading, unavailable and unknown-route states**
  - Do: Design content skeletons only for actual loading; provide retry with preserved input, truthful missing-entry copy and a route back to the relevant destination. Distinguish a network error from an empty published collection.
  - Accept: A failed API response never displays `0 products` as if it were valid data, and an unknown route never shows misleading previous content.
  - Evidence: Fault-injection captures for timeout, offline, malformed response, missing record and withdrawn record.

- [ ] **P017 — Finish shared typography and control semantics**
  - Do: Specify type hierarchy, line lengths, accessible labels, pointer/focus/pressed/disabled states, external-link indication and reusable fields. Use native inputs/buttons where appropriate and verify licensed font assets.
  - Accept: Microtype remains supplemental; crucial instructions survive zoom and font-loading failure; decorative pointer effects never replace the system pointer on forms.
  - Evidence: Component state sheet, font licence inventory and contrast/zoom review.

- [ ] **P018 — Make practical routes usable without WebGL**
  - Do: Provide HTML-rendered company text, navigation and application access when WebGL cannot initialize or its context is lost. Preserve meaningful content and state while showing a restrained scene fallback.
  - Accept: A visitor can understand the company and apply even on an unsupported renderer; fallback does not imply that a static image is the interactive scene.
  - Evidence: WebGL-disabled and context-loss walkthroughs through Studio and application submission.

- [ ] **P019 — Finalize page identity, metadata and sharing**
  - Do: Give public routes appropriate titles, descriptions, canonical URLs, share imagery and indexability; expose real collection/detail content to search only when published. Keep private application/admin/preview routes out of public discovery.
  - Accept: Shared links describe the right platform and real content; private IDs, applicant information and draft titles never appear in public metadata or sitemaps.
  - Evidence: Metadata/sitemap snapshots and an authenticated-versus-public crawling check.

- [ ] **P020 — Audit every visible control for a meaningful result**
  - Do: Map each public link, tab, CTA, menu item, filter, download, retry and close control to one action and expected state. Remove controls with no approved purpose rather than adding filler destinations.
  - Accept: No dead links, misleading affordances, duplicate commissioning controls or buttons that merely change decorative text remain.
  - Evidence: Exhaustive control inventory and pass/fail walkthrough linked to screenshots or tests.

## Labs, Products and owner publishing

- [ ] **P021 — Define the empty Labs experience purposefully**
  - Do: Keep Gravity's scene and a concise approved Labs purpose/participation invitation while experiments are unpublished. Remove public `0 published` counters, empty grids, unearned status labels and inactive filters.
  - Accept: Labs feels intentional with no records, while making no claim of active research beyond confirmed facts; a real collaboration route remains available.
  - Evidence: Empty-registry release capture plus text audit and route check.

- [ ] **P022 — Define the empty Products experience purposefully**
  - Do: Keep Astrolabe's crafted scene and approved product intent; show publication-driven catalogue sections only when actual products are ready. Avoid fake product cards, launch countdowns and sign-up promises without delivery support.
  - Accept: The page has a clear identity and useful navigation with zero records; a record added later appears through infrastructure without redesign.
  - Evidence: Empty-state capture and a private fixture showing the same template populated without shipping fixture content.

- [ ] **P023 — Design discovery for visitors without a search term**
  - Do: Lead real Labs content with understandable titles, purpose, media and concise summaries; derive optional interest browsing from published categories. Introduce search only after inventory and observed tasks justify it.
  - Accept: A visitor can discover a real experiment by interest without knowing its project name; empty or single-category collections do not display unnecessary filters.
  - Evidence: Private fixture usability review with zero, one and multiple genuine-shaped records; fixture isolation check.

- [ ] **P024 — Define distinct experiment and product schemas**
  - Do: Retain shared identity/publication fields but define experiment question, approach, evidence and limitations separately from product purpose, availability, supported use and destinations. Make speculative or unavailable fields optional and suppress absent fields.
  - Accept: A product cannot acquire an unsupported LIVE label, and an experiment cannot publish invented measured results merely to satisfy a template.
  - Evidence: Versioned schemas, field definitions and valid/invalid payload cases.

- [ ] **P025 — Design complete detail routes**
  - Do: Compose a detail page around actual title, summary, selected media, relevant structured sections and one useful primary action. Preserve back-to-collection context and a company-level commission path where relevant.
  - Accept: Short records feel complete without filler; long records remain readable; important content is not hidden inside scene controls.
  - Evidence: Short/long/detail-layout captures, keyboard review and collection-return test.

- [ ] **P026 — Define stable identifiers and URL history**
  - Do: Keep immutable record IDs separate from editable display titles/slugs; define collision handling, slug changes, redirects and archive availability. Reject malformed route values on the server and client.
  - Accept: Renaming a published item does not lose its history or create broken existing links; unpublished IDs reveal no private record information.
  - Evidence: URL migration tests and public access tests before/after rename, archive and republish.

- [ ] **P027 — Implement authorized publisher access**
  - Do: Put every draft read, preview, edit, publish, import, contact setting and private brief operation behind authenticated, authorized owner capabilities in hosted mode. Do not promote the current localhost Origin check into internet authorization.
  - Accept: Anonymous visitors and applicants cannot read drafts or write content even by directly calling APIs; hidden menu links are not the security boundary.
  - Evidence: Endpoint authorization matrix and negative API tests for each actor.

- [ ] **P028 — Implement record lifecycle and revision history**
  - Do: Preserve draft/published/archived semantics, add recorded edit/publish events and optimistic concurrency per record or documented equivalent. Separate editing a published draft revision from changing the live version.
  - Accept: Editing does not expose half-written content; conflicting tabs cannot silently overwrite work; the owner can identify and restore a previous approved version.
  - Evidence: Concurrent editor test, publication history record and restore/republication walkthrough.

- [ ] **P029 — Provide private publication preview**
  - Do: Render unpublished content in its final layout through authenticated preview or a revocable, expiring, limited preview link if explicitly needed. Prevent indexing, caching and public snapshot inclusion of drafts.
  - Accept: Preview layout matches live rendering; unauthorized access is denied; expired/revoked preview links reveal no content.
  - Evidence: Preview-to-public comparison plus access, cache and expiry tests.

- [ ] **P030 — Validate publication inputs and asset rights**
  - Do: Require approved meaningful content, working actions, media alternative text/captions where needed and recorded rights to publish. Sanitize supported structured text; never accept executable markup as editorial content.
  - Accept: Script injection, unsafe protocols, incomplete CTA pairs, missing required content and unapproved assets block publishing with field-specific messages.
  - Evidence: Publication validation suite and final asset/content rights register.

- [ ] **P031 — Keep external content delivery controlled**
  - Do: Replace arbitrary remote image hotlinks with approved stored assets or an explicitly defined source policy. If remote ingestion is added, validate destinations, redirects, content type, size and internal-network access; avoid generic server-side URL fetching.
  - Accept: Publishing cannot cause internal-network requests, uncontrolled third-party tracking or brittle media that disappears without an identifiable error.
  - Evidence: Media ingestion/source policy and malicious/broken URL tests.

- [ ] **P032 — Preserve backup, import and public-export distinctions**
  - Do: Provide private full-content backups, schema-validated import previews/conflict handling and separate public-only snapshots. Preserve current records unless the owner explicitly chooses replacement; make exports versioned and reproducible.
  - Accept: Drafts, applications, keys, internal notes and pricing credentials never enter public snapshots; imports report changes before applying them.
  - Evidence: Export diff, round-trip restore test and distribution leakage scan.

- [ ] **P033 — Remove developer workbench scaffolding from public journeys**
  - Do: Review existing measurements, archive, simulation, publisher and technical explanation routes. Retain meaningful scene interactions; move owner/developer diagnostics to private tools and omit runtime implementation copy from brand screens.
  - Accept: Visitors can enjoy each scene and complete business tasks without being shown databases, shader limitations, owner keys or development setup instructions.
  - Evidence: Public route/text inventory compared with authenticated development/admin views.

## Applications, recovery and applicant experience

- [ ] **P034 — Finalize application intake fields**
  - Do: Use a small, explicit schema for name, email, enquiry type, desired outcome and optional budget/timing. Define field lengths, normalized whitespace, supported languages and when additional questions appear.
  - Accept: The form gathers enough for human qualification without requiring a technical specification, sensitive documents or invented budget bands.
  - Evidence: Approved intake schema and completion review using commission, collaboration and research examples.

- [ ] **P035 — Explain submission and data handling accurately**
  - Do: Use approved identity/contact/privacy copy near submission, explain human review and receipt behavior, and show only response-time promises the owner can support. Separate any optional marketing preference from the application.
  - Accept: Applicants know who receives their information and how to return; consent is not bundled into unrelated terms or preselected marketing.
  - Evidence: Approved notices and rendered submission/confirmation copy in every delivery mode.

- [ ] **P036 — Validate and preserve imperfect submissions**
  - Do: Validate required/type/length constraints on both server and client; handle Unicode and common email input issues; show field errors and an accessible error summary without erasing answers.
  - Accept: Invalid data is rejected server-side, whitespace-only goals fail, legitimate international names survive and the first actionable error receives focus.
  - Evidence: Boundary/property tests plus keyboard error-recovery recording.

- [ ] **P037 — Make submission transactional and idempotent**
  - Do: Assign an idempotency key to one submission intent, commit the application and receipt reference atomically, and make retry after timeout retrieve the original result where safe.
  - Accept: Double-clicks, connection loss after commit and reload recovery cannot create duplicate applications or falsely report a lost submission as unsaved.
  - Evidence: Replayed/concurrent submission tests with database row counts and response identity checks.

- [ ] **P038 — Define safe draft persistence**
  - Do: Decide whether browser drafts are session-only or explicitly saved; warn before losing substantial unsent input when appropriate, provide clear discard, and avoid persisting sensitive content indefinitely by default.
  - Accept: Route changes and transient errors preserve expected work; submit/discard clears the draft; private browsing/storage failures produce usable behavior.
  - Evidence: Draft lifecycle tests across reload, navigation, submission, discard and storage denial.

- [ ] **P039 — Replace raw online bearer-key entry with a production access flow**
  - Do: Choose and implement the approved applicant access mechanism, favoring low-friction verified-email recovery with server sessions where suitable. Keep the current downloaded key flow explicitly local until migration is defined.
  - Accept: Access credentials expire/revoke as designed; they never appear in analytics, referrers, routine logs or public URLs; legitimate applicants can return from another device.
  - Evidence: Identity decision record, session lifecycle tests and credential-leak inspection.

- [ ] **P040 — Implement receipt and notification delivery states**
  - Do: Connect an approved email service only when account/domain configuration exists; store pending/sent/failed states, retry idempotently, and provide an in-app receipt immediately after database commit.
  - Accept: Saved application and sent email are separate truthful outcomes; email failure never loses the record or causes duplicate applications.
  - Evidence: Controlled delivery test, simulated provider outage and notification retry/idempotency receipts.

- [ ] **P041 — Implement applicant status and next steps**
  - Do: Design pending, accepted, declined and any approved needs-information/withdrawn states with plain language and useful next actions. Keep internal notes separate from applicant-visible decision notes.
  - Accept: Pending/declined applicants cannot obtain the private rate card or calculate estimates; status changes are reflected on return without exposing internal reasoning.
  - Evidence: State transition matrix and authenticated UI/API tests for every supported state.

- [ ] **P042 — Implement recovery without account enumeration**
  - Do: Define lost-access recovery, email-link expiry/replay, session revocation and any support-assisted identity check. Respond generically to unknown email/application identifiers and rate-limit recovery attempts.
  - Accept: Recovery does not reveal whether a person applied; old/replayed credentials cannot regain access; authorized recovery preserves the same application history.
  - Evidence: Known/unknown response comparison, expiry/replay tests and recovery walkthrough.

- [ ] **P043 — Define applicant correction and withdrawal**
  - Do: Let an authenticated applicant request correction or withdraw through an approved process; define which changes reopen review and preserve an auditable decision history without collecting unnecessary data.
  - Accept: Changed scope cannot silently keep an obsolete approval; withdrawal prevents new estimates while historical records follow the agreed retention rules.
  - Evidence: Edit/withdraw/review tests and approved lifecycle policy.

- [ ] **P044 — Gate optional file uploads on an actual requirement**
  - Do: Start with text/links unless uploads are explicitly required. If enabled, implement authenticated size/type/count limits, quarantine/scanning, storage isolation, expiring downloads and deletion rules; never execute uploaded assets.
  - Accept: The application remains complete without upload infrastructure; enabled uploads cannot expose private files, overwrite paths or exceed limits silently.
  - Evidence: Recorded upload decision and, if enabled, malicious file/path/size/access tests plus retention coverage.

- [ ] **P045 — Make online outages recoverable**
  - Do: Define status/estimate behavior during API outage, session expiry and intermittent connectivity. Preserve unsent choices locally only as appropriate, offer retry/login and distinguish stale cached information from current approval.
  - Accept: A stale accepted screen cannot authorize a server estimate after revocation; retry preserves choices and never fabricates successful persistence.
  - Evidence: Network/session fault tests across application, status lookup and estimate calculation.

- [ ] **P046 — Finish the offline commissioning boundary**
  - Do: Keep local launcher application/review/estimate capabilities isolated; provide an explicitly labelled saved brief or local receipt where internet submission is unavailable. Prevent old embedded forms from claiming messages were delivered.
  - Accept: Offline/local UI states are truthful; no automatic sync uploads private historical records without an owner-controlled migration.
  - Evidence: Offline delivery walkthrough and inspection of all confirmation/download text.

## Owner review, service selection and authoritative estimates

- [ ] **P047 — Build a private owner review desk**
  - Do: Provide application list/detail, relevant sort/filter, pagination, review context and clear pending actions. Do not rely on the current hard cap of 200 rows as the entire available history.
  - Accept: The owner can find and review any authorized record; untrusted text is escaped and applicant data is absent after locking/signing out.
  - Evidence: Multi-page fixture walkthrough, authorization checks and sign-out DOM/cache inspection.

- [ ] **P048 — Make review decisions deliberate and auditable**
  - Do: Use explicit accept/decline/request-information actions with the approved state machine, optional applicant message, immutable event metadata and optimistic concurrency.
  - Accept: Two owner tabs cannot overwrite each other's decisions silently; acceptance is human-driven; accidental repeat requests create no duplicate decision notifications.
  - Evidence: Concurrent review and notification tests with event history.

- [ ] **P049 — Define acceptance revocation semantics**
  - Do: Make revocation stop new scope estimates immediately; decide how existing indicative estimates are labelled and viewed. Keep historical documents unchanged while recording their present validity context.
  - Accept: Cached acceptance and replayed requests cannot bypass revocation; the applicant understands the current next step.
  - Evidence: Accepted→revoked race test plus preserved historical estimate comparison.

- [ ] **P050 — Model actual services and selection rules**
  - Do: Define owner-configured service IDs, descriptions, units, ranges, eligibility, dependencies and mutually exclusive options only where the real offering requires them. Keep sample rates out of public data.
  - Accept: Applicants see comprehensible outcomes rather than an arbitrary checklist of technologies; impossible or unsupported combinations cannot produce a misleading price.
  - Evidence: Approved service catalogue and representative valid/invalid selection cases.

- [ ] **P051 — Design accepted-only scope selection**
  - Do: After server-confirmed acceptance, reveal suitable service choices, quantity controls, inclusion/exclusion explanations and a review step. Handle an unconfigured catalogue as a truthful owner action needed.
  - Accept: Users understand what influences the range; no empty calculator, fake default price or pressure to book appears.
  - Evidence: Accepted journey captures for configured/unconfigured offerings and keyboard/touch selection tests.

- [ ] **P052 — Define exact monetary representation**
  - Do: Use integer minor units or exact decimal arithmetic throughout pricing; define currency precision, decimal-input parsing, quantity types, bounds and rounding order. Replace float-times-100 form parsing where it produces ambiguity.
  - Accept: Server and display agree for boundary values; negative/NaN/infinite/excess precision/unsafe-integer inputs fail; currencies are never silently converted.
  - Evidence: Money test vectors covering decimal edge cases, maxima, totals and localization.

- [ ] **P053 — Version and publish rate cards deliberately**
  - Do: Store immutable rate revisions with owner, timestamps and explicit activation; distinguish drafts from active pricing. Validate low≤high, active items, unit descriptions and required business inputs.
  - Accept: Invalid or accidental drafts cannot become public to accepted applicants; stale owner saves conflict; historic estimates retain the original exact rates.
  - Evidence: Draft/activate/revert/concurrency tests and revision history.

- [ ] **P054 — Bind estimates to the rates the applicant reviewed**
  - Do: Include the viewed pricing revision in calculation requests. If rates change, require a visible refresh/review before recalculating; never silently substitute a higher or lower revision.
  - Accept: The current backend's implicit latest-rate behavior is replaced by an explicit concurrency contract; estimate approval and rate reads occur consistently in one transaction.
  - Evidence: Race test changing prices between selection and submit, with expected conflict response and revised confirmation.

- [ ] **P055 — Make the server the only pricing authority**
  - Do: Accept only authorized service IDs, allowed quantities and the expected revision; reject client-supplied prices/totals/discounts, duplicate options, unauthorized items and mass-assigned properties.
  - Accept: Tampering cannot alter a quote range or calculate for another application; the browser receives the authoritative line breakdown.
  - Evidence: Negative API tests, application-isolation tests and server recomputation fixtures.

- [ ] **P056 — Define taxes and external costs without inventing them**
  - Do: Obtain actual tax/identity rules and owner-approved treatment of licensing, asset work, hosting, subcontracting and support. Display unknown/excluded amounts plainly; add tax calculation only when legally and commercially configured.
  - Accept: An estimate never implies all-inclusive pricing, a tax registration or a tax rate that has not been established.
  - Evidence: Approved commercial configuration and receipt examples for each supported treatment.

- [ ] **P057 — Persist immutable estimate receipts**
  - Do: Store estimate ID, application ID, creation time, currency, rate revision, exact line quantities/ranges, exclusions and any approved validity rule. Provide an accessible download with no private access secret.
  - Accept: Repeated retrieval reproduces the original estimate; changing rates/content cannot rewrite its historical meaning; receipt clearly states no contract, booking or payment occurred.
  - Evidence: Receipt round-trip/hash checks and historical estimate test after rate change/removal.

- [ ] **P058 — Prevent duplicate or excessive estimate generation**
  - Do: Use request idempotency for a calculation intent and reasonable authenticated quotas; preserve previous estimates for comparison with clear creation/revision labels.
  - Accept: Repeated clicks/timeouts do not multiply saved receipts or notifications; abuse protection does not discard a valid user's scope.
  - Evidence: Retry, concurrency and throttling tests with row counts and retained input checks.

- [ ] **P059 — Connect estimates to a real next action**
  - Do: Provide an approved request-scope-review or contact action linked to the estimate reference and existing application. Keep proposal, signed agreement, invoice and payment as separately configured steps.
  - Accept: The user knows how to proceed; estimate creation never silently submits a contract, accepts terms, charges money or claims reserved capacity.
  - Evidence: End-to-end estimate→review-request walkthrough and owner receipt association.

- [ ] **P060 — Protect owner pricing and business-policy edits**
  - Do: Restrict pricing/config changes to authorized roles, show affected active offerings, record audit events and require fresh authentication for sensitive changes where justified.
  - Accept: Content-only editors cannot change rates or read applications; every active rate/policy change can be attributed and safely corrected.
  - Evidence: Permission matrix, role-negative tests and audit history samples using synthetic records.

## Hosted backend, identity and integration boundaries

- [ ] **P061 — Choose a supported production runtime and data architecture**
  - Do: Document deployment topology, process lifecycle, persistence, concurrent request model, transactional database choice, secret storage and health checks after hosting constraints are known. Preserve the local launcher as a distinct mode.
  - Accept: Python's localhost development server is not merely bound publicly; restart/deploy cannot lose committed records; architecture fits approved operating costs.
  - Evidence: Architecture decision, deployment manifest and restart/persistence smoke test.

- [ ] **P062 — Introduce explicit database migrations and constraints**
  - Do: Version schemas and migrations for content, application events, identities/sessions, pricing revisions, estimates and notifications. Add appropriate unique, foreign-key and status constraints; preserve existing local data through tested imports.
  - Accept: Upgrades are repeatable, invalid relationships fail and migration interruption cannot silently corrupt the only copy.
  - Evidence: Fresh-install/upgrade migration tests, pre-migration backup and post-migration reconciliation.

- [ ] **P063 — Implement production sessions and administrator identity**
  - Do: Use an approved identity mechanism, secure server-side sessions or equivalent, session rotation/revocation, owner MFA where supported and a documented recovery process. Remove shared raw owner-key entry from the hosted interface.
  - Accept: Authentication survives normal use while stolen/revoked/expired sessions fail; recovery does not expose private data or introduce a universal backdoor.
  - Evidence: Session/authentication lifecycle tests and owner recovery drill in staging.

- [ ] **P064 — Enforce authorization on every private operation**
  - Do: Define applicant, reviewer, publisher, pricing owner and administrator permissions according to actual staffing; check object ownership and role on all reads/writes/exports, not only navigation visibility.
  - Accept: Changing an application, estimate, media or preview ID never grants another user's information; anonymous requests cannot read briefs or drafts.
  - Evidence: Complete endpoint permission table and cross-user/role IDOR test suite.

- [ ] **P065 — Protect request boundaries and browser sessions**
  - Do: Configure HTTPS, secure cookie attributes, approved origins, CSRF defenses, content types, request/body limits, safe redirects and host validation for the chosen topology. Develop a CSP compatible with the actual WebGL build.
  - Accept: Cross-site requests cannot mutate private state; malformed headers/bodies produce controlled errors; required assets and renderer workers still load.
  - Evidence: Security-header report, cross-origin/CSRF tests and CSP validation in all three apps.

- [ ] **P066 — Add measured abuse protection**
  - Do: Apply per-action limits and backoff to application creation, access/recovery, uploads and estimate generation; use defensive layers appropriate to the chosen host and avoid treating every shared-network visitor as one person.
  - Accept: Automated floods cannot create unbounded mail/storage cost; normal retries and accessibility flows remain usable; blocked responses give safe retry guidance.
  - Evidence: Staging abuse/load test and legitimate-user regression results.

- [ ] **P067 — Implement durable notification jobs**
  - Do: Use an outbox or equivalent transactionally linked to application/decision events, with retries, deduplication, bounce/failure visibility and authenticated webhook handling where the provider needs it.
  - Accept: A crash after saving a decision cannot silently lose its intended notification; retries cannot send multiple inconsistent decisions.
  - Evidence: Crash/retry/webhook-signature tests and notification status audit.

- [ ] **P068 — Store secrets and private information deliberately**
  - Do: Place credentials outside source/public bundles, redact sensitive values from logs and use appropriate storage encryption/access controls. Separate public content, private applications, operational telemetry and local scene settings.
  - Accept: Source maps, error messages, exports and browser storage contain no server credentials or unrelated applicant records; production setup uses real secret injection.
  - Evidence: Built-artifact/log scan and infrastructure access review.

- [ ] **P069 — Define data retention and user-rights operations**
  - Do: Have the owner approve categories, purpose, retention periods and deletion/correction/export handling with relevant professional input. Apply policies to backups, email records and assets as well as the primary database.
  - Accept: The system can locate and process one applicant's data without leaking another's; no invented retention duration or unenforceable privacy promise is published.
  - Evidence: Approved data map/policy and staging export/delete/correction drill.

- [ ] **P070 — Add operational observability without fake telemetry**
  - Do: Record request correlation, latency, failures, mail state, database health and resource pressure with privacy-safe logs. Keep public scene telemetry explicitly tied to real renderer state and separate from business metrics.
  - Accept: An application failure can be diagnosed without reading secrets; synthetic science figures and private commercial metrics never decorate public HUDs as facts.
  - Evidence: Example incident trace, redaction test and public telemetry provenance map.

- [ ] **P071 — Establish backup, restore and incident procedures**
  - Do: Define backup destination/frequency, restore objectives, encryption, access and deletion rules once real infrastructure is chosen; rehearse restores and lost-key/service failure response using isolated data.
  - Accept: Restored applications, content, decisions and estimates reconcile; recovery does not accidentally publish drafts or overwrite the user's only local data.
  - Evidence: Timestamped backup/restore drill, row-level reconciliation and concise incident runbook.

## Verification, release and owner handoff

- [ ] **P072 — Reuse and extend meaningful backend regression tests**
  - Do: Preserve existing pending/accepted, pricing, tampering, publication, revision and scene-isolation tests; update them for the chosen production model and add the missing races/recovery/privacy cases.
  - Accept: Tests execute actual persistence and authorization paths, not only mocked UI; fixtures remain isolated from user databases.
  - Evidence: CI/local test report naming exercised behaviors, failures fixed and fixture storage location.

- [ ] **P073 — Verify the complete commissioned-work journey**
  - Do: Run a new applicant through intake, receipt, return access, human decision, selection, estimate, download and follow-up request with the owner desk responding.
  - Accept: Every transition works with real staging services and truthful statuses; records and receipts agree across browser, API, database and notification log.
  - Evidence: End-to-end recording, synthetic IDs and corresponding persisted event timeline.

- [ ] **P074 — Verify negative and interrupted business journeys**
  - Do: Exercise declined/revoked access, stale rates, missing pricing, invalid quantities, duplicate submits, timeout after commit, expired session/link, wrong application ID, provider failure and concurrent owner decisions.
  - Accept: No case exposes another applicant, loses valid input, invents success, silently reprices or bypasses review.
  - Evidence: Negative-path matrix with reproducible fixtures and result receipts.

- [ ] **P075 — Verify complete publishing operations**
  - Do: Create a private fixture, draft, preview, revise, publish, discover, rename, archive, export and restore it; test two editor tabs and unauthorized access during the sequence.
  - Accept: Public content changes only on intended publication actions; published navigation updates coherently; test records are removed from release data.
  - Evidence: Lifecycle recording, public snapshot diffs and final no-fixture scan.

- [ ] **P076 — Run accessibility checks on the actual business flows**
  - Do: Audit headings, labels, landmarks, reading order, contrast, zoom, keyboard focus, error announcements, loading messages and motion/audio preferences through real tasks in all three apps.
  - Accept: A keyboard/screen-reader user can apply, check status and estimate; animation never gates access to company information or forms.
  - Evidence: Automated results plus manual assistive-technology/task findings and fixed defects.

- [ ] **P077 — Validate browser and physical-device usability**
  - Do: Test agreed browser/device combinations with actual typing, virtual keyboards, orientation changes, browser Back, touch, downloads and slow connections. Identify emulator-only coverage honestly.
  - Accept: No clipped fields/actions, inaccessible status, scroll traps or broken private-return links occur on supported devices.
  - Evidence: Named device/browser/version matrix, recordings and explicit untested combinations.

- [ ] **P078 — Measure business-route performance separately from the scenes**
  - Do: Measure useful content display, input responsiveness, route transitions, API latency and heavy-renderer behavior while completing forms; pause/reduce expensive background work where needed.
  - Accept: Applications remain responsive during animation; delayed WebGL initialization cannot block HTML forms or essential navigation; agreed budgets are measured rather than inferred from FPS labels.
  - Evidence: Cold/warm route traces and form interaction timings under supported quality tiers.

- [ ] **P079 — Test deployments, rollback and public/private separation**
  - Do: Run a staging release from clean sources with real configuration, test compatible migrations, caching and rollback procedure, and inspect public artifacts for keys/drafts/applicant data.
  - Accept: The candidate starts reproducibly, private tools remain protected and a deployment failure has a demonstrated recovery path.
  - Evidence: Build/deploy/rollback logs, artifact manifest and public leakage scan.

- [ ] **P080 — Complete owner operations and content handoff**
  - Do: Provide concise instructions for publishing, review, rate activation, notification failures, backups, recovery, configuration and future experiment/product onboarding. Have the owner perform representative tasks without developer intervention.
  - Accept: Routine content and application work does not require editing HTML, reading a secret from a terminal or relying on undocumented scripts in hosted mode.
  - Evidence: Owner task checklist and recorded handoff findings resolved before acceptance.

- [ ] **P081 — Reconcile truthful public copy with implemented capabilities**
  - Do: Review every public claim, CTA, estimate notice, availability statement and local-versus-hosted message against the tested release. Remove unsupported response times, production readiness labels and incomplete integration promises.
  - Accept: No public sentence claims email was sent, a slot booked, a product released or a payment accepted unless that event actually occurred.
  - Evidence: Final copy-to-capability audit with owner approval for business facts.

- [ ] **P082 — Close the product/backend release gate with evidence**
  - Do: Review all P tasks with their linked receipts; record open provider/business decisions and tested limitations. Separate local delivery acceptance from public deployment acceptance and human approval to send/publish externally.
  - Accept: Required journeys, data protection and owner operations pass on the actual candidate; unresolved dependencies remain explicit blockers, not checked boxes or hidden disclaimers.
  - Evidence: Signed-off release checklist, known-limitations register, build identifier and reproducible test/evidence bundle.

## A. Authority, source provenance and reproducible builds

- [ ] **Q001 — Establish one editable source of truth**
  - Do: Inventory the Downloads Git tree, original Codex source, shared company files, scene-source copies and generated exports; select and document one canonical source location for all three platforms.
  - Accept: Every editable production file has one authoritative path; delivery copies cannot silently supersede it; the platform roles and independent builds are retained.
  - Evidence: `qa/source-map.md` with path mapping, hashes and a resolution for every differing copy.

- [ ] **Q002 — Identify the repository boundary and generated outputs**
  - Do: Classify scene source, authored assets, vendored dependencies, generated files, tooling, QA fixtures, evidence, recovery archives and private runtime records.
  - Accept: A contributor can tell what to edit, commit, regenerate, keep private and distribute without relying on conversation history.
  - Evidence: Repository tree guide and reviewed ignore rules; no archive deletion is part of this task.

- [ ] **Q003 — Bring the required build toolchain into version control**
  - Do: Add the actual standalone bundler, shared source generators, backend source, packaging and verification scripts to the canonical repository with their provenance and applicable licences.
  - Accept: Building does not require an untracked script in the original Codex workspace; required offline vendors are intentionally retained rather than accidentally ignored.
  - Evidence: Tracked file manifest and dependency graph from canonical source to each final artifact.

- [ ] **Q004 — Pin and document runtime dependencies**
  - Do: Inventory Node, Python, esbuild, Three.js, optional texture transcoders, image/mesh tools and all build-time packages; add reproducible manifests and lockfiles where applicable.
  - Accept: Exact supported versions and acquisition instructions are recorded; no runtime CDN is needed for the offline edition; a missing optional tool fails with a useful message.
  - Evidence: Version manifest, package lockfiles, vendor checksums and one dependency validation log.

- [ ] **Q005 — Make clean builds independent of host-specific paths**
  - Do: Replace implicit dependencies on the current user's directories with explicit source, output and data-root configuration; preserve the requested Downloads location as a documented delivery target.
  - Accept: A build in a fresh temporary checkout succeeds without accessing private data or prior generated outputs.
  - Evidence: Clean-checkout command log, environment inventory and output hashes.

- [ ] **Q006 — Verify deterministic scene output**
  - Do: Build the same commit twice with pinned dependencies; compare HTML, scripts, assets and manifests while treating intentionally variable timestamps separately.
  - Accept: Runtime payload hashes match; any nondeterministic seed, ordering or generated texture is explicitly stabilized or justified.
  - Evidence: Two-build comparison and a list of metadata fields excluded from equality checking.

- [ ] **Q007 — Hash the complete runtime dependency set**
  - Do: Extend provenance beyond the current scene HTML hash to cover shared CSS/JS, engine modules, shaders, textures, fonts, backend and build tools.
  - Accept: Each release manifest identifies exactly which source and asset bytes produced each independently launchable platform.
  - Evidence: Machine-readable release manifest and verification against extracted delivery archives.

- [ ] **Q008 — Prove the documented rebuild procedure**
  - Do: Follow only the repository README from a clean checkout and produce development, hosted-candidate and standalone artifacts.
  - Accept: No undocumented manual copy, global package, private key or prior build is required; build errors return a nonzero exit status.
  - Evidence: Rebuild transcript and a second-person or isolated-environment reproduction record.

## B. Offline packaging, data preservation and recovery

- [ ] **Q009 — Define supported delivery modes precisely**
  - Do: Specify local HTTP/SQLite, standalone static export, direct file opening and future hosted operation separately, including which features each provides.
  - Accept: Launch instructions never imply that local backend checks prove hosted service readiness or that a self-contained file proves browser compatibility.
  - Evidence: Mode capability matrix and truthful user-facing launch documentation.

- [ ] **Q010 — Preserve existing private runtime records**
  - Do: Inventory database schemas, row counts and content hashes with a private backup before migration or packaging; keep owner secrets outside release trees.
  - Accept: Existing settings, published/draft records, applications and estimates survive migration or have a tested reversible conversion; private details do not enter QA reports.
  - Evidence: Redacted pre/post data comparison and a successful restore in an isolated data directory.

- [ ] **Q011 — Make package replacement transactional**
  - Do: Build into a staging directory, validate it fully, then replace the delivery directory while preserving private data and a recoverable previous release.
  - Accept: A failed build, interrupted packaging or full disk leaves the current working delivery and runtime records usable.
  - Evidence: Failure-injection results and a rehearsed rollback, using disposable copies rather than the user's live records.

- [ ] **Q012 — Retain and inventory recovery archives safely**
  - Do: Record archive paths, size, permissions, checksums and whether they contain private runtime data; verify a selected recent archive by listing and controlled extraction.
  - Accept: At least one usable recovery point is known; historical archives remain recoverable; no broad pruning or deletion is performed without a separately authorized decision.
  - Evidence: Private archive inventory and restore receipt with sensitive contents redacted.

- [ ] **Q013 — Validate independent platform packages**
  - Do: Extract each individual ZIP into its own temporary directory and run its launcher; test the combined suite separately, including sibling-platform navigation.
  - Accept: A single-scene package does not present broken links as working destinations; the full suite resolves all company links correctly.
  - Evidence: Per-package launch and navigation results, archive CRC checks and file-content hashes.

- [ ] **Q014 — Verify the actual offline HTTP delivery**
  - Do: Launch the delivered scripts, disable external network access, request every runtime asset and exercise saves, settings and the applicable company workflows against disposable data.
  - Accept: All declared offline features work without CDN, remote fonts, remote textures or an internet API; console and network errors are explained or resolved.
  - Evidence: Offline network trace, browser logs, launcher output and SQLite persistence round trips.

- [ ] **Q015 — Resolve direct file-opening acceptance without bypasses**
  - Do: Test the standalone file only through a permitted browser or user-run verification path; record local-storage, URL, audio and navigation behavior separately from HTTP behavior.
  - Accept: Direct `file://` compatibility is supported only for combinations actually tested; if the review tool blocks this mode, retain the explicit unverified status and recommend the tested launcher without circumventing the access restriction.
  - Evidence: Browser/device/version-specific result or a recorded verification limitation; no HTTP result relabelled as a file-mode pass.

## C. Private/public boundaries, security and publication integrity

- [ ] **Q016 — Scan tracked content and complete Git history for secrets**
  - Do: Run a content-based credential scan over the current tracked tree and all reachable commits, then manually review findings including embedded HTML and configuration files.
  - Accept: Filename exclusions are supplementary; confirmed credentials or private client data are removed from distributable history with an appropriate recovery and rotation plan.
  - Evidence: Tool/version/scope, redacted findings and resolutions; never paste secret values into logs or reports.

- [ ] **Q017 — Scan release archives for private material**
  - Do: Inspect extracted standalone and suite artifacts, source maps, previews and manifests for owner keys, runtime databases, application records and private planning documents.
  - Accept: Release packages contain only approved assets, source and documentation; exclusions work for nested files and alternate filename extensions.
  - Evidence: Public asset allowlist and redacted archive-content scan with hashes.

- [ ] **Q018 — Test public/static route exposure**
  - Do: Attempt requests for private directories, dotfiles, traversal variants, encoded paths, backup files and unsupported API methods against isolated local and hosted candidates.
  - Accept: Private content is inaccessible; failed requests do not disclose paths or secrets; testing stays within owned systems.
  - Evidence: Request/response fixtures and server access-control regression tests.

- [ ] **Q019 — Validate authorization boundaries end to end**
  - Do: Exercise anonymous, pending, accepted, declined, revoked and administrator access against publishing, application review and estimation operations.
  - Accept: UI hiding is never the authorization mechanism; server-side permission checks prevent cross-record access and pricing bypass.
  - Evidence: API negative tests plus browser checks using separate disposable identities.

- [ ] **Q020 — Validate untrusted content and request limits**
  - Do: Test published titles/descriptions, submitted applications, imported data and URLs for injection; test oversized bodies, excessive fields, invalid JSON and abusive retry patterns.
  - Accept: Output is safely rendered, schemas and limits are enforced, failed writes leave valid existing data intact and error messages remain usable.
  - Evidence: Security regression suite and boundary-condition results with safe test payloads.

- [ ] **Q021 — Review client-visible telemetry and logging**
  - Do: Inspect diagnostics, browser storage, URLs, analytics and server logs for personal data, tokens, private infrastructure details or invented operational metrics.
  - Accept: Public telemetry describes the measured local experience; identifiers and secrets are absent from URLs and public logs; necessary private logging has a retention rule.
  - Evidence: Redacted sample logs, storage inventory and a mapping from displayed metrics to their actual measurement source.

- [ ] **Q022 — Gate public hosting separately from local success**
  - Do: Validate HTTPS, production identity/recovery, service configuration, backup/restore, health checks, deployment rollback and any actual email/payment integration in their intended environment.
  - Accept: Unconfigured integrations are clearly disabled; no localhost owner-key workflow is exposed as production authentication; final publication occurs only after the user's deployment authorization.
  - Evidence: Hosted staging checklist and release decision listing configured, unconfigured and blocked capabilities.

## D. Functional correctness and interaction regression

- [ ] **Q023 — Reconcile old tests with the agreed state contract**
  - Do: Inventory prior tests and remove obsolete assumptions such as completed-rupture release immediately rejoining; retain useful failure coverage and tie each new behavior to an explicit requirement.
  - Accept: Passing legacy tests cannot conceal a regression against latched-open behavior, independent ENTER or bounded inspection.
  - Evidence: Requirement-to-test map and documented reasons for each changed expectation.

- [ ] **Q024 — Test the complete Syzygy state machine**
  - Do: Cover joined, charging, early release, rupture, sustained open, inspection and rejoining; include repeated transitions and reset during eligible states.
  - Accept: There is one valid active state, one rupture trigger per cycle, no duplicate fragments/audio bursts, and no unintended navigation from HOLD.
  - Evidence: State-transition tests and a continuous browser capture covering normal and interrupted cycles.

- [ ] **Q025 — Test mixed input and cancellation**
  - Do: Combine pointer, keyboard, touch, lost capture, pointer cancellation, blur, page hide and route changes; verify focused form inputs do not trigger scene actions.
  - Accept: Input sources release independently, early cancellation behaves as specified, and completed latched state is preserved or deliberately reset according to the documented navigation contract.
  - Evidence: Production-handler tests plus real browser input checks; no duplicated model substituted for the live handlers.

- [ ] **Q026 — Verify camera bounds and every inspection path**
  - Do: Scrub each authored path forward/backward at slow and fast input rates, switch inspection targets mid-transition and resize during motion.
  - Accept: No forbidden orbit, geometry penetration, exposed set boundaries, abrupt FOV jump, stale lookAt or camera fight occurs; forms retain ordinary scrolling.
  - Evidence: Camera invariant tests, boundary screenshots and uninterrupted transition recordings.

- [ ] **Q027 — Verify Gravity's interactive scene behavior**
  - Do: Test ceiling interaction, droplet deflection, node hover/focus/exit, camera handoff, pause, speed, saved views and reflection updates in all supported quality tiers.
  - Accept: Markers track the correct world features, reflection orientation stays coherent, node selection clears safely and resumed motion has no accumulated jump.
  - Evidence: Scenario checklist, world-projection assertions and browser recordings from all required camera endpoints.

- [ ] **Q028 — Verify Astrolabe continuity and alignment**
  - Do: Exercise timeline, alignment controls, pause/resume, dissolve boundary and independent rings beyond every display-time wrap; explicitly cross the existing 600-second clock boundary.
  - Accept: Ring transforms and camera remain continuous; display time may wrap without resetting physical motion; alignment completion and reset occur once per intended action.
  - Evidence: Long-duration transform trace, wrap-boundary tests and browser video across the boundary.

- [ ] **Q029 — Validate every route and history transition**
  - Do: Open all supported deep links directly, refresh them, use back/forward and cross-platform links, and submit malformed/unknown route values.
  - Accept: Each route has appropriate focus, title, content and recovery; no accidental combined platform, blank route, double handler or stale modal remains.
  - Evidence: Route manifest with positive/negative browser results for local and hosted URL bases.

- [ ] **Q030 — Validate persistence and migrations under failure**
  - Do: Test corrupt storage, quota denial, browser privacy mode, offline API, concurrent updates, save/delete/undo, schema upgrades and reopened connections with temporary records.
  - Accept: The UI reports actual success/failure, no phantom records appear and scene state remains isolated between platforms.
  - Evidence: Existing and new backend/client regression results plus end-to-end restore of a saved scene.

- [ ] **Q031 — Validate company publishing and commissioning journeys**
  - Do: Run draft/preview/publish/archive and application/review/approved-estimate journeys; test stale price revisions, rejected selections, duplicate submissions and administrator changes during a client session.
  - Accept: Only published real content is public, approval gates are enforced, prices come from configured server rules and estimates disclose their actual status and limits.
  - Evidence: Disposable end-to-end fixtures, API receipts and screen recordings; no fabricated content copied into the release.

## E. Runtime resilience and lifecycle behavior

- [ ] **Q032 — Validate context loss and recovery**
  - Do: Use an allowed WebGL context-loss test on each scene during idle, rupture/inspection and route transitions; verify both recovery and clear failure paths.
  - Accept: Input and audio stop safely; resources are recreated or an actionable retry appears; recovery does not duplicate render loops or corrupt saved data.
  - Evidence: Context-loss logs, recovery screenshots and resource counts before/after repeated cycles.

- [ ] **Q033 — Validate hidden-tab and return behavior**
  - Do: Hide each scene for short and long periods, switch apps, lock/unlock a test phone and return through the back-forward cache where supported.
  - Accept: Hidden scenes avoid unnecessary rendering; resumption uses a bounded delta, reconnects services once and does not fire delayed rupture/audio bursts.
  - Evidence: Visibility lifecycle trace, browser profiling and repeatable return-to-scene recordings.

- [ ] **Q034 — Validate resize, rotation and display changes**
  - Do: Resize repeatedly, rotate physical devices, change browser zoom, enter/exit fullscreen and move between displays with different pixel density/refresh rates where available.
  - Accept: Canvas targets, projections, DOM overlays and pointer coordinates update together; content remains usable and GPU allocation does not grow indefinitely.
  - Evidence: Dimension matrix and before/after renderer statistics.

- [ ] **Q035 — Handle asset and startup failures clearly**
  - Do: Test a missing texture, failed decoder, unavailable font, WebGL2 rejection, low-resource context failure and interrupted startup using isolated fixture builds.
  - Accept: The page offers a usable company route or meaningful recovery; a permanently blank canvas or endless loading indicator is never the sole response.
  - Evidence: Failure-state screenshots and resolved error-log checklist.

- [ ] **Q036 — Verify audio lifecycle and resource pooling**
  - Do: Test muted startup, user-initiated enable, denied/resumed AudioContext, device changes, rapid toggles and fragment-voice priority saturation.
  - Accept: No autoplay dependency, clipping, duplicated drones, stuck voices or late bursts; active spatial sources stay within the chosen tested pool limit.
  - Evidence: Audio graph/resource trace, recorded peak levels and listening results on the agreed playback devices.

- [ ] **Q037 — Test repeated routes and scene cycles for leaks**
  - Do: Repeat at least 30 fracture/rejoin, inspect/exit, modal/open-close and route/history cycles per applicable scene after warm-up.
  - Accept: Event listeners, geometries, textures, audio nodes, timers, connections and heap do not grow monotonically without a documented bounded cache.
  - Evidence: Start/middle/end memory and renderer-resource samples, with explicit browser limitations on memory measurement.

- [ ] **Q038 — Validate durable update and rollback behavior**
  - Do: Upgrade a prior compatible installation and roll back an isolated copy; include cache/version changes and mismatched client/backend detection.
  - Accept: Updates cannot silently serve incompatible code or overwrite records; rollback instructions identify schema limits and a recoverable data snapshot.
  - Evidence: Upgrade/rollback rehearsal and a readable compatibility error when versions cannot safely interoperate.

## F. Accessibility, responsive interaction and practical usability

- [ ] **Q039 — Complete keyboard-only primary journeys**
  - Do: Navigate home, Labs, Products, Studio, application and accepted estimation without a pointer; operate HOLD, REJOIN, inspection, sound, pause and scene settings where available.
  - Accept: Every meaningful action is reachable, focus is visible, keyboard events do not hijack reading/forms and no pointer-only completion is required.
  - Evidence: Keyboard task script, pass/fail log and recording of the full commission path.

- [ ] **Q040 — Verify focus and modal semantics**
  - Do: Test open/close, Escape, focus trapping where appropriate, restoration to the invoking control and controls hidden inside collapsed panels.
  - Accept: Focus never disappears into the canvas, background or hidden controls; dialogs have meaningful names and screen-reader announcements.
  - Evidence: DOM accessibility inspection and manual keyboard/screen-reader results.

- [ ] **Q041 — Provide a reduced-motion experience**
  - Do: Test the OS preference at startup and while active; provide an explicit setting for avoiding camera travel and intense rupture motion.
  - Accept: Navigation and content remain fully available; reduced mode uses intentional restrained transitions and accessible equivalents for the signature interaction.
  - Evidence: Side-by-side state captures and task completion with reduced motion enabled.

- [ ] **Q042 — Make the three-dimensional content understandable without sight**
  - Do: Supply concise scene descriptions, named controls and state changes; remove decorative telemetry chatter from assistive announcements.
  - Accept: A screen-reader user understands the company and can complete practical tasks without interpreting canvas pixels or hearing spatial audio.
  - Evidence: Named screen-reader/browser transcripts for the primary journeys.

- [ ] **Q043 — Verify text legibility and contrast in moving scenes**
  - Do: Check typography, labels, input text, focus and errors against their brightest/darkest actual background states, including bloom and moving highlights.
  - Accept: Essential content remains readable at supported sizes and zoom; visual hierarchy does not depend on tiny microtype or colour alone.
  - Evidence: Contrast measurements and screenshots at the worst background states, with intentional decorative exclusions identified.

- [ ] **Q044 — Validate responsive content and zoom**
  - Do: Test narrow/wide portrait and landscape layouts, browser text zoom, 200% zoom and the agreed accessibility reflow target; include software keyboard and safe areas.
  - Accept: No clipped form action, overlapping nav, unreadable diagram, unwanted horizontal scrolling or obscured status prevents completion.
  - Evidence: Responsive matrix with actual viewport/device labels rather than calling desktop emulation a phone test.

- [ ] **Q045 — Validate touch target and gesture behavior on actual phones**
  - Do: Use physical iOS and Android devices to test one-handed navigation, hold cancellation, inspection drag, scrolling, range controls and orientation changes.
  - Accept: Targets can be operated reliably; gestures do not unexpectedly trap page scroll, zoom the viewport or activate adjacent controls.
  - Evidence: Device model/OS/browser inventory and recorded successful plus interrupted touch journeys.

- [ ] **Q046 — Validate form comprehension and recovery**
  - Do: Test labels, instructions, required/optional fields, validation timing, submission progress, failures, preserved input and return to an existing application.
  - Accept: Users know what happens after applying, can correct errors without losing their work, and never mistake a saved draft or estimate for an accepted contract or payment.
  - Evidence: Task-based usability observations and accessibility checks of success/error states.

- [ ] **Q047 — Run practical usability sessions**
  - Do: Ask independent representative visitors to identify the company, find Labs/Products/Studio, apply and explain the next step, without coaching.
  - Accept: Repeated confusion produces a specific fix and retest; visitor quotes and completion observations are recorded without claiming population-wide certainty from a small sample.
  - Evidence: Consented anonymized session notes, task timings and issue resolutions.

## G. Performance instrumentation and supported-device acceptance

- [ ] **Q048 — Establish named reference hardware and browser tiers**
  - Do: Select accessible desktop discrete/integrated and physical mobile devices; record model, GPU, RAM, OS, browser, refresh rate, power state and thermal conditions.
  - Accept: Support claims name tested configurations; unavailable devices remain open coverage items rather than simulated passes.
  - Evidence: Device registry and required/optional support matrix for each release.

- [ ] **Q049 — Capture an honest baseline before optimization**
  - Do: Measure all three scenes at 1920×1080, DPR 1 on the reference desktop, plus native mobile conditions, including cold startup and representative interactive workloads.
  - Accept: Source hash, quality settings, open tabs, cache state and workload are recorded; the baseline is reproducible and not selected from only the best take.
  - Evidence: Raw time-series logs, network trace, screenshots and run identifiers.

- [ ] **Q050 — Instrument frame intervals correctly**
  - Do: Measure requestAnimationFrame intervals after warm-up; record refresh cadence, pauses, hidden periods and dropped-presentation estimates without labelling them GPU time.
  - Accept: Reports include median, P95/P99, long-frame counts and sample length; loading and intentional suspension are separated explicitly, not silently discarded.
  - Evidence: Instrumentation source, verification with controlled delays and raw/filtered datasets.

- [ ] **Q051 — Profile CPU and GPU work separately**
  - Do: Use permitted browser performance tooling and supported GPU timing queries; handle unavailable or disjoint GPU timing, and capture main-thread/GC work independently.
  - Accept: A JavaScript histogram is never represented as GPU execution time; each bottleneck claim has an associated trace or is labelled a hypothesis.
  - Evidence: CPU profiles, supported GPU timings, unavailable-capability notes and bottleneck-to-fix mapping.

- [ ] **Q052 — Calibrate meaningful frame-time budgets**
  - Do: Start with a proposed 60 Hz desktop target near 16.67 ms and a 30 Hz constrained-device target near 33.33 ms; define cadence tolerance and acceptable missed frames after baseline review.
  - Accept: Budgets are explicit for resolution, DPR, quality, workload and hardware; a P95-only pass cannot hide a poor tail; no universal locked-FPS promise is made.
  - Evidence: Approved budget sheet with rationale, measured margins and release-failing conditions.

- [ ] **Q053 — Exercise representative warm-up**
  - Do: Warm actual material variants, texture uploads, buffers, reflection targets, postprocessing and audio preparation; compare first-use interaction before/after warm-up.
  - Accept: Warm-up is bounded and reported in startup time; it improves the first interaction without invisibly running expensive work forever.
  - Evidence: Cold/warm interaction traces and a complete list of prepared resource variants.

- [ ] **Q054 — Validate the adaptive-quality ladder**
  - Do: Reduce render scale, reflection cost, secondary debris/particles, shadows, distant geometry and optional effects in a defined order, with stable thresholds and manual override.
  - Accept: Quality does not oscillate or alter timing, camera bounds, primary silhouette, required content or interaction completion; low tier is intentionally composed.
  - Evidence: Tier captures, threshold tests and under-load transition traces on actual reference devices.

- [ ] **Q055 — Test sustained and repeated worst-case workloads**
  - Do: Run 15–30-minute sessions per reference device with repeated rupture/rejoin, inspection, alignment, route changes and quality transitions; record the chosen duration explicitly.
  - Accept: No crash, progressive leak, cumulative clock discontinuity or unaddressed thermal degradation occurs; sustained results meet the agreed tier budget or support is narrowed transparently.
  - Evidence: Full-session logs and temperature/power information where available, including all failed runs.

- [ ] **Q056 — Measure resolution and memory cost**
  - Do: Count render targets, sample counts, mip chains, textures and buffers at each DPR/tier; compare estimated allocation with actual browser/GPU observability where available.
  - Accept: Estimated VRAM is labelled an estimate; resizing and quality changes release stale targets; device tiers have justified caps.
  - Evidence: Resource ledger, allocation calculations and observed context-loss/memory behavior.

- [ ] **Q057 — Quantify audio and capture overhead**
  - Do: Compare identical workloads with sound off/on and recorder off/on; profile spatial-voice saturation and the intended export settings.
  - Accept: Audio and encoder overhead are reported separately; successful silent or uncaptured tests do not stand in for the complete experience.
  - Evidence: Paired run traces, audio underrun observations and selected recording configuration.

## H. Asset delivery and startup performance

- [ ] **Q058 — Remove accidental payload duplication**
  - Do: Audit embedded fonts/textures, source copies and shared dependencies; fix duplicate asset inclusion, including the current bundler's all-assets map plus separate font CSS embedding.
  - Accept: Each payload is included only where needed; hosted assets can be cached across pages while offline packages remain complete.
  - Evidence: Before/after raw, compressed-transfer and decoded-size ledger for all three builds.

- [ ] **Q059 — Evaluate texture compression with visual evidence**
  - Do: Compare suitable KTX2/Basis settings and alternative image delivery using actual albedo, normal and relief maps, supported device transcoders and close-up reference views.
  - Accept: Compression retains essential detail and correct channels/colour spaces; fallback works on unsupported devices; no preset size or zero-CPU claim substitutes for measurement.
  - Evidence: Visual comparisons, output/transcode formats, encode/decode timings and actual network/GPU-memory results.

- [ ] **Q060 — Establish staged useful startup**
  - Do: Load essential interface and first-view scene resources first, then nonessential inspection detail; measure navigation availability, first usable scene and first responsive action.
  - Accept: Loading is honest, abortable where appropriate and visually coherent; slow connections and interrupted requests have tested recovery without placeholder products or fake progress.
  - Evidence: Cold/warm startup traces under named network conditions and screenshots of every loading/failure state.

- [ ] **Q061 — Verify caching and release invalidation**
  - Do: Give hosted immutable assets content-addressed versions, define HTML/API cache rules and test upgrade from a previous cached release; document intentional local-server differences.
  - Accept: Fresh releases cannot mix incompatible assets; private API responses are not publicly cached; offline delivery does not depend on a previously warmed browser cache.
  - Evidence: Response-header checks, cache inspection and old-to-new release navigation tests.

## I. Visual comparison, capture integrity and acceptance evidence

- [ ] **Q062 — Define reference comparison viewpoints**
  - Do: Record matched aspect ratios, camera poses, object bounds, focal features, lighting regions, typography and HUD anchors for each supplied reference; identify deliberate interactive adaptations.
  - Accept: Visual review compares equivalent compositions; a single attractive crop cannot certify the complete model or every camera path.
  - Evidence: Annotated reference/current pairs and a list of agreed deviations with reasons.

- [ ] **Q063 — Review continuous motion and close-up craftsmanship**
  - Do: Inspect full camera paths, failure/rejoin, reflections, geological surfaces, crescent dissolution, ring construction, wire topology and HUD projections at normal speed and frame-by-frame where useful.
  - Accept: Recurring seams, hollow shells, floating surface fragments, clipping, regular procedural patterns, broad glow and temporal pops are fixed or explicitly block acceptance.
  - Evidence: Defect-linked captures and reviewer sign-off on the corrected exact build.

- [ ] **Q064 — Separate deterministic beauty capture from real-time proof**
  - Do: Label offline frame-stepped renders, slowed recording and edited captures clearly; record a separate continuous interactive run at the claimed settings/hardware.
  - Accept: No motion interpolation, cut, encoder change or best-take selection is used to imply performance the interactive build does not sustain.
  - Evidence: Capture method, raw source clip, edit decision list and corresponding unedited performance trace.

- [ ] **Q065 — Apply six separable release gates to the selected reel**
  - Do: Review material depth, fracture hierarchy, render integrity, capture pacing, an arresting uninterrupted passage and claim accuracy; mark technical measurements and human judgments distinctly.
  - Accept: Every gate records pass/fail and its evidence; failed release does not restart unlimited polishing or authorize unsupported outreach claims.
  - Evidence: Signed review sheet, timestamps for the evaluated passages and explicit reasons for any withheld release.

- [ ] **Q066 — Validate sound against the final picture and controls**
  - Do: Listen on headphones, a laptop and an actual phone; check tension/release synchronization, harmonic translation, peak control, quiet UI cues, mute and reduced-motion alternatives.
  - Accept: No essential action requires hearing; transients support visible mass and timing without covering interface feedback; no unsupported physical-simulation claim accompanies the design.
  - Evidence: Listening notes tied to audio revision, device list and final mixed capture.

## J. Final release, support and completion

- [ ] **Q067 — Run the complete release-candidate suite once per frozen build**
  - Do: Execute meaningful geometry, state, client, backend, route, asset and packaging tests against the final source and export; re-run affected coverage only when subsequent changes justify it.
  - Accept: Source-level fixtures and browser/runtime tests are reported separately; failures are fixed or explicitly block the relevant feature's release.
  - Evidence: Test receipt with command, date, versions, source/build hashes, pass/fail counts and scope limitations.

- [ ] **Q068 — Review all visible content and claims**
  - Do: Inspect scene overlays, company pages, empty states, diagnostics, preview copy, credits, README files and sales artifacts for stale names, filler, unconfigured features and exaggerated claims.
  - Accept: No invented products/clients/metrics, misleading FPS labels, unsupported physics claims or private implementation language intrudes into public product flows.
  - Evidence: Content inventory with approved final copy and links to evidence for every measurable claim.

- [ ] **Q069 — Verify final delivery hashes and user data preservation**
  - Do: Rebuild and extract the exact packages being handed over; compare them with the browser-tested candidate and verify preserved runtime records using appropriate content-level checks.
  - Accept: Downloads source/export/build manifests, ZIPs, TARs and launchers agree; final documentation identifies outstanding modes honestly and no user records were lost.
  - Evidence: Delivery verification report and redacted pre/post data-preservation receipt.

- [ ] **Q070 — Complete hosted release readiness and controlled publication**
  - Do: After separate hosting authorization, deploy the already reviewed artifact, verify domain/TLS, critical routes, configured services and rollback; keep notifications/payments in test mode until explicitly configured and tested.
  - Accept: Publication uses the accepted commit/build, smoke tests pass and a rollback path is ready; deployment does not trigger unsolicited outreach or client messages.
  - Evidence: Deployment identifier, URLs, smoke-test results, rollback receipt and actual integration status.

- [ ] **Q071 — Hand over operation and recovery instructions**
  - Do: Document local startup, content publishing, application review, rate updates, backups, restoration, deployment, supported hardware and known limitations in concise maintainable guides.
  - Accept: An operator can perform normal administration without editing generated HTML or exposing secrets; private admin instructions remain outside public navigation.
  - Evidence: Walkthrough results from a fresh operator context and versioned handover documentation.

- [ ] **Q072 — Make the final acceptance decision explicit**
  - Do: Review the exact build with the user against all scene, business-journey, accessibility, performance, security and delivery requirements; record remaining defects with severity and disposition.
  - Accept: No critical or major release-blocking defect is concealed; any accepted limitation has explicit owner approval; “final” identifies a specific accepted release rather than an award prediction or universal superiority claim.
  - Evidence: Acceptance record, release manifest, outstanding-issue list and archived comparison/capture evidence for future regression review.

## Commercial preparation and owner inputs

These tasks prepare truthful operating material and unblock the website's real content. They do not authorize sending outreach, executing a contract, buying a service, registering an entity or representing a draft as professional advice. Outreach response, a signed client and an award are not required to complete the software. Actual identity, contact, rates and publication decisions are required where the public service depends on them.

- [ ] **O001 — Establish available delivery capacity**
  - Do: Record the founder's actual working availability and interns' demonstrated responsibilities, deduct sales/admin/support time, and measure effort on the first accepted slice. Identify which work requires an external specialist or unavailable hardware.
  - Accept: The schedule uses observed capacity; 160 hours/month and ten paid staff are not treated as current facts. No schedule assumes AI agents eliminate review or asset-production effort.
  - Evidence: Capacity register and first-slice actual-versus-estimated effort.

- [ ] **O002 — Define the operating-cost and dependency boundary**
  - Do: Separate reported personal/company obligations from incremental project costs; record due dates and usable business funds as owner inputs. Obtain actual quotes for any required asset licence, host, mail service or specialist before committing.
  - Accept: The release can identify its recurring commitments and who funds them; zero cash never becomes an assumed paid subscription, speculative debt or guaranteed future deposit.
  - Evidence: Owner-supplied cost register and approved/free alternative for each dependency.

- [ ] **O003 — Confirm the trading and public contact identity**
  - Do: Collect real trading name, operator/entity details, company contact, service geography and relevant professional advice on registration/tax. Configure the website from approved information, keeping personal private details out of public assets.
  - Accept: Public forms, invoices and notices identify the actual provider; no invented company number, office, tax registration or assumption that a globally served business needs multiple entities.
  - Evidence: Owner-approved public identity configuration and private professional decision references where applicable.

- [ ] **O004 — Cost the two technical-spike hypotheses**
  - Do: Model prototype and performance spikes separately, including intake, delivery, review, support, acquisition time, rework, external costs and actual payment/tax treatment. Use the measured capacity and distinguish revenue per hour from profit.
  - Accept: USD 3,500 remains a hypothesis until approved; a 30-hour engagement is not represented as fitting three eight-hour days without declared scheduling/support windows. A failed technical investigation has defined evidence-based deliverables.
  - Evidence: Formula-backed cost sheet with assumptions, margins, delivery cap and owner rate decision.

- [ ] **O005 — Prepare bounded offer definitions**
  - Do: Define one prototype mechanic or one performance investigation, target hardware/browser, required client inputs, source rights, review allowance, hosting period and exclusions. Treat production builds as separately scoped proposals rather than an automatic USD 15,000 upsell.
  - Accept: The offer promises work and evidence within capacity, not guaranteed feasibility, unlimited optimization, guaranteed frame rates or a predetermined sales outcome.
  - Evidence: Approved offer sheets and SOW fields mapped to the actual calculator/service configuration.

- [ ] **O006 — Reconcile commercial drafts for professional review**
  - Do: Prepare reviewed drafts addressing scope, payment milestones, acceptance, change requests, cancellation, liability, confidentiality, data handling, IP and third-party licences. Identify the actual contracting party and correct tax-form requirements using qualified advice when needed.
  - Accept: Templates remain clearly drafts until reviewed; maths, public algorithms, open-source dependencies and third-party assets are not falsely claimed as exclusive Lunar Paradox property.
  - Evidence: Draft version, outstanding review questions and final owner/professional disposition before client execution.

- [ ] **O007 — Verify a real payment and invoicing route if commissioned work is offered**
  - Do: Select only owner-approved available banking/invoice services, complete actual onboarding outside the code where required, and test invoice creation, payment status, fees, refunds and reconciliation safely.
  - Accept: An estimate is not a payment; public copy never claims a deposit cleared from a browser redirect alone. No client or company money is moved during a test without explicit authorization.
  - Evidence: Redacted sandbox/dry-run invoice and authoritative settlement-state mapping; real activation status.

- [ ] **O008 — Prepare a claim-verified proof package**
  - Do: Assemble the approved short capture, a plain capability sheet and a short technical explanation with exact scope and measured conditions. Keep original live footage and fixture labels; avoid 'general physics engine' and untested mobile claims.
  - Accept: A prospective partner can see the craft and understand the service without invented logos, undisclosed offline rendering or evidence-free superiority language.
  - Evidence: Claim-to-receipt audit and final approved preview assets.

- [ ] **O009 — Build an evidenced prospect research template**
  - Do: Prepare fields for firm, actual relevant work/source/date, buyer role, reason for fit, contact-source status, outreach permission/basis, last contact and next action. Separate specialist studios, broader digital agencies and motion/design partners.
  - Accept: A famous agency name or generic job title is not labelled a verified contact or a known production bottleneck. No personal information is fabricated to fill rows.
  - Evidence: Schema and a bounded set of researched entries only if research is separately undertaken; unresearched entries remain hypotheses.

- [ ] **O010 — Prepare outreach and qualification material without sending**
  - Do: Draft concise proof-led and capacity-inquiry variants, discovery questions, client-input checklist and an opt-out handling process. Keep diagnostic claims grounded in observed evidence and avoid extensive unsolicited free audits.
  - Accept: Drafts contain no premature slab/performance/availability claims. Sending messages remains dependent on the user's explicit authorization and appropriate real contact handling.
  - Evidence: Approved draft pack, claim audit and unsent status.

- [ ] **O011 — Define the commercial learning loop**
  - Do: Track research, replies, qualified discussions, requested scopes, proposals, signed agreements and cleared payments as separate stages. Record objections and actual delivery effort without inventing conversion rates or guaranteed quick procurement.
  - Accept: Internal reporting can explain which step is failing; a reply is not revenue and a payment does not establish repeatable demand.
  - Evidence: Empty real-record schema with field definitions and, only when real activity occurs, dated source-backed records.

- [ ] **O012 — Prepare ongoing ownership and maintenance responsibilities**
  - Do: Name responsibility for content, applications, pricing, service uptime, domain renewal, backup verification, privacy requests and defect triage. Set review cadence after actual capacity and providers are known.
  - Accept: No public response-time or permanent-hosting promise exceeds available resources; maintenance is a defined operation after handover.
  - Evidence: Owner-approved responsibility/runbook register with actual contact and escalation channels kept private where appropriate.

## Final acceptance and completion ledger

- [ ] **Z001 — Close the source and custody gate**
  - Do: Review F001–F016 with Q001–Q022 as applicable to source, reproducibility, packaging and privacy. Resolve duplicate implementation references with one shared evidence receipt rather than repeating work.
  - Accept: Canonical source, recoverable data, build reproduction and private/public boundaries are demonstrated. Remaining hosted-only checks are explicitly pending if the offline gate is accepted first.
  - Evidence: Gate-0 ledger citing exact task IDs, commit/build and any scope-limited pending work.

- [ ] **Z002 — Close design and scope before scene overhaul**
  - Do: Review D001–D024 and the relevant V001–V014 foundations. Approve reference annotations, state/route contracts, supported-device plan, typography and shot intent.
  - Accept: Hidden reference geometry is intentionally designed, all primary journeys have layouts, and no unresolved choice will be silently decided by a shader or template default.
  - Evidence: Design-gate decision record and scoped input register.

- [ ] **Z003 — Accept Syzygy as a complete experience**
  - Do: Review V015–V038, its P routes and all relevant Q state/input/visual/performance checks on the candidate. Include company home, Studio, form, reduced motion, failures and bounded open-state inspection.
  - Accept: No hinged-shell impression, unmatched slab holes, automatic post-commit closure, accidental HOLD navigation, dead ENTER or hidden unusable form remains. User approves the moving visual result.
  - Evidence: Continuous live journey, matched stills, test receipt and owner acceptance identifying exact build.

- [ ] **Z004 — Accept Gravity as a complete Labs experience**
  - Do: Review V039–V055 with Labs content/admin boundaries and relevant Q checks. Include zero/published content, ceiling/rock/crater views, reflected motion, reading and phone layouts.
  - Accept: Geology/scale, ocean extent, reflections and depth meet visual acceptance; no fake experiments, decorative hex dump, exposed ceiling edge or public development workbench persists.
  - Evidence: Whole-journey live run, geological/reference contact sheet, data-source audit and owner decision.

- [ ] **Z005 — Accept Astrolabe as a complete Products experience**
  - Do: Review V056–V072 with Products content and relevant Q checks. Include full crescent/instrument detail, alignment, scrub/seek, empty/published records and a long clock-wrap run.
  - Accept: Real volume and craftsmanship survive all allowed angles; time wraps are continuous; alignment does not block product access and no invented inventory ships.
  - Evidence: Continuous alignment/content journey, close-up contact sheet, wrap receipt and owner decision.

- [ ] **Z006 — Accept company operations and backend**
  - Do: Review P001–P082 against the actual configured delivery modes. Exercise applicant, reviewer, pricing owner and publisher as distinct permissions, with negative and interrupted paths.
  - Accept: Business records are durable, rates/revisions authoritative and private data protected; receipt/delivery/authentication claims match real connected services. No major required production feature is described only in documentation.
  - Evidence: Endpoint/actor matrix, real staging-service receipts, local-mode results and application/publishing full-run evidence.

- [ ] **Z007 — Accept whole-product usability and accessibility**
  - Do: Complete manual keyboard/assistive-tech, touch, readable content, zoom, error recovery, reduced-motion and muted experience review across the supported routes and scenes.
  - Accept: WCAG-target findings are resolved with recorded coverage; no animation, prolonged hold, tiny HUD text or spatial sound gates practical tasks. No unsupported blanket accessibility certification is claimed.
  - Evidence: Applicable criterion/task matrix, manual review and closed-defect list.

- [ ] **Z008 — Accept performance and endurance honestly**
  - Do: Run Q048–Q061 and relevant lifecycle checks on named hardware with raw results, failed runs, cold/warm phases, quality tiers and capture overhead. Review actual long sessions rather than selected FPS counters.
  - Accept: Agreed budgets pass or a changed support target has explicit user approval; no severe Syzygy throttle, progressive leak or recurring frame stall is hidden by averaging or a deterministic reel.
  - Evidence: Device matrix, timing distributions, endurance/resource trend and accepted quality-tier record.

- [ ] **Z009 — Accept the offline deliverable**
  - Do: Build, extract and launch the exact suite and individual packages from a clean location, verify complete local assets, data preservation and documented capability limits. Verify file mode only through permitted actual-browser/user checks.
  - Accept: Offline edition works without network for declared features; direct-file uncertainty is never relabelled a pass; local applications are never represented as remotely delivered.
  - Evidence: Source/export hashes, archive validation, no-network trace, user-data reconciliation and explicit file-mode status.

- [ ] **Z010 — Accept the hosted release separately**
  - Do: Prepare sanitized staging with approved identity/domains/provider settings, real TLS/routes, auth/recovery/delivery, private-admin separation, backups and rollback; run public journey smoke tests on the frozen artifact.
  - Accept: Required hosted integrations work and actual costs/access are known. Public release occurs only with user deployment authorization; unconfigured email/payment is not represented as live.
  - Evidence: Staging URLs/build ID, provider test results, backup/rollback drill and explicit publish decision.

- [ ] **Z011 — Freeze final copy, provenance and handover**
  - Do: Review all labels, descriptions, notices, claims, credits, favicons, share metadata, error pages, README files and owner instructions. Retain asset/editable source and sound provenance with the release.
  - Accept: No award filler, fake metric, unfinished placeholder, implementation-language storefront or unsupported commercial promise remains; an operator can maintain normal services from the documentation.
  - Evidence: Final content/rights audit, handover walkthrough and release manifest.

- [ ] **Z012 — Make the final product decision explicit**
  - Do: Reconcile every task as verified, blocked or a user-approved explicit exclusion, with one coherent defect ledger. Record offline and hosted acceptance separately and retain the exact final source/build and raw visual evidence.
  - Accept: No critical/major defect, required missing journey or owner-dependent decision is concealed. Local acceptance does not imply public readiness; all declared final capabilities are demonstrated on their supported configurations.
  - Evidence: Final acceptance document with task dispositions, owner decision, version and release/recovery locations.

## Terminal rules for the executor

The next implementation action is F001/F002, not a random shader tweak. Work scene by scene in the declared gate order. A recurring cross-cutting task may be implemented once and cited by several gates; its appearance in multiple groups never authorizes a second unnecessary rebuild. The short-film timebox is a capture milestone within this larger project, not the deadline or definition of the complete final product.

Final offline acceptance requires every applicable local task and explicit disposition of hosted-only tasks. Final public-product acceptance requires all required hosted tasks, actual owner inputs and public release approval as well. Optional experiments and commercial outreach may be excluded explicitly without weakening the core product. Physical devices, visual approval, real identity/rates and external services cannot be invented to satisfy this list.

When a defect is found, fix it under its existing task or a precisely scoped added subtask, retain evidence and rerun affected checks. If the defect requires a different business promise, new paid commitment or changed product role, record the decision and request that specific direction. Do not use uncertainty to expand scope indefinitely or to conceal an unfinished requirement.

## Reference standards used to define verification tasks

- W3C WCAG 2.2 quick reference: https://www.w3.org/WAI/WCAG22/quickref/ — applicable accessibility target; actual compliance requires the audits above.
- MDN WebGL best practices: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices — rendering/resource guidance, not a device performance guarantee.
- MDN WebGL context loss API: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isContextLost — context-loss detection reference.
- Three.js KTX2Loader: https://threejs.org/docs/pages/KTX2Loader.html — format capability detection and transcoding; ensure the selected loader version is compatible with the project's pinned renderer.

Planning source date: 19 October 2026. Master assembled on 20 October 2026 in the client timezone. Source audit observations are date-bound and must be refreshed before implementation. No implementation or acceptance is claimed by the existence of this plan.
