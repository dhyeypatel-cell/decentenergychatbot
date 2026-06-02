import "dotenv/config";
import { FAQ_CHUNKS } from "./faq-data";
import { embedText } from "./embeddings";
import { ensureIndex, upsertVectors, getIndexStats } from "./pinecone";

async function ingest() {
  console.log("🚀 Starting FAQ ingestion into Pinecone...\n");

  // 1. Ensure index exists
  await ensureIndex();

  // 2. Check current stats
  const statsBefore = await getIndexStats();
  console.log(`\nIndex currently has ${statsBefore.totalRecordCount ?? 0} vectors.\n`);

  // 3. Embed each FAQ chunk
  console.log(`Embedding ${FAQ_CHUNKS.length} FAQ chunks...`);
  const records = [];

  for (let i = 0; i < FAQ_CHUNKS.length; i++) {
    const chunk = FAQ_CHUNKS[i];
    process.stdout.write(`  [${i + 1}/${FAQ_CHUNKS.length}] ${chunk.id} ...`);

    try {
      const vector = await embedText(chunk.text);
      records.push({
        id: chunk.id,
        values: vector,
        metadata: {
          ...chunk.metadata,
          text: chunk.text,
        },
      });
      process.stdout.write(" ✓\n");
    } catch (err) {
      process.stdout.write(` ✗ ERROR: ${err}\n`);
    }

    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  // 4. Upsert to Pinecone
  console.log(`\nUpserting ${records.length} vectors to Pinecone...`);
  await upsertVectors(records);

  // 5. Confirm
  const statsAfter = await getIndexStats();
  console.log(`\n✅ Ingestion complete! Index now has ${statsAfter.totalRecordCount ?? 0} vectors.`);
}

ingest().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
