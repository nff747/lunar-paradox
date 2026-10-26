# Products experience — 26 October 2026

Local implementation only. No production deployment or database migration.

- Replaced the footer-like product layout with a scene beside a readable selected product. The curved selector, next/previous controls, filters and expandable full index remain.
- Normal desktop wheel gestures browse products. A burst of trackpad momentum advances once, rearming after 200 ms idle. Native vertical reading is preserved on mobile and detail pages. Explore Astrolabe explicitly transfers scrolling to the bounded camera; Back and Escape restore browsing without changing selection.
- Company camera framing ignores stale free-orbit offsets and clamps horizontal/vertical angles. Desktop and mobile use separate frame offsets, eased between browse/explore modes. Saved viewer camera state is not deleted.
- All published products get a new detail layout, product document title, clear external action, readable content, copy-link and email feedback links. Existing product copy and external destinations were retained, not independently audited as part of this design task.
- The four bundled browser tools load their actual application into a same-origin frame only on request. Closing removes the frame. Repository products do not advertise an invented embedded application. Existing tool internals and separate standalone landing-page designs were not reworked.
- product-reviews.js is the public, editorial feedback snapshot. It currently contains no reviews. Only published records with matching product IDs and quote/author/date render, with escaped text. No fabricated ratings, verification badges or empty review sections. This is display infrastructure, not a public submission API, moderation dashboard or identity-verification system. Collect permission to publish genuine feedback; never put private submissions in the public snapshot.

Validation: 89 Node tests passed; build/install and git diff --check passed. Browser checks covered wheel selection, explicit exploration and Escape return, selector Home/End, selection return links, actual compressor tool loading/closing, hidden empty feedback, repository page without invented preview, and responsive 390×844 presentation with document width 390. Browser console sample had no errors/warnings. Not exhaustive device/browser/performance testing.
