# Lunar Paradox company simulations

Read REPORT.md first. The founder has confirmed zero available cash. Results are synthetic comparisons, not success probabilities or accounting profit. No website prices, offers or real company records were changed.

Open report/index.html for the standalone explorer. It has no network dependencies. Browser QA used local HTTP, not direct file execution. To serve it locally: run `python3 -m http.server 8849 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:8849/report/index.html . Stop with Ctrl+C.

Primary model: 100 commercial/operating combinations × 100 scenarios, 24 months. Three independent checks add 30,000 comparisons. Bootstrap extension: 100 offer/operating combinations × 100 scenarios, 13 weeks. Total 50,000 finalized comparisons. This does not exhaust all possible businesses.

Python 3 standard library only. Reproduce in order: `python3 simulate.py`, `python3 stress_assumptions.py`, `python3 bootstrap.py`, `python3 build_report.py`, `python3 make_views.py`. Tests: `python3 -m unittest test_model.py`. Re-running simulate.py creates the full raw JSON; the delivered primary monthly traces are also compressed in all-runs.json.gz. The CSV contains 10,000 primary per-run outcomes. bootstrap-results.json contains all bootstrap runs.

Model source, bounds, limitations, scores and checksums are included. Native canvas source lives in the managed canvases directory; the standalone HTML explorer was browser-tested.
