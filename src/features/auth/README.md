# Auth — breadcrumb

Not built yet. Stretch goal per the original outline: JWT login or Google
(OAuth) login.

## Recommended approach

[Auth.js](https://authjs.dev/) (formerly NextAuth) is the standard choice
for Next.js App Router and supports both a credentials (JWT) provider and
Google OAuth with the same setup — a reasonable way to eventually offer
both without picking one now.

## Where things would go

- `src/lib/auth.ts` — Auth.js config (`NextAuth({...})`), exporting `auth`,
  `signIn`, `signOut` handlers.
- `src/app/api/auth/[...nextauth]/route.ts` — the catch-all route Auth.js
  needs.
- `middleware.ts` (project root, alongside `next.config.ts`) — route
  protection, redirecting unauthenticated requests to a login page for
  everything under `/equipment`, `/maintenance`, etc.
- `src/app/providers.tsx` — wrap children in Auth.js's `SessionProvider`
  alongside the existing `QueryClientProvider`/`ThemeProvider`.
- A `User` model in `prisma/schema.prisma` (Auth.js's Prisma adapter has a
  documented schema to copy in) — this would be the first schema change
  that isn't just uncommenting the existing breadcrumb block, since auth
  wasn't sketched there.

## Suggested first slice

Credentials (JWT) provider only, no Google OAuth yet — it's the smaller
surface area to get working end-to-end, and Google OAuth can be added later
as a second provider without restructuring anything.
