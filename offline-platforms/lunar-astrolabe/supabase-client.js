// Supabase Client for Cloud Persistence
const SUPABASE_URL = "https://kshmrhkebsxuntilwtbu.supabase.co";
const SUPABASE_KEY = "sb_publishable_8jZVoOcSed5Ir7Emw2y4Ng_K5CI14nx";

async function supabaseFetch(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, { ...options, headers, signal: AbortSignal.timeout(5000) });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Supabase error: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (e) {
    console.warn('[Lunar Supabase]', e.message);
    throw e;
  }
}

export const LunarSupabase = {
  url: SUPABASE_URL,
  key: SUPABASE_KEY,

  async getSessions(scene) {
    return supabaseFetch(`lunar_sessions?scene=eq.${encodeURIComponent(scene)}&order=created.desc&limit=30`);
  },

  async saveSession(item) {
    return supabaseFetch('lunar_sessions', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(item)
    });
  },

  async deleteSession(id) {
    return supabaseFetch(`lunar_sessions?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  },

  async getSettings(scene) {
    const rows = await supabaseFetch(`lunar_settings?scene=eq.${encodeURIComponent(scene)}&limit=1`);
    return rows && rows.length ? rows[0].settings : null;
  },

  async saveSettings(scene, settings) {
    return supabaseFetch('lunar_settings', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({ scene, settings, updated_at: new Date().toISOString() })
    });
  },

  async createApplication(app) {
    return supabaseFetch('lunar_applications', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(app)
    });
  },

  async getApplication(id, accessKey) {
    const rows = await supabaseFetch(`lunar_applications?id=eq.${encodeURIComponent(id)}&access_key=eq.${encodeURIComponent(accessKey)}&limit=1`);
    return rows && rows.length ? rows[0] : null;
  }
};

if (typeof window !== 'undefined') {
  window.LunarSupabase = LunarSupabase;
}
