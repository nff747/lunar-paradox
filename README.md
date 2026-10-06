# 🌙 Lunar Paradox — The Ethereal Void Experience

A high-converting, avant-garde web application engineered for **Cloudflare Pages**. Designed specifically to capture, impress, and convert traffic arriving from invitation watermark ads.

---

## 🚀 Key Features

* **Exact Match to Chosen Concept:** Ethereal cosmic void, glowing celestial moon, orbiting liquid-chrome mercury spheres, and 5 interactive frosted glassmorphism cards.
* **100% Free & Zero Watermarks:** Deploys natively to Cloudflare Pages without any badges, forced branding, or fees.
* **Custom Domain Ready:** Attach any custom domain or subdomain for free with automatic SSL/TLS certification.
* **Watermark Ad Conversion Gateway:**
  * **Invitation Passcode Unlocking:** Visitors entering from an ad can enter their invitation code (`PARADOX`, `VOID`, etc.) with instant audio fanfare, cosmic confetti, and VIP perks unlock.
  * **Direct Client Intake / Commission Form:** Allows high-value clients to specify their budget, handle, and project vision.
* **Zero-Cost Edge Backend (`/functions/api/lead.js`):** Automatically processes incoming leads directly on Cloudflare Workers and can optionally forward them directly to your Discord server or Telegram channel via webhook!
* **Cosmic Web Audio Synthesizer:** Real-time generated celestial ambient drone with interactive UI sound effects (zero external audio asset latency).
* **Parallax Canvas Starfield:** Dynamic stars with mouse-following depth and twinkling.

---

## ⚡ How to Deploy to Cloudflare Pages for Free

### Option 1: Direct CLI Deploy (Fastest — 1 Minute)

Run inside this directory:
```bash
npm run build
npx wrangler pages deploy dist --project-name=lunar-paradox
```
*Wrangler will ask you to log into your Cloudflare account in your browser, and your site will be live immediately at `https://lunar-paradox.pages.dev`.*

---

### Option 2: Automatic GitHub / GitLab CI/CD

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial Lunar Paradox release"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. In your [Cloudflare Dashboard](https://dash.cloudflare.com/):
   * Go to **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
   * Select your repository.
   * Set Build Settings:
     * **Framework preset:** `Vite`
     * **Build command:** `npm run build`
     * **Build output directory:** `dist`
   * Click **Save and Deploy**.

---

## 🌐 Linking Your Custom Domain (No Watermarks, Free SSL)

1. In the Cloudflare Pages dashboard for your project, click **Custom domains**.
2. Click **Set up a custom domain**.
3. Type your domain (e.g. `lunarparadox.com` or `vip.yourbrand.com`).
4. Follow the prompt to add the CNAME record or point your nameservers.
5. Cloudflare will automatically generate and maintain an SSL certificate for you.

---

## 🔔 Optional: Receiving Client Inquiries on Discord

In your Cloudflare Pages dashboard:
1. Go to **Settings** > **Environment variables**.
2. Add a variable named:
   * `DISCORD_WEBHOOK_URL` = `<your-discord-webhook-url>`
3. Whenever an inbound client submits the intake form, a notification will immediately ping your Discord!
