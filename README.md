# Calculio.net

Pan-francophone financial calculator platform. Next.js 16 + React 19 + Tailwind 4.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/[country]/[tool]/page.tsx` — dynamic tool pages (SSG)
- `lib/tax-rates/` — per-country tax brackets & rates (update annually)
- `lib/calculators/` — pure calculation logic
- `lib/tools.ts` — tool registry (slug, title, availability)
- `components/calculators/` — one client component per calculator
- `components/calculators/registry.tsx` — wires slug → component
- `content/[country]/[tool]/meta.ts` — SEO, explanation body, FAQ
- `content/index.ts` — content registry

## Adding a new tool

1. Add entry to `lib/tools.ts` (slug, title, category, `availableIn`)
2. Create calculator component in `components/calculators/{Name}.tsx`
3. Register in `components/calculators/registry.tsx`
4. Add SEO content in `content/{country}/{slug}/meta.ts`
5. Register in `content/index.ts`

## Deploy

Coolify (Docker). Dockerfile included with multi-stage build; `output: "standalone"` in `next.config.ts`.

### Required env vars

See `.env.example`:
- `NEXT_PUBLIC_ADSENSE_CLIENT` — AdSense publisher ID
- `NEXT_PUBLIC_ADSENSE_SLOT_*` — ad slot IDs per placement
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID

## Tax rate updates

Update January of each year:
- `lib/tax-rates/fr.ts` — French IR brackets, PASS, cotisations
- (future) `be.ts`, `ch.ts`, `ca.ts`

Verify against:
- FR: impots.gouv.fr, urssaf.fr, agirc-arrco.fr
- BE: finances.belgique.be
- CH: estv.admin.ch
- CA: canada.ca/fr/agence-revenu
