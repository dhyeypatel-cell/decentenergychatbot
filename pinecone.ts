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

export interface UpsertRecord {
  id: string;
  values: number[];
  metadata: Record<string, string>;
}

/** Upsert FAQ vectors in batches of 100 */
export async function upsertVectors(records: UpsertRecord[]): Promise<void> {
  const index = getIndex();
  const BATCH_SIZE = 100;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    await index.upsert({
      records: batch.map((r) => ({
        id: r.id,
        values: r.values,
        metadata: r.metadata,
      })),
    });
    console.log(
      `  Upserted batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(records.length / BATCH_SIZE)}`
    );
  }
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

/** Query Pinecone for the most semantically similar FAQ chunks */
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

/** Check if index exists and has vectors */
export async function getIndexStats() {
  const index = getIndex();
  return index.describeIndexStats();
}

/** Ensure a Pinecone index exists with the correct dimension */
export async function ensureIndex(): Promise<void> {
  const pc = getPinecone();
  const indexName = process.env.PINECONE_INDEX_NAME!;

  const existing = await pc.listIndexes();
  const names = (existing.indexes ?? []).map((i) => i.name);

  if (names.includes(indexName)) {
    const desc = await pc.describeIndex(indexName);
    const existingDim = desc.dimension;
    if (existingDim !== EMBEDDING_DIMENSION) {
      console.log(`Index "${indexName}" has wrong dimension (${existingDim} vs ${EMBEDDING_DIMENSION}). Deleting and recreating...`);
      await pc.deleteIndex(indexName);
      await new Promise((r) => setTimeout(r, 3000));
    } else {
      console.log(`Index "${indexName}" already exists with correct dimension.`);
      return;
    }
  }

  console.log(`Creating Pinecone index "${indexName}" (dim=${EMBEDDING_DIMENSION})...`);
  await pc.createIndex({
    name: indexName,
    dimension: EMBEDDING_DIMENSION,
    metric: "cosine",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });

  let ready = false;
  while (!ready) {
    await new Promise((r) => setTimeout(r, 2000));
    const desc = await pc.describeIndex(indexName);
    ready = desc.status?.ready ?? false;
    console.log(`  Index status: ${desc.status?.state ?? "unknown"}`);
  }
  console.log("Index ready.");
}
