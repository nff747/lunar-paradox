import simulate as m,json
from pathlib import Path
root=Path(__file__).parent;data=json.loads((root/'results.json').read_text());old=m.FAMILIES[5];x=list(old);x[2]*=2;m.FAMILIES[5]=tuple(x)
sc=m.scenarios(20261018);ranking=[]
for f in range(10):
 for p in range(10):
  policy=m.policy(f,p);ranking.append(m.summarize(policy,[m.simulate(policy,s) for s in sc]))
ranking.sort(key=m.score,reverse=True)
result={'change':'Productized automation base project effort increased from 52 to 104 hours; all other inputs unchanged','runs':10000,'top3':ranking[:3],'ranks':{r['id']:i+1 for i,r in enumerate(ranking)}}
(root/'assumption-stress.json').write_text(json.dumps(result,indent=2));print(json.dumps(result['top3'],indent=2))
