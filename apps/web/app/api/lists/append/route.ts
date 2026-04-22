import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { listName, content, source } = await req.json();
  const list = await prisma.list.upsert({
    where: { name: listName },
    update: {},
    create: { name: listName }
  });

  const item = await prisma.listItem.create({
    data: {
      listId: list.id,
      content,
      method: source?.method ?? "COMMAND",
      noteId: source?.noteId,
      metadata: source ?? {}
    }
  });

  return NextResponse.json(item, { status: 201 });
}
