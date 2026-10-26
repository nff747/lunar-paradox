# STATEMENT OF WORK: 5-DAY WEBGL HARDENING SPRINT

> **Reference**: SOW-LP-HARDEN-V1  
> **Service Provider**: Lunar Paradox (Technical Director / Graphics Engineering)  
> **Client**: [Client Entity Name / Studio]  
> **Effective Date**: [Start Date]  

---

### 1. Objective & Target Deliverable
Client has an existing interactive 3D WebGL / Three.js application experiencing frame-rate degradation, high memory consumption, or mobile thermal throttling. Provider will profile, batch, and optimize the scene to achieve a **locked 60 FPS frame interval (16.6ms)** on the agreed Reference Device.

### 2. Scope of Technical Implementation
Provider will execute the following five-day engineering passes:
1. **Asset Compression & Channel Packing**: Consolidate diffuse, roughness, and metalness maps into single-channel ORM textures; transcode uncompressed textures into WebP/Basis/KTX2 where supported.
2. **Draw-Call Batching & Instancing**: Refactor independent geometries into batched multi-draw instances, reducing total draw calls to **under 50 calls per frame**.
3. **Adaptive Resolution & Dynamic LOD**: Implement adaptive frame-budget throttling (`adaptive-graphics.js`) to safeguard against performance degradation during browser resize or background activity.
4. **Memory Leak & Garbage Collection Remediation**: Eliminate per-frame memory allocations and object creation within the animation loop.
5. **Flamegraph Benchmark Report**: Provide before/after frame-time histograms demonstrating sustained 60 FPS execution under identical camera trajectories.
6. **Code Handover**: Deliver tested, clean source code via Git Pull Request or standalone patch file against the client's target repository.

### 3. Schedule & Intake Prerequisites
The **5-Day Turnaround Clock** begins upon completion of the following:
* **Cleared Initial Deposit**: 50% upfront fee received into Lunar Paradox commercial account.
* **Input Freeze (Day 1)**: Client provides stable repository access, build instructions, and frozen 3D mesh/texture assets. Any subsequent changes to 3D models or creative direction require a separate change order.
* **Agreed Reference Hardware**: Named test profile (e.g. *MacBook Air M1/M2, Chrome Stable, DPR 1.5* and *iPhone 13+, Safari Stable*).

### 4. Compensation & Milestones
* **Fixed Engagement Fee**: **$4,500 USD**
  * **Milestone 1 (50% / $2,250 USD)**: Payable immediately upon SOW execution prior to kickoff. Non-refundable reservation of calendar engineering capacity.
  * **Milestone 2 (50% / $2,250 USD)**: Payable upon delivery of the optimized staging sandbox link and verified 60 FPS flamegraph report.
* **Final Code Release**: Final pull request / code merge credentials released immediately upon settlement of Milestone 2.

### 5. Intellectual Property & Acceptance
* **Client Rights**: Client receives complete ownership of bespoke optimizations and patch code upon cleared full payment.
* **Provider Rights**: Provider retains exclusive ownership of pre-existing background algorithms, shader solvers, and tooling frameworks.
* **Acceptance Window**: Client has three (3) business days following sandbox delivery to verify conformance with agreed performance benchmarks. If no reproducible defect is reported in writing within 3 days, work is deemed accepted in full.

---

**Signatures**:

For Client: ___________________________ Date: ____________  
For Lunar Paradox: ____________________ Date: ____________
