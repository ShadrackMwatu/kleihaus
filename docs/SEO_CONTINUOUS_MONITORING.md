# Kleihaus Continuous SEO Monitoring

Date: 2026-08-05

The Kleihaus SEO Automation Engine now has a production monitoring workflow that verifies the live website without deploying code or changing Cloudflare configuration.

## Workflow

File:

```text
.github/workflows/seo-production-monitor.yml
```

Triggers:

- Pushes to `main` that touch website, public asset, package, script or workflow files.
- Daily scheduled run at `04:00 UTC`.
- Manual `workflow_dispatch` runs from GitHub Actions.

The workflow uses Node.js 20, installs dependencies with `npm ci`, and runs:

```bash
npm run seo:verify-production -- --all-routes
```

It verifies the public production website at:

```text
https://www.kleihaus.com
```

It does not deploy the site, modify Cloudflare, read secrets, write DNS, change routes, change bindings or alter Worker production settings.

## Push Delay And Retries

Push-triggered runs wait 180 seconds before the first verification attempt so Cloudflare Workers Builds has time to publish the latest `main` commit.

All runs make up to three verification attempts. If an attempt fails, the workflow waits 90 seconds before retrying. Persistent blocking failures keep the workflow red after the final attempt.

Scheduled and manually triggered runs do not add the initial deployment delay, but they still use the same retry behavior.

## What Is Tested

The full-route production monitor checks all indexable routes in `src/seoManifest.js`, not only representative pages.

Checks include:

- HTTP status for production endpoints and route HTML.
- HTML title.
- Meta description.
- Canonical URL.
- Open Graph title, description and URL.
- Twitter/X title and description.
- JSON-LD parsing and route WebPage presence.
- Forbidden schema guardrails for Product, Offer, Review and AggregateRating.
- Sitemap URL count and manifest consistency.
- `robots.txt` sitemap reference.
- Generated JSON endpoint validity.
- Route count and sitemap coverage.
- Per-route and endpoint response time.

Critical endpoints:

- `/`
- `/sitemap.xml`
- `/robots.txt`
- `/seo-navigation.json`
- `/seo-internal-links.json`
- `/seo-dashboard.json`
- `/images/image-manifest.json`

## Reports And Artifacts

Each verification attempt writes both report formats under:

```text
reports/seo-production/
```

Report formats:

- `seo-production-<run-number>-attempt-<n>.md`
- `seo-production-<run-number>-attempt-<n>.json`

The directory is ignored by Git so daily timestamped reports are not committed.

GitHub Actions uploads the reports as an artifact named:

```text
kleihaus-seo-production-report-<run-number>
```

Artifact retention is 60 days.

The job summary prints:

- Overall status.
- Routes checked.
- Endpoints checked.
- Average response time.
- Warning count.
- Failure count.
- Sitemap/manifest consistency.
- Slowest responses.
- Blocking failures.

## Failure Alerts

If blocking failures remain after all retries, the workflow creates or updates a GitHub issue titled:

```text
SEO production verification failure
```

Labels:

- `seo-monitoring`
- `production`
- `automated`

The workflow uses only the default `GITHUB_TOKEN` with:

- `contents: read`
- `issues: write`

Alert issues include:

- Workflow run URL.
- Commit SHA.
- Verification time.
- Failed routes and endpoints when available.
- Blocking failure summary.
- Report artifact name.
- First investigation steps.

The workflow searches for an existing open `seo-monitoring` issue with the same title before creating a new one. If one exists, it adds a comment instead of creating a duplicate issue.

Successful runs do not create issues. The workflow does not automatically close alert issues; closure remains manual after review.

## Manual Run Instructions

1. Open GitHub Actions.
2. Select `SEO Production Monitor`.
3. Choose `Run workflow`.
4. Run it against `main`.
5. Open the completed run summary.
6. Download `kleihaus-seo-production-report-<run-number>` if detailed evidence is needed.

## Local Verification

Run a representative production check:

```bash
npm run seo:verify-production
```

Run a full-route production check:

```bash
npm run seo:verify-production:all
```

Local timestamped reports are written to `reports/seo-production/` and are ignored by Git.

## Analytics Integration Readiness

No GA4 or Google Search Console credentials are committed.

Future GA4 collection would require:

- Official GA4 property ID.
- Approved Google Analytics Data API access.
- Approved service-account or OAuth credentials.
- GitHub secrets such as `GA4_PROPERTY_ID` and an approved credential secret.

Potential GA4 metrics:

- Organic sessions.
- Landing pages.
- Engagement.
- `quote_submit`.
- `whatsapp_click`.
- `phone_click`.
- `email_click`.
- `guide_click`.
- `guide_view`.
- `location_view`.
- `cta_click`.

Future Search Console collection would require:

- Verified Search Console property.
- Search Console API access.
- Approved service-account or OAuth access.
- GitHub secrets for the verified property and approved credential.

Potential Search Console metrics:

- Clicks.
- Impressions.
- CTR.
- Average position.
- Top queries.
- Top pages.
- Sitemap status.
- Index coverage where supported.

The monitoring workflow intentionally does not fabricate analytics or indexing data when credentials are absent.

## Troubleshooting

If the workflow fails after a push:

1. Confirm Cloudflare Workers Builds completed for the commit.
2. Open the uploaded Markdown report first.
3. Use the JSON report for exact failed routes, endpoint status and timing.
4. Check whether sitemap and manifest route counts match.
5. Inspect `src/seoManifest.js` for title, description, canonical and schema regressions.
6. Re-run the workflow manually if the failure appears to be temporary deployment propagation.
7. Do not force-push or alter Cloudflare settings unless a separate deployment investigation approves that change.

## Intentionally Manual

- GA4 and Search Console credential setup.
- Google Business Profile data access.
- Review and closure of alert issues.
- Content strategy decisions from analytics trends.
- Any Cloudflare DNS, route, binding, secret or production deployment setting changes.
