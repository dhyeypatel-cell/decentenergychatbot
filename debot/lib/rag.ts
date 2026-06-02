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

  if (relevantMatches.length === 0) {
    return {
      answer: "I don't have enough information to answer that confidently. Please contact our support team.",
      sources: [],
      retrievedChunks: 0,
    };
  }

  const context = buildContext(relevantMatches);
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
      systemInstruction: `You are a helpful FAQ assistant for Decent Energy — a company offering energy flexibility trading products including Shîfter (smart battery management) and Flexer (grid flexibility rewards).

Answer customer questions using ONLY the provided FAQ context. Follow these rules:
- Answer directly and clearly based on the context provided.
- If multiple context chunks are relevant, synthesize them into a coherent answer.
- If the question is not covered in the context, say so and suggest contacting support.
- Keep answers concise but complete.
- Never invent information not present in the context.`,
    },
    contents: `FAQ Context:\n${context}\n\nCustomer Question: ${question}`,
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");
  return text;
}
