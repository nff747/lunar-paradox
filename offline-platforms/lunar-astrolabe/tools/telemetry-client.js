// Aggregate event collection is opt-in and does not include tool inputs.
const ALLOWED_TOOLS = new Set(['optim-compressor', 'pbr-synth', 'resonance-dsp', 'cipher-workbench']);
const FUNNEL_STEPS = new Set(['view', 'start', 'complete', 'export', 'error']);
const CHOICE_KEY = 'lunar-tool-analytics-v1';
let storageFailed = false;

function analyticsEnabled() {
  if (storageFailed) return false;
  try { return localStorage.getItem(CHOICE_KEY) === 'enabled'; } catch { return false; }
}

export function setupToolAnalytics(toolId) {
  if (!ALLOWED_TOOLS.has(toolId) || typeof document === 'undefined') return;
  const feedback = document.getElementById('feedback-strip');
  if (!feedback || document.getElementById('tool-analytics-choice')) return;
  const wrap = document.createElement('div');
  wrap.id = 'tool-analytics-choice';
  wrap.style.cssText = 'margin:12px 0;font:12px/1.5 sans-serif;color:#c8c5d0';
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = analyticsEnabled();
  label.append(checkbox, document.createTextNode(' Share anonymous tool usage counts (optional)'));
  const description = document.createElement('p');
  description.style.margin = '4px 0';
  description.textContent = 'Sends tool actions and optional feedback, not your files or input. Your network address may be processed for security. Change this choice here at any time.';
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  function sync() {
    feedback.querySelectorAll('button').forEach(button => { button.disabled = !checkbox.checked; });
    status.textContent = checkbox.checked ? 'Usage sharing is on.' : 'Usage sharing is off; enable it to send feedback.';
  }
  checkbox.addEventListener('change', () => {
    try { localStorage.setItem(CHOICE_KEY, checkbox.checked ? 'enabled' : 'disabled'); storageFailed = false; }
    catch { storageFailed = true; checkbox.checked = false; sync(); status.textContent = 'Could not save your choice. Usage sharing remains off for this session.'; return; }
    sync();
    if (checkbox.checked) recordFunnelStep(toolId, 'view');
  });
  wrap.append(label, description, status);
  feedback.before(wrap);
  sync();
}

function sendEvent(payload) {
  try {
    const body = JSON.stringify(payload);
    const url = '/api/telemetry/event';
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon(url, blob)) return;
    }
    if (typeof fetch === 'function') {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
        mode: 'cors'
      }).catch(() => {});
    }
  } catch (_) {
    // Offline or network error: fail silently to ensure tool operation is never interrupted
  }
}

export function recordFunnelStep(toolId, step) {
  if (!analyticsEnabled() || !ALLOWED_TOOLS.has(toolId) || !FUNNEL_STEPS.has(step)) return;
  sendEvent({ type: 'funnel', toolId, step });
}

export function recordToolFeedback(toolId, helpful) {
  if (!analyticsEnabled() || !ALLOWED_TOOLS.has(toolId) || typeof helpful !== 'boolean') return;
  sendEvent({ type: 'feedback', toolId, helpful });
}
