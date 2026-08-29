export default async function handler(req, res) {
if (req.method !== “POST”) {
return res.status(405).json({
error: “Method not allowed”
});
}

try {
const apiKey =
process.env.HYPERBEAM_API_KEY_2;

if (!apiKey) {
  return res.status(500).json({
    error: "Hyperbeam API key missing"
  });
}
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
const data =
  await response.json();
if (!response.ok) {
  console.error(
    "Hyperbeam error:",
    data
  );
  return res.status(
    response.status
  ).json({
    error:
      data.message ||
      "Failed to create Hyperbeam session"
  });
}
return res.status(200).json({
  embed_url:
    data.embed_url,
  admin_token:
    data.admin_token,
  session_id:
    data.session_id
});

} catch (err) {

console.error(
  "Hyperbeam server error:",
  err
);
return res.status(500).json({
  error:
    err.message ||
    "Server error"
});

}
}