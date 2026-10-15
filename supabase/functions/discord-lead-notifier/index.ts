import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const DISCORD_WEBHOOK_URL = Deno.env.get("DISCORD_WEBHOOK_URL");

serve(async (req) => {
  try {
    const payload = await req.json();
    const { record } = payload;

    if (!record || !DISCORD_WEBHOOK_URL) {
      return new Response(JSON.stringify({ status: "skipped" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const discordPayload = {
      embeds: [
        {
          title: "🌙 Lunar Paradox — Inbound Lead Captured (Supabase Edge)",
          color: 0x8b5cf6, // Celestial Violet
          fields: [
            { name: "Wire ID", value: `\`${record.wire_id}\``, inline: true },
            { name: "Name / Entity", value: record.name || "Anonymous Operative", inline: true },
            { name: "Contact", value: record.contact || "Not provided", inline: true },
            { name: "Target Sector", value: record.sector || "General", inline: true },
            { name: "Budget Bracket", value: record.budget || "Undisclosed", inline: true },
            { name: "Project Scope", value: record.scope || "No details provided" },
          ],
          footer: { text: "Lunar Paradox • Supabase Realtime Gateway" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
