import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await prisma.importJob.findMany({ orderBy: { importedAt: "desc" }, take: 100 }));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.importJob.create({
    data: {
      sourceType: body.sourceType,
      sourcePath: body.sourcePath,
      etag: body.etag,
      fileHash: body.fileHash,
      provenance: body.provenance ?? {},
      deduplicated: Boolean(body.deduplicated)
    }
  });
  return NextResponse.json(created, { status: 201 });
}
