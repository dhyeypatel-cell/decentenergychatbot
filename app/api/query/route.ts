import { NextRequest } from "next/server";
import { z } from "zod";
import { ragQuery } from "@/lib/rag";

const QuerySchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters"),
  product: z
    .enum(["shifter", "flexer", "decentenergy", "trade", "general"])
    .optional(),
  topK: z.number().int().min(1).max(10).optional().default(5),
  minScore: z.number().min(0).max(1).optional().default(0.3),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = QuerySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const result = await ragQuery(parsed.data);
    return Response.json({ question: parsed.data.question, ...result });
  } catch (err) {
    console.error("RAG query error:", err);
    return Response.json(
      { error: "Internal server error", message: String(err) },
      { status: 500 }
    );
  }
}
