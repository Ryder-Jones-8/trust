import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { itemId, correct, timeSec, confidence } = data;
  if (!itemId || typeof correct !== 'boolean' || typeof timeSec !== 'number' || typeof confidence !== 'number') {
    return new Response(JSON.stringify({ error: 'Missing or invalid fields' }), { status: 400 });
  }
  const attempt = await prisma.attempt.create({
    data: {
      itemId,
      correct,
      timeSec,
      confidence,
    },
  });
  return new Response(JSON.stringify(attempt), { status: 201 });
}
