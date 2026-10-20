from pathlib import Path
import json
P=Path(__file__).parent

def a(title,how,proof,when):return dict(title=title,how=how,proof=proof,when=when,owner='Founder; intern help only within demonstrated capability')
def pillar(name,goal,actions):assert len(actions)==8;return dict(name=name,goal=goal,actions=actions)
current=[
pillar('Cash & runway','Know what must be earned before each bill falls due.',[
a('List due bills','Separate business costs, personal living costs and delivery obligations; record due dates.','A dated obligations ledger; no assumed cash.','Days 1–2'),
a('13-week cash view','Forecast weekly receipts and payments; update from actual bank movements.','A rolling cash sheet with a visible shortfall.','Day 2; update weekly'),
a('Protect deposits','Reserve unearned client money for its agreed delivery and refund obligations.','Available cash excludes restricted or unearned money.','Every payment'),
a('Pause new spend','No new paid agents, subscriptions, advertising, hiring or Labs purchases without funded need.','New discretionary commitments stay at zero.','Immediately'),
a('Check urgent gap','Match cash due in the next 7/30 days against genuinely collectible earned receipts.','Uncovered bills identified before their due date.','Daily initially'),
a('Discuss timing early','Where needed, discuss legitimate payment timing with counterparties; do not assume concessions.','Any changed terms recorded and actually agreed.','Before obligations fall due'),
a('Cost each job','Include delivery time, cloud, support, rework and payment costs before quoting.','A costed scope and achievable delivery plan.','Before every proposal'),
a('Build first buffer','Retain earned surplus after obligations; first protect the next month of actual baseline costs.','Cash reserve measured against the current burn.','After earned receipts')]),
pillar('One paid offer','Sell one bounded outcome you can deliver using existing resources.',[
a('Choose buyer','Pick one reachable buyer group with a costly, concrete technical problem.','One buyer profile supported by conversations.','Week 1'),
a('Choose outcome','Select an automation pilot, performance fix or technical design service that matches real skills.','One clearly described deliverable.','Week 1'),
a('Bound the scope','Specify inputs, exclusions, deliverables, review rounds and acceptance criteria.','A one-page scope.','Week 1'),
a('Use current hardware','Choose work deliverable without purchasing equipment; client supplies required paid accounts.','No unfunded delivery dependency.','Before offering'),
a('Price from evidence','Check value, actual effort and buyer response; model prices are not market validation.','Recorded pricing assumptions and feedback.','Each proposal'),
a('Offer paid discovery','Where uncertainty is high, sell a useful standalone investigation before a larger build.','A defined discovery result, not a vague consultation.','When scope is uncertain'),
a('Sell a small pilot','Offer a narrow first engagement with clear milestones and payment terms.','Proposed target: two paid pilots by day 90.','Days 15–90'),
a('Keep only what works','Revise or stop an offer that fails buyer or delivery tests instead of expanding its scope.','A weekly keep/change/stop decision.','Every week')]),
pillar('Client pipeline','Turn relevant conversations into appropriately scoped paid engagements.',[
a('Build prospect list','Identify relevant businesses and agency partners from public information; record why each fits.','Proposed target: 30 researched prospects.','First two weeks'),
a('Ask for introductions','Request relevant introductions from genuine existing contacts without inventing relationships.','Introductions and replies recorded.','Weeks 1–4'),
a('Personal outreach','Prepare specific, respectful messages about the recipient’s problem; send manually and follow applicable rules.','Proposed cadence: 10 relevant contacts per week.','Weekly'),
a('Agency conversations','Explore overflow or specialist delivery work with agencies that already serve suitable clients.','A real discussion about scope and payment.','Weeks 2–6'),
a('Listen before pitch','Ask about the current workflow, consequence, budget, authority and decision timing.','Proposed target: 20–30 buyer conversations by day 90.','Days 1–90'),
a('Qualify the fit','Check capability, urgency, realistic budget, ownership and delivery dependencies.','Qualified opportunity record; no invented lead score.','Every enquiry'),
a('Send scoped proposal','Translate the agreed problem into deliverables, exclusions, terms and a costed estimate.','Proposed target: five qualified proposals by day 90.','After discovery'),
a('Follow up cleanly','Track next agreed action; close stale opportunities instead of counting them as revenue.','Pipeline has an owner, next step and date.','Twice weekly')]),
pillar('Useful following','Build a relevant audience that can explain, try or commission your work.',[
a('Pick one channel','Start where the chosen buyer or technical community participates; record the actual following baseline.','One primary channel and dated baseline; unknown counts stay unknown.','Week 1'),
a('Publish build notes','Explain a real problem, approach, result and limitation from your own work.','Proposed target: one useful post per week.','Weekly'),
a('Show working demos','Share a genuine demonstration; label internal or self-initiated work honestly.','A working demo and clear provenance.','Weeks 2–6'),
a('Teach something useful','Publish a practical explanation or reusable insight relevant to the chosen audience.','Reader questions or useful feedback.','Twice monthly'),
a('Invite relevant feedback','Ask what would make the work useful, not merely whether the visuals look impressive.','Feedback tied to a buyer or user problem.','Every release'),
a('Offer voluntary updates','Prepare explicit opt-in updates only once consent, delivery and unsubscribe actually work.','No mailing list is claimed operational before setup.','After the mechanism works'),
a('Track qualified interest','Count relevant replies, demo engagement and enquiries separately from followers or impressions.','Weekly counts with source links.','Weekly'),
a('Convert attention','Give posts and demos one relevant next action: discuss a project, try a real experiment or follow progress.','A functioning destination; no empty funnel.','Every public item')]),
pillar('Reliable delivery','Finish small work well enough to earn trust and repeat business.',[
a('Capacity calendar','Budget a 40-hour week across sales, delivery, admin, content and supervision.','No sold workload exceeds actual available hours.','Before accepting work'),
a('Acceptance checklist','Agree what completion means with the client before implementation.','Written, testable acceptance criteria.','At kickoff'),
a('Weekly milestones','Break delivery into inspectable outcomes and share progress against scope.','A working increment and next milestone.','Each delivery week'),
a('Track actual effort','Measure delivery, rework, meetings and support time against the estimate.','Actual hours per deliverable.','Daily'),
a('Test before handover','Verify the agreed critical workflows and failure states in supported environments.','A relevant test record and known limitations.','Before acceptance'),
a('Control changes','Quote extra scope separately; do not absorb unlimited additions into the original fee.','Accepted change records.','Whenever scope changes'),
a('Handover clearly','Provide usable instructions, access ownership and agreed support boundaries.','Client can operate the delivered work.','At delivery'),
a('Ask for repeat work','After successful delivery, discuss a genuinely useful next step or bounded maintenance.','Consent-based feedback or follow-on scope.','After acceptance')]),
pillar('Trust & website','Use Syzygy, Gravity and Astrolabe to clarify the company rather than obscure it.',[
a('State the offer','Syzygy explains what can be commissioned and who the service fits.','A visitor can describe the offer in plain language.','Weeks 1–2'),
a('Separate controls','HOLD controls the fracture only; ENTER opens the company journey.','Both interactions tested independently.','Before demonstrations'),
a('Keep roles clear','Syzygy is Brand/Studio, Gravity is Labs, Astrolabe is Products; keep navigation consistent.','Three independent experiences with clear links.','Every release'),
a('Honest evidence','Show only genuine internal work and approved client evidence.','No fabricated clients, results or product availability.','Every publication'),
a('Apply then review','Explain the application, decision and next-step expectations without implying a booking.','Applicant understands what happens next.','Before public launch'),
a('Estimate after fit','Accepted applications unlock real configured options and an indicative estimate.','No fictitious rates or guaranteed final quote.','After acceptance'),
a('Finish public delivery','Before internet use, configure real notifications, identity, abuse protection and privacy arrangements.','End-to-end hosted workflow verified.','Before public submissions'),
a('Readable fallback','Keep core content, contact and navigation usable with keyboard, reduced motion and lightweight viewing.','Checks on actual intended devices.','Before client reliance')]),
pillar('Revenue follow-up','Collect earned money and learn whether the offer is economically repeatable.',[
a('Invoice on milestones','Issue agreed invoices promptly when the relevant milestone is achieved.','Invoice and delivery records match.','Each milestone'),
a('Track payment dates','Separate invoices, collected cash, earned revenue and unearned deposits.','No booked revenue treated as cash.','Weekly'),
a('Confirm collections','Follow up on overdue invoices using the agreed terms and actual status.','A current receivables list.','Weekly'),
a('Know job margin','Compare collected earned fees with actual incremental delivery costs and time.','Per-project economics after handover.','Every project'),
a('Offer bounded support','Sell support only where there is continuing value and capacity, with usage limits.','A support agreement with clear boundaries.','After suitable delivery'),
a('Seek referrals','Ask satisfied clients whether they can introduce a suitable buyer.','A voluntary introduction, not a promised pipeline.','After successful work'),
a('Review price fit','Use real delivery and buyer data to raise, narrow or retire an offer.','A documented pricing decision.','Monthly'),
a('Do not scale losses','Stop adding work that consistently consumes more cash or capacity than it earns.','Corrective action before expanding.','At each review')]),
pillar('Weekly decisions','Manage from evidence instead of optimistic forecasts or vanity metrics.',[
a('Monday priorities','Choose one sales outcome, one delivery outcome and one cash risk to address.','Three named priorities and owners.','Every Monday'),
a('Daily next action','Work the highest-value next action rather than repeatedly redesigning the website.','A completed sales or delivery action.','Each working day'),
a('Friday scorecard','Review qualified conversations, proposals, earned collections, hours and cash gap.','A dated scorecard, even when results are poor.','Every Friday'),
a('Day-14 offer check','If conversations are not clarifying demand, change buyer access or the offer before building more.','Evidence-based revision.','Day 14'),
a('Day-30 decision','Compare receipts and near-term obligations; change the plan if the gap remains unaddressed.','A realistic next-month cash plan.','Day 30'),
a('Day-60 delivery check','Compare pilot outcomes, margins and willingness to repeat or refer.','Proof that the service can be repeated.','Day 60'),
a('Day-90 gate','Choose a repeatable offer or explicitly reset the strategy; do not call activity traction.','A documented continue/change/stop decision.','Day 90'),
a('Refresh simulations','Replace assumed prices, close rates and hours with observations; keep uncertainty visible.','A model using actual measured inputs.','Monthly')])]
future=[
pillar('Repeatable Studio','Create dependable earned revenue before expanding the cost base.',[
a('Prove one offer','Repeat a well-defined service for independent paying buyers.','Proposed gate: three successful paid deliveries.','After paid validation'),
a('Standardize delivery','Reuse checklists and internal components while respecting client IP.','Lower measured rework and delivery variance.','After repeated work'),
a('Build recurring value','Offer bounded ongoing operation or support for systems that genuinely need it.','Recurring contribution after support costs.','When value is ongoing'),
a('Diversify clients','Avoid funding the whole company from a single fragile relationship.','A reviewed concentration risk.','Before increasing fixed costs'),
a('Price capacity','Reprice using actual utilization, support burden, costs and buyer value.','Healthy contribution at attainable workload.','Quarterly'),
a('Use flexible specialists','Add verified contractors only against funded, scoped work.','Cost and responsibility agreed before commitment.','When capacity is proven short'),
a('Protect reserves','Keep delivery obligations, tax provision and operating runway separate from discretionary funds.','Three baseline months protected before discretionary growth.','Before expansion'),
a('Reduce founder bottleneck','Document the service so someone else can deliver reviewed portions safely.','Independent work passes the agreed checks.','Before larger volume')]),
pillar('Trusted brand','Become known for useful outcomes, not only striking visuals.',[
a('Publish case studies','Explain the real problem, deliverable, constraints and outcome with permission.','Approved evidence and accurate attribution.','After successful deliveries'),
a('Publish expertise','Share technically useful material based on actual work.','A consistent, relevant publishing record.','Ongoing'),
a('Build a demo library','Keep a small set of working, maintained examples linked to actual capabilities.','No abandoned demos presented as live products.','After proven capacity'),
a('Earn referrals','Make successful work easy for clients to describe and recommend.','Voluntary qualified introductions.','After client value'),
a('Nurture opted-in users','Send relevant updates with real consent and a functioning unsubscribe.','Engaged recipients, not purchased lists.','After delivery infrastructure'),
a('Partner credibly','Work with complementary agencies, communities and specialists on clear terms.','Documented collaborations and referrals.','After mutual fit'),
a('Measure trust signals','Track repeat enquiries, referral sources and useful engagement.','A consistent attribution record.','Monthly'),
a('Maintain honesty','Separate concepts, experiments, internal demos, client work and released products.','Every public claim has evidence.','Always')]),
pillar('Products','Turn repeated demand into a product with paying users and supportable economics.',[
a('Find repeated need','Look for a shared problem across independent conversations and engagements.','Proposed gate: three independent buyers confirm the need.','After service evidence'),
a('Validate payment','Test willingness to pay before committing to a substantial build.','A paid pilot or clearly documented commercial commitment.','Before major development'),
a('Define the user','Specify who benefits, what task improves and why alternatives are insufficient.','A clear product use case.','Before development'),
a('Budget the stage','Cost development, infrastructure, security, onboarding and support.','The next stage is fully funded.','Before each stage'),
a('Ship one usable slice','Release a narrow end-to-end capability rather than a large speculative platform.','Real users complete the intended task.','After funding'),
a('Price actual usage','Choose subscriptions, usage or licences around value and variable costs.','Measured contribution per customer.','During paid trials'),
a('Track retention','Measure return use, support demand, cancellations and reasons.','Evidence beyond signup counts.','After launch'),
a('Scale or stop','Expand only when acquisition and ongoing delivery economics are credible.','A clear continue/change/stop decision.','At staged reviews')]),
pillar('Labs funding','Fund bounded research without putting delivery or living obligations at risk.',[
a('Choose one thesis','Select a question with a specific experiment and useful possible result.','One written thesis and test.','Before funding requests'),
a('Price the experiment','Quote hardware, cloud, labour, data and contingency for a bounded stage.','A real budget; no invented massive funding target.','Before committing'),
a('Use surplus safely','Allocate earned discretionary surplus only after obligations and reserves are protected.','A documented, affordable transfer.','When surplus exists'),
a('Seek sponsored R&D','Offer a defined investigation to a sponsor with agreed deliverables and IP terms.','A signed and funded research stage.','When sponsor value is clear'),
a('Check funding fit','Evaluate grants or partnerships against actual eligibility and restrictions.','Verified fit, deadlines and permitted use.','Before applying'),
a('Separate restricted cash','Ring-fence sponsor or grant funds and comply with their agreed purposes.','Research ledger reconciles to obligations.','After receipt'),
a('Buy at a gate','Purchase hardware or cloud only when required for a funded milestone.','Evidence for buy versus existing resources.','Before each purchase'),
a('Stage external capital','Consider investment only with a defensible research case and reviewed terms.','A funded plan with ownership trade-offs understood.','If justified')]),
pillar('Research practice','Make Labs a credible experimental organization with reproducible learning.',[
a('Set a falsifiable test','State what observation would support or reject the thesis.','Predefined success and stop conditions.','Before each experiment'),
a('Record methods','Version code, settings, datasets and constraints appropriately.','A repeatable experiment record.','During research'),
a('Respect data rights','Use data and software with appropriate permission and controls.','Recorded provenance and access boundaries.','Before use'),
a('Publish real findings','Include failures and limitations rather than only impressive demonstrations.','Evidence-backed research notes.','At milestones'),
a('Manage compute','Set workload budgets and limits; measure cost per useful result.','Actual usage and spending records.','Every run'),
a('Review independently','Seek relevant technical criticism and reproduce important results.','Issues and follow-up checks recorded.','Before strong claims'),
a('Transfer useful work','Promote an experiment into a product or Studio method only when the use case is validated.','An explicit handover and maintenance owner.','At a transfer gate'),
a('Archive honestly','Stop, document and preserve unproductive or superseded work.','Clear archive status and lessons.','At stop decisions')]),
pillar('People & systems','Grow delivery capability without growing uncontrolled payroll or agent costs.',[
a('Hire against demand','Add a role because funded work and capacity data justify it.','A role budget and measurable need.','Before recruitment'),
a('Plan fully loaded cost','Include pay, supervision, tools and applicable obligations in the hiring budget.','A reviewed affordability calculation.','Before commitment'),
a('Clarify contributor roles','Document responsibilities, access and work ownership appropriately.','Clear agreements and review boundaries.','Before work begins'),
a('Train with review','Give interns bounded tasks and feedback; do not substitute them for unsupervised senior delivery.','Reviewed work and learning evidence.','Ongoing'),
a('Budget agents','Add agents only where measured useful output exceeds tool and review cost.','Cost per accepted outcome, not agent count.','Before scaling automation'),
a('Least necessary access','Give people and tools only the access their work requires.','An access inventory and removal process.','At onboarding and review'),
a('Back up operations','Test restore, handover and recovery for company-critical systems.','A successful recovery exercise.','Before reliance'),
a('Delegate progressively','Transfer repeatable responsibilities with explicit authority and accountability.','Founder workload falls without quality loss.','After process maturity')]),
pillar('Financial resilience','Support growth from durable economics and protected cash.',[
a('Separate money flows','Distinguish business expenses, personal withdrawals, taxes, financing and profit appropriately.','Accounts that explain real cash movement.','Before scaling'),
a('Update cash weekly','Maintain a 13-week view and longer-range scenarios using actual receipts.','No unseen funding cliff.','Weekly'),
a('Build a growth reserve','Target three to six months of the new actual operating burn, beyond delivery obligations.','Reserve recomputed after hiring or infrastructure changes.','Before adding fixed costs'),
a('Track contribution','Measure service, product and research economics separately.','No hidden cross-subsidy or double counting.','Monthly'),
a('Review concentration','Stress-test loss of a major client, platform, supplier or product channel.','A realistic continuity response.','Quarterly'),
a('Control commitments','Approve recurring subscriptions, staff and compute within a visible budget.','No unmanaged automatic cost growth.','Before commitments'),
a('Match funding to use','Use earned cash, sponsorship or investment according to the risk and restrictions of the work.','Funding source matches purpose and duration.','At each funding decision'),
a('Review professionally','Get appropriate accounting and legal advice for actual structure, contracts and cross-border operations.','Decisions based on real circumstances.','Before consequential changes')]),
pillar('Global operations','Serve international buyers while keeping responsibilities and delivery clear.',[
a('Choose legal structure','Select the initial structure based on actual management, ownership and professional review.','A defensible structure, not a tax-haven guess.','Before it is needed'),
a('Clear contracts','Define scope, ownership, support, acceptance and payment for the actual engagement.','Terms understood by both parties.','Before delivery'),
a('Practical payments','Use supported payment methods and document fees, currencies and settlement timing.','A verified collection workflow.','Before accepting payment'),
a('Data boundaries','Identify where client data is stored and who can access it.','Documented controls and client requirements.','Before handling data'),
a('Time-zone delivery','Set working hours, response expectations and handover practices.','A predictable delivery rhythm.','At kickoff'),
a('Supplier resilience','Avoid making delivery depend on one unavailable model, cloud or proprietary tool.','Fallbacks tested where needed.','Before critical reliance'),
a('Maintain service quality','Expand regions only where communication, support and obligations remain manageable.','Quality holds as reach grows.','At expansion reviews'),
a('Add entities when needed','Create further entities only for justified operations, obligations or funding requirements.','Professional review of a real need.','When justified')])]
assert len(current)==len(future)==8
D={'date':'2026-10-18','facts':{'availableCash':0,'baselineMonthly':12000,'clients':'none reported','following':'not yet measured','resources':'existing hardware, founder skills and a few interns'},'current':{'title':'Earn, deliver, establish runway','horizon':'Next 90 days; proposed targets, not achieved results','pillars':current},'future':{'title':'Build a funded technology company','horizon':'After evidence and funding gates; indicative 3–24+ months, not promised dates','pillars':future}}
(P/'plan.json').write_text(json.dumps(D,indent=2))
text='# Lunar Paradox Mandala plan\n\n18 October 2026. Planning only. Confirmed cash: $0. Founder reports no clients yet, existing hardware and skills, and roughly $12,000/month combined company/living costs. Following is unmeasured. All numeric targets below are proposed, not achieved or forecast outcomes.\n\n## Funding needed now\n\nBaseline-only gap before new earned cash: $12,000 for 30 days; $36,000 for 90 days. Add actual incremental delivery costs and appropriate provisions; subtract genuinely available unrestricted cash and collectible earned receipts. These are cash obligations, not a sales forecast, corporate profit or tax calculation. Current available cash is zero. Client deposits remain reserved for their delivery obligations. Do not assume a new service business can generate the missing money before bills are due.\n\nIllustration only: at 70% contribution after incremental delivery costs, covering the $12,000 baseline requires about $17,143/month collected earned revenue before taxes and further reserves. Actual contribution is unverified; avoid counting costs twice. Future Labs funding is unknown until a specific project is budgeted.\n\n## First seven days\n\n1. Write the bill/deadline ledger and a 13-week cash view. Identify the immediate gap.\n2. Pick one reachable buyer, one costly problem and one deliverable you can finish with current resources.\n3. Prepare a real internal demonstration and a one-page scoped offer; do not fabricate client work.\n4. Research the first 10 suitable prospects and seek relevant conversations; no paid ads or automated spam.\n5. Check public application and contact workflows before relying on them. The current commissioning workflow runs locally; hosted identity and notification delivery remain unconfigured.\n6. Agree achievable paid work and delivery/payment terms; reserve undelivered funds.\n7. Review actual replies, scope, cash and capacity; change the offer or access route if evidence does not support it.\n\n## Proposed 90-day targets\n\n- 20–30 relevant buyer conversations, five qualified proposals, two useful paid pilots. These are activity/learning targets, not promised sales.\n- One genuinely useful public post each week, with working demonstrations and clear provenance. Track qualified replies, demo use, enquiries and voluntary update subscriptions; no invented follower target or fake traction.\n- One validated repeatable offer; real per-job effort and margin records.\n- Keep a weekly cash review and retain earned surplus toward the next month of actual obligations. Reaching that reserve is a goal, not something already funded.\n\n## Weekly founder capacity proposal\n\n40 hours: 14 sales, 16 delivery, 4 administration/cash, 4 useful content, 2 supervision. Rebalance to actual commitments; never sell beyond capacity. Dedicated speculative Labs/product development remains paused until affordable. Interns are not assumed to be free senior delivery capacity.\n\n'
for key in ['current','future']:
 phase=D[key];text+='## '+phase['title']+'\n\n'+phase['horizon']+'\n\n'
 for g in phase['pillars']:
  text+='### '+g['name']+'\n\n'+g['goal']+'\n\n'
  for x in g['actions']:text+=f"- **{x['title']}** — {x['how']} Evidence: {x['proof']} Timing: {x['when']}.\n"
  text+='\n'
text+='## Gates for future expansion\n\n- Repeatable Studio: proposed gate of three successful paid deliveries with acceptable measured economics and capacity.\n- Products: repeated demand from independent buyers, evidence of payment willingness, and a fully funded next build stage.\n- Labs: a bounded thesis, real stage budget and committed permissible funding; protect delivery obligations and reserves first.\n- Hiring: funded demand, a fully costed role and adequate reserves for the new burn.\n- Larger funding: actual proof, credible use of funds and reviewed terms; no invented investment valuation or grant eligibility.\n\nThe business simulation is a separate assumption-driven exercise, not evidence that these targets will be met. No messages, purchases, hiring, incorporation, fundraising applications or website changes were made by this plan.\n'
(P/'PLAN.md').write_text(text)
