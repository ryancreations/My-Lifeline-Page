export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.HYPERBEAM_API_KEY_2; // the one that works

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
        start_url: "https://www.youtube.com",
        offline_timeout: 1800   // 30 minutes
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
    res.status(500).json({ error: "Failed to create session" });
  }
}
