"""Synthetic decision simulation, not an empirically calibrated forecast. USD, 24 months."""
import random,math,json,csv,statistics,hashlib
from pathlib import Path
OUT=Path(__file__).parent
# Ticket USD, project hours, retainer USD/hours, retention offer fraction,
# sales cycle months, scope risk, base proposal conversion, software product price.
FAMILIES=[
 ('AI workflow specialist',18000,100,1800,9,.55,1,1,.23,0),
 ('Immersive 3D studio',24000,165,1000,6,.20,2,1.35,.17,0),
 ('Paid discovery and R&D',6500,38,1200,8,.30,1,1.10,.26,0),
 ('Agency delivery partner',12000,90,1600,10,.45,1,1,.34,0),
 ('Managed AI operations',12000,80,3000,16,.85,2,1.10,.20,0),
 ('Productized automation',10500,52,1100,6,.65,1,.8,.30,0),
 ('Generalist custom studio',16000,145,1400,12,.30,2,1.5,.19,0),
 ('Vertical service-to-software',17000,105,1600,9,.50,2,1.05,.21,199),
 ('Software product first',0,0,0,0,0,0,1,0,149),
 ('Sponsored research lab',40000,300,2500,18,.25,4,1.6,.12,0),
]
# price multiplier, sales hours, marketing monthly, contract hours max/month,
# fixed extra monthly, early hire monthly from month3, Labs hours, fixed Labs,
# surplus Labs allocation, recurring offer multiplier, product dev hours.
PLANS=[
 ('Founder lean',1,36,400,0,150,0,8,0,.10,1,0),
 ('Discovery-led',.9,44,600,40,250,0,8,0,.10,1.1,0),
 ('Recurring-first',1.05,32,600,60,400,0,8,0,.12,1.45,0),
 ('Premium narrow offer',1.4,46,800,50,300,0,8,0,.15,1.1,0),
 ('Partner distribution',.9,26,300,100,350,0,10,0,.10,1.1,0),
 ('Flexible delivery team',1.1,38,900,160,500,0,10,0,.15,1.15,0),
 ('Acquisition spending',1.05,48,3200,120,900,0,12,0,.15,1.15,0),
 ('Early permanent team',1.1,40,1800,160,900,8500,16,0,.15,1.1,0),
 ('Product investment',1.15,30,1500,90,700,0,10,0,.15,1.1,48),
 ('Research expansion',1.15,28,900,90,700,0,36,4000,.25,1,16),
]
def percentile(a,p):
 a=sorted(a);x=(len(a)-1)*p;i=int(x);return a[i]+(a[min(i+1,len(a)-1)]-a[i])*(x-i)
def scenarios(seed):
 rng=random.Random(seed);dims={}
 ranges={'demand':(.45,1.65),'win':(.55,1.45),'overrun':(1,1.8),'collection_delay':(0,2),'bad_debt':(0,.09),'churn':(.01,.09),'cac':(.6,1.8),'fit':(.15,1.4),'cost':(.8,1.35)}
 for k,(lo,hi) in ranges.items():
  v=[lo+(hi-lo)*(i+rng.random())/100 for i in range(100)];rng.shuffle(v);dims[k]=v
 result=[]
 for i in range(100):
  r={k:v[i] for k,v in dims.items()};r.update(id=i+1,seed=seed+i*104729,recession_start=4+i%12,recession_length=2+i%5,recession_drop=.10+(i%5)*.075)
  # Stress blocks introduce plausible correlation; no independence claim.
  if r['demand']<.8:r['collection_delay']=max(1,r['collection_delay']);r['win']=min(1,r['win'])
  result.append(r)
 return result

def policy(fi,pi):
 f=FAMILIES[fi];p=PLANS[pi];return dict(id=f'{fi+1:02}-{pi+1:02}',family=f[0],plan=p[0],familyIndex=fi,planIndex=pi)
def simulate(pol,s,baseline=12000,headwind=False):
 f=FAMILIES[pol['familyIndex']];p=PLANS[pol['planIndex']]
 name,ticket,hours,ret_fee,ret_hours,ret_rate,cycle,risk,win,product_fee=f
 label,price,sales,marketing,flex,extra,hire,labs_hours,labs_fixed,labs_share,ret_mul,dev_hours=p
 if product_fee and dev_hours==0:dev_hours=32 if ticket else 72
 if ticket==0:sales=max(24,sales);dev_hours=max(60,dev_hours)
 # Interns are not free billable senior staff. Reserve 12 founder hours/month for supervision.
 dev_hours=min(dev_hours,max(0,160-24-12-sales-labs_hours))
 founder_capacity=max(0,160-24-12-sales-labs_hours-dev_hours)
 jobs=[];retainers=[];pipeline=[];receivables=[];product_customers=0;dev=0;validated=0;launched=False
 cash=0;deposit_liability=0;min_free=0;earned=0;collected=0;costs=0;labs_total=0;completed=0;turned_away=0;max_backlog=0;used_hours=0;path=[]
 for m in range(24):
  rng=random.Random(s['seed']+m*1009);market=s['demand']*(1-s['recession_drop'] if s['recession_start']<=m<s['recession_start']+s['recession_length'] else 1)
  if headwind:market*=.70
  credibility=min(1,.38+m*.075);contract_rate=55*s['cost'];staff=hire if m>=2 else 0
  support_budget=founder_capacity;staff_remaining=100 if staff else 0;contract_budget=flex+staff_remaining;month_earned=0;month_cash=0;month_cost=0;product_income=0
  # Attrition and support must be served before accepting more projects.
  retained=[]
  for r in retainers:
   if rng.random()<s['churn']:continue
   need=ret_hours*s['overrun']*.85;served=min(need,support_budget+contract_budget)
   own=min(support_budget,served);support_budget-=own;outsourced=served-own;contract_budget-=outsourced;staff_use=min(staff_remaining,outsourced);staff_remaining-=staff_use;month_cost+=(outsourced-staff_use)*contract_rate;used_hours+=own
   fulfil=served/need if need else 1
   income=r*fulfil*(1-s['bad_debt']);month_cash+=income;month_earned+=income
   if fulfil>.8:retained.append(r)
  retainers=retained
  # Product launches need build time and paid-service reuse or modeled pilot interest (not observed payments).
  dev+=dev_hours
  qualified=(sales/6+marketing/(450*s['cac']))*market*credibility
  if product_fee:
   validated+=qualified*.12*s['fit']
   if dev>=600 and (completed>=3 or validated>=5):launched=True
   if launched:
    churn=round(product_customers*s['churn']);product_customers=max(0,product_customers-churn)
    acquisition_budget=marketing*.55
    new=max(0,round((acquisition_budget/(350*s['cac'])+qualified*.10)*s['fit']+rng.gauss(0,.6)))
    product_customers+=new
    product_income=product_customers*product_fee*(1-s['bad_debt']);month_cash+=product_income;month_earned+=product_income
    # Delivery and support are not free even with AI agents.
    month_cost+=product_income*.22+product_customers*.65*contract_rate
  # New proposals are delayed by the sales cycle; price affects conversion.
  if ticket:
   n=max(0,round(qualified+rng.gauss(0,math.sqrt(max(.1,qualified)))))
   if label=='Partner distribution':n=round(n*1.4)
   prob=min(.65,win*s['win']*price**-1.2)
   for k in range(n):
    if rng.random()<prob:pipeline.append((m+cycle,ticket*price*(.85+rng.random()*.3),hours*s['overrun']*risk))
  # Cap work in progress to avoid selling impossible throughput.
  still=[]
  for due,value,effort in pipeline:
   if due>m:still.append((due,value,effort));continue
   if len(jobs)>=3:turned_away+=1;continue
   deposit=value*.4;month_cash+=deposit;deposit_liability+=deposit;jobs.append({'value':value,'remaining':effort,'deposit':deposit})
  pipeline=still
  remaining=[]
  for j in jobs:
   if j['remaining']>0:
    production=min(j['remaining'],support_budget+contract_budget);own=min(support_budget,production);support_budget-=own;outsourced=production-own;contract_budget-=outsourced;j['remaining']-=production;staff_use=min(staff_remaining,outsourced);staff_remaining-=staff_use;month_cost+=(outsourced-staff_use)*contract_rate;used_hours+=own
   if j['remaining']<=1e-8:
    completed+=1;month_earned+=j['value'];deposit_liability-=j['deposit']
    remainder=j['value']*.6*(1-s['bad_debt']);delay=math.ceil(s['collection_delay']);receivables.append((m+delay,remainder))
    if ret_fee and rng.random()<min(.95,ret_rate*ret_mul):retainers.append(ret_fee*price)
   else:remaining.append(j)
  jobs=remaining;max_backlog=max(max_backlog,len(jobs))
  pending=[]
  for due,value in receivables:
   if due<=m:month_cash+=value
   else:pending.append((due,value))
  receivables=pending
  # New costs are incremental to the confirmed combined $12k baseline.
  month_cost+=max(0,month_earned-product_income)*.07
  cash_cost=month_cost+baseline+marketing+extra+staff+labs_fixed
  cash+=month_cash-cash_cost
  free=cash-deposit_liability
  funded_labs=max(0,month_cash-cash_cost)*labs_share if free>3*baseline else 0
  cash-=funded_labs;free-=funded_labs;labs_total+=labs_fixed+funded_labs
  min_free=min(min_free,free);earned+=month_earned;collected+=month_cash;costs+=cash_cost+funded_labs
  path.append({'month':m+1,'earned':round(month_earned),'collected':round(month_cash),'freeCash':round(free),'cumulativeCash':round(cash),'unearnedDeposits':round(deposit_liability),'labs':round(labs_fixed+funded_labs),'customers':product_customers,'activeRetainers':len(retainers),'completed':completed})
 # Cash conservation is a model invariant, not a claim of accounting profit.
 assert abs(cash-(collected-costs))<.001
 assert support_budget>=-1e-6 and contract_budget>=-1e-6
 return {'scenario':s['id'],'earned':earned,'collected':collected,'surplus':cash-deposit_liability,'requiredCash':-min_free,'labs':labs_total,'completed':completed,'retainers':len(retainers),'customers':product_customers,'launched':launched,'turnedAway':turned_away,'founderHours':used_hours+24*(sales+24+12+labs_hours+dev_hours),'monthly':path}

def summarize(p,runs):
 a=[r['surplus'] for r in runs];fund=[r['requiredCash'] for r in runs]
 return {**p,'medianSurplus':round(statistics.median(a)),'p10Surplus':round(percentile(a,.1)),'p90Surplus':round(percentile(a,.9)),'medianRevenue':round(statistics.median(r['earned'] for r in runs)),'medianCollected':round(statistics.median(r['collected'] for r in runs)),'medianRequiredCash':round(statistics.median(fund)),'p90RequiredCash':round(percentile(fund,.9)),'medianLabs':round(statistics.median(r['labs'] for r in runs)),'positiveCases':sum(x>0 for x in a),'fundedAt25k':sum(x<=25000 for x in fund),'fundedAt50k':sum(x<=50000 for x in fund),'fundedAt100k':sum(x<=100000 for x in fund),'medianCompleted':round(statistics.median(r['completed'] for r in runs),1),'medianRetainers':round(statistics.median(r['retainers'] for r in runs),1),'medianCustomers':round(statistics.median(r['customers'] for r in runs),1),'launchCases':sum(r['launched'] for r in runs),'founderHoursMonthly':round(statistics.median(r['founderHours'] for r in runs)/24,1)}
def score(r,mode='balanced'):
 # Dollar-denominated judgement: prefer surplus, penalize funding and downside.
 if mode=='upside':return .65*r['medianSurplus']+.35*r['p90Surplus']-.25*r['p90RequiredCash']
 if mode=='cash':return .35*r['medianSurplus']+.65*r['p10Surplus']-r['p90RequiredCash']
 if mode=='labs':return .40*r['medianSurplus']+.35*r['p10Surplus']+.5*r['medianLabs']-.75*r['p90RequiredCash']
 return .6*r['medianSurplus']+.4*r['p10Surplus']-.75*r['p90RequiredCash']+.1*r['medianLabs']
def main():
 sc=scenarios(20261018);policies=[policy(f,p) for f in range(10) for p in range(10)];assert len({p['id'] for p in policies})==100
 all_runs={p['id']:[simulate(p,s) for s in sc] for p in policies}
 summary=[summarize(p,all_runs[p['id']]) for p in policies]
 for r in summary:r['score']=round(score(r))
 summary.sort(key=lambda r:r['score'],reverse=True)
 for i,r in enumerate(summary):r['rank']=i+1
 # Alternate external scenarios and demand headwind check selection stability.
 holdout=scenarios(20261019);validation=[summarize(p,[simulate(p,s) for s in holdout]) for p in policies];validation.sort(key=score,reverse=True)
 headwind=[summarize(p,[simulate(p,s,headwind=True) for s in sc]) for p in policies];headwind.sort(key=score,reverse=True)
 sensitivity={mode:[r['id'] for r in sorted(summary,key=lambda r:score(r,mode),reverse=True)[:3]] for mode in ['balanced','cash','upside','labs']}
 family_winners=[];seen=set()
 for r in summary:
  if r['family'] not in seen:family_winners.append(r);seen.add(r['family'])
 winners=summary[:3]
 validation_ranks={r['id']:i+1 for i,r in enumerate(validation)};headwind_ranks={r['id']:i+1 for i,r in enumerate(headwind)}
 data={'meta':{'date':'2026-10-18','currency':'USD','months':24,'strategies':100,'mainScenarios':100,'mainRuns':10000,'validationRuns':10000,'headwindRuns':10000,'baselineMonthly':12000,'seed':20261018,'startingCash':0,'confirmedStartingCash':0,'status':'synthetic assumptions, not market-calibrated probabilities','taxes':'not computed; baseline mixes business costs and living withdrawals; surplus is not accounting profit'},'families':FAMILIES,'plans':PLANS,'scenarios':sc,'ranking':summary,'winners':winners,'distinctFamilyWinners':family_winners[:3],'sensitivity':sensitivity,'holdoutTop3':[r['id'] for r in validation[:3]],'headwindTop3':[r['id'] for r in headwind[:3]],'validationRanks':validation_ranks,'headwindRanks':headwind_ranks,'winnerScenarios':{r['id']:all_runs[r['id']] for r in winners}}
 (OUT/'results.json').write_text(json.dumps(data,indent=2))
 (OUT/'all-runs.json').write_text(json.dumps(all_runs))
 with (OUT/'strategies.csv').open('w') as f:
  w=csv.DictWriter(f,fieldnames=summary[0].keys());w.writeheader();w.writerows(summary)
 with (OUT/'all-runs.csv').open('w') as f:
  fields=['strategy','scenario','earned','collected','surplus','requiredCash','labs','completed','retainers','customers','launched','founderHours'];w=csv.DictWriter(f,fieldnames=fields);w.writeheader()
  for p,runs in all_runs.items():
   for r in runs:w.writerow({'strategy':p,**{k:r[k] for k in fields[1:]}})
 print(json.dumps({'top3':winners,'distinctTop3':family_winners[:3],'sensitivity':sensitivity,'holdoutTop3':data['holdoutTop3'],'headwindTop3':data['headwindTop3']},indent=2))
if __name__=='__main__':main()
