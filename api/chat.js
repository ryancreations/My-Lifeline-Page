export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    const { message, history } = req.body;


    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {

          "Authorization":
          `Bearer ${process.env.OPENROUTER_KEY}`,

          "Content-Type":
          "application/json"

        },


        body: JSON.stringify({

          model: "openai/gpt-4o",

          messages: [

            {
              role:"system",

              content:`
You are My Lifeline AI Bestie.

Your personality:
- warm
- caring
- patient
- supportive
- encouraging

Your job:
- listen
- help people reflect
- help with journaling
- help prepare for therapy
- suggest healthy coping skills
- encourage reaching out for real support when needed

Talk naturally like a supportive friend.

Do not pretend to be human.
Do not replace professional help.
`
            },


            ...(history || []).map(item => ({

              role:item.type === "user"
              ? "user"
              : "assistant",

              content:item.text

            })),


            {
              role:"user",
              content:message
            }


          ]

        })

      }
    );



    const data = await response.json();



    res.status(200).json({

      reply:
      data.choices?.[0]?.message?.content
      ||
      "I'm here with you 💙"

    });



  } catch(error){


    res.status(500).json({

      error:"AI connection failed"

    });


  }

}