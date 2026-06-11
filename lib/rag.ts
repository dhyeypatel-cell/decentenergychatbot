import { GoogleGenAI } from "@google/genai";
import { embedText } from "./embeddings";
import { queryVectors, QueryMatch } from "./pinecone";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export interface RAGQueryOptions {
  question: string;
  topK?: number;
  product?: string;
  minScore?: number;
}

export interface RAGResult {
  answer: string;
  sources: {
    id: string;
    score: number;
    question: string;
    category: string;
    product: string;
  }[];
  retrievedChunks: number;
}

export async function ragQuery(options: RAGQueryOptions): Promise<RAGResult> {
  const { question, topK = 5, product, minScore = 0.3 } = options;

  const questionVector = await embedText(question);

  const filter = product ? { product } : undefined;
  const matches = await queryVectors({ vector: questionVector, topK, filter });

  const relevantMatches = matches.filter((m) => m.score >= minScore);

  const context = relevantMatches.length > 0 ? buildContext(relevantMatches) : "";
  const answer = await generateAnswer(question, context);

  return {
    answer,
    sources: relevantMatches.map((m) => ({
      id: m.id,
      score: Math.round(m.score * 1000) / 1000,
      question: m.metadata.question ?? "",
      category: m.metadata.category ?? "",
      product: m.metadata.product ?? "",
    })),
    retrievedChunks: relevantMatches.length,
  };
}

function buildContext(matches: QueryMatch[]): string {
  return matches
    .map((m, i) => `[${i + 1}] (${m.metadata.product ?? "general"} / ${m.metadata.category ?? ""})\n${m.metadata.text ?? ""}`)
    .join("\n\n");
}

async function generateAnswer(question: string, context: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `You are a knowledgeable assistant for Decent Energy — a UK energy technology company whose products are:
- Shîfter: smart home battery management that automatically optimises charge/discharge schedules to minimise electricity cost and carbon footprint.
- Flexer: grid flexibility rewards for customers who can shift their energy usage.
- ShifterSimulator: the backend platform (Python/FastAPI/PostgreSQL/MongoDB) that powers Shîfter — it runs daily, collects tariff/carbon/solar/inverter data, runs a Dynamic Programming optimisation algorithm, pushes schedules to physical inverters, and notifies customers via WhatsApp.

Answer questions using these rules:
- If FAQ context is provided and relevant, use it as your primary source. Synthesise multiple chunks into a single coherent answer.
- If the question is not covered in the FAQ context, or no context is provided, answer from your general knowledge about energy management, battery storage, smart tariffs, or related topics. Be transparent when answering from general knowledge rather than Decent Energy documentation.
- For questions about a specific customer's account, pricing, billing, or hardware issues, advise them to contact Decent Energy support directly.
- Keep answers accurate, concise, and helpful.`,
    },
    contents: context
      ? `FAQ Context:\n${context}\n\nCustomer Question: ${question}`
      : `No FAQ context is available for this question.\n\nCustomer Question: ${question}`,
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");
  return text;
}
