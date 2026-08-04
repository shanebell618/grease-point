# Documents — breadcrumb

Not built yet. This is the natural home for the "file uploads" stretch goal
(manuals, PDFs, receipts).

## Data model

Uncomment `Document` at the bottom of
[`prisma/schema.prisma`](../../../prisma/schema.prisma) (`equipmentId`,
`title`, `fileUrl`, `category`, `uploadedAt`).

This is also the natural successor to `Equipment.photoUrl` — right now
that's a single string URL; a real multi-photo gallery would become
`Document` rows with `category: "photo"` instead of a dedicated field.

## Suggested first slice

- Start with `fileUrl` as a plain string field (paste a URL) before building
  real upload — that gets the list/detail/CRUD flow working with zero new
  infrastructure, exactly like Equipment did.
- Real file upload is the harder second step: an `src/app/api/upload/route.ts`
  handling `multipart/form-data`, writing to local disk (`public/uploads/` —
  fine for a portfolio demo) or an object store, returning the URL to store
  on the `Document` row.
- Backend follows the usual layering (see
  [`readme/dev/architecture.md`](../../../readme/dev/architecture.md)):
  `server/schemas/documents/`, `dataAccess/DocumentDao.ts`,
  `useCases/documents/`, `actions/documents/` — each with a co-located `__test__/`.
- `src/verticals/documents/components/DocumentList/index.tsx` — group by
  `category` (manuals / receipts / other) to match the outline.
- `src/verticals/documents/pages/DocumentsListPageView/index.tsx` replaces
  the current `FeaturePlaceholder` stub rendered by `src/app/documents/page.tsx`.

## Later

Once real uploads exist, wire the toast breadcrumb (see root `TODO.md`) to
confirm "Document uploaded" / surface upload errors.
