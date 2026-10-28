# Lunar Paradox

[![Website lunarparadox.com](https://img.shields.io/badge/Live-lunarparadox.com-00d4ff?style=flat-square&logo=three.js&logoColor=white)](https://lunarparadox.com)
[![Tools products.lunarparadox.com](https://img.shields.io/badge/Tools-products.lunarparadox.com-9d4edd?style=flat-square)](https://products.lunarparadox.com)
[![Labs labs.lunarparadox.com](https://img.shields.io/badge/Labs-labs.lunarparadox.com-00f0ff?style=flat-square)](https://labs.lunarparadox.com)
[![License Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square)](LICENSE)
[![Zero-Server](https://img.shields.io/badge/Telemetry-Zero--Server_On--Device-success?style=flat-square)](#zero-server-guarantees)
[![Performance](https://img.shields.io/badge/FPS-Locked_60_FPS-brightgreen?style=flat-square)](#performance--engineering-standards)

**Lunar Paradox** is an applied graphics laboratory and systems studio engineering locked-60-FPS WebGL and WebGPU runtimes, high-throughput shader mechanics, zero-server browser tools, and continuum physics simulations.

---

## Ecosystem & Live Platforms

The repository powers the unified Lunar Paradox web ecosystem across three primary subdomains:

| Platform | Hostname | Core Capabilities | Status |
| :--- | :--- | :--- | :--- |
| **The Studio (Syzygy)** | [`lunarparadox.com`](https://lunarparadox.com) | Real-time procedural 3D interactive graphics runtime, custom GLSL lighting shaders, and studio operations | [Launch Studio](https://lunarparadox.com) |
| **Astrolabe Suite** | [`products.lunarparadox.com`](https://products.lunarparadox.com) | Zero-server developer utility suite: PBR Synth, image compression with SSIM, Web Audio DSP, and WebCrypto | [Explore Suite](https://products.lunarparadox.com) |
| **Gravity Labs** | [`labs.lunarparadox.com`](https://labs.lunarparadox.com) | High-throughput particle hydrodynamics sandbox & spatial continuum mechanics simulation | [Open Labs](https://labs.lunarparadox.com) |

---

## Applications & Tooling

### 1. PBR Synth (`products.lunarparadox.com/pbr-synth`)
A fully GPU-accelerated texture synthesizer running client-side in the browser:
- **Normal Map Generation**: Real-time Sobel/Scharr filtering across height derivations in WebGL framebuffers.
- **Surface Maps**: Bilateral-smoothed height maps, curvature-driven ambient occlusion (AO), and roughness maps.
- **Live 3D Lighting Viewport**: Real-time Three.js material preview with interactive OrbitControls, normal scale attenuation, and environment reflection.
- **Local ZIP Packaging**: Bundles complete PBR map sets into zip archives without server round-trips.

### 2. Optim Compressor
In-memory image optimization engine:
- High-fidelity transcoding for PNG, JPEG, and WebP.
- Real-time structural similarity (SSIM) delta scoring.
- Synchronized split-screen dual loupe for pixel-level visual inspection.
- Complete metadata/EXIF stripping for air-gapped privacy.

### 3. Resonance DSP
Client-side acoustic and procedural audio synthesizer:
- Band-limited oscillator engine driven by the Web Audio API.
- Stereo Haas effect delay networks and spectral filtering.
- Direct-to-disk 32-bit floating-point WAV exporter.

### 4. Cipher Workbench
Sovereign client-side cryptographic toolkit:
- WebCrypto API implementations of AES-256-GCM, Ed25519 signing, and RSA-OAEP.
- Zero network transit: keys and ciphertexts never leave browser RAM.
- Generates reproducible, offline Python decryption scripts alongside encrypted payloads.

---

## Zero-Server Guarantees

All interactive tools in the Astrolabe and Gravity suites execute **100% on the client machine via WebGL, WebGPU, and WebAssembly**:
- **Zero Remote Compute**: Input textures, assets, and audio buffers are processed in local memory.
- **Zero Telemetry**: No third-party trackers, analytics pixels, or advertising beacons are loaded.
- **Air-Gapped Operation**: Once loaded into cache via Service Workers, all tools function completely offline.
- Review our full [Privacy Policy](https://lunarparadox.com/privacy) for technical verification details.

---

## Performance & Engineering Standards

- **Frame Budget**: Strictly locked to 60 FPS (16.6ms frame delta budget) on baseline integrated GPUs (Apple M-series, Intel Iris Xe) and dedicated hardware.
- **Memory Management**: GC-free render loops with pre-allocated buffer geometries and static matrix reuse to eliminate garbage collector pauses.
- **Responsive Viewport**: Fluid aspect ratio handling across mobile, desktop, and ultra-wide spatial displays.

---

## Development & Testing

### Prerequisites
- Node.js (v18+)
- Python 3.9+ (for server integration and crypto tests)

### Build & Test Suite

```bash
# Install dependencies
npm install

# Run static validation, linting, and automated unit tests
npm test

# Run backend Python validation suite
python3 -m unittest discover tests

# Build production artifacts (hashes, minified assets, and offline platform bundles)
npm run build
```

---

## License

This project is licensed under the **Apache License, Version 2.0**. See the [LICENSE](LICENSE) file for details.

```text
Copyright 2026 Lunar Paradox

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```
