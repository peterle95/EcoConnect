# Database Recommendation (Free & Scalable)

EcoConnect already uses Prisma with a PostgreSQL datasource (see `backend/prisma/schema.prisma`). For a free, developer-friendly, and scalable Postgres, use one of:

- Neon: Serverless Postgres with autoscaling and generous free tier. Great for hobby → prod, supports branches.
  https://neon.tech
- Supabase: Postgres + Auth + Storage. Free tier suitable for MVPs; easy dashboard.
  https://supabase.com

Both expose a standard PostgreSQL connection string compatible with Prisma.

## Steps
1) Create a project (Neon or Supabase).
2) Copy the connection string.
3) In `backend/.env` set:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
JWT_SECRET="replace-with-strong-secret"
PORT=3000
```

4) From `backend/` run migrations:

```
npm install
npm run prisma:generate
npm run prisma:migrate --name init
```

5) Start API:

```
npm run start:dev
```

## Notes
- Prisma schema models: `User`, `IndividualProfile`, `OrganizationProfile`, `Project`, `ProjectVolunteer`.
- Auth endpoints implemented:
  - `POST /auth/signup` with body `{ email, password, role }` (`role` ∈ `INDIVIDUAL | ORGANIZATION`).
  - `POST /auth/login` with body `{ email, password }`.
- Both return `{ access_token }` (JWT), signed with `JWT_SECRET`.
- Global validation is enabled in `backend/src/main.ts`.
