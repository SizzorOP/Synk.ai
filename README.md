# Portfolio-First Marketplace

Monorepo baseline for an AI-powered freelance marketplace with:

- Next.js web app in `apps/web`
- NestJS API in `apps/api`
- FastAPI AI service in `services/ai`
- PostgreSQL and Qdrant schema docs in `database`

## Local services

Use Docker Compose for infrastructure and service containers:

```bash
docker compose up --build
```

## Manual development

Infra only:

```bash
npm.cmd run dev:infra
```

Full localhost app stack:

```bash
npm.cmd run dev:local
```

Frontend only:

```bash
npm.cmd run dev:web
```

API:

```bash
npm.cmd run dev:api
```

AI service:

```bash
python -m uvicorn services.ai.app.main:app --reload --host 0.0.0.0 --port 8001
```

## Local URLs

- Web: `http://localhost:3000`
- Dashboard: `http://localhost:3000/dashboard`
- Matching Studio: `http://localhost:3000/matching-studio`
- Launchpad: `http://localhost:3000/launchpad`
- Deal Desk: `http://localhost:3000/deal-desk`
- Collaboration Hub: `http://localhost:3000/collaboration-hub`
- API: `http://localhost:4000/api/v1`
- AI service: `http://localhost:8001`

## Local auth

- The API now exposes localhost auth helpers:
  - `GET /api/v1/auth/personas`
  - `POST /api/v1/auth/dev-login`
  - `GET /api/v1/auth/me`
- Use the header dev-session switcher in the web app to log in as a seeded persona.
- Protected write routes:
  - `POST /api/v1/jobs` requires `RECRUITER`, `BRAND_ADMIN`, or `PLATFORM_ADMIN`
  - `POST /api/v1/portfolios` requires `FREELANCER` or `PLATFORM_ADMIN`
  - `POST /api/v1/engagements/proposals` requires `FREELANCER` or `PLATFORM_ADMIN`
  - `POST /api/v1/engagements/contracts` requires `RECRUITER`, `BRAND_ADMIN`, or `PLATFORM_ADMIN`
  - `POST /api/v1/platform/vector/*` requires `PLATFORM_ADMIN`

## Engagements

- Overview and proposal endpoints:
  - `GET /api/v1/engagements/overview`
  - `GET /api/v1/engagements/proposals/me`
  - `GET /api/v1/engagements/jobs/:jobId/proposals`
  - `POST /api/v1/engagements/proposals`
  - `POST /api/v1/engagements/proposals/:proposalId/shortlist`
- Contract and milestone endpoints:
  - `GET /api/v1/engagements/contracts`
  - `GET /api/v1/engagements/contracts/:contractId`
  - `GET /api/v1/engagements/contracts/:contractId/transactions`
  - `POST /api/v1/engagements/contracts`
  - `POST /api/v1/engagements/contracts/:contractId/milestones/:milestoneId/fund`
  - `POST /api/v1/engagements/contracts/:contractId/milestones/:milestoneId/submit`
  - `POST /api/v1/engagements/contracts/:contractId/milestones/:milestoneId/approve`
- The localhost deal desk at `/deal-desk` uses the same dev-session switcher as the other product surfaces.

## Collaboration hub

- Chat REST endpoints:
  - `GET /api/v1/chat/threads`
  - `POST /api/v1/chat/threads`
  - `GET /api/v1/chat/threads/:threadId/messages`
  - `POST /api/v1/chat/threads/:threadId/messages`
- Socket.io namespace:
  - `${NEXT_PUBLIC_API_SOCKET_URL}/collaboration`
- The web collaboration surface uses the same localhost session from the header and falls back to REST sends if the realtime socket is unavailable.
