# Kleihaus Automated SEO Functionality And Performance Audit

Audit date: 2026-08-05

Production site audited: https://www.kleihaus.com

Final classification: **Functional and mostly continuous**

## Executive Summary

The Kleihaus automated SEO system is functioning and producing useful deployment protection. Build-time SEO generation, route-specific HTML generation, sitemap/robots generation, central metadata, schema generation, production verification and GitHub Actions monitoring are all active.

The strongest evidence is current rather than theoretical:

- Local `main` and `origin/main` were synchronized at `2e1dd2c85d220e0b32f47ecd9789bcb4d0a83730` before this audit.
- `npm run build` successfully ran SEO generation, Vite, route HTML generation and SEO audit.
- The full-route production verifier passed against 39 of 39 manifest routes and 7 SEO endpoints.
- GitHub Actions has 3 available `SEO Production Monitor` runs; all 3 were push-triggered and successful.
- Each available monitor run uploaded one report artifact with 60-day retention.
- The latest commit check-runs show `Workers Builds: kleihaus` succeeded, `Verify production SEO` succeeded and the known stale `Cloudflare Pages` check failed.

The system is not yet fully continuous or performance-integrated because no scheduled run was visible in the available history, failure alerting has not fired against a real failure, and GA4/Search Console data are not being pulled automatically into the SEO dashboard. GA4 browser tracking is implemented and event wiring is regression-tested, but the repository does not fetch GA4 Data API metrics. Search Console is documented and ready, but no Search Console API job or credential integration is present in the repo.

No blocking repo-level defects were found. This audit made documentation-only changes.

## Repository And Deployment Status

| Item | Finding |
| --- | --- |
| Current branch | `main` |
| Working tree before audit docs | Clean: `## main...origin/main` |
| Local HEAD before audit docs | `2e1dd2c85d220e0b32f47ecd9789bcb4d0a83730` |
| `origin/main` before audit docs | `2e1dd2c85d220e0b32f47ecd9789bcb4d0a83730` |
| Synchronization | Local and remote were synchronized |
| Active deployment path | GitHub `main` -> Cloudflare Workers Builds -> Worker Assets -> Worker `kleihaus` |
| Current Workers Build check | `Workers Builds: kleihaus`, success for current HEAD |
| Current Workers Build ID from check URL | `3193983c-0a5b-4698-826d-181e9745a8a8` |
| Worker version | Not exposed through the available repo/GitHub evidence during this audit |
| Known stale check | `Cloudflare Pages`, failure, still separate from the active Workers deployment path |

Latest relevant commits:

| Area | Commit |
| --- | --- |
| SEO automation engine | `c493862 add build-time seo automation engine` |
| Production verification | `68ab299 add production seo verification and monitoring` |
| Production report update | `9e8913c update production seo verification report` |
| Continuous monitoring | `39f76ae add continuous seo production monitoring` |
| Continuity audit | `44788c3 audit continuous seo automation` |
| GA4 build variable deployment trigger | `4461590 trigger deployment for ga4 build variable` |
| GA4 production verification | `5c0c800 document ga4 production verification` |
| GA4 page view hardening | `3082e25 harden ga4 page view tracking` |
| GA4 custom event verification | `2e1dd2c verify ga4 custom event delivery` |

## Architecture Overview

The system has five active automation layers:

1. `src/seoManifest.js` is the central SEO configuration for route metadata, schema, breadcrumbs, sitemap fields and primary navigation.
2. `scripts/seo-engine.mjs` generates sitemap, robots, navigation, internal-link, image-manifest, dashboard, content suggestion and social draft outputs.
3. `scripts/generate-route-html.mjs` injects route-specific metadata and JSON-LD into the built homepage and each deep route output.
4. `scripts/verify-production-seo.mjs` checks public production endpoints, route HTML metadata, sitemap consistency, JSON validity, response timing and forbidden schema.
5. `.github/workflows/seo-production-monitor.yml` runs the production verifier after relevant pushes, daily at `04:00 UTC` and on manual dispatch, preserving artifacts and opening/updating one alert issue on persistent failure.

GA4 is a parallel measurement layer through `src/services/analyticsService.js` and `scripts/verify-analytics-events.mjs`. It tracks browser events but does not yet fetch analytics results into the automation dashboard.

## Build Audit

`package.json` defines:

```bash
npm run build
```

as:

```bash
npm run seo:generate && vite build && npm run generate:route-html && npm run seo:audit
```

Build stage behavior:

| Stage | Automatic in build | Evidence | Failure behavior |
| --- | --- | --- | --- |
| SEO generation | Yes | `npm run seo:generate` runs first | `scripts/seo-engine.mjs` exits non-zero for blocking SEO issues |
| Vite build | Yes | `vite build` runs second | Vite exits non-zero on compile/build failure |
| Route HTML generation | Yes | `npm run generate:route-html` runs third | File or metadata injection errors fail the command |
| SEO audit | Yes | `npm run seo:audit` runs last | Blocking issues exit non-zero; warnings remain non-blocking |
| Analytics verification | No | `npm run analytics:verify` exists separately | Useful gap: analytics regressions do not currently block `npm run build` |

Validation build result:

- `npm run build`: passed outside the sandbox after local `esbuild` spawn was blocked by Windows sandbox permissions.
- Final observed build command wall time: about `17.9` seconds in this environment.
- SEO automation score: `91/100`.
- Routes audited: `39`.
- Image groups audited: `62`.
- Route HTML generation: `38` non-homepage route files plus the injected homepage.
- Route HTML outputs in `dist`, excluding `_redirects`: `39`.
- Main JS bundle: `347.78 kB` raw, `92.38 kB` gzip.
- Main CSS bundle: `37.89 kB` raw, `7.53 kB` gzip.
- Built homepage HTML: `10,701` bytes, one canonical, two JSON-LD blocks, no manual GA tag in HTML.

Repeat-build determinism check:

| Output | Deterministic across two immediate generation runs |
| --- | --- |
| `public/sitemap.xml` | Yes |
| `public/robots.txt` | Yes |
| `public/seo-navigation.json` | Yes |
| `public/seo-internal-links.json` | Yes |
| `public/images/image-manifest.json` | Yes |
| `public/seo-dashboard.json` | No, timestamp changes |
| `docs/SEO_REPORT.md` | No, timestamp changes |
| `docs/SEO_CONTENT_SUGGESTIONS.md` | No, timestamp changes |
| `docs/GBP_SOCIAL_DRAFTS.md` | No, timestamp changes |

Assessment: functional and fast. The main operational weakness is timestamp-only churn in generated reports/dashboard, which can add review noise. It is not a blocking defect.

## Central SEO Configuration Audit

`src/seoManifest.js` remains the single source for the current route SEO model.

Evidence:

- Manifest route count: `39`.
- Unique titles: `39`.
- Unique descriptions: `39`.
- Sitemap URLs: `39`.
- Production full-route checks: `39`.
- Generated route HTML outputs excluding `_redirects`: `39`.
- Primary navigation items generated: `7`.
- Internal-link recommendation sets: `39`.
- Breadcrumbs are generated from route data.
- Route JSON-LD is generated from route data.
- Canonicals are derived from `SITE_ORIGIN` and each route path.
- The schema generator blocks unsupported `Product`, `Offer`, `Review` and `AggregateRating` types.

Strengths:

- Route metadata, sitemap, canonical URLs, schema and navigation now share one source.
- The manifest covers products, services, guides, projects, locations and service-location pages.
- Deleted route risk is reduced because sitemap and production verification are manifest-driven.

Limitations:

- `SEO_LASTMOD` is a single global date, so all routes receive the same freshness value.
- Route copy still has several long titles/descriptions, correctly reported as warnings.
- Internal linking is generated as a recommendation manifest; not every generated recommendation is automatically rendered on-page.

## Generated Asset Audit

| File | Size | Status |
| --- | ---: | --- |
| `public/sitemap.xml` | 6,886 bytes | Valid, 39 URLs |
| `public/robots.txt` | 70 bytes | Valid, points to canonical sitemap |
| `public/seo-navigation.json` | 753 bytes | Valid JSON, no contact data or secrets |
| `public/seo-internal-links.json` | 12,783 bytes | Valid JSON, no contact data or secrets |
| `public/seo-dashboard.json` | 5,584 bytes | Valid JSON, public summary with null private metrics |
| `public/images/image-manifest.json` | 113,307 bytes | Valid JSON, large but acceptable for tooling; no contact data or secrets |
| `docs/SEO_REPORT.md` | 4,158 bytes | Generated, status PASS, timestamp-bearing |
| `docs/SEO_CONTENT_SUGGESTIONS.md` | 4,003 bytes | Generated suggestions, timestamp-bearing |
| `docs/GBP_SOCIAL_DRAFTS.md` | 5,714 bytes | Drafts for review, timestamp-bearing |

Public JSON privacy scan:

- No email addresses detected.
- No phone numbers detected.
- No `api_secret`, `client_secret`, `private_key` or private-key blocks detected.
- Dashboard values that require GA4, Search Console, GBP or quote data remain `null` rather than fabricated.

Public accessibility assessment:

- Keeping `seo-navigation.json`, `seo-internal-links.json`, `seo-dashboard.json` and `image-manifest.json` public is acceptable because they contain non-sensitive route, SEO and asset metadata.
- `image-manifest.json` is the largest public JSON output. It is useful for auditing, but not necessary for ordinary users. If payload sensitivity or crawler budget becomes a concern, it could be moved behind a non-indexed admin/report path.

## Sitemap And Route HTML Audit

Counts:

| Count | Value |
| --- | ---: |
| SEO manifest routes | 39 |
| Sitemap URLs | 39 |
| Generated route HTML outputs excluding `_redirects` | 39 |
| Production routes checked | 39 |
| Production endpoints checked | 7 |

Full-route production verification result:

- Result: pass.
- Routes checked: `39/39`.
- Sitemap URLs: `39`.
- Endpoints checked: `7`.
- Blocking metadata failures: `0`.
- Warnings: `0`.
- Sitemap URLs missing from manifest: `0`.
- Manifest routes missing from sitemap: `0`.

For every route, the verifier checks:

- HTTP status.
- Title.
- Meta description.
- Canonical.
- Open Graph title, description and URL.
- Twitter/X title and description.
- JSON-LD presence and JSON validity.
- Forbidden schema types.
- Route-specific metadata versus manifest expectations.

The verifier does not currently check duplicate canonical count per live route, image loading, H1 presence or rendered DOM content. Those remain useful future extensions.

## Continuous Monitoring Workflow Audit

Workflow: `.github/workflows/seo-production-monitor.yml`

Confirmed:

- Push-to-main trigger exists.
- Path filters cover workflow, HTML, package files, `public/**`, `scripts/**` and `src/**`.
- Daily scheduled trigger exists at `0 4 * * *` UTC.
- Manual `workflow_dispatch` exists.
- Push runs wait 180 seconds for deployment propagation.
- The verifier retries up to 3 times with 90-second delay.
- Persistent verifier failure exits non-zero.
- Full-route verification uses `--all-routes`.
- Artifacts upload on success and failure.
- Retention is 60 days.
- Workflow summary is written from the JSON report.
- GitHub Issue alerting runs only on failure.
- Permissions are limited to `contents: read` and `issues: write`.
- Concurrency is configured as `kleihaus-seo-production-monitor` with `cancel-in-progress: false`.
- Job timeout is 30 minutes.
- No Cloudflare deployment, DNS, routes, bindings, secrets or account mutation command exists in the workflow.
- No credentials are committed.

Risks:

- `cancel-in-progress: false` preserves history but allows a scheduled run and push run to queue rather than replacing an older run.
- The 180-second wait plus three attempts is reasonable, but a slower Cloudflare propagation event could still produce a false alert.
- Alerting is implemented, but no real failure has occurred to prove issue creation in production.
- The workflow does not run after documentation-only changes unless the changed files match the path filter; that is appropriate for production SEO monitoring, but not a full documentation audit gate.

## Workflow History

`gh` is not installed locally, so run history was checked through the GitHub API and the installed GitHub app tools.

Available `SEO Production Monitor` runs:

| Run | Event | Commit | Result | Created | Updated |
| --- | --- | --- | --- | --- | --- |
| `31042443280` / #3 | Push | `2e1dd2c85d220e0b32f47ecd9789bcb4d0a83730` | Success | 2026-08-05T20:05:30Z | 2026-08-05T20:08:51Z |
| `31041467345` / #2 | Push | `3082e25fc04af872331bb2a2411d86eb9ace61a8` | Success | 2026-08-05T19:52:58Z | 2026-08-05T19:56:27Z |
| `31034416832` / #1 | Push | `39f76aebf93c84f4b144d4f07772651034445b0f` | Success | 2026-08-05T18:22:27Z | 2026-08-05T18:25:55Z |

Run-history summary:

- Total available runs: `3`.
- Push-triggered runs: `3`.
- Scheduled runs observed: `0`.
- Manual runs observed: `0`.
- Successes: `3`.
- Failures: `0`.
- Cancelled/skipped runs: `0`.
- Success rate across available runs: `100%`.
- Typical duration including 180-second push wait: about `3.3-3.5 minutes`.
- Latest successful run: `31042443280`.
- Latest failed run: none observed.
- Artifact upload evidence: one report artifact per run.
- Artifact retention: 60 days; artifacts expire on 2026-10-04 for the observed runs.
- Issue alert history: no `seo-monitoring` issues found.

Interpretation: push-triggered monitoring is proven. Scheduled continuity is configured but not fully proven because no scheduled run has occurred in the available history.

## Production Verification Performance

Command:

```bash
npm run seo:verify-production -- --all-routes --report reports\seo-production\audit-full-route.md --json-report reports\seo-production\audit-full-route.json
```

Result:

- Earlier timed verifier duration: `14.72` seconds.
- Final validation verifier duration: about `6.6` seconds in the tool run.
- Result: pass.
- Routes checked: `39`.
- Endpoints checked: `7`.
- Final average response time: `102 ms`.
- Final median response time: `80 ms`.
- Final p95 response time: `222 ms`.
- Failed or retried requests: none in the local verifier run.
- Redirect issues: none reported by the verifier.
- Content-type mismatches: none reported for JSON endpoints.

Slowest responses in this run:

| Path | Status | Duration |
| --- | ---: | ---: |
| `/` | 200 | 607 ms |
| `/tiles` | 200 | 524 ms |
| `/paints` | 200 | 632 ms |
| `/sanitaryware-machakos` | 200 | 630 ms |
| `/tiles-machakos` | 200 | 410 ms |

Final validation slowest responses:

| Path | Status | Duration |
| --- | ---: | ---: |
| `/` | 200 | 542 ms |
| `/seo-internal-links.json` | 200 | 335 ms |
| `/tiles` | 200 | 222 ms |
| `/locations` | 200 | 150 ms |
| `/products` | 200 | 122 ms |

Assessment: efficient enough for daily scheduled monitoring. The current route count is small and the verifier runs sequentially without problematic load.

## Live Production Performance Snapshot

Safe HTTP checks from this audit:

| Path | Status | Bytes | Duration | Cache |
| --- | ---: | ---: | ---: | --- |
| `/` | 200 | 10,701 | 387 ms | `cf-cache-status: HIT` |
| `/sanitaryware` | 200 | 10,769 | 143 ms | `cf-cache-status: HIT` |
| `/locations/nairobi` | 200 | 10,942 | 241 ms | `cf-cache-status: HIT` |
| `/tile-buying-guide` | 200 | 10,725 | 76 ms | `cf-cache-status: HIT` |
| `/sitemap.xml` | 200 | 6,886 | 82 ms | `cf-cache-status: HIT` |
| `/seo-dashboard.json` | 200 | 5,584 | 78 ms | `cf-cache-status: HIT` |
| `/images/image-manifest.json` | 200 | 113,307 | 83 ms | `cf-cache-status: HIT` |

Performance interpretation:

- Route-specific HTML responses are small.
- Generated JSON endpoints are cache-hit and quick.
- Worker metadata injection does not show obvious response-time overhead in these HTTP checks.
- Main JS remains the main frontend payload risk at `347.78 kB` raw and `92.38 kB` gzip.
- Image-manifest size is acceptable for a tooling endpoint, but it should not be loaded by normal page UI.
- No field Core Web Vitals data or Lighthouse lab score was collected during this audit, so no Core Web Vitals claims are made.

## Failure Alert Audit

The workflow alert step:

- Runs only on workflow failure.
- Creates required labels if missing.
- Uses the stable issue title `SEO production verification failure`.
- Avoids duplicate open issues by commenting on an existing open issue with the same title.
- Includes workflow run URL, commit SHA, verification time, artifact name, failed routes/endpoints, blocking failures and investigation steps.
- Does not create issues on success.

No real `seo-monitoring` alert issues were found through the GitHub API during this audit.

Classification: implemented but unproven in production.

## Historical Reporting Audit

Observed artifacts:

| Run | Artifact | Size | Created | Expires | Expired |
| --- | --- | ---: | --- | --- | --- |
| #3 | `kleihaus-seo-production-report-3` | 3,557 bytes | 2026-08-05T20:08:48Z | 2026-10-04T20:08:48Z | No |
| #2 | `kleihaus-seo-production-report-2` | 3,519 bytes | 2026-08-05T19:56:23Z | 2026-10-04T19:56:22Z | No |
| #1 | `kleihaus-seo-production-report-1` | 3,579 bytes | 2026-08-05T18:25:51Z | 2026-10-04T18:25:50Z | No |

Report contents generated by `scripts/verify-production-seo.mjs` include:

- Timestamp.
- Base URL.
- Overall status.
- Route count.
- Endpoint count.
- Failures.
- Warnings.
- Average response time.
- Slowest responses.
- Sitemap/manifest differences.
- JSON validity.
- Metadata checks.

Limitations:

- Artifacts preserve history for 60 days only.
- Reports are not currently summarized into a trend file.
- No automated month-over-month SEO performance reporting exists yet.

## GA4 Status

Repo-level GA4 audit:

- One GA4 loader path exists in `src/services/analyticsService.js`.
- One config call exists.
- The real Measurement ID is read from `import.meta.env?.VITE_GA_MEASUREMENT_ID`.
- No real Measurement ID is committed.
- `send_page_view: false` prevents duplicate automatic and manual page views.
- SPA `page_view` is explicitly mapped and includes `page_location` and `page_title`.
- `npm run analytics:verify` passed for all eight expected custom events.
- Sensitive keys are filtered: names, emails, phone numbers, messages, request details and details fields.
- Analytics failures are caught and non-blocking.

Expected GA4 events verified by source wiring:

- `quote_submit`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `guide_click`
- `guide_view`
- `location_view`
- `cta_click`

Classification: browser tracking active at repo level and production tag path previously verified; live-data integration incomplete.

The automation does not currently:

- Fetch GA4 Data API metrics.
- Populate the dashboard with live organic sessions, conversions or event counts.
- Automatically compare landing-page conversion trends.
- Automatically mark GA4 key events inside the GA4 property.

## Search Console Status

Search Console documentation is present and ready, but the repository does not contain an active Search Console API integration.

Current classification: **Ready but not connected**.

Not currently automated:

- Ownership verification status.
- Sitemap submission status.
- Clicks.
- Impressions.
- CTR.
- Average position.
- Top queries.
- Top pages.
- Index coverage.
- Sitemap processing status.

Dashboard values that depend on Search Console remain `null` or documented as data-needed, which is correct and safer than fabrication.

## SEO Performance Effectiveness

The automation proves technical SEO health, not business SEO performance.

Currently proven:

- Routes are covered.
- Metadata is route-specific.
- Sitemap and manifest agree.
- Public SEO endpoints are live.
- Forbidden schema is blocked.
- Production monitoring runs after relevant pushes.
- GA4 event wiring is present and regression-tested.

Not automatically proven yet:

- Search visibility improvement.
- Organic click growth.
- CTR improvement.
- Average-position improvement.
- Indexed-page growth.
- Quote requests from organic traffic.
- WhatsApp, phone and email conversions from organic traffic.
- GBP view/click changes.

Conclusion: technical SEO value is measurable and real; business SEO performance measurement is not yet fully automated because GA4/Search Console/GBP data ingestion is not connected.

## Guardrails

Confirmed:

- No active `Product` schema was introduced.
- No active `Offer` schema was introduced.
- No active `Review` schema was introduced.
- No active `AggregateRating` schema was introduced.
- No fake prices, fake ratings, fake reviews, fabricated analytics values or fabricated Search Console values were found.
- No committed GA4 real Measurement ID was found; only documented placeholder examples appear.
- No committed Search Console verification token was found.
- No sensitive data was found in public SEO JSON outputs.
- No duplicate GA4 tag was found in the source implementation.
- No manual GA tag appears in built `dist/index.html`.
- WhatsApp still uses the same-tab `window.location.href` flow rather than `window.open`.
- Phone and email links remain present.
- The SEO monitor workflow contains no Cloudflare deployment or configuration mutation command.

## Defects And Risks

Blocking defects:

- None found.

High-priority risks:

- GA4 and Search Console live-data ingestion is not automated, so business SEO performance cannot yet be measured automatically.
- Scheduled continuity is configured but not yet proven by an observed scheduled run.
- Failure alerting is implemented but unproven because no real alert issue has been created.

Medium-priority improvements:

- Add `npm run analytics:verify` to CI or a pre-deploy workflow so GA4 event regressions are blocked automatically.
- Add a safe workflow-level test for alert issue creation without breaking production.
- Replace global `SEO_LASTMOD` with route-level last-modified dates for more precise sitemap freshness.
- Reduce timestamp-only churn in generated docs/dashboard when content is unchanged.
- Extend production verifier to check H1 presence, duplicate canonical count, broken images and selected visible breadcrumbs.
- Preserve longer history through a monthly summary artifact or committed monthly audit, not only 60-day workflow artifacts.

Low-priority refinements:

- Add trend summaries for verifier response times.
- Consider moving `image-manifest.json` to a clearly tooling-oriented path if public discoverability becomes undesirable.
- Add Lighthouse or WebPageTest lab checks once a stable local/CI browser environment is available.

## Scorecard

| Area | Score | Evidence | What would raise the score |
| --- | ---: | --- | --- |
| Build-time SEO automation | 92 | Build runs SEO generation, Vite, route HTML generation and SEO audit; blocking issues fail. | Include analytics verification in CI/build gate and reduce timestamp churn. |
| Central SEO configuration | 91 | 39 routes, 39 unique titles and descriptions, centralized canonical/schema/breadcrumb data. | Per-route lastmod and more modular content data. |
| Asset generation | 88 | Sitemap, robots, navigation, internal links, dashboard, image manifest and docs generate correctly. | Stabilize timestamp-only outputs and slim public image manifest if needed. |
| Route HTML generation | 94 | 39 generated route HTML outputs, no generic homepage metadata on deep routes in production verifier. | Add automated duplicate-canonical and H1 checks. |
| Sitemap and robots automation | 96 | 39 manifest routes equal 39 sitemap URLs; robots points to canonical sitemap. | Per-route freshness instead of one global date. |
| Production verification | 94 | Full-route verifier passed 39 routes and 7 endpoints with metadata/schema checks. | Add rendered DOM, image and accessibility checks. |
| Continuous scheduled monitoring | 82 | Workflow has push, schedule and manual triggers; 3 push runs succeeded. | Observe scheduled runs over several days. |
| Failure alerting | 78 | Issue alert logic is well designed and avoids duplicate issues. | Prove through safe failure simulation or first real failure. |
| Historical reporting | 84 | One artifact per observed run, 60-day retention, useful Markdown/JSON content. | Add trend summaries and longer-term rollups. |
| Performance efficiency | 89 | Build passed; verifier ran in 14.72 seconds; live responses were cache hits and sub-second. | Add lab/field performance data and route-level timing trends. |
| GA4 event tracking | 88 | `analytics:verify` passed all 8 required events; privacy filters present. | Confirm every event in GA4 Realtime/DebugView after normal-browser tests. |
| GA4 live-data integration | 45 | Browser tag/event wiring exists, but no GA4 Data API ingestion. | Connect GA4 Data API with approved credentials and dashboard reporting. |
| Search Console integration | 35 | Setup docs exist; no API ingestion or verified submission evidence in repo. | Connect Search Console API and import query/page/indexing data. |
| Privacy and security | 92 | No credentials, no real GA ID, no sensitive public JSON, conservative schema guardrails. | Add visible privacy policy and consent/privacy review for analytics. |
| Overall technical SEO automation | 91 | Build, generation, production verifier and push monitoring are working. | Prove scheduled/failure alert continuity and deepen verifier coverage. |
| Overall business-performance SEO automation | 56 | Technical health and GA4 wiring are ready; live business SEO metrics are not automated. | Add GA4, Search Console, GBP and quote/lead data ingestion with monthly reports. |

## Final Answers

| Question | Answer |
| --- | --- |
| Is it functional? | Yes. |
| Is it running automatically? | Yes during build and after relevant pushes to `main`. |
| Is it running continuously? | Mostly; push monitoring is proven, scheduled monitoring is configured but not yet observed. |
| Are all routes checked? | Yes in full-route mode; latest local verifier checked 39/39 routes and the workflow uses `--all-routes`. |
| Are failures alerted? | Implemented through GitHub issues, but unproven by a real failure. |
| Is history preserved? | Yes through 60-day workflow artifacts; long-term trend history is not yet built. |
| Is GA4 tracking working? | Repo-level browser tracking and event wiring are verified; final event receipt still depends on GA4 Realtime/DebugView. |
| Is GA4 performance data automatically collected? | No. |
| Is Search Console data automatically collected? | No. |
| Is real SEO business performance measurable automatically? | Not yet; technical health is automated, business-performance data ingestion remains incomplete. |

## Prioritized Roadmap

Quick wins:

1. Add `npm run analytics:verify` to a CI workflow so custom-event regressions are automatically blocked.
2. Review the first daily scheduled run after `04:00 UTC` and update this audit with evidence.
3. Add a non-production/safe alert simulation path to prove issue alerting without breaking production.
4. Reduce timestamp-only churn in generated docs/dashboard when content has not changed.
5. Add H1, duplicate canonical and broken-image checks to `scripts/verify-production-seo.mjs`.

Medium-term improvements:

1. Add route-level `lastModified` values to `src/seoManifest.js`.
2. Connect GA4 Data API using approved credentials stored only in the deployment/CI secret store.
3. Connect Search Console API to collect clicks, impressions, CTR, average position, top pages and top queries.
4. Add a monthly trend report that compares production verifier timing, SEO score, indexed pages and lead events.
5. Add a privacy page and consent review for analytics and quote/contact tracking.

Long-term improvements:

1. Build the SEO dashboard around live GA4, Search Console, GBP and quote-request metrics.
2. Use live query and conversion data to generate content recommendations and internal-link priorities.
3. Add safe lab performance checks for homepage, product/category, location and guide routes.
4. Keep Product, Offer, Review and AggregateRating schema blocked until truthful product-level content supports it.
