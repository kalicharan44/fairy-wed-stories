# Fairy Wed Stories

Fairy Wed Stories website preview built with React, TypeScript, and Vite. The site uses illustrative photography and proposed content for presentation; it is not a record of completed Fairy Wed Stories weddings.

## Run locally

```powershell
npm ci
npm run dev
```

The Vite development server uses port `5175` so this preview can run beside the original project. The site starts in demo mode by default. `src/config/brandConfig.ts` keeps preview identity and integrations centralized.

The portfolio and reception setting carousels use clearly labeled local illustrative photographs. The contact form and administrator actions remain disabled until Fairy-owned integrations are provided. The site is noindex by default.

## Build checks

```powershell
npx tsc -b --pretty false
npm run lint
npm run build
```

## Integrations and deployment

The administrator, image publishing, and enquiry delivery require Fairy-owned Supabase configuration. They are disabled in this preview until the owner supplies and verifies those settings. Do not describe the illustrative images as completed Fairy weddings. See [SUPABASE_CONFIGURATION_CHECKLIST.md](SUPABASE_CONFIGURATION_CHECKLIST.md) and [DEMO_ASSET_MANIFEST.md](DEMO_ASSET_MANIFEST.md).

GitHub Pages builds and deploys the static preview from the `main` branch through `.github/workflows/deploy-pages.yml`. Repository deployments use the `/<repository-name>/` base path and the workflow supplies a `404.html` fallback for client-side routes.
