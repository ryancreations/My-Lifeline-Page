export default async function handler(req, res) {
  // Allow only GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  let url;
  try {
    url = new URL(targetUrl);
  } catch {
    return res.status(400).send('Invalid URL');
  }

  // Basic safety
  if (!['http:', 'https:'].includes(url.protocol)) {
    return res.status(400).send('Only http/https allowed');
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });

    const contentType = response.headers.get('content-type') || 'text/html';

    // We mainly care about HTML pages
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      // For non-HTML just redirect or show message
      return res.status(200).send(`
        <html>
          <body style="font-family:sans-serif;padding:40px;text-align:center;">
            <h2>This link is not a regular webpage</h2>
            <p>It may be a file, video, or blocked content.</p>
            <p><a href="${url.toString()}" target="_blank">Open in new tab instead</a></p>
          </body>
        </html>
      `);
    }

    let html = await response.text();

    // Very basic URL rewriting so relative links work better
    const base = url.origin;
    html = html.replace(/(href|src)=["']\/(?!\/)/gi, `$1="${base}/`);
    html = html.replace(/(href|src)=["'](?!https?:|\/\/|data:|#|mailto:|tel:)/gi, `$1="${base}/`);

    // Remove frame-blocking headers effect by not forwarding them
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    // Important: allow it to be framed by your own site
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");

    return res.status(200).send(html);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`
      <html>
        <body style="font-family:sans-serif;padding:40px;text-align:center;background:#111;color:white;">
          <h2>Could not load this page</h2>
          <p>${err.message}</p>
          <p style="margin-top:20px;"><a href="${url.toString()}" target="_blank" style="color:#4fc3f7;">Open in new tab</a></p>
        </body>
      </html>
    `);
  }
}