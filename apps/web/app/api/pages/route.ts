import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await prisma.page.findMany({ include: { note: true }, take: 200 }));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const page = await prisma.page.create({
    data: {
      noteId: body.noteId,
      pageNumber: body.pageNumber,
      extractedText: body.extractedText,
      cleanedText: body.cleanedText
    }
  });
  return NextResponse.json(page, { status: 201 });
}
