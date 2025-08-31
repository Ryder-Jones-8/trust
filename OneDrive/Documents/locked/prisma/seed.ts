import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const seedPath = path.join(__dirname, 'seed.json');
  const items = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

  for (const item of items) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        kind: item.kind,
        stimulus: item.stimulus ?? null,
        passage: item.passage ?? null,
        question: item.question,
        choices: item.choices,
        answer: item.answer,
        explanation: item.explanation,
        whyWrong: item.whyWrong,
        tags: item.tags,
        meta: item.meta ?? null,
      },
    });
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
