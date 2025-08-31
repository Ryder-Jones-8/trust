import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { itemId, nextReview, stability, difficulty } = data;
  if (!itemId || !nextReview || typeof stability !== 'number' || typeof difficulty !== 'number') {
    return new Response(JSON.stringify({ error: 'Missing or invalid fields' }), { status: 400 });
  }
  const scheduler = await prisma.scheduler.upsert({
    where: { itemId },
    update: { nextReview: new Date(nextReview), stability, difficulty },
    create: { itemId, nextReview: new Date(nextReview), stability, difficulty },
  });
  return new Response(JSON.stringify(scheduler), { status: 201 });
}
