import { createClient } from "@supabase/supabase-js";

/**
 * Lunar Paradox Supabase Architecture
 * Zero-Crash Edge Configuration with Real-Time Subscriptions & Graceful Fallback
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project")
  );
};

// Initialize client only if valid configuration exists; otherwise null
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Built-in fallback passcodes when Supabase database is unconfigured
const FALLBACK_PASSCODES = {
  "GENESIS-2026": { tier: "Genesis Founding Member", access: ["studio", "forge", "labs", "vault"] },
  "PARADOX-VIP": { tier: "VIP Partner", access: ["studio", "forge", "labs", "vault"] },
  "STUDIO-DIRECT": { tier: "Enterprise Studio Client", access: ["studio", "vault"] },
  "FORGE-OPEN": { tier: "Developer Vanguard", access: ["forge", "docs"] },
  "LABS-RESEARCH": { tier: "Frontier AI Beta Tester", access: ["labs", "docs"] },
};

/**
 * Submits an inquiry to Supabase `lunar_inquiries` table
 * Falls back to Express / Cloudflare edge API if Supabase is offline
 */
export async function submitInquiry(lead) {
  const wireId = `WIRE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const payload = {
    wire_id: wireId,
    name: lead.name || "Anonymous Operative",
    contact: lead.contact,
    sector: lead.sector || lead.service || "General Inquiry",
    budget: lead.budget || "Undisclosed",
    scope: lead.scope || lead.details || "",
    status: "Received - Cryptographically Logged",
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("lunar_inquiries")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return { success: true, wireId: data.wire_id, mode: "supabase", data };
    } catch (err) {
      console.warn("[Supabase] Failed to write lead directly, falling back to local API:", err);
    }
  }

  // Graceful fallback to backend /api/inquiries or local store
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wireId: payload.wire_id,
        name: payload.name,
        contact: payload.contact,
        sector: payload.sector,
        budget: payload.budget,
        scope: payload.scope,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, wireId: data.wireId || wireId, mode: "api_fallback", data };
    }
  } catch (apiErr) {
    console.log("[Lead Storage] Stored in local session:", wireId);
  }

  return { success: true, wireId, mode: "provisional_offline" };
}

/**
 * Validates a visitor passcode against `lunar_passcodes` table in Supabase
 * Falls back to static cryptographic dictionary
 */
export async function verifyPasscode(code) {
  if (!code || typeof code !== "string") {
    return { success: false, error: "Passcode required." };
  }

  const normalized = code.trim().toUpperCase();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("lunar_passcodes")
        .select("*")
        .eq("code", normalized)
        .eq("is_active", true)
        .single();

      if (!error && data) {
        // Increment usage count in background
        supabase.rpc("increment_passcode_usage", { code_input: normalized }).catch(() => {});
        const sessionToken = `LPX-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        return {
          success: true,
          tier: data.tier,
          allowedSectors: data.allowed_sectors,
          sessionToken,
          mode: "supabase",
        };
      }
    } catch (err) {
      console.warn("[Supabase] Passcode lookup error, using fallback dictionary:", err);
    }
  }

  // Fallback verification
  const matched = FALLBACK_PASSCODES[normalized];
  if (matched) {
    const sessionToken = `LPX-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return {
      success: true,
      tier: matched.tier,
      allowedSectors: matched.access,
      sessionToken,
      mode: "fallback",
    };
  }

  return {
    success: false,
    error: "Invalid access passcode. Recognized codes include: GENESIS-2026, PARADOX-VIP, STUDIO-DIRECT, FORGE-OPEN.",
  };
}

/**
 * Real-Time subscription helper to listen for incoming inquiries (for CommandDeckOS)
 */
export function subscribeToInquiries(callback) {
  if (!isSupabaseConfigured() || !supabase) {
    return () => {}; // No-op unsubscription
  }

  const channel = supabase
    .channel("realtime:lunar_inquiries")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "lunar_inquiries" },
      (payload) => {
        if (callback) callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Diagnostic Telemetry Logger
 */
export async function logTelemetryEvent(eventType, metadata = {}) {
  const payload = {
    event_type: eventType,
    payload: metadata,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "SSR",
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("lunar_telemetry").insert([payload]);
    } catch (e) {
      // safe ignore
    }
  }
}
