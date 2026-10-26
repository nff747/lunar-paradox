# Reddit Technical Launch Blueprint

Targeted subreddits and submission strategies for Lunar Paradox. 
Reddit responds best to **engineering-first, transparent, non-corporate** posts explaining *how* it was built and *why* it's zero-server.

---

## 1. r/webgl & r/threejs

- **Suggested Title**: `Built a zero-server PBR texture generator & Three.js runtime running locked at 60 FPS (WebGL/GLSL)`
- **Link / URL**: `https://products.lunarparadox.com/pbr-synth/` (or `https://lunarparadox.com`)
- **Body**:

```markdown
Hey everyone,

I wanted to share a suite of browser-native graphics tools and runtimes we've been building: **Lunar Paradox** (https://lunarparadox.com).

### The Technical Problem
A lot of web-based 3D tooling either relies on heavy server backends (which means texture upload latency and data privacy concerns) or struggles to maintain stable 60 FPS on modest hardware due to unoptimized scene graphs and heavy DOM overhead.

### What We Built
1. **PBR Texture Synth** (https://products.lunarparadox.com/pbr-synth/):
   - Computes Normal (Sobel filter kernel via custom GLSL), Roughness, Height, and AO passes entirely client-side using WebGL offscreen framebuffers.
   - Zero telemetry, zero uploads. You drop in a diffuse/albedo texture and it evaluates across texture units with zero network latency.
2. **Interactive 3D Engine Runtime** (https://lunarparadox.com):
   - Pure Three.js procedural scene with custom material shaders.
   - Micro-optimized draw call batching and garbage-collection-free render loops to maintain locked 60 FPS on base Apple Silicon and GTX 1650 tier GPUs.
3. **Particle Hydrodynamics Lab** (https://labs.lunarparadox.com):
   - Stress test using spatial grid partitioning to evaluate dynamic particle forces at interactive rates.

The codebase is open source under Apache 2.0 (engine repos on GitHub at github.com/nff747).

Would love any feedback on the shader pipeline, Sobel edge kernel weighting in the PBR synth, or frame-rate stability on your machines!
```

---

## 2. r/gamedev

- **Suggested Title**: `Free browser tool: Generate Normal, Roughness & AO maps client-side without installing software or uploading textures`
- **Link / URL**: `https://products.lunarparadox.com/pbr-synth/`
- **Body**:

```markdown
Hey r/gamedev,

If you do indie 3D development or rapid prototyping in Unity/Unreal/Godot, you often just need a fast way to generate normal and roughness maps from a photo or albedo texture without booting up Substance Painter or waiting for a slow cloud converter.

We built **PBR Synth** (part of Lunar Paradox Astrolabe):
👉 https://products.lunarparadox.com/pbr-synth/

### Why it's useful for devs:
- **100% Zero-Server**: It runs entirely inside your browser's WebGL context. Textures never touch an external server or API.
- **Fast GLSL Kernels**: Real-time interactive adjustment of Sobel filter blur, depth intensity, roughness curves, and AO spread.
- **Export directly**: Download individual maps or packed channel textures instantly.
- **Free & Open Source**: Apache 2.0 license.

Check it out and let us know what extra texture packing channels or filters would save you the most time in your game pipelines!
```

---

## 3. r/webdev

- **Suggested Title**: `Show r/webdev: Lunar Paradox – Zero-server client-side WebGL tools & 60 FPS procedural graphics runtime`
- **Link / URL**: `https://lunarparadox.com`
- **Body**:

```markdown
Hi r/webdev!

Wanted to showcase **Lunar Paradox** (https://lunarparadox.com) — an ecosystem of zero-server developer tools and 3D web graphics engines.

### Key highlights:
- **Zero-Server Architecture**: The tools (PBR texture synth, LUT grading, HDR environment visualizer) run 100% in the client via WebGL and Web APIs. Zero telemetry, zero cookies, no database, no backend compute.
- **Performance Budget**: Strict locked 60 FPS budget across our procedural runtime with audited frame delta times.
- **Clean Subdomain Architecture**:
  - `lunarparadox.com`: The Studio interactive 3D runtime.
  - `products.lunarparadox.com`: Astrolabe tool suite.
  - `labs.lunarparadox.com`: Particle physics & hydrodynamic mechanics lab.

Open sourced under Apache 2.0. Feel free to inspect the network tab — zero remote tracking or analytics scripts. Would love to hear your thoughts on UX and performance!
```

---

## Rules of Engagement on Reddit:
1. Don't sound promotional; speak as an engineer showing what you engineered.
2. If someone reports a bug or lower frame rate on their specific GPU/browser, ask for their GPU model and browser version immediately and thank them.
3. Keep top-level links clean without tracking UTM params (Reddit users prefer clean URLs).
