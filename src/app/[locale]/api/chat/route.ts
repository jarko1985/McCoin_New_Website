import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an AI trained to answer questions about this website." },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("OpenAI Response:", data);
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json({ response: "Sorry, I couldn't process your request." });
    }
    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
