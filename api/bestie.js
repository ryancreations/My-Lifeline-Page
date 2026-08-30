// api/bestie.js
//
// My Lifeline — Bestie AI
// Groq backend
//
// Required Vercel environment variable:
// GROQ_API_KEY=your_groq_api_key
//
// Optional:
// GROQ_MODEL=openai/gpt-oss-20b
//
// This file intentionally contains NO hard-coded word-trigger
// response system. Bestie responses come from the AI model.
export default async function handler(req, res) {
  // ============================================================
  // METHOD CHECK
  // ============================================================
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }
  try {
    // ============================================================
    // REQUEST DATA
    // ============================================================
    const body = req.body || {};
    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";
    const mode =
      typeof body.mode === "string"
        ? body.mode
        : "comfort";
    const history =
      Array.isArray(body.history)
        ? body.history
        : [];
    // ============================================================
    // VALIDATE MESSAGE
    // ============================================================
    if (!message) {
      return res.status(400).json({
        error: "Message is required."
      });
    }
    // Keep requests reasonably sized.
    const cleanMessage =
      message.slice(0, 8000);
    // ============================================================
    // GROQ API KEY
    // ============================================================
    const apiKey =
      process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error(
        "GROQ_API_KEY is not configured."
      );
      return res.status(500).json({
        error:
          "Bestie AI isn't configured yet. Add GROQ_API_KEY to your Vercel environment variables."
      });
    }
    // ============================================================
    // BESTIE MODES
    // ============================================================
    const modes = {
      comfort: `
Be warm, gentle, reassuring, and supportive.
Listen carefully and make the conversation feel comfortable.
`,
      vent: `
Let the user vent.
Listen first instead of immediately trying to solve everything.
Ask natural follow-up questions when appropriate.
`,
      hype: `
Be energetic, encouraging, playful, and positive.
Celebrate the user's wins and help them feel motivated.
Do not force positivity when the user is genuinely struggling.
`,
      calm: `
Use a calm, relaxed, grounding tone.
Keep responses easy to follow and avoid overwhelming the user.
`,
      reflect: `
Help the user think through what they are experiencing.
Ask thoughtful questions and help them consider different perspectives.
Do not make decisions for them.
`
    };
    const selectedMode =
      modes[mode] || modes.comfort;
    // ============================================================
    // BESTIE PERSONALITY
    // ============================================================
    const systemPrompt = `
You are Bestie, the AI companion inside a private
"My Lifeline" website.
Your personality:
- Friendly
- Warm
- Genuine
- Supportive
- Non-judgmental
- Conversational
- Occasionally funny when appropriate
- Never robotic
- Never overly formal
CURRENT BESTIE MODE:
${selectedMode}
CONVERSATION STYLE:
Talk naturally.
Respond to what the user actually said.
Do not automatically turn every conversation into advice.
Do not constantly use bullet lists.
Do not repeatedly introduce yourself.
Do not repeatedly say that you are an AI.
Do not pretend to be a human.
Do not claim to have personal memories or real-world experiences
outside the conversation.
Do not diagnose the user.
Do not shame or judge the user.
If the user is simply chatting, joke around and have a normal
conversation.
If the user is talking about music, games, movies, hobbies,
school, friends, relationships, or everyday life, engage with
the topic naturally.
If the user is upset, be supportive and let them explain what
is happening.
If the user asks a direct question, answer it directly.
Keep normal responses reasonably concise unless the user asks
for more detail.
The user controls the conversation. Follow their topic rather
than forcing a predefined conversation path.
IMPORTANT:
There is no hard-coded keyword-trigger response system.
Do NOT assume an emotion simply because a particular word
appears in a message.
Understand the meaning and context of the entire message.
If the user uses casual language, slang, profanity, sarcasm,
or unusual wording, interpret it based on context rather than
automatically treating individual words as special triggers.
If a conversation becomes emotionally difficult, respond with
care and encourage the user to connect with a trusted person
or appropriate professional support when that would be useful.
You are a supportive companion and not a replacement for
professional care.
`;
    // ============================================================
    // CLEAN CONVERSATION HISTORY
    // ============================================================
    const cleanHistory = history
      .filter(item => {
        if (!item || typeof item !== "object") {
          return false;
        }
        if (
          item.role !== "user" &&
          item.role !== "assistant"
        ) {
          return false;
        }
        return (
          typeof item.content === "string" &&
          item.content.trim().length > 0
        );
      })
      .slice(-20)
      .map(item => ({
        role: item.role,
        content:
          item.content
            .trim()
            .slice(0, 4000)
      }));
    // ============================================================
    // BUILD GROQ MESSAGES
    // ============================================================
    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      ...cleanHistory,
      {
        role: "user",
        content: cleanMessage
      }
    ];
    // ============================================================
    // MODEL
    // ============================================================
    const model =
      process.env.GROQ_MODEL ||
      "openai/gpt-oss-20b";
    // ============================================================
    // CALL GROQ
    // ============================================================
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          "Authorization":
            `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.8,
          max_completion_tokens: 700,
          stream: false
        })
      }
    );
    // ============================================================
    // HANDLE GROQ ERROR
    // ============================================================
    if (!groqResponse.ok) {
      const errorText =
        await groqResponse.text();
      console.error(
        "Groq API error:",
        groqResponse.status,
        errorText
      );
      return res.status(502).json({
        error:
          "Bestie couldn't connect to the AI service right now."
      });
    }
    // ============================================================
    // PARSE RESPONSE
    // ============================================================
    const data =
      await groqResponse.json();
    const reply =
      data
        ?.choices?.[0]
        ?.message?.content;
    if (
      !reply ||
      typeof reply !== "string"
    ) {
      console.error(
        "Unexpected Groq response:",
        JSON.stringify(data)
      );
      return res.status(502).json({
        error:
          "Bestie received an unexpected response from the AI service."
      });
    }
    // ============================================================
    // RETURN BESTIE RESPONSE
    // ============================================================
    return res.status(200).json({
      reply:
        reply.trim(),
      mode,
      model
    });
  } catch (error) {
    // ============================================================
    // SERVER ERROR
    // ============================================================
    console.error(
      "Bestie server error:",
      error
    );
    return res.status(500).json({
      error:
        "Something went wrong while Bestie was thinking."
    });
  }
}