export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    // Get the secret Hyperbeam API key from Vercel
    const apiKey = process.env.HYPERBEAM_API_KEY_2;

    if (!apiKey) {
      console.error("HYPERBEAM_API_KEY_2 is missing");

      return res.status(500).json({
        error: "Hyperbeam API key missing"
      });
    }

    // Create a Hyperbeam browser session
    const response = await fetch(
      "https://engine.hyperbeam.com/v0/vm",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          start_url: "https://www.youtube.com",
          offline_timeout: 1800
        })
      }
    );

    // Try to read Hyperbeam's response
    const data = await response.json();

    // Hyperbeam returned an error
    if (!response.ok) {
      console.error("Hyperbeam API error:", data);

      return res.status(response.status).json({
        error:
          data.message ||
          data.error ||
          "Failed to create Hyperbeam session"
      });
    }

    // Make sure Hyperbeam actually returned the URL
    if (!data.embed_url) {
      console.error("Hyperbeam response did not contain embed_url:", data);

      return res.status(500).json({
        error: "Hyperbeam did not return an embed URL"
      });
    }

    // Send only the information the chatroom needs
    return res.status(200).json({
      embed_url: data.embed_url,
      admin_token: data.admin_token || null,
      session_id: data.session_id || null
    });

  } catch (err) {
    console.error("Hyperbeam server error:", err);

    return res.status(500).json({
      error: err?.message || "Server error"
    });
  }
}