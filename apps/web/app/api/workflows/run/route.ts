import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { workflowId, input } = await req.json();
  const run = await prisma.workflowRun.create({
    data: {
      workflowId,
      input,
      status: "PROCESSING"
    }
  });

  const completed = await prisma.workflowRun.update({
    where: { id: run.id },
    data: { status: "COMPLETED", output: { accepted: true }, completedAt: new Date() }
  });

  return NextResponse.json(completed);
}
