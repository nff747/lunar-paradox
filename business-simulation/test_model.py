import unittest,simulate as m,math
class ModelTests(unittest.TestCase):
 def test_grid_and_reproducibility(self):
  self.assertEqual(len({m.policy(f,p)['id'] for f in range(10) for p in range(10)}),100)
  s=m.scenarios(20261018);self.assertEqual(len(s),100);self.assertEqual(s,m.scenarios(20261018))
  p=m.policy(0,0);self.assertEqual(m.simulate(p,s[0]),m.simulate(p,s[0]))
 def test_zero_demand_and_cash_conservation(self):
  s=m.scenarios(20261018)[0];s['demand']=0
  # With no qualified opportunities no sales are produced.
  r=m.simulate(m.policy(0,0),s)
  self.assertEqual(r['earned'],0);self.assertEqual(r['collected'],0)
  self.assertEqual(r['surplus'],-24*(12000+400+150))
  self.assertEqual(r['requiredCash'],-r['surplus']);self.assertEqual(r['labs'],0)
 def test_founder_capacity_all_policies(self):
  for f in range(10):
   for p in range(10):
    r=m.simulate(m.policy(f,p),m.scenarios(20261018)[20])
    self.assertLessEqual(r['founderHours'],160*24+.01);self.assertEqual(len(r['monthly']),24)
    self.assertTrue(all(math.isfinite(r[k]) for k in ['earned','collected','surplus','requiredCash']))
    self.assertGreaterEqual(r['requiredCash'],0)
    self.assertTrue(all(x['unearnedDeposits']>=-.01 for x in r['monthly']))
 def test_reserve_consistency(self):
  r=m.simulate(m.policy(5,5),m.scenarios(20261018)[40])
  self.assertGreaterEqual(r['requiredCash']+1, max(0,-min(x['freeCash'] for x in r['monthly'])))
 def test_early_hire_is_real_capacity_and_cost(self):
  s=m.scenarios(20261018)[30];s['demand']=0;r=m.simulate(m.policy(0,7),s)
  self.assertEqual(r['surplus'],-24*(12000+1800+900)-22*8500)
if __name__=='__main__':unittest.main()
