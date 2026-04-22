# InkForge REST API

All endpoints are REST-first and intended for n8n and external integrations over HTTP.

- Auth: `POST /api/auth/login`
- Imports: `GET|POST /api/imports`
- Notes: `GET|POST /api/notes`
- Pages: `GET|POST /api/pages`
- Search: `GET /api/search`
- Enrichments: `POST /api/enrichments`
- Commands: `POST /api/commands`
- Workflows: `GET|POST /api/workflows`, `POST /api/workflows/interpret`, `POST /api/workflows/run`
- Lists: `POST /api/lists/append`
- Topics: `POST /api/topics/assign`, `POST /api/topics/synthesize`
- Webhooks: `POST /api/webhooks/nextcloud`, `POST /api/webhooks/n8n`
