# Kleihaus Development Workflow

This document defines the safe workflow for working on the Kleihaus website.

Rule: Every future meaningful change must update `docs/CHANGELOG.md` and, where relevant, `docs/PROJECT_AUDIT.md`.

## Source Of Truth

Local folder:

```text
C:\Users\smwatu\OneDrive - Kenya Institute for Public Policy Research and Analysis\Documents\Kleihaus
```

GitHub repository:

```text
https://github.com/ShadrackMwatu/kleihaus
```

Main branch:

```text
main
```

Do not create another repository for this project. Do not migrate production to Cloudflare Pages unless that is explicitly approved.

## Current Deployment Path

Production currently deploys as:

```text
GitHub main
-> Cloudflare Workers Builds
-> Worker Assets
-> Worker "kleihaus"
-> kleihaus.com
-> www.kleihaus.com
```

The active frontend quote endpoint is:

```text
/api/quote-request
```

`api.kleihaus.com` is legacy and is not currently required by the frontend. Cloudflare Pages references in older notes are historical/stale.

## Local Setup Commands

Install dependencies:

```bash
npm install
```

Start local development server:

```bash
npm run dev
```

The Vite dev server normally starts at:

```text
http://localhost:5173
```

Build production output:

```bash
npm run build
```

## Deployment Runbook

1. Check the repo:

```bash
git status
```

2. Install and build:

```bash
npm install
npm run build
```

3. Review changes:

```bash
git diff
```

4. Commit and push:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

5. Confirm GitHub check:

```text
Workers Builds: kleihaus -> success
```

6. Verify production:

```text
GET https://www.kleihaus.com
GET https://www.kleihaus.com/api/quote-request
OPTIONS https://www.kleihaus.com/api/quote-request
POST https://www.kleihaus.com/api/quote-request
```

Expected `GET /api/quote-request`:

```json
{ "success": false, "message": "Method not allowed" }
```

Expected quote `POST`:

```json
{
  "success": true,
  "storage": { "stored": true },
  "email": { "sent": true }
}
```

## Cloudflare Worker Files

Active files:

- `wrangler.toml`
- `src/worker.js`
- `functions/api/quote-request.js`
- `functions/api/track-event.js`

Legacy files retained for now:

- `wrangler.api.toml`
- `src/api-worker.js`

The legacy files are not referenced by the current Worker Assets deployment and may be archived or removed later only after explicit approval.

## Stale Pages Check Troubleshooting

If GitHub shows a failing `Cloudflare Pages` check while `Workers Builds: kleihaus` passes, check whether the failing details URL points to:

```text
bded816dd798bcf88e4ccc0ce5d16bcb
```

That is a stale Cloudflare account/integration and is not the active production deployment. It must be disconnected from that old Cloudflare account or removed by Cloudflare Support.

## What Not To Commit

Do not commit:

- `node_modules/`
- `dist/`
- `.env`
- `.env.local`
- `.dev.vars`
- API keys
- SMTP passwords
- WhatsApp tokens
- database credentials
- OpenAI/LLM keys
- Cloudflare secrets
- temporary logs or local editor files

Keep `package-lock.json` tracked because it records exact dependency versions.

## Environment Variables

Use `.env.example` for placeholders only. Real secrets must be configured in Cloudflare Worker settings, not in frontend source files.

Current placeholders:

```env
QUOTE_EMAIL_FROM=Kleihaus Ceramics <sales@kleihaus.com>
SALES_EMAIL=sales@kleihaus.com
WHATSAPP_TO_NUMBER=254748827166
RESEND_API_KEY=

WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

`WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` are optional and only needed for WhatsApp Business API notifications.

## Verification Before Push

Run:

```bash
npm install
npm run build
```

Then verify:

- Page loads locally or in production after deploy.
- No console errors.
- No horizontal scrolling.
- Mobile layout works.
- Images load and have useful alt text.
- WhatsApp links open correctly.
- Quote form posts to `/api/quote-request`.
- Manual WhatsApp fallback links open correctly.
- Public website does not expose backend/internal AI wording.
- `git status` does not show `node_modules/`, `dist/` or secrets.
