# EcoConnect Deployment, Configuration, and Security Guide

This document summarizes the work done to make registration work on the deployed site and explains key concepts, deployment steps, and security hardening recommendations for the EcoConnect monorepo.

- Frontend (Next.js) domain: `https://ecoconnect-ten.vercel.app`
- Backend (NestJS on Render) domain: `https://ecoconnect-lfl9.onrender.com`
- Relevant files:
  - Frontend signup page: `src/app/signup/page.tsx`
  - Backend bootstrap & CORS: `backend/src/main.ts`
  - Prisma schema: `backend/prisma/schema.prisma`
  - Backend package: `backend/package.json`

---

## 1) What we changed and why

- **Added production origin to CORS**
  - File: `backend/src/main.ts`
  - Added `https://ecoconnect-ten.vercel.app` to `app.enableCors({ origin: [...] })`.
  - Reason: Deployed browser requests must be allowed by server CORS; otherwise the browser blocks them.

- **Made the backend listen on deployment host/port**
  - File: `backend/src/main.ts`
  - Changed to `await app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0')`.
  - Reason: Render (and many PaaS) assign `PORT` and expect servers to bind to `0.0.0.0`.

- **Frontend now uses an API base URL via env**
  - File: `src/app/signup/page.tsx`
  - The page computes `apiBase` from `process.env.NEXT_PUBLIC_API_URL` (fallback `http://localhost:3000` for local dev). In production we set `NEXT_PUBLIC_API_URL=https://ecoconnect-lfl9.onrender.com` on Vercel.
  - Reason: Avoid calling `localhost` in production; configure the correct backend origin.

- **Deployed backend to Render as a Web Service**
  - Root Directory: `backend/`
  - Build Command: `npm ci --include=dev && npm run prisma:generate && npm run build`
  - Pre-deploy Command: `npx prisma migrate deploy`
  - Start Command: `npm run start`
  - Health Check Path: `/`
  - Reason: Run a long‑lived NestJS API with Prisma migrations applied before switch-over.

- **Configured Supabase Postgres connection for Prisma**
  - `DATABASE_URL` (pooled at port 6543) for runtime connections through PgBouncer.
  - `DIRECT_URL` (direct at port 5432) for migrations.
  - Both set as Render Environment Variables, read by `backend/prisma/schema.prisma`.
  - Reason: Prisma recommends using PgBouncer for app runtime and direct connections for migrations.

---

## 2) Concepts explained briefly

- **CORS (Cross-Origin Resource Sharing)**
  - Browser security feature requiring the backend to declare which origins may access it.
  - Implemented via headers; configured in `backend/src/main.ts` using `app.enableCors({ origin: [...] })`.

- **Environment variables in Next.js**
  - Variables prefixed with `NEXT_PUBLIC_` are embedded in the client bundle and visible to anyone.
  - Safe for non-sensitive config such as public API base URLs; never place secrets there.

- **PORT and host binding on PaaS**
  - Hosts like Render assign a `PORT`. Server must listen on it and on `0.0.0.0` to accept external traffic.

- **PgBouncer pooled vs direct connections**
  - Supabase provides a pooled endpoint (port 6543) and a direct endpoint (port 5432).
  - Use pooled for app runtime (`DATABASE_URL`), direct for Prisma migrations (`DIRECT_URL`).

- **Prisma migrations**
  - `npx prisma migrate deploy` applies migration files to the database. Use this in Pre-deploy (or equivalent) in production.

---

## 3) Step-by-step: Backend deploy on Render

1. **Create a Web Service**
   - Root Directory: `backend/`
   - Runtime: Node

2. **Environment Variables** (Render → Service → Settings → Environment)
   - `DATABASE_URL` (pooled, runtime — replace USER/PASSWORD with your values):
     ```
     postgresql://USER:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true&connection_limit=1
     ```
   - `DIRECT_URL` (direct, migrations):
     ```
     postgresql://USER:PASSWORD@aws-0-eu-central-1.supabase.com:5432/postgres?sslmode=require
     ```
   - `JWT_SECRET`: a strong random string.
   - `NODE_ENV`: `production`.
   - Do NOT set `PORT` manually (Render provides it).

3. **Build & Deploy settings**
   - Build Command:
     ```
     npm ci --include=dev && npm run prisma:generate && npm run build
     ```
   - Pre-deploy Command:
     ```
     npx prisma migrate deploy
     ```
   - Start Command:
     ```
     npm run start
     ```
   - Health Check Path: `/`

4. **CORS allow the frontend**
   - In `backend/src/main.ts`, ensure the `origin` array includes:
     - `https://ecoconnect-ten.vercel.app`

5. **Redeploy** and verify logs
   - Look for "Nest application successfully started" and no Prisma init errors.

---

## 4) Step-by-step: Frontend config on Vercel

1. **Set the public API base URL**
   - Project → Settings → Environment Variables:
     - `NEXT_PUBLIC_API_URL = https://ecoconnect-lfl9.onrender.com`

2. **Redeploy** the frontend
   - `NEXT_PUBLIC_*` vars are embedded at build time. A new deploy is required.

3. **Verify**
   - From `https://ecoconnect-ten.vercel.app` open DevTools → Network.
   - `POST https://ecoconnect-lfl9.onrender.com/auth/signup` should succeed (2xx/4xx from API, not a CORS error).

---

## 5) Troubleshooting guide

- **"Failed to fetch" on frontend**
  - Ensure `NEXT_PUBLIC_API_URL` is set and points to the backend, not `localhost`.
  - Ensure backend CORS includes the frontend origin with the correct scheme (https://).
  - Ensure both frontend and backend use HTTPS to avoid mixed content.

- **Prisma P1001 / connection errors**
  - Use the exact Supabase URIs (username often includes project ref: `postgres.<REF>`), with URL‑encoded password.
  - Add `sslmode=require`.
  - For pooled URL add `pgbouncer=true&connection_limit=1` and port `6543`.
  - For direct URL use port `5432`.

- **Prisma initialization error: Tenant or user not found**
  - Usually wrong `USER` or `PASSWORD` or missing project ref.
  - Rotate DB password in Supabase if exposed and update both URLs.

- **Server binds to wrong port**
  - Confirm `backend/src/main.ts` uses `process.env.PORT` and host `0.0.0.0`.

---

## 6) Security hardening checklist

- **Secrets management**
  - Keep secrets out of the repo. Store in Render/Vercel environment variables or a secret manager.
  - Rotate DB passwords and JWT secrets if leaked.
  - Never expose secrets via `NEXT_PUBLIC_*`.

- **JWT & auth**
  - Use a strong `JWT_SECRET` (>= 32 bytes). Rotate periodically.
  - Set reasonable token expirations and refresh strategy.
  - Hash passwords with bcrypt (>= 12 salt rounds) — already using `bcryptjs`.

- **Transport security**
  - Enforce HTTPS end-to-end. Your domains already use HTTPS.
  - Consider HSTS on the frontend (Next.js headers) to force HTTPS.

- **CORS**
  - Restrict `origin` to specific domains (done). Avoid `*`.
  - Only enable `credentials: true` if you actually use cookies and set proper `Access-Control-Allow-Credentials`.

- **Rate limiting & abuse protection**
  - Add rate limiting/middleware (e.g., Nest rate‑limit or a proxy/WAF in front).
  - Add basic IP throttling and bot protection on auth endpoints.

- **Input validation**
  - Continue using `class-validator` DTOs with `ValidationPipe` (
    `whitelist: true`, `forbidNonWhitelisted: true` already enabled).

- **Database & Prisma**
  - Use least‑privilege DB users if possible.
  - Apply migrations via `migrate deploy` (no `migrate dev` in production).
  - Enable Prisma logging only as needed; avoid leaking sensitive data.

- **Headers & cookies**
  - If you move to cookie-based auth, set `Secure`, `HttpOnly`, `SameSite` appropriately, and enable `credentials` in CORS.

- **Dependency and runtime**
  - Pin dependency versions; run `npm audit` regularly.
  - Prefer LTS Node versions; match locally and on Render.

- **Observability**
  - Centralized logs and error tracking (e.g., Sentry). Scrub PII and secrets.

- **Backups**
  - Configure automated DB backups in Supabase and test restores.

---

## 7) Operational runbook (quick)

- Change backend env on Render → Redeploy.
- Change frontend `NEXT_PUBLIC_*` on Vercel → Redeploy.
- After deploy: check health (`/`), Prisma init logs, and CORS.
- For DB schema changes: push migration → Render Pre-deploy runs `migrate deploy`.
- Incident: roll back via Render/Vercel previous successful deploy, then investigate.

---

## 8) Future improvements

- Add a Next.js rewrite to proxy API calls (`/api/:path*` → backend) if desired, to simplify client configuration.
- Introduce end-to-end tests that exercise auth flows against a staging environment.
- Add CI to lint/typecheck/test and prevent broken deploys.
