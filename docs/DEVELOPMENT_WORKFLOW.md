# Kleihaus Development Workflow

This document defines the safe workflow for working on the Kleihaus website.

Rule: Every future meaningful change must update `docs/CHANGELOG.md` and, where relevant, `docs/PROJECT_AUDIT.md`.

## Local Repository

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

Do not create another repository for this project. The existing local folder and GitHub repository are the source of truth.

## Cloudflare Pages Deployment

Cloudflare Pages deploys the static site from the GitHub repository.

Expected build settings:

```text
Build command: npm run build
Build output directory: dist
```

Do not alter Cloudflare deployment settings unless the project owner explicitly requests it.

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

If the port is busy, Vite may choose another local port.

Build production output:

```bash
npm run build
```

## Safe Git Workflow

Before editing:

```bash
git status
```

After a meaningful update:

```bash
git status
git add README.md docs/
git commit -m "Document Kleihaus project progress and workflow"
git push origin main
```

For website code changes, stage only the relevant project files. Avoid using broad staging if unrelated files are modified.

## What Not To Commit

Do not commit:

- `node_modules/`
- `dist/`
- `.env`
- `.env.local`
- API keys
- SMTP passwords
- WhatsApp tokens
- database credentials
- OpenAI/LLM keys
- Cloudflare secrets
- temporary logs or local editor files

Keep `package-lock.json` tracked because it records exact dependency versions.

## Environment Variables

Use `.env.example` for placeholders only. Real secrets must be configured in the secure hosting/backend environment, not in frontend source files.

Current frontend placeholders include:

```env
VITE_GA_MEASUREMENT_ID=
VITE_ENABLE_ANALYTICS=false
VITE_ANALYTICS_ENDPOINT=
VITE_ENABLE_RECOMMENDATIONS=true
VITE_ENABLE_MONTHLY_REPORTS=false
VITE_MONTHLY_REPORT_RECIPIENTS=
VITE_QUOTE_ENDPOINT=
VITE_MONTHLY_REPORT_ENDPOINT=
```

## Verification Before Push

Run:

```bash
npm run build
```

For UI changes, also run:

```bash
npm run dev
```

Then verify:

- Page loads locally.
- No console errors.
- No horizontal scrolling.
- Mobile layout works.
- Images load and have useful alt text.
- WhatsApp links open correctly.
- Quote form opens WhatsApp with readable line breaks.
- Public website does not expose backend/internal AI wording.
- `git status` does not show `node_modules/`, `dist/` or secrets.

## Documentation Requirement

Every future meaningful change must update:

- `docs/CHANGELOG.md`

And, where relevant:

- `docs/PROJECT_AUDIT.md`
- `docs/DEVELOPMENT_WORKFLOW.md`
- `docs/SEO_STRATEGY.md`
- `docs/QUOTE_FORM_SUBMISSION.md`
- `docs/AI_BACKEND_ARCHITECTURE.md`
- `docs/VISIBILITY_AND_GROWTH_ROADMAP.md`
