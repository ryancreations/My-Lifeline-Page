// /api/create-browser.js

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.HYPERBEAM_API_KEY || process.env.HB_API_KEY;

  if (!apiKey) {
    console.error('Missing HYPERBEAM_API_KEY');
    return res.status(500).json({ 
      error: 'Server misconfigured: HYPERBEAM_API_KEY is missing' 
    });
  }

  try {
    const response = await fetch('https://engine.hyperbeam.com/v0/vm', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) // empty body is fine
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error('Hyperbeam did not return JSON:', text);
      return res.status(500).json({ 
        error: 'Hyperbeam returned invalid response',
        details: text.slice(0, 300)
      });
    }

    if (!response.ok) {
      console.error('Hyperbeam error:', data);
      return res.status(response.status).json({
        error: data.message || data.error || 'Hyperbeam failed',
        details: data
      });
    }

    // Success
    return res.status(200).json(data);

  } catch (err) {
    console.error('create-browser crashed:', err);
    return res.status(500).json({ 
      error: 'Server error while creating browser',
      message: err.message 
    });
  }
}