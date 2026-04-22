# InkForge Architecture

## Phase 1 Design Artifacts

### Final Architecture
- Next.js web/API service for UI + REST endpoints.
- Worker service for all expensive asynchronous tasks.
- PostgreSQL/Prisma as system-of-record.
- pgvector embedding table for semantic retrieval.
- MinIO for immutable original files.
- Redis + BullMQ for job orchestration.

### Ingestion Path
Onyx Boox -> Nextcloud (WebDAV/webhooks) -> InkForge imports endpoint -> background processing.

### Modular Package Roles
- `@inkforge/db`: Prisma client and seed.
- `@inkforge/storage`: MinIO adapter.
- `@inkforge/ai`: provider adapters and routing.
- `@inkforge/workflows`: safe declarative workflow DSL + interpreter.
- `@inkforge/search`: keyword + semantic data access.
- `@inkforge/shared`: shared enums and types.
- `@inkforge/ui`: reusable components.
