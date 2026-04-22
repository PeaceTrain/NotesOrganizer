import { AIProviderRouter, anthropicAdapter, geminiAdapter, openAIAdapter } from "@inkforge/ai/src";
import { prisma } from "@inkforge/db/src";
import { NextRequest, NextResponse } from "next/server";

const router = new AIProviderRouter([openAIAdapter, anthropicAdapter, geminiAdapter]);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const page = await prisma.page.findUnique({ where: { id: body.pageId } });
  if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

  const provider = router.forTask(body.task === "extract_tasks" ? "extract" : "summarize");
  if (!provider) return NextResponse.json({ error: "No provider available" }, { status: 400 });

  const response = await provider.run({ task: body.task, prompt: page.extractedText ?? "" });
  const saved = await prisma.aiEnrichment.create({
    data: {
      pageId: page.id,
      provider: provider.name,
      model: "adapter-stub",
      task: body.task,
      output: response
    }
  });

  return NextResponse.json(saved, { status: 201 });
}
