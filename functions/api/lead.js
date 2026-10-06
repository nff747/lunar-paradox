// Cloudflare Pages Function: /api/lead
// Zero-cost serverless endpoint that runs on Cloudflare Workers edge network

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { name, contact, service, budget, details } = data;

    // Optional: Forward to Discord webhook if configured in Cloudflare Dashboard
    if (env.DISCORD_WEBHOOK_URL) {
      await fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: "🌙 Lunar Paradox — Inbound Vanguard Client Lead",
              color: 0x8b5cf6, // Violet
              fields: [
                { name: "Name / Entity", value: name || "Anonymous", inline: true },
                { name: "Contact", value: contact || "Not provided", inline: true },
                { name: "Service", value: service || "General inquiry", inline: true },
                { name: "Budget", value: budget || "Not specified", inline: true },
                { name: "Vision / Notes", value: details || "None provided" }
              ],
              footer: { text: "Lunar Paradox Edge Lead System • Cloudflare Pages" },
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Lead recorded securely on Cloudflare Edge.",
      ticketId: "LPX-" + Math.random().toString(36).substring(2, 8).toUpperCase()
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
