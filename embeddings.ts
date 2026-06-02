import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

// gemini-embedding-001 produces 3072-dimensional vectors
export const EMBEDDING_DIMENSION = 3072;

export async function embedText(text: string): Promise<number[]> {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text.slice(0, 2048),
  });
  const values = response.embeddings?.[0]?.values;
  if (!values) throw new Error("No embedding returned from Google API");
  return values;
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  return Promise.all(texts.map(embedText));
}
