import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { topicId, noteId, approvedByUser, confidence } = await req.json();
  const membership = await prisma.topicMembership.upsert({
    where: { topicId_noteId: { topicId, noteId } },
    update: { approvedByUser: Boolean(approvedByUser), confidence },
    create: { topicId, noteId, approvedByUser: Boolean(approvedByUser), confidence }
  });
  return NextResponse.json(membership);
}
