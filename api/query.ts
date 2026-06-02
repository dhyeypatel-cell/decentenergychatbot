import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { ragQuery } from "../rag";

const QuerySchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters"),
  product: z
    .enum(["shifter", "flexer", "decentenergy", "trade", "general"])
    .optional(),
  topK: z.number().int().min(1).max(10).optional().default(5),
  minScore: z.number().min(0).max(1).optional().default(0.3),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const parsed = QuerySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const result = await ragQuery(parsed.data);
    return res.json({ question: parsed.data.question, ...result });
  } catch (err) {
    console.error("RAG query error:", err);
    return res.status(500).json({ error: "Internal server error", message: String(err) });
  }
}
