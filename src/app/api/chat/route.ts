import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  export async function POST(request: Request) {
    const { messages, model, temperature } = await request.json();
  
    try {
      const completion = await openai.chat.completions.create({
        model: model || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a friendly and helpful assistant.' },
          ...messages,
        ],
        temperature: temperature || 0.7,
      });
  
      const responseMessage = completion.choices[0].message?.content || '';
      return NextResponse.json({ response: responseMessage });
    } catch (error) {
      return NextResponse.json({ error: 'Error communicating with the OpenAI API.' }, { status: 500 });
    }
  }