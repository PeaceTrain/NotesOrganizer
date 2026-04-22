import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await prisma.note.findMany({ include: { pages: true, assets: true }, take: 100 }));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const note = await prisma.note.create({
    data: {
      notebookId: body.notebookId,
      title: body.title,
      sourcePath: body.sourcePath,
      sourceType: body.sourceType
    }
  });
  return NextResponse.json(note, { status: 201 });
}
