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
      systemInstruction: `You are a helpful assistant for Decent Energy — a company offering energy flexibility trading products including Shîfter (smart battery management) and Flexer (grid flexibility rewards).

Answer customer questions using the following rules:
- If FAQ context is provided and relevant, use it as your primary source and answer directly and clearly.
- If multiple context chunks are relevant, synthesize them into a coherent answer.
- If the question is not covered in the FAQ context, or no context is provided, answer using your general knowledge. Be honest when you are answering from general knowledge rather than company-specific documentation.
- For questions about Decent Energy-specific policies, pricing, or account details that are not in the FAQ, advise the customer to contact support for accurate information.
- Keep answers concise but complete.`,
    },
    contents: context
      ? `FAQ Context:\n${context}\n\nCustomer Question: ${question}`
      : `No FAQ context is available for this question.\n\nCustomer Question: ${question}`,
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");
  return text;
}
