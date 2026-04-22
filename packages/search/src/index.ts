import { prisma } from "@inkforge/db/src";

export async function keywordSearch(query: string) {
  return prisma.page.findMany({
    where: {
      OR: [
        { extractedText: { contains: query, mode: "insensitive" } },
        { cleanedText: { contains: query, mode: "insensitive" } }
      ]
    },
    include: { note: true }
  });
}

export async function semanticSearch(_query: string, filters: Record<string, string | undefined>) {
  return prisma.embedding.findMany({
    where: {
      entityType: filters.entityType
    },
    take: 20
  });
}
