# Hacker News "Show HN" Launch Blueprint

> **Optimal Posting Time**: Tuesday or Wednesday between 07:00 AM – 09:00 AM EST (11:00 – 13:00 UTC).  
> **HN Algorithm Tip**: Do not ask friends to upvote directly (HN detects voting rings). Post naturally and reply technically to every comment within the first 2 hours.

---

### Option 1: PBR Synth Focus (Recommended for Highest Engagement)

**Title**:
```text
Show HN: PBR Synth – In-browser procedural PBR texture generator with zero servers
```

**URL**:
```text
https://products.lunarparadox.com/pbr-synth
```

**Text / First Comment (Post immediately after submitting)**:
```text
Hi HN,

We built PBR Synth (https://products.lunarparadox.com/pbr-synth) to solve an annoying friction point in 3D WebGL and game asset pipelines: generating PBR texture bundles (normal, height, roughness, ambient occlusion) from raw diffuse images without sending Gigabytes of textures to third-party cloud servers or waiting on Adobe Substance subscriptions.

How it works technically:
- 100% In-Browser & Air-Gapped: All Sobel/Scharr filtering, height normalization, bilateral smoothing, and normal map synthesis execute on your local GPU via WebGL2 and Canvas kernels.
- Memory & Privacy: Zero images leave your browser thread. You can disconnect your internet completely and the tool still generates and packages complete ZIP bundles locally.
- Real-Time Inspection: Includes an interactive 3D Three.js lighting viewport with OrbitControls, normal scale adjustment, and roughness/metallic sliders to verify reflections in real-time.
- Zero-Server Suite: We also built companion tools for in-memory media compression (SSIM dual-loupe), procedural Web Audio DSP, and WebCrypto cipher tools running on the same zero-server architecture at https://products.lunarparadox.com/.

Everything is free, requires no login, and sets zero advertising cookies.

We’d love feedback on shader kernel performance and edge-case handling across different mobile and desktop GPU tiers.
```

---

### Option 2: The Entire Zero-Server Suite

**Title**:
```text
Show HN: Lunar Paradox – Air-gapped in-browser 3D WebGL and cryptography tools
```

**URL**:
```text
https://products.lunarparadox.com/
```

**Text / First Comment**:
```text
Hi HN,

We wanted to see how far modern Web APIs (WebGL2, Web Audio API, WebCrypto, WebAssembly) could be pushed without requiring a single backend server.

We built and published a suite of four sovereign, zero-server browser tools:
1. PBR Synth (https://products.lunarparadox.com/pbr-synth): Synthesize normal, height, roughness, and AO maps from diffuse textures in GPU memory with interactive 3D lighting.
2. Optim Compressor (https://products.lunarparadox.com/optim-compressor): In-RAM image transcoder with live SSIM scoring, dual-magnifier loupe, and EXIF/metadata stripping.
3. Resonance DSP (https://products.lunarparadox.com/resonance-dsp): Real-time procedural Web Audio synthesizer with band-limited oscillators, stereo Haas delay, and 32-bit WAV recording.
4. Cipher Workbench (https://products.lunarparadox.com/cipher-workbench): Local WebCrypto Ed25519/RSA keygen, AES-256-GCM encryption, and standalone offline Python decrypt CLI generator.

Zero analytics, zero tracking cookies, zero cloud upload. Feedback on performance and browser edge cases is very welcome!
```
