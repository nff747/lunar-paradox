# Products presentation and shaped scrollbar — 26 October 2026

Implemented in canonical Astrolabe company.js / company.css. Generated hosted and offline Astrolabe exports installed locally. No remote deployment performed.

- Replaced the permanent cyan card stack with one featured published product, its actual category, release label, summary, launch URL and detail link.
- Added the supplied right-pointing curved chevron silhouette as the product selector, with a diamond handle following the path and numbered stops.
- Pointer dragging, wheel selection, arrows, Page Up/Down, Home and End select products through shareable query parameters.
- Drag picking uses the inverse SVG screen transform so the shape remains accurate at different aspect ratios.
- A compact expandable product index exposes all full product titles. Filters remain available in a separate disclosure.
- The rail fits above the feature controls through ResizeObserver, with a smaller phone treatment.
- No product records, product ownership, published claims, pricing, backend permissions or database schema changed by this redesign. Removed an unconditional 60 FPS caption from the existing interactive-preview wrapper.

Verification:
- Full test suite: 84 passing tests, including path symmetry, monotonic picking bounds, safe rendering and singleton selector coverage.
- Browser: keyboard changed product 1 to 2; shaped-rail wheel changed product 1 to 2; phone-width pointer drag changed product 2 to 8; Home returned to product 1.
- Product summary, action URL, selected count and shareable URL followed selection.
- 390 x 844 responsive check: document width 390, no horizontal page overflow. This is viewport emulation, not a physical phone test.
- No browser console warnings/errors observed in the final sample.
- desktop.png and mobile.png are browser screenshots. The mobile screenshot was taken during navigation; use the live preview to evaluate motion.
- Browser reload commands occasionally timed out although the page loaded. Fresh tabs and subsequent observations were used to verify the resulting UI. No sustained frame-rate or cross-browser claim is made.
