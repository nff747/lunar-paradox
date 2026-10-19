# Lunar Paradox Mandala plan

Open index.html for the interactive current/future charts. Read PLAN.md for full actions and first-week priorities. PNG and SVG files contain complete 9×9 charts. actions.csv contains 128 proposed actions.

Confirmed baseline: no available cash; $12,000 monthly combined company/living costs; existing hardware/skills; no clients reported. Following is unmeasured. All numeric targets are proposed, not achieved or promised.

Default baseline-only cash gap is $12,000 for one month / $36,000 for three months, before additional costs and new earned receipts. The calculator can adjust assumed monthly burn, duration, extra costs and actually available earned receipts. Future Labs budgets need a defined experiment and real cost quotes. No funding is assumed secured.

The centre 3×3 names the eight priorities; the eight surrounding 3×3 blocks each contain eight actions around their pillar. Select an action for how, evidence, timing and owner. Completion marks are self-reported and stored locally by your browser, not an independent verification. Choose three priorities each week, not all 128 at once.

No website changes, outreach, spending, hiring, incorporation, grant applications or investment transactions were performed. The current application backend is local; hosted identity and notification delivery still require setup before public reliance.

Browser QA used local HTTP. To view that way, run `python3 -m http.server 8850 --bind 127.0.0.1` in this folder and open http://127.0.0.1:8850/ . Stop with Ctrl+C. Direct file execution was not browser-verified. The HTML has no external dependencies. Edit plan.json and run views.py to regenerate the interactive files; export_charts.py additionally needs Pillow and DejaVu fonts for PNG/SVG exports. build.py regenerates the original proposed action data.
