/**
 * Lunar Paradox — Tactical WebGL & Three.js Performance Profiling Snippet
 * 
 * Usage: Paste directly into Chrome/Firefox DevTools console on any WebGL page.
 * Samples 120 frames and outputs an empirical diagnostic table with actionable bottlenecks.
 */
(() => {
  console.clear();
  console.log('%c[Lunar Paradox]%c Initializing WebGL Performance Audit...', 'color:#d7b886;font-weight:bold', 'color:#aaa');

  const canvas = document.querySelector('canvas');
  if (!canvas) {
    console.error('[Lunar Paradox] No <canvas> element found on page.');
    return;
  }

  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) {
    console.error('[Lunar Paradox] Could not acquire WebGL/WebGL2 context.');
    return;
  }

  // Intercept draw calls
  let drawCalls = 0;
  let triangles = 0;
  const origDrawElements = gl.drawElements;
  const origDrawArrays = gl.drawArrays;

  gl.drawElements = function(mode, count, type, offset) {
    drawCalls++;
    if (mode === gl.TRIANGLES) triangles += count / 3;
    return origDrawElements.apply(this, arguments);
  };

  gl.drawArrays = function(mode, first, count) {
    drawCalls++;
    if (mode === gl.TRIANGLES) triangles += count / 3;
    return origDrawArrays.apply(this, arguments);
  };

  const frameTimes = [];
  let lastTime = performance.now();
  let frameCount = 0;
  const TOTAL_FRAMES = 120;

  let peakDrawCalls = 0;
  let peakTriangles = 0;

  function sample(now) {
    const delta = now - lastTime;
    lastTime = now;
    frameTimes.push(delta);

    if (drawCalls > peakDrawCalls) peakDrawCalls = drawCalls;
    if (triangles > peakTriangles) peakTriangles = triangles;
    drawCalls = 0;
    triangles = 0;

    frameCount++;
    if (frameCount < TOTAL_FRAMES) {
      requestAnimationFrame(sample);
    } else {
      finish();
    }
  }

  function finish() {
    // Restore hooks
    gl.drawElements = origDrawElements;
    gl.drawArrays = origDrawArrays;

    // Filter warmup frame
    const samples = frameTimes.slice(2);
    const avgDelta = samples.reduce((a, b) => a + b, 0) / samples.length;
    const avgFps = 1000 / avgDelta;
    const sorted = [...samples].sort((a, b) => a - b);
    const p95Delta = sorted[Math.floor(sorted.length * 0.95)];
    const p99Delta = sorted[Math.floor(sorted.length * 0.99)];
    const maxDelta = sorted[sorted.length - 1];
    const jankFrames = samples.filter(d => d > 20).length;

    // Estimate memory / textures
    const maxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const vendor = gl.getParameter(gl.RENDERER) || 'Unknown GPU';

    console.log('%c[Lunar Paradox] WebGL Audit Complete (120 Frames Sampled)', 'color:#d7b886;font-size:13px;font-weight:bold');
    console.table({
      'Average Frame Rate': `${avgFps.toFixed(1)} FPS`,
      'Target Frame Interval (60 FPS)': '16.6 ms',
      'Average Frame Time': `${avgDelta.toFixed(2)} ms`,
      '95th Percentile Frame Time': `${p95Delta.toFixed(2)} ms`,
      'Peak Single Frame Delay': `${maxDelta.toFixed(2)} ms`,
      'Jank Frames (>20ms)': `${jankFrames} (${((jankFrames / samples.length) * 100).toFixed(1)}%)`,
      'Peak Draw Calls / Frame': peakDrawCalls,
      'Peak Triangles / Frame': peakTriangles.toLocaleString(),
      'Max Texture Dimension': `${maxTexSize}px`,
      'Renderer / GPU': vendor
    });

    // Primary bottleneck diagnosis
    const bottlenecks = [];
    if (peakDrawCalls > 80) bottlenecks.push(`High draw calls (${peakDrawCalls}/frame). Batching or instancing required.`);
    if (p95Delta > 20) bottlenecks.push(`Frame pacing jitter (95th percentile is ${p95Delta.toFixed(1)}ms). GC churn or shader complexity.`);
    if (peakTriangles > 500000) bottlenecks.push(`Heavy mesh density (${peakTriangles.toLocaleString()} tris). LOD or decimation required.`);
    if (jankFrames > 10) bottlenecks.push(`${jankFrames} stutter frames detected during 2-second capture.`);

    if (bottlenecks.length === 0) {
      console.log('%c✓ PASS: Scene runs comfortably within 60 FPS budget.', 'color:#7bf599;font-weight:bold');
    } else {
      console.warn('%c⚠ BOTTLENECK DETECTED:', 'color:#f5b07b;font-weight:bold', bottlenecks.join(' | '));
      console.log('\n%c--- COPY-PASTE OUTREACH SNIPPET ---', 'color:#888;font-size:11px');
      console.log(
        `"Noticed the 3D scene on your hero is pulling ${peakDrawCalls} draw calls and 95th-percentile frame latency of ${p95Delta.toFixed(1)}ms (${avgFps.toFixed(0)} FPS). I specialize in WebGL runtime hardening and draw-call batching to lock scenes to 60 FPS in a 5-day sprint. Happy to send over the flamegraph if useful."`
      );
    }
  }

  requestAnimationFrame(sample);
})();
