import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const kind = searchParams.get('kind');
  if (!kind) {
    return new Response(JSON.stringify({ error: 'Missing kind parameter' }), { status: 400 });
  }
  // Find next due item for the given kind
  const now = new Date();
  const scheduler = await prisma.scheduler.findFirst({
    where: {
      nextReview: { lte: now },
      item: { kind },
    },
    include: { item: true },
    orderBy: { nextReview: 'asc' },
  });
  if (!scheduler) {
    return new Response(JSON.stringify({ error: 'No due items found' }), { status: 404 });
  }
  return new Response(JSON.stringify(scheduler.item), { status: 200 });
}
