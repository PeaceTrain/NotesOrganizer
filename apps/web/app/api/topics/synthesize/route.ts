import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { topicId, title } = await req.json();
  const memberships = await prisma.topicMembership.findMany({ where: { topicId }, include: { note: true } });
  const summary = memberships.map((m) => m.note.title).join("; ");

  const synth = await prisma.synthesizedNote.create({
    data: {
      topicId,
      title,
      summary,
      keyPoints: memberships.map((m) => m.note.title),
      tasks: [],
      unresolvedQuestions: []
    }
  });

  await prisma.synthesizedNoteSource.createMany({
    data: memberships.map((m) => ({ synthesizedNoteId: synth.id, noteId: m.noteId }))
  });

  return NextResponse.json(synth, { status: 201 });
}
