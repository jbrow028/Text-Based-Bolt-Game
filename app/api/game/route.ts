"use client";

import OpenAI from 'openai';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages, character } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert dungeon master running a text-based RPG adventure. The player is ${character.name}, a ${character.background} ${character.class}. Provide immersive, detailed responses that advance the story based on the player's actions. Include occasional skill checks, combat encounters, and opportunities for character development. Keep responses concise but engaging.`,
        },
        ...messages,
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    const aiMessage = completion.choices[0].message;

    // Save the message to the database
    const savedMessage = await prisma.message.create({
      data: {
        role: aiMessage.role,
        content: aiMessage.content,
        character: {
          connect: {
            id: character.id,
          },
        },
      },
    });

    return new Response(JSON.stringify({ message: savedMessage }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error processing request', { status: 500 });
  }
}