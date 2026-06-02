import { Pinecone, type ScoredPineconeRecord } from "@pinecone-database/pinecone";
import { EMBEDDING_DIMENSION } from "./embeddings";

let pineconeClient: Pinecone | null = null;

function getPinecone(): Pinecone {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  }
  return pineconeClient;
}

export function getIndex() {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return getPinecone().index(process.env.PINECONE_INDEX_NAME!);
}

export interface QueryOptions {
  vector: number[];
  topK?: number;
  filter?: Record<string, string>;
}

export interface QueryMatch {
  id: string;
  score: number;
  metadata: Record<string, string>;
}

export async function queryVectors(options: QueryOptions): Promise<QueryMatch[]> {
  const index = getIndex();
  const result = await index.query({
    vector: options.vector,
    topK: options.topK ?? 5,
    includeMetadata: true,
    filter: options.filter,
  });

  return (result.matches ?? []).map((m: ScoredPineconeRecord) => ({
    id: m.id,
    score: m.score ?? 0,
    metadata: (m.metadata ?? {}) as Record<string, string>,
  }));
}

export async function getIndexStats() {
  return getIndex().describeIndexStats();
}

export { EMBEDDING_DIMENSION };
