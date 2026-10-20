"""100 zero-upfront-spend offer/operating combinations against 100 synthetic scenarios.
Existing hardware; no new payroll, advertising, software subscriptions or paid cloud.
Client provides any paid accounts. Illustrative scope prices, not market evidence.
"""
from pathlib import Path
import json,random,math,statistics,csv
from simulate import scenarios,percentile
P=Path(__file__).parent
OFFERS=[('Technical audit',3500,16,.30),('Automation pilot',7500,36,.22),('Agency delivery day',1200,8,.30),('WebGL rescue',5000,24,.25),('Feasibility assessment',4500,24,.25),('Integration sprint',4000,20,.28),('Embedded engineering week',4500,32,.25),('Performance optimization',4500,20,.28),('Technical design sprint',6000,32,.24),('Maintenance incident',2500,12,.32)]
# Price multiplier; weekly sales hours; lead access multiplier; partner share; sales delay weeks.
PLANS=[('Direct founder outreach',1,14,1,0,1),('Agency partners',.9,12,1.5,.15,1),('Small paid entry',.65,16,1.1,0,0),('Premium fixed scope',1.35,16,.9,0,1),('Referral requests',1,10,.75,0,1),('Expert rescue positioning',1.15,14,1.05,0,0),('Sales intensive',1,22,1.4,0,1),('Delivery intensive',1,10,.75,0,1),('Partner premium',1.2,14,1.1,.15,1),('Narrow repeatable sprint',1.1,16,1.05,0,1)]
def run(fi,pi,s):
 name,price,hours,win=OFFERS[fi];plan,mult,sales,access,share,delay=PLANS[pi]
 effort=hours*(.65 if plan=='Small paid entry' else .85 if plan=='Narrow repeatable sprint' else 1)*s['overrun']
 ticket=price*mult;cash=0;liability=0;minimum=0;earned=0;gross=0;completed=0;first=None;jobs=[];pipeline=[];due=[];path=[]
 for week in range(1,14):
  rng=random.Random(s['seed']+week*503);capacity=40-6-sales
  leads=(sales/8)*access*s['demand']*min(1,.30+week*.045)
  n=max(0,round(leads+rng.gauss(0,math.sqrt(max(.1,leads)))))
  for _ in range(n):
   if rng.random()<min(.65,win*s['win']*mult**-1.2):pipeline.append(week+delay)
  future=[]
  for when in pipeline:
   if when>week:future.append(when)
   elif len(jobs)<2:
    cash+=ticket*.5;liability+=ticket*.5;jobs.append(effort)
  pipeline=future;remaining=[]
  for need in jobs:
   delivery=min(capacity,need);capacity-=delivery;need-=delivery
   if need<=1e-8:
    completed+=1;earned+=ticket;liability-=ticket*.5
    # Partner fee paid only after a completed sale; no upfront cash commitment.
    cash-=ticket*share
    due.append((week+math.ceil(s['collection_delay']*4.333),ticket*.5*(1-s['bad_debt'])))
    if first is None:first=week
   else:remaining.append(need)
  jobs=remaining;future=[]
  for when,value in due:
   if when<=week:cash+=value
   else:future.append((when,value))
  due=future
  if week in (4,8,12):cash-=12000
  free=cash-liability;minimum=min(minimum,free);path.append(round(free))
  assert capacity>=-1e-8
 return {'scenario':s['id'],'surplus':cash-liability,'fundingNeeded':-minimum,'completed':completed,'firstEarnedWeek':first,'earned':earned,'cashPath':path}
def main():
 sc=scenarios(20261018);ranking=[];raw={}
 for fi,f in enumerate(OFFERS):
  for pi,p in enumerate(PLANS):
   identifier=f'B{fi+1:02}-{pi+1:02}';runs=[run(fi,pi,s) for s in sc];raw[identifier]=runs
   surplus=[x['surplus'] for x in runs];fund=[x['fundingNeeded'] for x in runs]
   row={'id':identifier,'offer':f[0],'plan':p[0],'illustrativePrice':round(f[1]*p[1]),'baseScopeHours':f[2],'salesHoursWeekly':p[2],'deliveryHoursWeekly':40-6-p[2],'medianSurplus':round(statistics.median(surplus)),'p10Surplus':round(percentile(surplus,.1)),'p90Surplus':round(percentile(surplus,.9)),'medianFundingNeeded':round(statistics.median(fund)),'p90FundingNeeded':round(percentile(fund,.9)),'zeroCashCoveredCases':sum(v<.01 for v in fund),'medianCompleted':statistics.median(x['completed'] for x in runs),'anyEarnedCashCases':sum(x['firstEarnedWeek'] is not None for x in runs)}
   # Zero-cash suitability first; then downside funding; then earned surplus.
   row['score']=row['zeroCashCoveredCases']*1000+.5*row['medianSurplus']+.5*row['p10Surplus']-.5*row['p90FundingNeeded'];ranking.append(row)
 ranking.sort(key=lambda x:x['score'],reverse=True)
 for i,r in enumerate(ranking):r['rank']=i+1
 result={'confirmedStartingCash':0,'monthlyBaseline':12000,'weeks':13,'runs':10000,'offers':OFFERS,'plans':PLANS,'ranking':ranking,'winners':ranking[:3],'raw':raw,'limitations':'Synthetic demand and prices. Bills assumed at weeks 4/8/12; earlier bills worsen results. No real clients or collections verified. No new paid resources; client funds cloud directly. No taxes or additional hires. Cannot guarantee any sale or cover bills already due.'}
 (P/'bootstrap-results.json').write_text(json.dumps(result));print(json.dumps(ranking[:3],indent=2))
 with (P/'bootstrap-strategies.csv').open('w') as f:w=csv.DictWriter(f,fieldnames=ranking[0].keys());w.writeheader();w.writerows(ranking)
if __name__=='__main__':main()
