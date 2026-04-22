import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const job = await prisma.importJob.create({
    data: {
      sourceType: "NEXTCLOUD_WEBHOOK",
      sourcePath: body.path,
      etag: body.etag,
      provenance: body
    }
  });
  return NextResponse.json({ accepted: true, jobId: job.id }, { status: 202 });
}
