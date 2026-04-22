import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { prisma } from "@inkforge/db/src";
import { AIProviderRouter, geminiAdapter, openAIAdapter, anthropicAdapter } from "@inkforge/ai/src";

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", { maxRetriesPerRequest: null });
const queueName = "inkforge-jobs";

export const inkforgeQueue = new Queue(queueName, { connection });
const router = new AIProviderRouter([openAIAdapter, anthropicAdapter, geminiAdapter]);

new Worker(
  queueName,
  async (job) => {
    if (job.name === "process-import") {
      const importJob = await prisma.importJob.update({
        where: { id: job.data.importJobId },
        data: { state: "PROCESSING" }
      });

      await prisma.processingLog.create({
        data: {
          entityType: "ImportJob",
          entityId: importJob.id,
          stage: "ingest",
          level: "INFO",
          message: `Processed import from ${importJob.sourcePath}`
        }
      });

      await prisma.importJob.update({ where: { id: importJob.id }, data: { state: "COMPLETED" } });
    }

    if (job.name === "summarize-page") {
      const page = await prisma.page.findUnique({ where: { id: job.data.pageId } });
      if (!page) return;
      const provider = router.forTask("summarize");
      if (!provider) return;
      const summary = await provider.run({ task: "summarize", prompt: page.extractedText ?? "" });
      await prisma.aiEnrichment.create({
        data: {
          pageId: page.id,
          provider: provider.name,
          model: "stub",
          task: "summarize",
          output: summary
        }
      });
    }
  },
  { connection }
);

async function bootstrap() {
  await inkforgeQueue.add("heartbeat", { at: new Date().toISOString() });
  // eslint-disable-next-line no-console
  console.log("InkForge worker running");
}

bootstrap();
