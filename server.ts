import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { z } from "zod";
import { ragQuery } from "./rag";
import { getIndexStats } from "./pinecone";

const app = express();
app.use(cors());
app.use(express.json());

// ─── Request Schemas ──────────────────────────────────────────────────────────

const QuerySchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters"),
  product: z
    .enum(["shifter", "flexer", "decentenergy", "trade", "general"])
    .optional(),
  topK: z.number().int().min(1).max(10).optional().default(5),
  minScore: z.number().min(0).max(1).optional().default(0.3),
});

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * GET /health
 * Health check + Pinecone index stats
 */
app.get("/health", async (_req: Request, res: Response) => {
  try {
    const stats = await getIndexStats();
    res.json({
      status: "ok",
      index: process.env.PINECONE_INDEX_NAME,
      totalVectors: stats.totalRecordCount ?? 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: String(err) });
  }
});

/**
 * POST /query
 * Main RAG endpoint — ask any question about the FAQ knowledge base.
 *
 * Request body:
 *   {
 *     "question": "How does Shîfter save me money?",
 *     "product": "shifter",   // optional filter
 *     "topK": 5,              // optional, default 5
 *     "minScore": 0.3         // optional, default 0.3
 *   }
 *
 * Response:
 *   {
 *     "answer": "...",
 *     "sources": [...],
 *     "retrievedChunks": 3,
 *     "question": "..."
 *   }
 */
app.post("/query", async (req: Request, res: Response) => {
  const parsed = QuerySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid request",
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const result = await ragQuery(parsed.data);
    res.json({
      question: parsed.data.question,
      ...result,
    });
  } catch (err) {
    console.error("RAG query error:", err);
    res.status(500).json({ error: "Internal server error", message: String(err) });
  }
});

/**
 * GET /products
 * Returns the list of product filters available
 */
app.get("/products", (_req: Request, res: Response) => {
  res.json({
    products: [
      { id: "general", label: "General Energy Flexibility" },
      { id: "trade", label: "Trade-Specific FAQs" },
      { id: "decentenergy", label: "Decent Energy Platform" },
      { id: "shifter", label: "Shîfter — Smart Battery Management" },
      { id: "flexer", label: "Flexer — Grid Flexibility Rewards" },
    ],
  });
});

// ─── Error handler ────────────────────────────────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message });
});

// ─── Start ────────────────────────────────────────────────────────────────────

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  console.log(`\n🔋 Decent Energy RAG API running on http://localhost:${PORT}`);
  console.log(`   POST /query       — ask a question`);
  console.log(`   GET  /health      — index stats`);
  console.log(`   GET  /products    — available product filters\n`);
});
