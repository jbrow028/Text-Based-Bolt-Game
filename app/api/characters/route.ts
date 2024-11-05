import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const characters = await prisma.character.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      messages: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return Response.json(characters);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { name, class: characterClass, background } = await req.json();

  const character = await prisma.character.create({
    data: {
      name,
      class: characterClass,
      background,
      userId: session.user.id,
    },
  });

  return Response.json(character);
}