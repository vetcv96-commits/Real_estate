// Real Estate Decision Booster — Cloudflare Worker Proxy
// Deploy this at: https://dash.cloudflare.com → Workers → Create Worker
// Then add secret: wrangler secret put ANTHROPIC_API_KEY

const ALLOWED_ORIGIN = '*'; // Lock to your GitHub Pages URL for extra security
                              // e.g. 'https://yourusername.github.io'

export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Basic rate limit check (Cloudflare free tier handles this well)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Forward to Anthropic — key stays server-side in env secret
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      }
    });
  }
};
