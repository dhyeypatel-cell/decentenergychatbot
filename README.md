# Decent Energy FAQ RAG API

A **Retrieval-Augmented Generation (RAG)** REST API built with **Node.js + TypeScript**, using **Pinecone** as the vector store and **Claude** (Anthropic) as both the embedding engine and answer generator.

## Architecture

```
User Question
     │
     ▼
┌─────────────────┐
│  POST /query    │  Express REST API
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Embed Question │  Claude → 1536-dim vector
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Pinecone Query │  cosine similarity, top-K retrieval
│  (+ optional    │  filter by product
│   product filter│
└────────┬────────┘
         │  Retrieved FAQ chunks (with scores)
         ▼
┌─────────────────┐
│  Claude Answer  │  Grounded generation from context only
│  Generation     │
└────────┬────────┘
         │
         ▼
  JSON Response
  { answer, sources, retrievedChunks }
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env and fill in your API keys
```

You need:
- **`ANTHROPIC_API_KEY`** — from [console.anthropic.com](https://console.anthropic.com)
- **`PINECONE_API_KEY`** — from [app.pinecone.io](https://app.pinecone.io)
- **`PINECONE_INDEX_NAME`** — e.g. `energy-faq` (created automatically on first ingest)

### 3. Ingest FAQ data into Pinecone
This embeds all 70+ FAQ chunks and upserts them into your Pinecone index.
```bash
npm run ingest
```
This takes ~2-3 minutes and only needs to run once (or whenever your FAQ data changes).

### 4. Start the API
```bash
# Development (with hot reload)
npm run dev

# Production (compile first)
npm run build
npm start
```

---

## API Reference

### `POST /query`
Ask any question. Returns a grounded answer with source citations.

**Request:**
```json
{
  "question": "How does Shîfter save me money?",
  "product": "shifter",
  "topK": 5,
  "minScore": 0.3
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | string | ✅ | The user's question |
| `product` | string | ❌ | Filter by product: `shifter`, `flexer`, `decentenergy`, `trade`, `general` |
| `topK` | number | ❌ | Max chunks to retrieve (1–10, default 5) |
| `minScore` | number | ❌ | Min similarity threshold (0–1, default 0.3) |

**Response:**
```json
{
  "question": "How does Shîfter save me money?",
  "answer": "Shîfter saves you money by automating your home battery charging schedules...",
  "sources": [
    {
      "id": "shif-005",
      "score": 0.891,
      "question": "How does the Optimization engine reduce costs?",
      "category": "How the Algorithm Works",
      "product": "shifter"
    }
  ],
  "retrievedChunks": 3
}
```

---

### `GET /health`
Returns index stats.

```json
{
  "status": "ok",
  "index": "energy-faq",
  "totalVectors": 70,
  "timestamp": "2026-05-28T10:00:00.000Z"
}
```

---

### `GET /products`
Lists available product filter values.

```json
{
  "products": [
    { "id": "shifter", "label": "Shîfter — Smart Battery Management" },
    { "id": "flexer",  "label": "Flexer — Grid Flexibility Rewards" },
    ...
  ]
}
```

---

## Knowledge Base

The system contains **70 FAQ entries** across 5 product areas:

| Product | Count | Topics |
|---------|-------|--------|
| `general` | 16 | Energy flexibility fundamentals, market operations |
| `trade` | 16 | EPEX SPOT, FCR/aFRR/mFRR, REMIT, settlement |
| `decentenergy` | 12 | Platform onboarding, VPP, automation |
| `shifter` | 25 | Battery management, inverter brands, savings, billing |
| `flexer` | 26 | Grid events, earnings, baselines, hardware safety |

---

## Production Notes

### Swap Embeddings for Better Results
The current implementation uses Claude to generate embeddings. For production, replace the `generateEmbedding` function in `src/services/embeddings.ts` with a dedicated model:

**Voyage AI (recommended — same Anthropic ecosystem):**
```typescript
// POST https://api.voyageai.com/v1/embeddings
// Model: voyage-3-lite (1024 dims) or voyage-3 (1024 dims)
```

**OpenAI:**
```typescript
import OpenAI from "openai";
const openai = new OpenAI();
const res = await openai.embeddings.create({ model: "text-embedding-3-small", input: text });
return res.data[0].embedding; // 1536 dims
```

### Adding New FAQs
1. Add entries to `src/data/faq-data.ts`
2. Re-run `npm run ingest`
3. Pinecone upsert is idempotent — existing vectors are overwritten by ID

### Scaling
- Pinecone serverless handles millions of vectors automatically
- Add Redis caching for repeated questions
- Add rate limiting middleware (e.g. `express-rate-limit`)
