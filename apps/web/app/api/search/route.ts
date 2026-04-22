import { keywordSearch, semanticSearch } from "@inkforge/search/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const mode = req.nextUrl.searchParams.get("mode") ?? "keyword";
  if (mode === "semantic") {
    return NextResponse.json(await semanticSearch(q, { entityType: req.nextUrl.searchParams.get("entityType") ?? undefined }));
  }
  return NextResponse.json(await keywordSearch(q));
}
