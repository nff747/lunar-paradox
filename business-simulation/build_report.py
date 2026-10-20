from pathlib import Path
import json,statistics,sys
sys.path.insert(0,str(Path(__file__).parent));from simulate import percentile
root=Path(__file__).parent;r=json.loads((root/'results.json').read_text());raw=json.loads((root/'all-runs.json').read_text());stress=json.loads((root/'assumption-stress.json').read_text())
curves={};funding={}
for key,runs in raw.items():
 curves[key]={str(p):[round(percentile([run['monthly'][m]['freeCash'] for run in runs],p)) for m in range(24)] for p in [.1,.5,.9]};funding[key]=[round(x['requiredCash']) for x in runs]
data={k:r[k] for k in ['meta','ranking','families','plans','sensitivity','holdoutTop3','headwindTop3','validationRanks','headwindRanks']};bootstrap=json.loads((root/'bootstrap-results.json').read_text());bootstrap.pop('raw');data.update(curves=curves,funding=funding,effortStress=stress,bootstrap=bootstrap)
(root/'explorer-data.json').write_text(json.dumps(data,separators=(',',':')))
text='''# Lunar Paradox: 100 strategies × 100 scenarios

18 October 2026. Decision simulation in USD over 24 months. This is not an empirically calibrated sales forecast, a probability of success, a valuation or a promise of profit.

## What was actually run

100 distinct operating strategies: 10 commercial models × 10 operating plans. Each faces the same 100 synthetic external scenarios: 10,000 primary runs and 240,000 simulated company-months. Three additional checks each run 10,000 comparisons: a different scenario seed; a 30% demand reduction; and doubled delivery effort for productized automation. The finalized analysis therefore contains 40,000 scenario-strategy comparisons across its four experiment sets. Main run data and model source are provided. Additional check inputs are reproducible from their seeds and scripts.

## Confirmed inputs and unknowns

Confirmed from the founder: no clients yet; founder plus interns; combined company/living cash requirement about $12,000/month. All scenarios keep that baseline. Interns do not supply assumed free senior delivery capacity. Founder is limited to 160 hours/month, including sales, admin, supervision, Labs, development and delivery.

Confirmed available business cash: $0; existing hardware and skills only.

Unknown: validated customer niche, willingness to pay, actual delivery hours, full baseline cost breakdown, existing commitments, salary/tax treatment, conversion/churn, contractor availability and Labs hardware requirements. These are material uncertainties. There is no simulated guarantee of solvency. Funding required is the peak cumulative cash deficit excluding unearned customer deposits, starting at zero; the founder reports no available cash.

## Ranking rule

Higher score wins: 0.60 × median 24-month free-cash surplus + 0.40 × 10th-percentile surplus − 0.75 × 90th-percentile required starting cash + 0.10 × median Labs spending. Weights are judgement calls, not learned from business outcomes. Alternate cash-first, upside-first and Labs-oriented rankings are exposed in the explorer. No sum is described as accounting net profit: the $12,000 baseline mixes business costs and personal withdrawals, taxes/financing are excluded, and unearned deposits are reserved.

## Literal top three operating strategies

'''
for x in r['winners']:
 text+=f"### {x['rank']}. {x['family']} / {x['plan']} ({x['id']})\n\nMedian 24-month free-cash surplus: ${x['medianSurplus']:,}. 10th–90th scenario percentile: ${x['p10Surplus']:,} to ${x['p90Surplus']:,}. Median earned revenue: ${x['medianRevenue']:,}; median collected cash: ${x['medianCollected']:,}. Median starting cash required: ${x['medianRequiredCash']:,}; 90th percentile requirement: ${x['p90RequiredCash']:,}. Positive surplus in {x['positiveCases']} of 100 synthetic scenarios, which is not a real-world success probability. Median Labs spending: ${x['medianLabs']:,} over 24 months. Holdout rank {r['validationRanks'][x['id']]}; weaker-demand rank {r['headwindRanks'][x['id']]}.\n\n"
text+='''All three primary winners are variants of the same commercial model. They are not three independently discovered businesses. The third spends more on acquisition and produces a lower median surplus; it ranks third because its downside/capital profile helps under the selected scoring rule. Higher marketing spending is not automatically more profitable.

## Three distinct commercial candidates

'''
for x in r['distinctFamilyWinners']:text+=f"- **{x['family']} / {x['plan']}** ({x['id']}, overall rank {x['rank']}): median surplus ${x['medianSurplus']:,}; 10th-percentile surplus ${x['p10Surplus']:,}; 90th-percentile funding requirement ${x['p90RequiredCash']:,}.\n"
text+='''
## Critical falsification test

The automation assumption is 52 base project hours before scope/overrun multipliers. When that doubles to 104, the original winning strategy drops to rank '''+str(stress['ranks'][r['winners'][0]['id']])+''' and the specialist AI workflow studio with flexible delivery takes first place. This is a structural assumption test, not another random seed. Market and delivery validation can change the winner. Do not choose a company direction on the baseline ranking alone.

## Commercial inputs: assumptions to validate

Each line shows base project price / base effort; optional monthly retainer / support hours; proposal win assumption; initial sales cycle. These are unvalidated modeling inputs, not market rates, actual offers or prices published on the website.

'''
for f in r['families']:text+=f"- {f[0]}: ${f[1]:,} / {f[2]} hours; retainer ${f[3]:,} / {f[4]} hours; {f[8]*100:.0f}% proposal win; {f[6]}-month sales cycle. Product list price assumption ${f[9]}/month where nonzero.\n"
text+='''
## Operating plans

Every commercial model is tested under every plan; no result was preselected.

'''
for p in r['plans']:text+=f"- {p[0]}: ticket multiplier {p[1]}, sales {p[2]} founder h/month, marketing ${p[3]:,}/month, maximum flexible contractor capacity {p[4]} h/month, other incremental overhead ${p[5]:,}/month, early employee cost ${p[6]:,}/month, Labs {p[7]} founder h/month and ${p[8]:,} fixed/month.\n"
text+='''
## External scenario bounds

Latin-hypercube-style stratification: each dimension covers 100 shuffled quantile bands, seed 20261018. Demand 0.45–1.65×; proposal conversion 0.55–1.45×; effort overrun 1–1.8×; final-invoice delay 0–2 months rounded up; bad debt 0–9%; monthly churn 1–9%; acquisition cost 0.6–1.8×; product demand/fit 0.15–1.4×; contractor cost 0.8–1.35×. Every scenario also includes a 2–6-month recession window with demand down 10–40%. Low-demand cases are paired with worse collection/conversion, so independence is not assumed. Weights remain arbitrary; scenario fractions and percentiles are descriptions of this designed test set.

Qualified-opportunity assumption: sales hours / 6 plus marketing / ($450 × acquisition-cost multiplier), then market and credibility multipliers. Early credibility ramps from 0.38 to 1.0. Proposal conversion varies with price using elasticity −1.2; partner distribution adds 40% more qualified opportunities. None has been validated against Lunar Paradox's customer data.

Contractor base cost is $55/hour, modified by the scenario; pay only for utilized flexible hours. An early employee costs $8,500/month from month 3 and adds 100 productive hours/month. Extra workforce and capability are assumptions, not verified hires. Existing interns require 12 founder supervision hours/month; admin reserves 24. Proposed founder development hours are clipped to available capacity. Service delivery has an additional 7% nonlabor cost allowance. New costs are incremental to the $12,000 baseline; check actual bills for double counting before using this budget.

New projects pay 40% upfront; that amount stays reserved until completion. Final payments are delayed and exposed to bad debt. Work in progress is capped at three projects; additional work is declined. Recurring support consumes capacity first; insufficient support reduces billing and removes the retainer. No claim is made that clients will accept those terms.

Software launches require 600 development hours plus either three completed service projects or a modeled validation threshold. That threshold is synthetic, not real willingness to pay. New customers depend on demand, acquisition cost and fit. Cloud/service costs and paid support are charged; software is not treated as free infinite-margin revenue. No valuation, exit or external investment is counted.

Discretionary Labs funding comes only from positive monthly cash surplus after modeled cumulative free cash exceeds three baseline months; no client deposit is treated as spendable research cash. Fixed Labs commitments in the research-expansion policy are still paid and can deepen losses. Hardware capex beyond the modeled fixed costs is not included.

## What to do before committing

1. Keep the website roles: Syzygy sells paid discovery/implementation; Gravity documents genuine experiments; Astrolabe presents actual products. No website prices or company records were changed by this analysis.
2. Test one narrow offer through buyer conversations and paid pilots. Record qualified opportunities, proposals, accepted prices, actual hours, refunds, cloud usage and payment delays.
3. Re-run with measured inputs. If delivery cannot be standardized, compare specialist AI work or managed operations rather than forcing the automation winner.
4. Check cash against the funding curve before hiring or accepting work. The ranking assumes sufficient capital to finish obligations even when a scenario's cash goes negative; it does not simulate fundraising or insolvency shutdown.
5. Fund Labs from earned surplus or separately contracted sponsorship, never from money needed to deliver client work. Even the leading plan does not finance a large research lab under its median assumptions.

## Sources and evidence

The simulation results come from the provided Python code and synthetic inputs, not external market data. BDC supports using financial models to compare initiatives and working-capital impacts: https://www.bdc.ca/en/articles-tools/business-strategy-planning/define-strategy/business-plan-how-improve-your-forecasting . Its cash-flow guidance recommends a 13-week rolling view: https://www.bdc.ca/en/articles-tools/money-finance/manage-finances/making-projection-coming-year . These sources support the method, not our assumed prices, sales rates or scenario weights.

Files: simulate.py, stress_assumptions.py, test_model.py, results.json, assumption-stress.json, strategies.csv (all 100), all-runs.csv (10,000 primary results), all-runs.json.gz (full monthly primary traces), explorer-data.json, and report/index.html. Run `python3 simulate.py`, `python3 stress_assumptions.py`, `python3 bootstrap.py`, `python3 build_report.py` and `python3 make_views.py` to reproduce.
'''
bootstrap=json.loads((root/'bootstrap-results.json').read_text())
text+='\n## Update after founder confirmed zero cash\n\nThe 24-month strategies above are counterfactual funded comparisons. None fits a zero-cash starting constraint under their modeled timing. A separate bootstrap exercise crosses 10 small offers with 10 founder-only operating plans, each tested in the same 100 scenario conditions: another 10,000 runs, over 13 weeks. Total finalized comparisons: 50,000 across five experiment sets. Existing hardware only; no paid acquisition, hires, contractors or new subscriptions. Paid accounts must be client-provided. Founder capacity is 40 hours/week, including six admin/supervision hours and 10–22 sales hours. Prices below are unvalidated scope assumptions, not actual offers.\n\n'
for x in bootstrap['winners']:
 text+=f"- **{x['offer']} / {x['plan']}** ({x['id']}): illustrative project price ${x['illustrativePrice']:,}; median 13-week cash balance after three $12,000 baseline payments ${x['medianSurplus']:,}; median bridge cash needed ${x['medianFundingNeeded']:,}; covered all modeled bills from zero in {x['zeroCashCoveredCases']} of 100 designed cases.\n"
text+='\nThese are the least-bad modeled first-income candidates, not financially viable winners at the stated burn. No bootstrap combination covered all scheduled bills from zero in this particular test set. That is not a measured probability or proof that selling work is impossible. Bills are favorably assumed due at weeks 4, 8 and 12; earlier obligations make the gap worse. There is no assumed opening pipeline or recurring contract in the bootstrap exercise. Real contacts, sales timing and repeat work could materially change results. To proceed safely, secure paid work before obligations fall due and/or arrange legitimate cost reduction or payment deferral; do not spend unearned deposits on living bills or Labs. Do not add paid agents or staff before earned cash supports them.\n'
text=text.replace('## What was actually run','## Current decision: zero available cash\n\nThe founder has confirmed $0 available cash, existing hardware and skills only. No original funded-growth strategy is currently affordable under its modeled timing. The separate bootstrap ranking identifies automation pilots, performance optimization and technical design as first-income candidates; all still show a funding gap at the stated $12,000 monthly baseline. These are conditional options to validate, not viable or guaranteed winners. See the final section for bootstrap inputs and results.\n\n## What was actually run',1)
(root/'REPORT.md').write_text(text)
