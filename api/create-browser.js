export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { key } = req.body || {};

    // Choose which key to use
    let apiKey;
    if (key === "2") {
      apiKey = process.env.HYPERBEAM_API_KEY_2;
    } else {
      apiKey = process.env.HYPERBEAM_API_KEY_1; // default
    }

    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        start_url: "https://www.google.com",
        offline_timeout: 600
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json({
      embed_url: data.embed_url,
      admin_token: data.admin_token,
      session_id: data.session_id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Hyperbeam session" });
  }
}
