# InkForge

InkForge is a production-oriented, self-hosted platform for ingesting and enriching handwritten notes (especially from **Onyx Boox → Nextcloud → InkForge** workflows), while preserving original source files and exposing a REST API for automations such as n8n.

## Architecture

- **Monorepo**: apps + packages with pnpm workspaces and Turbo.
- **Frontend/API**: Next.js 15 (`apps/web`) with App Router and REST endpoints.
- **Worker**: BullMQ-based background processing (`apps/worker`).
- **Database**: PostgreSQL + Prisma + pgvector.
- **Object Storage**: MinIO (original PDFs/images/screenshots kept unchanged).
- **Queue/Cache**: Redis.
- **AI Abstraction**: Provider adapters for OpenAI, Anthropic, Gemini in `packages/ai`.
- **Workflow Engine**: Safe declarative DSL in `packages/workflows`.

## Repo Structure

```
apps/
  web/
  worker/
packages/
  ai/
  db/
  search/
  shared/
  storage/
  ui/
  workflows/
prisma/
  schema.prisma
  migrations/
fixtures/
tests/
```

## MVP Coverage

Implemented MVP modules:
1. Local auth API (`/api/auth/login`)
2. Nextcloud/WebDAV-friendly import models + Nextcloud webhook endpoint
3. Manual/API ingestion endpoint
4. Original file model + assets/pages for side-by-side interpretation
5. Note/page retrieval and storage APIs
6. AI summarization/task extraction scaffolding
7. Context enrichment and AI enrichment storage entities
8. Keyword + semantic search APIs
9. Screenshot/source group entities
10. Topic assignment + synthesized note generation
11. Lists + append APIs + command support
12. Handwritten command detection endpoint + confidence/review routing
13. NL feature interpreter -> workflow proposal endpoint
14. Workflow definitions + execution run endpoint
15. n8n webhook endpoint
16. Docker Compose deployment stack

## API Surface (REST)

- `POST /api/auth/login`
- `GET|POST /api/imports`
- `GET|POST /api/notes`
- `GET|POST /api/pages`
- `GET /api/search?mode=keyword|semantic&q=...`
- `POST /api/enrichments`
- `POST /api/commands`
- `GET|POST /api/workflows`
- `POST /api/workflows/interpret`
- `POST /api/workflows/run`
- `POST /api/lists/append`
- `POST /api/topics/assign`
- `POST /api/topics/synthesize`
- `POST /api/webhooks/nextcloud`
- `POST /api/webhooks/n8n`

## Ingestion Pipeline

1. Import created from webhook, manual upload, or API.
2. `ImportJob` recorded with source metadata, hash/etag, dedupe flag, and provenance.
3. Worker processes import asynchronously.
4. Notes/pages/assets created, enrichment and indexing jobs enqueued.
5. Logs persisted in `ProcessingLog`.

## Declarative Workflow DSL

See `packages/workflows/examples/workflow-dsl.json`.

Workflow definition includes:
- id, name, description
- trigger
- filters/conditions
- action chain
- target resources
- output definition
- approval requirement
- enabled flag
- audit metadata

## Running Locally

```bash
pnpm install
docker compose up -d postgres redis minio
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

In separate terminal:

```bash
pnpm --filter @inkforge/worker dev
```

## Tests

```bash
pnpm test
```

Includes:
- workflow DSL tests
- command detection tests
- ingestion API integration smoke tests
- mocked provider adapter tests

## Phase Summaries

### Phase 1 (Design)
- Finalized architecture, repo structure, Prisma data model, workflow DSL shape, API routes, ingestion plan.

### Phase 2 (Foundations)
- Implemented schema, db package, storage abstraction, queue-ready worker foundation, provider abstraction.

### Phase 3 (Core domain)
- Implemented imports, notes/pages, lists, topics, synthesized notes, command detection, workflow definition/run.

### Phase 4 (UI)
- Added Next.js app with dashboard and navigation screens for Inbox/Notes/Topics/Screenshots/Lists/Workflows/Search/Admin.

### Phase 5 (Ops + quality)
- Added Docker Compose, seed script, fixtures folders, tests, and documentation.

## Security Notes

- Role-based user model (ADMIN/USER).
- No arbitrary runtime code generation for workflows.
- Workflow interpreter outputs declarative proposals requiring explicit approval.
- Keep provider API keys encrypted at rest in production deployment.
- Add CSRF/session hardening and reverse proxy rate limiting in deployment.
