import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

const starter = ["summarize", "extract tasks", "markdown", "flashcards", "calendar", "email", "translate", "explain", "todo"];

export async function POST(req: NextRequest) {
  const { pageId, rawText } = await req.json();
  const normalized = String(rawText).toLowerCase();
  let command = starter.find((item) => normalized.includes(item)) ?? "todo";
  const listMatch = normalized.match(/add to (?:a new )?list\s+([a-z0-9\- _]+)/);
  if (listMatch) command = `add to list ${listMatch[1].trim()}`;
  const confidence = listMatch ? 0.92 : starter.includes(command) ? 0.78 : 0.5;

  const detection = await prisma.commandDetection.create({
    data: {
      pageId,
      command,
      rawText,
      confidence,
      requiresReview: confidence < 0.7
    }
  });

  return NextResponse.json(detection, { status: 201 });
}
