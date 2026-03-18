# Synk.ai Security Technical Debt & Hardening Roadmap

This document tracks identified security vulnerabilities and production hardening requirements discovered during the initial development phase. These must be addressed before any public staging or production deployment.

## 🚩 Critical Vulnerabilities (Dev Bypasses)

### 1. Authentication Bypass in Frontend
- **File**: `apps/web/app/login/page.tsx`
- **Issue**: `handleOAuth` and `handleSubmit` skip actual Supabase verification and redirect directly to `/community`.
- **Status**: [ ] Needs real `supabase.auth.signInWithPassword` implementation.

### 2. Dev Persona & Auth Fallback
- **File**: `apps/api/src/modules/auth/auth.service.ts`
- **Issue**: `findUserByEmail` and `findUserById` fall back to `devPersonaSeed` if the database query fails. This allows login as any persona with just an email in dev mode.
- **Status**: [ ] Disable fallback if `NODE_ENV === 'production'`.

### 3. Hardcoded JWT Secret
- **File**: `apps/api/src/modules/auth/auth.service.ts`
- **Issue**: `DEFAULT_JWT_SECRET` is set to `prooflane-local-dev-secret`.
- **Status**: [ ] Enforce mandatory `JWT_SECRET` environment variable; terminate process if missing.

---

## 🛠 Infrastructure Hardening

### 1. CSRF Protection
- **Issue**: Modern browsers offer some protection, but a dedicated CSRF strategy (like double-submit cookies) should be implemented in the NestJS `main.ts` for sensitive POST/PUT/DELETE actions.
- **Priority**: Medium

### 2. API Rate Limiting
- **Issue**: No throttling on `/api/v1/auth/login` or search endpoints, leaving the system vulnerable to brute force and DoS.
- **Requirement**: Implement `@nestjs/throttler`.
- **Priority**: High

### 3. Enforce TLS/SSL
- **Issue**: Local testing is via HTTP.
- **Requirement**: Production deployment (likely Vercel/Docker) must enforce `Strict-Transport-Security` (HSTS).
- **Priority**: High

---

## 🔐 Database & Data Integrity

### 1. Parameterized Queries (Audit Check)
- **Status**: ✅ **Passed**. `DatabaseService` is correctly using `$1, $2` placeholders.
- **Maintenance**: Ensure all new modules continue using the `DatabaseService.query` wrapper.

### 2. Input Sanitization
- **Status**: ✅ **Passed**. Global `ValidationPipe` is active with `whitelist: true`.
- **Maintenance**: Audit `class-validator` decorators whenever a new DTO is added.

---

## 📅 Future Review Items
- [ ] Implement Multi-Factor Authentication (MFA) via Supabase.
- [ ] Add audit logging for sensitive actions (e.g., contract approval, escrow release).
- [ ] Review CORS policy in `main.ts` to restrict origins to the production domain only.
