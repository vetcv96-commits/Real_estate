# Real Estate Decision Booster 🏠

An AI-powered property investment analysis tool. Enter property details, paste a listing, or upload a PDF/image — and get a full underwriting report including cash flow, cap rate, DSCR, risk score, and an action plan.

## Features

- **Manual Entry** — input purchase price, rent, expenses, and financing details
- **Paste Listing** — paste any MLS / Zillow / Realtor listing and AI extracts the data
- **Upload File** — upload a PDF, PNG, JPG, or WEBP and AI reads it automatically
- **Full Metrics** — monthly cash flow, cap rate, cash-on-cash, DSCR, break-even rent, and more
- **Risk Score** — 1–100 risk rating with color-coded bar
- **Action Plan** — offer price targets, key questions to ask the seller, next steps

---

## Live Demo

👉 [real-estate-decision-booster](https://YOUR-USERNAME.github.io/real-estate-decision-booster)

---

## How to Update the Files on GitHub

### Replacing a file manually (no coding needed)

1. Go to your repo on GitHub
2. Click the file you want to update (e.g. `index.html`)
3. Click the **pencil ✏️ Edit** icon
4. Press **Ctrl+A** to select all → delete
5. Paste the new file contents
6. Click **Commit changes**

---

## Security — How the API Key Works

The app currently runs in **direct mode** — it calls the AI API from the browser. This is fine for personal or low-traffic use.

When you're ready to go fully secure (recommended for public traffic), follow the Cloudflare Worker setup below to move the key server-side.

```
Current:   Browser → Anthropic API (key in code)
Secure:    Browser → Cloudflare Worker → Anthropic API (key encrypted, never in browser)
```

---

## Optional: Cloudflare Worker Setup (Full Security)

### Step 1 — Deploy the Worker

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → sign up free
2. Click **Workers & Pages → Create → Create Worker**
3. Delete the default code, paste everything from `worker.js`
4. Click **Deploy**
5. Copy your Worker URL:
   `https://your-worker-name.yourname.workers.dev`

### Step 2 — Add Your API Key as a Secret

1. In the Worker dashboard → **Settings → Variables**
2. Click **Add variable**
   - Name: `ANTHROPIC_API_KEY`
   - Value: your API key
3. Click **Encrypt** → **Save and deploy**

### Step 3 — Connect the App to the Worker

1. In your GitHub repo, edit `index.html`
2. Find this line:
   ```js
   const PROXY_URL = '';
   ```
3. Replace with your Worker URL:
   ```js
   const PROXY_URL = 'https://your-worker-name.yourname.workers.dev';
   ```
4. Commit changes — the key is now fully hidden ✅

---

## Disclaimer

The analysis and projections provided by this tool are for informational purposes only and do not constitute financial, investment, legal, or tax advice. All outputs are automated estimates based on the inputs provided. The creator accepts no liability for any investment decisions or losses arising from use of this tool. Always conduct independent due diligence and consult qualified professionals before investing.

---

## License

MIT
