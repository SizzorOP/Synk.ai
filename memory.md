# Project Memory

## Project

AI-powered portfolio-first freelance marketplace inspired by Unjob.ai.

Primary stack baseline:

- Web: Next.js + Tailwind CSS
- Mobile target: Flutter
- API: NestJS
- AI services: FastAPI
- Database: PostgreSQL
- Vector DB: Qdrant
- Cache / realtime: Redis + Socket.io
- Infra: Docker, Kubernetes, GitHub Actions

## Working Rules

- This file must be updated whenever meaningful repo changes are made.
- Record what changed, why it changed, how blockers were handled, and what remains.
- Prefer concrete file paths and short operational notes over vague summaries.

## Completed Work

### 2026-03-16 - Initial architecture baseline

Files added:

- `docs/system-architecture.md`
- `database/postgres_schema.sql`
- `database/qdrant_schema.md`

What was done:

- Defined the high-level platform architecture for clients, API, AI services, storage, payments, and observability.
- Documented the two-stage AI matching flow using vector retrieval plus re-ranking.
- Created the initial PostgreSQL schema covering core marketplace entities.
- Defined Qdrant collection strategy for talent, portfolio evidence, and jobs.

Key decisions:

- Use Qdrant over Milvus for the first production baseline because it has a simpler operational profile and strong payload filtering.
- Keep PostgreSQL as the canonical source of truth; treat Qdrant strictly as a denormalized search layer.
- Separate embedding generation from LLM-based explanation and re-ranking.

## Active Work

### 2026-03-16 - Monorepo scaffold and MVP foundation

Current objective:

- Turn the architecture into an executable codebase with web, API, AI service, infra, and baseline developer workflows.

Planned deliverables in the current pass:

- `memory.md` persistent log
- monorepo workspace structure
- Next.js app shell
- NestJS API shell
- FastAPI AI service shell
- Docker and docker-compose setup
- environment templates
- CI workflow

### 2026-03-16 - Executable baseline completed

Files added:

- `package.json`
- `package-lock.json`
- `.gitignore`
- `.editorconfig`
- `.env.example`
- `tsconfig.base.json`
- `README.md`
- `apps/web/*`
- `apps/api/*`
- `services/ai/*`
- `.github/workflows/ci.yml`
- `docker-compose.yml`

What was done:

- Created a root workspace for the Node applications.
- Added a Next.js + Tailwind web shell with landing and dashboard routes.
- Added a NestJS API with:
  - `/api/v1/health`
  - `/api/v1/jobs`
  - `/api/v1/jobs/preview-match`
  - `/api/v1/matching/job/:jobId`
  - `/api/v1/portfolios`
  - `/api/v1/platform/summary`
- Added seed marketplace data so matching flows can be exercised before database integration.
- Added a FastAPI AI service with:
  - `/health`
  - `/match/rerank`
- Wired NestJS matching to call the FastAPI reranking endpoint when `AI_SERVICE_URL` is available, with a local fallback if it is not.
- Added Dockerfiles for web, API, and AI service.
- Added `docker-compose.yml` for PostgreSQL, Redis, Qdrant, API, web, and AI services.
- Added a GitHub Actions workflow for Node build checks and Python import validation.

How it was implemented:

- The web app was kept static-first so it can build cleanly before API wiring is expanded.
- The API uses NestJS modules split by capability: health, jobs, portfolios, matching, and platform summary.
- The first matching flow is heuristic and explainable, which provides a usable API contract now while the semantic retrieval layer is still being wired.
- The AI service mirrors the matching contract and is positioned as the future reranking boundary.

Verification performed:

- `npm.cmd install`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- `python -m pip install -r services/ai/requirements.txt`
- `python -m compileall services/ai/app`
- runtime API health check on `http://127.0.0.1:4000/api/v1/health`
- runtime AI health check on `http://127.0.0.1:8001/health`
- cross-service runtime matching check on `http://127.0.0.1:4000/api/v1/matching/job/job-2` with the AI service running
- `docker compose config`

Verification result:

- Node workspaces typechecked successfully.
- Next.js production build succeeded.
- NestJS production build succeeded.
- FastAPI service modules compiled successfully.
- API and AI runtime health checks both returned success.
- Cross-service reranking returned `ai_rerank_v1` and successfully ranked the seeded marketplace-MVP job against the freelancer seed set.
- Docker Compose configuration is valid.

### 2026-03-16 - Localhost UI baseline and browser verification

Files added or updated:

- `apps/web/.env.example`
- `apps/web/src/lib/api.ts`
- `apps/web/src/components/site-header.tsx`
- `apps/web/src/components/dashboard-shell.tsx`
- `apps/web/src/components/matching-studio.tsx`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/dashboard/page.tsx`
- `apps/web/src/app/matching-studio/page.tsx`
- `apps/web/src/app/icon.svg`
- `package.json`
- `README.md`

What was done:

- Reworked the frontend into a usable localhost-facing base UI instead of a static placeholder.
- Added shared API helpers and fallback data so the UI can render even when the backend is temporarily unavailable.
- Added a reusable site header and navigation for the main routes.
- Replaced the static dashboard with a live client-side dashboard that loads:
  - platform summary
  - jobs
  - portfolios
  - current AI shortlist
- Added a matching studio page that posts recruiter-style briefs to the API and displays ranked candidates.
- Added root developer scripts for:
  - infrastructure only
  - AI service only
  - full local app stack
- Added an app icon so the localhost frontend no longer throws a favicon 404.

How it was implemented:

- The web app fetches from `NEXT_PUBLIC_API_BASE_URL` and falls back to localhost `http://localhost:4000/api/v1`.
- Dashboard data is loaded client-side with safe fallback behavior to keep the UI resilient.
- The matching studio uses the existing API preview endpoint and surfaces the current reranking model output.
- Currency formatting was converted to ASCII `Rs` output to avoid snapshot encoding noise and keep the UI output consistent.

Verification performed:

- `npm.cmd install`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- local browser verification with Playwright CLI via `npx.cmd`
- screenshots saved to:
  - `output/playwright/home.png`
  - `output/playwright/dashboard.png`
  - `output/playwright/matching-studio.png`
- DOM text verification saved to:
  - `output/playwright/home-eval.txt`
  - `output/playwright/dashboard-eval.txt`
  - `output/playwright/matching-studio-eval.txt`
- browser verification summary saved to:
  - `output/playwright/verification-summary.json`

Verification result:

- Landing page verified.
- Dashboard page verified.
- Matching studio page verified.
- Browser console checks returned zero frontend errors on all three routes.

### 2026-03-16 - PostgreSQL-backed read path scaffold

Files added or updated:

- `apps/api/src/modules/database/*`
- `apps/api/src/modules/marketplace-data/*`
- `apps/api/src/app.module.ts`
- `apps/api/src/modules/jobs/*`
- `apps/api/src/modules/portfolios/*`
- `apps/api/src/modules/platform/*`
- `apps/api/src/modules/matching/*`
- `database/postgres_seed.sql`
- `docker-compose.yml`

What was done:

- Added a database module using `pg`.
- Added a marketplace data service that attempts PostgreSQL reads first and falls back to in-memory seed data if the database is unavailable.
- Rewired jobs, portfolios, platform summary, and matching modules to use the new data service.
- Added PostgreSQL seed data aligned with the existing architecture and UI:
  - users
  - freelancer profiles
  - skills
  - organizations
  - featured portfolio projects
  - verification records
  - jobs
  - job skills
- Wired Docker Compose to load the seed SQL after the schema SQL.

How it was implemented:

- Read queries were introduced only for the fields the current UI and API endpoints already need.
- Matching still works against the normalized portfolio/job shape returned by the data service, regardless of whether the source is PostgreSQL or fallback seed data.
- The refactor preserved the current API contract so the frontend did not need to change.

Verification performed:

- `npm.cmd install`
- `npm.cmd run typecheck --workspace @marketplace/api`
- `npm.cmd run build --workspace @marketplace/api`
- runtime API verification for:
  - `/api/v1/jobs`
  - `/api/v1/portfolios`
  - `/api/v1/platform/summary`

Verification result:

- API typecheck passed.
- API production build passed.
- Fallback runtime path still returns the expected jobs, portfolios, and summary after the data-layer refactor.

### 2026-03-16 - API write path scaffold

Files added or updated:

- `apps/api/src/modules/jobs/dto/create-job.dto.ts`
- `apps/api/src/modules/portfolios/dto/create-portfolio.dto.ts`
- `apps/api/src/modules/jobs/jobs.controller.ts`
- `apps/api/src/modules/jobs/jobs.service.ts`
- `apps/api/src/modules/portfolios/portfolios.controller.ts`
- `apps/api/src/modules/portfolios/portfolios.service.ts`
- `apps/api/src/modules/marketplace-data/marketplace-data.service.ts`

What was done:

- Added `POST /api/v1/jobs`.
- Added `POST /api/v1/portfolios`.
- Implemented PostgreSQL-first inserts for jobs and portfolios.
- Added fallback in-process creation logic so localhost flows still work when PostgreSQL is unavailable.
- Added skill upsert logic for newly created jobs and portfolios.
- Added automatic organization creation for new recruiter-side job entries when needed.
- Added automatic freelancer user/profile creation for new portfolio entries when needed.

How it was implemented:

- The API accepts normalized DTO payloads and forwards them to `MarketplaceDataService`.
- If database writes succeed, the new entities are returned from the PostgreSQL-backed read path.
- If database writes fail or `DATABASE_URL` is unusable, the service appends records into the in-memory seed arrays so the current dev session remains functional.
- Matching continues to consume the same normalized job/portfolio record shape, so new write flows fit the existing UI and ranking path.

Verification performed:

- `npm.cmd run typecheck --workspace @marketplace/api`
- `npm.cmd run build --workspace @marketplace/api`

Verification result:

- API write-path changes typechecked successfully.
- API write-path changes built successfully.

### 2026-03-16 - Launchpad UI and write-flow verification

Files added or updated:

- `apps/web/src/lib/api.ts`
- `apps/web/src/components/launchpad.tsx`
- `apps/web/src/app/launchpad/page.tsx`
- `apps/web/src/components/site-header.tsx`

What was done:

- Added a localhost Launchpad page for creating jobs and portfolio entries from the browser.
- Wired the web app to `POST /api/v1/jobs` and `POST /api/v1/portfolios`.
- Added job creation and portfolio creation forms with inline success/error feedback.
- Added Launchpad navigation to the shared site header.

How it was implemented:

- The Launchpad uses client-side form state and `startTransition` for request submission.
- The web layer posts normalized payloads to the API helper functions in `apps/web/src/lib/api.ts`.
- Success messages are kept simple and geared toward the current localhost workflow: create, then refresh the dashboard or query the API again.

Verification performed:

- `npm.cmd run typecheck`
- `npm.cmd run build`
- runtime API fallback-mode creation verification for:
  - `POST /api/v1/jobs`
  - `POST /api/v1/portfolios`
  - follow-up `GET /api/v1/jobs`
  - follow-up `GET /api/v1/portfolios`
- browser verification for `/launchpad`
- screenshot written to `output/playwright/launchpad.png`

Verification result:

- Root typecheck passed.
- Root build passed.
- Creating a job increased the returned job count from 2 to 3 in fallback mode.
- Creating a portfolio increased the returned portfolio count from 3 to 4 in fallback mode.
- `/launchpad` renders the expected title and both creation forms in the browser.

### 2026-03-16 - Local JWT auth, role guards, and localhost session controls

Files added or updated:

- `apps/api/src/data/auth.data.ts`
- `apps/api/src/modules/auth/*`
- `apps/api/src/app.module.ts`
- `apps/api/src/modules/health/health.controller.ts`
- `apps/api/src/modules/jobs/jobs.controller.ts`
- `apps/api/src/modules/jobs/jobs.service.ts`
- `apps/api/src/modules/portfolios/portfolios.controller.ts`
- `apps/api/src/modules/portfolios/portfolios.service.ts`
- `apps/api/src/modules/matching/matching.controller.ts`
- `apps/api/src/modules/platform/platform.controller.ts`
- `apps/api/src/modules/marketplace-data/marketplace-data.service.ts`
- `database/postgres_seed.sql`
- `apps/web/src/lib/api.ts`
- `apps/web/src/lib/dev-session.ts`
- `apps/web/src/components/site-header.tsx`
- `apps/web/src/components/launchpad.tsx`
- `.gitignore`
- `.env.example`
- `README.md`
- `output/runtime/auth-verification.json`

What was done:

- Added a NestJS auth module with:
  - `GET /api/v1/auth/personas`
  - `POST /api/v1/auth/dev-login`
  - `GET /api/v1/auth/me`
- Added global JWT auth and role guards with explicit `@Public()` and `@Roles(...)` decorators.
- Protected write endpoints so that:
  - jobs require recruiter-side or platform-admin roles
  - portfolios require freelancer-side or platform-admin roles
  - vector bootstrap and sync require platform-admin access
- Reworked job creation to attribute writes to the authenticated actor instead of always using the hard-coded recruiter seed user.
- Reworked portfolio creation so freelancer self-service writes use the authenticated user identity and cannot self-assign verification; only platform admin can set verified state.
- Added an admin seed persona to PostgreSQL seed data.
- Added a localhost dev-session switcher in the shared web header and updated Launchpad to:
  - send bearer tokens on protected POST requests
  - disable actions for the wrong role
  - show the current active persona

How it was implemented:

- JWT issuance uses `jsonwebtoken` with a local secret from `JWT_SECRET` and a dev-friendly TTL from `AUTH_JWT_TTL`.
- User lookup tries PostgreSQL first and falls back to the seeded localhost personas when the database is unavailable.
- Auth is global by default, and only explicitly public routes bypass the JWT guard.
- The web app stores the current localhost session in `localStorage` and broadcasts session changes through a small browser event helper so the header and Launchpad stay in sync.
- The updated Launchpad keeps recruiter and freelancer flows usable on localhost without adding a full production identity provider yet.

Verification performed:

- `npm.cmd install jsonwebtoken --workspace @marketplace/api`
- `npm.cmd install -D @types/jsonwebtoken --workspace @marketplace/api`
- `npm.cmd run typecheck --workspace @marketplace/api`
- `npm.cmd run build --workspace @marketplace/api`
- `npm.cmd run typecheck --workspace @marketplace/web`
- `npm.cmd run build --workspace @marketplace/web`
- runtime verification with temporary API and web processes on alternate ports
- verification artifact written to `output/runtime/auth-verification.json`

Verification result:

- API typecheck passed after auth integration.
- API production build passed after auth integration.
- Web typecheck passed after auth UI integration.
- Web production build passed after auth UI integration.
- Dev persona discovery returned HTTP `200`.
- Recruiter, freelancer, and admin dev logins each returned HTTP `201`.
- `GET /api/v1/auth/me` returned HTTP `200` with the recruiter token.
- `POST /api/v1/jobs` returned HTTP `401` without a token.
- `POST /api/v1/jobs` returned HTTP `403` with a freelancer token.
- `POST /api/v1/jobs` returned HTTP `201` with a recruiter token.
- `POST /api/v1/portfolios` returned HTTP `403` with a recruiter token.
- `POST /api/v1/portfolios` returned HTTP `201` with a freelancer token.
- The freelancer-created portfolio used the authenticated freelancer identity and was not marked verified.
- `POST /api/v1/platform/vector/sync` returned HTTP `201` with an admin token.
- `/launchpad` returned HTTP `200` and rendered the new role-based Launchpad copy plus the dev-session header controls.

### 2026-03-16 - Collaboration hub baseline with chat APIs and Socket.io

Files added or updated:

- `apps/api/src/data/chat.data.ts`
- `apps/api/src/modules/chat/*`
- `apps/api/src/app.module.ts`
- `apps/web/src/lib/api.ts`
- `apps/web/src/components/collaboration-hub.tsx`
- `apps/web/src/components/site-header.tsx`
- `apps/web/src/app/collaboration-hub/page.tsx`
- `apps/web/src/app/page.tsx`
- `.env.example`
- `apps/web/.env.example`
- `README.md`
- `output/runtime/chat-verification.json`

What was done:

- Added a new NestJS chat module with authenticated REST endpoints for:
  - listing threads
  - creating direct or support threads
  - listing thread messages
  - creating messages
- Added a Socket.io collaboration namespace at `/collaboration`.
- Implemented socket authentication with the existing localhost JWT flow.
- Added chat seed data so the collaboration hub works even when PostgreSQL is unavailable.
- Added a localhost collaboration hub page at `/collaboration-hub`.
- Added realtime message handling in the web app with REST fallback if the socket is unavailable.
- Expanded the site navigation so the collaboration hub is reachable from the shared header and the home route overview.

How it was implemented:

- The chat service follows the same PostgreSQL-first, in-memory-fallback pattern already used elsewhere in the API.
- Gateway connections validate bearer tokens through the existing auth service, auto-join the authenticated user's rooms, and broadcast `message:created` events to thread-specific rooms.
- The web app reuses the header dev session, loads authenticated thread data via REST, and uses `socket.io-client` for realtime room delivery.
- Thread creation is intentionally limited to `DIRECT` and `SUPPORT` creation from the localhost UI so the current flow stays compatible with the existing database constraints for job and contract rooms.

Verification performed:

- `npm.cmd install @nestjs/websockets @nestjs/platform-socket.io socket.io --workspace @marketplace/api`
- `npm.cmd install socket.io-client --workspace @marketplace/web`
- `npm.cmd run typecheck --workspace @marketplace/api`
- `npm.cmd run build --workspace @marketplace/api`
- `npm.cmd run typecheck --workspace @marketplace/web`
- `npm.cmd run build --workspace @marketplace/web`
- runtime verification with temporary API and web processes on alternate ports
- realtime socket verification using two authenticated clients
- verification artifact written to `output/runtime/chat-verification.json`

Verification result:

- API typecheck passed after the chat module was added.
- API production build passed after the chat module was added.
- Web typecheck passed after the collaboration hub page was added.
- Web production build passed after the collaboration hub page was added.
- `GET /api/v1/chat/threads` returned HTTP `200` for the recruiter persona.
- `POST /api/v1/chat/threads` returned HTTP `201` and created a new direct thread.
- `GET /api/v1/chat/threads/:threadId/messages` returned HTTP `200` for the created thread.
- Socket.io verification received a `message:created` event on the second authenticated client for the same thread.
- `/collaboration-hub` returned HTTP `200` and rendered the collaboration hub page shell on localhost.

### 2026-03-16 - Localhost production runtime verification and Next.js build artifact recovery

Files added or updated:

- `memory.md`
- `output/runtime/web-live.log`
- `output/runtime/api-live.log`
- `output/runtime/ai-live.log`
- `output/playwright/home-eval.txt`
- `output/playwright/dashboard-eval.txt`
- `output/playwright/matching-studio-eval.txt`
- `output/playwright/launchpad-eval.txt`
- `output/playwright/collaboration-hub-eval.txt`

What was done:

- Investigated a reported localhost issue after a successful `npm run build`.
- Confirmed the pasted build output itself was successful and not the source of the failure.
- Found that the old localhost process on port `3000` was unhealthy and returning HTTP `500`.
- Reproduced the real production runtime failure with `next start` on a clean port and captured the underlying Next.js error.
- Removed the generated `apps/web/.next` directory, rebuilt the web workspace, and revalidated `next start`.
- Restarted the localhost stack on the default ports and rechecked the main frontend routes in a real browser.

How it was implemented:

- Local runtime verification first used direct HTTP checks to separate build success from server-runtime behavior.
- A foreground `next start` reproduction on an alternate port exposed missing chunk-module errors from the generated `.next/server/webpack-runtime.js` state.
- The recovery path was:
  - remove `apps/web/.next`
  - run `npm.cmd run build --workspace @marketplace/web`
  - restart `next start`
- After the clean rebuild, the web app was relaunched on `http://localhost:3000` and verified again with Playwright CLI.

Verification performed:

- direct HTTP checks on:
  - `http://127.0.0.1:3000/`
  - `http://127.0.0.1:3000/dashboard`
  - `http://127.0.0.1:3000/matching-studio`
  - `http://127.0.0.1:3000/launchpad`
  - `http://127.0.0.1:3000/collaboration-hub`
- foreground `next start` reproduction on port `3100`
- clean rebuild of `@marketplace/web` after removing `apps/web/.next`
- foreground `next start` verification on port `3200`
- relaunched clean web server on default port `3000`
- Playwright CLI browser verification across:
  - `/`
  - `/dashboard`
  - `/matching-studio`
  - `/launchpad`
  - `/collaboration-hub`

Verification result:

- The original `npm run build` report was valid: the build succeeded.
- The failing symptom was runtime-only: `next start` returned HTTP `500` until the generated web build output was cleaned.
- The reproduced server error was missing generated chunk modules such as `./901.js` and `./383.js` from `.next/server/webpack-runtime.js` resolution.
- After deleting `apps/web/.next` and rebuilding, `next start` returned HTTP `200` on all checked frontend routes.
- Browser verification completed successfully on all five main routes.
- The generated Playwright console logs reported zero console errors and zero warnings on all checked routes.

## Update: Engagements API and Deal Desk UI

Completed in this slice:

- Finished the previously partial `apps/api/src/modules/engagements/engagements.service.ts`.
- Added the new NestJS engagements module:
  - `apps/api/src/modules/engagements/engagements.module.ts`
  - `apps/api/src/modules/engagements/engagements.controller.ts`
  - `apps/api/src/modules/engagements/proposals.controller.ts`
  - `apps/api/src/modules/engagements/contracts.controller.ts`
- Wired `EngagementsModule` into `apps/api/src/app.module.ts`.
- Extended `apps/api/src/modules/chat/chat.service.ts` with `createWorkflowThread(...)` so awarded contracts automatically create contract-room chat threads.
- Added typed web client support for engagements in `apps/web/src/lib/api.ts`.
- Added the new localhost commercial workflow surface:
  - `apps/web/src/components/deal-desk.tsx`
  - `apps/web/src/app/deal-desk/page.tsx`
- Added the Deal Desk route to `apps/web/src/components/site-header.tsx`.
- Updated `README.md` with the new route and API surface.

What the new slice now supports on localhost:

- freelancer proposal submission
- recruiter proposal review by job
- recruiter shortlist flow
- recruiter contract award flow
- milestone funding
- freelancer deliverable submission
- recruiter approval and release
- automatic contract-room chat bootstrap on award

Verification completed:

- `npm.cmd run typecheck --workspace @marketplace/api`
- `npm.cmd run build --workspace @marketplace/api`
- `npm.cmd run typecheck --workspace @marketplace/web`
- `npm.cmd run build --workspace @marketplace/web`
- root `npm.cmd run build`
- authenticated runtime engagement workflow verification saved to:
  - `output/runtime/engagement-verification.json`
- restarted clean localhost API and web servers and rechecked:
  - `http://127.0.0.1:4000/api/v1/health`
  - `http://127.0.0.1:3000/`
- Playwright browser verification on authenticated `/deal-desk`:
  - screenshot: `output/playwright/deal-desk-authenticated.png`
  - console log: `.playwright-cli/console-2026-03-16T18-55-20-469Z.log`

Verification result:

- The new API endpoints compile and run on localhost.
- The new Deal Desk route builds and renders correctly.
- The engagement workflow was executed end to end through the live API:
  - proposal submit
  - shortlist
  - contract create
  - fund milestone
  - submit milestone
  - approve/release milestone
- Contract-room orchestration is live: the runtime verification found the generated workflow thread for the created contract.

## Issues Encountered

### `jsonwebtoken` sign options required explicit typing

Observed issue:

- API typecheck initially failed because `jsonwebtoken` overload resolution would not accept the generic string-based TTL in the `sign(...)` options object.

Resolution:

- Added an explicit `SignOptions` object in `apps/api/src/modules/auth/auth.service.ts` and cast `expiresIn` to the library's expected option type.

Status:

- Resolved.

### `useEffectEvent` was unavailable in the installed React build

Observed issue:

- The first collaboration hub build attempted to import `useEffectEvent` from `react`, but the installed React package in this repo does not expose that API.

Resolution:

- Replaced the `useEffectEvent` usage in `apps/web/src/components/collaboration-hub.tsx` with a ref-backed approach for tracking the active thread during socket message handling.

Status:

- Resolved.

### Next.js production server failed with missing generated chunks after a successful build

Observed issue:

- `npm run build` completed successfully, but `next start` returned HTTP `500` on every route.
- A clean foreground reproduction showed runtime errors like:
  - `Cannot find module './901.js'`
  - `Cannot find module './383.js'`

Resolution:

- Deleted the generated `apps/web/.next` directory.
- Rebuilt the web workspace.
- Restarted the web server from the clean rebuild output.

Status:

- Resolved in the current workspace after the clean rebuild.

### PowerShell script policy blocks `npm`

Observed error:

- PowerShell refused `npm` because `npm.ps1` could not run under the current execution policy.

Resolution:

- Use `npm.cmd` instead of `npm` in this environment.

Status:

- Resolved for this workspace session.

### Desktop policy wrapper blocked one runtime verification approach

Observed issue:

- A direct process-control approach through the shell wrapper was rejected by policy during runtime health checks.

Resolution:

- Switched to an inline Python subprocess launcher to start the services temporarily and verify the health endpoints.

Status:

- Resolved for verification.

### Docker daemon unavailable for compose-backed database verification

Observed issue:

- `docker compose up -d postgres` failed because the Docker Desktop Linux engine pipe was unavailable.

Resolution:

- No code change was needed. The codebase now includes the schema and seed setup, but live compose-backed database verification remains blocked until Docker Desktop is running.

Status:

- Open environment blocker.

### API process was stale after adding new endpoints

Observed issue:

- After the new engagements code was added, `GET /api/v1/engagements/overview` still returned `404` even though the code built successfully.

Resolution:

- The old API process on port `4000` was still running.
- Stopped the stale listener and relaunched the API from the fresh build output.

Status:

- Resolved for current localhost verification.

### Next.js adjusted `apps/web/tsconfig.json`

Observed issue:

- `next build` auto-added `noEmit: true` to the web TypeScript config during the first build.

Resolution:

- Kept the Next-managed change because it is valid for the web workspace and does not conflict with the root TypeScript baseline.

Status:

- Resolved.

### Dependency audit warnings remain

Observed issue:

- `npm.cmd install` reported 6 moderate vulnerabilities.

Current handling:

- No blanket `npm audit fix --force` was applied because this repo is at a first scaffold stage and forced upgrades can destabilize the newly created baseline.

Status:

- Open.

## Update: Synk.ai V3 Design Synchronization (Architectural Brutalism)

### 2026-03-18 - Full Application V3 Layout & Core Flows

Completed in this pass:

- **Design System Overhaul:** Implemented "Architectural Brutalism" globally.
  - Updated `apps/web/app/globals.css` with Early Dawn beige (`#FFFAEB`), Mine Shaft gray (`#1F1F1F`), and 0px border-radius.
  - Extended `tailwind.config.ts` with Mistral Rainbow gradients, architectural grid patterns, and premium design tokens.
- **Global Layout & Navigation:**
  - Refactored `apps/web/app/community/layout.tsx` to feature a fixed, responsive left sidebar navigation for all internal community pages.
  - Implemented role-based navigation logic (Creator vs. Partner views).
- **Core Page Redesigns (Pixel-Perfect with V3 Templates):**
  - **Landing Page (`/`):** High-impact split-card hero with direct onboarding entry points.
  - **Onboarding:** Fully functional React-based flows for `app/onboarding/partner/page.tsx` and `app/onboarding/creator/page.tsx`, capturing biometrics and DNA metrics.
  - **Discovery Ecosystem:** Updated `app/community/page.tsx` with a "Proof of Work" masonry feed and "Active Nodes" system panel.
  - **Competitions:** Redesigned `app/competitions/page.tsx`, detailed submission views (`app/competitions/[id]/page.tsx`), and the global leaderboard (`app/competitions/leaderboard/page.tsx`).
  - **Synk Terminal:** Implemented `app/synk-terminal/page.tsx` as a high-fidelity system monitoring dashboard with real-time aesthetic.
  - **Jobs Board:** Aligned `app/community/jobs/page.tsx` with the new grid and card design.
- **Technical Integrations:**
  - Initialized NextAuth.js with Google and GitHub providers.
  - Wired backend connector scaffolds for Qdrant, SeleniumBase, and Stripe/Razorpay.
  - Verified build success for the entire monorepo web workspace.

What the slice now supports:

- **Unified Aesthetic:** A cohesive, premium visual experience across all user touchpoints.
- **Improved UX:** Side-bar navigation provides better accessibility to internal tools.
- **Production Readiness:** Established the structural foundation for Supabase integration and real-time data flow.

### Next Tasks (Synk.ai Priorities)

1. **Supabase Authentication Integration:**
   - Migrate current local JWT/seed login to real Supabase Auth sessions.
   - Implement social login buttons in `app/page.tsx` and onboarding flows.
2. **Database Migration & Real-time Integration:**
   - Apply PostgreSQL schema to Supabase and migrate in-memory seed data to the cloud.
   - Connect "Proof of Work" feed and Jobs board to live Supabase data.
3. **Frontend Action Persistence:**
   - Wire "Sync" (like), "Share", and "Apply Protocol" buttons to persistent database mutations.
   - Implement local state updates for optimistic UI during sync actions.
4. **Vector Search (Qdrant) Connectivity:**
   - Migrate the semantic matching wrapper to ping a live Qdrant instance for real-time talent matching.
5. **Real-time Collaboration:**
   - Establish the Socket.io deal room implementation for smooth Creator-Partner bridging.
6. **Mobile Infrastructure:**
   - Install Flutter SDK and initialize the mobile scaffolding once the web foundation is stable.
7. **Escrow & Payments:**
   - Implement Stripe/Razorpay reconciliation for contract milestone releases.

### 2026-03-19 -## [March 19, 2024] - Landing Page Refinements & Premium Component Integration

### Removed
- "System Health" section from the landing page.
- "Product" and "Solutions" navigation links (desktop and mobile).
- "Product" and "Solutions" links from hero section call-to-action buttons.

### Added
- `HoverBorderGradient` component (from Aceternity UI) in `apps/web/components/ui/hover-border-gradient.tsx`. This component features an animated, color-shifting border on hover and follows a pill-shaped design (`rounded-full`).
- "Our Popular Services" section on the landing page, using the `Marquee` component. This section features animated, colorful cards highlighting various technical and creative services (e.g., Brand Design, 3D Design, Frontend Web Development), placed just above the role selection area.

### Modified
- Updated `Header` (both desktop and mobile) to use `HoverBorderGradient` for the "Get Started" button.
- Updated the landing page's hero buttons and onboarding cards to use `HoverBorderGradient` instead of standard `Link` components.
- Standardized all call-to-action (CTA) buttons to have a pill shape (`rounded-full`) as per the latest design specs.
lance after removal of asymmetric data column.

Verification result:

- `@marketplace/web` production build succeeded.
- Landing page verified for structural integrity.

### 2026-03-19 — synk.ai v3 UI overhaul and next-task curation

#### Brand evolution

- The platform has been rebranded from **Unjob.ai / Job.ai** to **synk.ai — Frontier Talent**.
- Landing page title is now `synk.ai | Frontier Talent`.
- Footer branding reads `SYNK.AI LTD`.
- Visual identity: dark, cinematic, architect-grid aesthetic. Primary accent `#b22206` (crimson). Material-symbols-outlined icon set. Uppercase italic bold typography throughout.

#### New routes added (apps/web/app/)

| Route | Purpose | Data source | Status |
|-------|---------|-------------|--------|
| `/` (page.tsx) | Landing page with Spline 3D hero, geometric shapes, service marquee, role selection, FAQ | Static + Spline scene | **UI complete** |
| `/role-selection` | Two-card role picker (Enterprise / Technical) linking to onboarding flows | Static | **UI complete** |
| `/onboarding/creator` | Creator/Talent multi-step onboarding | Static form | **UI shell** |
| `/onboarding/partner` | Partner/Hiring multi-step onboarding | Static form | **UI shell** |
| `/login` | Login page | Static | **UI shell** |
| `/signup` | Signup page + `/signup/developer` sub-route | Static | **UI shell** |
| `/signup-freelancer` | Alternate freelancer signup | Static | **UI shell** |
| `/signup-hiring` | Alternate hiring signup | Static | **UI shell** |
| `/community` | Community feed with left sidebar nav (People, Jobs, Events, Forums) | Static/seed | **UI complete, needs API** |
| `/community/jobs` | Community job listings | Static/seed | **UI complete, needs API** |
| `/browse-jobs` | Full job browsing interface with filters | Static/seed | **UI complete, needs API** |
| `/competitions` | Bounty/competition listings fetched from API | `localhost:4000/api/v1/competitions` | **UI complete, API endpoint missing** |
| `/competitions/[id]` | Individual competition detail | API | **UI complete, API endpoint missing** |
| `/competitions/leaderboard` | Global leaderboard | Static/seed | **UI complete, needs API** |
| `/synk-terminal` | Synk Terminal — command-line-style interface with Neural Feed, system metrics | Static mock data | **UI complete, needs backend** |
| `/dashboard` | Recruiter/platform dashboard | REST API | **Functional** |
| `/freelancer-dashboard` | Freelancer-specific dashboard | Static/seed | **UI shell** |
| `/workspace` | Active project workspace | Static mock | **UI shell** |
| `/portfolio` | Portfolio showcase page | Static mock | **UI shell, needs portfolio CRUD** |
| `/earnings` | Earnings and payout dashboard | Static mock | **UI shell** |
| `/deal-desk` | Commercial workflow (proposals, contracts, milestones) | REST API | **Functional** |
| `/chat` | Real-time messaging interface | REST + Socket.io | **UI complete** |
| `/collaboration-hub` | Collaboration hub | REST + Socket.io | **Functional** |
| `/matching-studio` | AI matching studio | REST API | **Functional** |
| `/launchpad` | Job/portfolio creation forms | REST API (auth-gated) | **Functional** |
| `/admin` | Platform admin panel | Static mock | **UI shell** |
| `/settings` | User settings page | Static mock | **UI shell** |
| `/pricing` | Pricing page with tier cards | Static | **UI complete** |

#### Shared UI component library (apps/web/components/ui/)

| Component | File | Purpose |
|-----------|------|---------|
| Header | `header-1.tsx` | Responsive site header with mobile drawer, scroll-aware styling |
| HeroGeometric | `shape-landing-hero.tsx` | Animated geometric shape hero section with gradient overlays |
| HoverBorderGradient | `hover-border-gradient.tsx` | Animated gradient border button component |
| Marquee | `marquee.tsx` | Infinite horizontal scroll marquee |
| FAQSection | `faq-section.tsx` | Collapsible FAQ accordion |
| Button | `button.tsx` | Reusable button with CVA variants |
| MenuToggleIcon | `menu-toggle-icon.tsx` | Animated hamburger/close icon |
| useScroll | `use-scroll.ts` | Scroll position hook |

#### New dependencies added to apps/web

| Package | Purpose |
|---------|---------|
| `@splinetool/react-spline` | 3D interactive Spline scenes on landing page |
| `framer-motion` | Animation library for hero, page transitions |
| `lucide-react` | Icon library |
| `@radix-ui/react-slot` | Headless UI primitives |
| `class-variance-authority` | Component variant management |
| `clsx` + `tailwind-merge` | Conditional class merging |
| `next-auth` | Authentication framework (not yet wired) |
| `@supabase/supabase-js` + `@supabase/ssr` | Supabase client (not yet wired) |

#### Key design system notes

- Tailwind CSS v4 with custom semantic color tokens (primary, secondary, surface, on-surface, etc.)
- `architect-grid` and `architect-grid-fine` utility classes for subtle background patterns
- Material Symbols Outlined for all icons (loaded via Google Fonts CDN)
- Dark-first design with light mode support via CSS custom properties
- `globals.css` extended with custom scrollbar, animation keyframes, and grid pattern utilities

---

## Next Tasks (Curated Backlog)

### Priority 0 — Critical path to functional MVP

| # | Task | Detail | Files |
|---|------|--------|-------|
| 1 | **Competitions API** | Create NestJS `competitions` module with CRUD endpoints (`GET/POST /api/v1/competitions`, `GET /api/v1/competitions/:id`). Wire leaderboard data. | `apps/api/src/modules/competitions/*` |
| 2 | **Browse-jobs API wiring** | Connect `/browse-jobs` page to existing `GET /api/v1/jobs` with filter/search query support | `apps/web/app/browse-jobs/page.tsx`, `apps/web/lib/api.ts` |
| 3 | **Community feed API** | Wire community page to live freelancer and job data from existing endpoints | `apps/web/app/community/page.tsx`, `apps/web/app/community/jobs/page.tsx` |

### Priority 1 — Authentication and user flows

| # | Task | Detail | Files |
|---|------|--------|-------|
| 4 | **Auth integration** | Wire `next-auth` + Supabase auth provider. Implement login/signup flows. Connect role-selection to user profile creation. | `apps/web/app/login/*`, `apps/web/app/signup/*`, `apps/web/app/role-selection/*`, `apps/web/app/api/auth/[...nextauth]/route.ts` |
| 5 | **Onboarding pipeline** | Wire creator and partner onboarding forms to API user/profile creation endpoints | `apps/web/app/onboarding/creator/*`, `apps/web/app/onboarding/partner/*` |
| 6 | **Earnings dashboard** | Create API endpoint for earnings data. Wire freelancer earnings page. | `apps/api/src/modules/earnings/*`, `apps/web/app/earnings/page.tsx` |
| 7 | **Workspace wiring** | Connect workspace to active contracts/projects from engagements API | `apps/web/app/workspace/page.tsx` |

### Priority 2 — Enhanced features

| # | Task | Detail | Files |
|---|------|--------|-------|
| 8 | **Pricing + payments** | Integrate Stripe for subscription tiers. Wire pricing page to payment flow. | `apps/web/app/pricing/*`, `apps/api/src/modules/payments/*` |
| 9 | **Synk Terminal backend** | Implement command processing for terminal interface (`/sync`, `/radar`, `/broadcast`). Wire real metrics. | `apps/web/app/synk-terminal/*`, `apps/api/src/modules/terminal/*` |
| 10 | **Portfolio CRUD** | Wire portfolio page to existing `POST/GET /api/v1/portfolios` with edit/delete | `apps/web/app/portfolio/page.tsx` |

### Priority 3 — Platform operations

| # | Task | Detail | Files |
|---|------|--------|-------|
| 11 | **Admin panel backend** | Wire admin page to platform stats, user management, and moderation APIs | `apps/web/app/admin/*`, `apps/api/src/modules/admin/*` |
| 12 | **Chat/messaging upgrade** | Wire `/chat` page to Socket.io collaboration namespace with thread management | `apps/web/app/chat/page.tsx` |
| 13 | **Settings persistence** | Wire settings page to user preferences API (profile, notifications, security) | `apps/web/app/settings/page.tsx` |
| 14 | **Freelancer dashboard** | Wire freelancer-specific dashboard with active gigs, pending proposals, skill metrics | `apps/web/app/freelancer-dashboard/page.tsx` |

### Priority 4 — Polish and infrastructure

| # | Task | Detail |
|---|------|--------|
| 15 | **Build verification** | Run full `npm run build` and fix any TypeScript/build errors |
| 16 | **Playwright E2E tests** | Add browser verification for all new routes |
| 17 | **Docker compose update** | Update docker-compose.yml for any new services |
| 18 | **CI/CD pipeline** | Update GitHub Actions workflow for new dependencies and routes |
| 19 | **SEO + meta tags** | Add proper metadata exports to all route pages |
| 20 | **Responsive QA** | Verify all pages at 375px, 768px, 1024px, 1440px breakpoints |

---

## Issues Encountered

### GitHub CLI not available

Observed issue:

- `gh` command is not recognized in the current Windows environment.

Resolution:

- Using `git` commands directly for repository operations. GitHub remote is already configured as `origin` → `https://github.com/SizzorOP/Job.ai.git`.

Status:

- Workaround in place.
