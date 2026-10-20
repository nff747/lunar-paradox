# COMMERCIAL DRAFTING PACK (INTERNAL DRAFT FOR PROFESSIONAL LEGAL REVIEW)

> [!WARNING]
> This document contains drafting templates and baseline commercial clauses for Lunar Paradox. It does **not** constitute formal legal advice. All agreements and tax classifications must be reviewed by qualified UK legal and accounting counsel prior to execution with third-party clients.

---

## 1. INTAKE PREREQUISITES PROTOCOL

The 3-day turnaround clock for any Technical Direction Spike begins **if and only if** all of the following conditions are satisfied:

1. **Executed SOW:** SOW signed by both an authorized representative of Lunar Paradox and the client.
2. **Cleared Payment:** 100% upfront retainer cleared into Lunar Paradox's designated commercial account.
3. **Asset & Repo Intake:** Client repository, 3D meshes, and texture assets pass automated build and validation checks.
4. **Working Credentials:** Repository access permissions and local build instructions verified functional.
5. **Designated Sign-Off Authority:** Exactly one individual designated in writing with binding authority to approve deliverables.

---

## 2. STANDARD SHORT SERVICES AGREEMENT (TEMPLATE)

### Parties
- **Service Provider:** Lunar Paradox (Operating under designated UK sole trader / entity status).
- **Client:** [Client Legal Entity Name], [Jurisdiction / Registered Address].

### Key Operative Terms

#### Clause 1 — Services & Statement of Work
Provider agrees to deliver the specific technical direction or optimization tasks set forth in the attached Statement of Work (SOW). Any work outside the explicit scope of the SOW requires a written change order.

#### Clause 2 — Compensation & Payment
Client agrees to pay the fee specified in the SOW. For technical direction spikes, 100% of the total fee is payable prior to work commencement. Initial deposits are earned against reserved specialist capacity and become non-refundable once scheduled work begins, subject to applicable governing law.

#### Clause 3 — Intellectual Property Rights
1. **Background IP:** Provider retains exclusive ownership of all pre-existing software, mathematical solvers, procedural shader routines, proprietary algorithms, and toolchains developed prior to or independently of this agreement ("Lunar Paradox Background IP"). Provider grants Client a perpetual, worldwide, non-exclusive license to use Background IP embedded within the final project deliverable solely for the operation of that deliverable.
2. **Foreground IP:** Subject to full, cleared payment of all invoices under the relevant SOW, Provider assigns to Client all copyright in bespoke code and assets created exclusively for Client under that SOW. No IP transfers until all invoices are settled in full.
3. **Third-Party & Open Source:** Any third-party libraries (e.g. Three.js, WebGL extensions) remain subject to their respective open-source licenses.

#### Clause 4 — Review & Acceptance Window
Client shall have five (5) business days following delivery of the milestone or sandbox link ("Review Period") to verify that the deliverable conforms to the objective specifications in the SOW. If no written notice of non-conformance detailing specific reproducible defects is received within the Review Period, the deliverable is deemed accepted in full.

#### Clause 5 — Target Environment & Warranties
Provider warrants that deliverables will perform against the specific hardware, operating system, and browser versions explicitly defined in the SOW. Provider makes no warranty regarding performance on unlisted legacy hardware, beta operating systems, or unsupported third-party software.

#### Clause 6 — Termination
Either party may terminate for material breach uncured within ten (10) days of written notice. In the event of early termination by Client without Provider breach, Provider shall retain all fees paid for elapsed milestones, committed third-party expenses, and reserved calendar capacity.

---

## 3. STATEMENT OF WORK (SOW) A: PROTOTYPE SPIKE

- **Engagement Type:** Prototype Spike (Unverified Visual/Interaction Mechanic)
- **Target Deliverable:** 1 isolated interactive mechanic (e.g., custom procedural fracture / volumetric rim shader)
- **Reference Device:** Named Desktop Hardware (e.g., Apple M-Series GPU or NVIDIA RTX 3060+, Chrome Stable)
- **Deliverables Package:**
  1. Private hosted sandbox URL (maintained active for 30 calendar days).
  2. Clean source archive (`.zip`) with deployment documentation.
  3. 1-page Technical Findings & Trade-off Brief.
- **Fixed Fee:** $3,500 USD (100% upfront upon signing).
- **Timeframe:** Exactly 3 consecutive business days from completion of Intake Prerequisites.

---

## 4. STATEMENT OF WORK (SOW) B: PERFORMANCE SPIKE

- **Engagement Type:** Performance Spike (Scene Profiling & Bottleneck Remediation)
- **Target Deliverable:** Profiling and frame-time stabilization of 1 existing client WebGL scene
- **Reference Device:** Named Reference Hardware and agreed target frame interval (e.g. 60 FPS @ 1080p DPR 1.0)
- **Deliverables Package:**
  1. Detailed flamegraph and bottleneck diagnostic report (CPU/GPU bound breakdown).
  2. Implementation of 1 prioritized optimization pass.
  3. Before/after frame-time histograms recorded under identical test camera trajectories.
  4. Pull Request or clean patch file (if repository access and build instructions supplied on Day 1).
- **Fixed Fee:** $3,500 USD (100% upfront upon signing).
- **Timeframe:** Exactly 3 consecutive business days from completion of Intake Prerequisites.
