import { prisma } from "@inkforge/db/src";
import { workflowSchema } from "@inkforge/workflows/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await prisma.workflowDefinition.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(req: NextRequest) {
  const payload = workflowSchema.parse(await req.json());
  const workflow = await prisma.workflowDefinition.create({
    data: {
      id: payload.id,
      name: payload.name,
      description: payload.description,
      trigger: payload.trigger,
      filters: payload.filters,
      actions: payload.actions,
      targets: payload.targetResources,
      output: payload.outputDefinition,
      approvalRequired: payload.approvalRequired,
      enabled: payload.enabled,
      auditMetadata: payload.auditMetadata
    }
  });
  return NextResponse.json(workflow, { status: 201 });
}
