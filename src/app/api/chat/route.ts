import { NextResponse } from "next/server";
import OpenAI from "openai/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { messages, model, temperature, systemConfigurations } = await request.json();
  try {
    const completion = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemConfigurations || "You are a friendly and helpful assistant.",
        },
        ...messages,
      ],
      temperature: temperature || 0.7,
    });

    const response = completion.choices[0].message.content;
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
