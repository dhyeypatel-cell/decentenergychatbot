import { NextRequest } from "next/server";
import { getIndex } from "@/lib/pinecone";
import { embedText } from "@/lib/embeddings";
import { qnaData } from "@/scripts/qna-data";

const SEED_SECRET = process.env.SEED_SECRET ?? "seed-decent-energy";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== SEED_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const index = getIndex();
  const results: { id: string; status: string; error?: string }[] = [];
  let upserted = 0;

  for (const entry of qnaData) {
    try {
      const textToEmbed = `Question: ${entry.question}\nAnswer: ${entry.answer}`;
      const vector = await embedText(textToEmbed);

      await index.upsert({
        records: [
          {
            id: entry.id,
            values: vector,
            metadata: {
              question: entry.question,
              answer: entry.answer,
              text: textToEmbed,
              category: entry.category,
              product: entry.product,
            },
          },
        ],
      });

      results.push({ id: entry.id, status: "ok" });
      upserted++;
    } catch (err) {
      results.push({ id: entry.id, status: "error", error: String(err) });
    }
  }

  return Response.json({
    total: qnaData.length,
    upserted,
    failed: qnaData.length - upserted,
    results,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== SEED_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { getIndexStats } = await import("@/lib/pinecone");
  const stats = await getIndexStats();
  return Response.json({ stats, totalQnA: qnaData.length });
}
