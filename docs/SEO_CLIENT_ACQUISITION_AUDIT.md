# Commercial SEO and acquisition audit

Audit date: 2026-09-06. Scope: all 39 manifest routes, engine, HTML generator, analytics implementation, existing browser test and monitoring workflow. The public dashboard now carries a reproducible per-route inventory under acquisition.routeCoverage; it is configuration evidence, not measured traffic.

## Final deployment evidence (supersedes initial access limitations below)

Implementation commit 15dbaa1 was pushed successfully (1ab1b86..15dbaa1); this also published the pre-existing local SEO commit 726fd6c. GitHub check-runs confirmed **Workers Builds: kleihaus: success**. The separate stale Cloudflare Pages check failed and is not the active deployment.

Post-deployment all-route verification passed: 39 routes, 7 endpoints, average response 299 ms. Local report: reports/seo-production/seo-production-2026-09-06T01-10-00-446Z.json. An immediate pre-propagation run reported the three old sanitaryware description tags; the final run resolves those mismatches.

Elevated read-only GitHub API access succeeded after the sandbox request failed. Seven scheduled monitor runs from August 30 through September 5 completed successfully; example: https://github.com/ShadrackMwatu/kleihaus/actions/runs/33953829946. The current push-triggered run was observed in progress. Manual dispatch and alert delivery were not observed. Continuous-monitoring editorial score is therefore revised from provisional 50 to 85 for both before and after: this is newly obtained evidence of existing functionality, not an improvement caused by this change. The generated dashboard's conservative continuity label remains configuration-only because it does not ingest workflow history.

The live GA4 failure remains unresolved and honestly reported. No complete mobile visual audit or field CWV measurement was performed. The acquisition plan still requires approved private reporting access and owner outcome records.

## Decision

Kleihaus has functioning technical automation and commercial enquiry paths. It cannot currently demonstrate continuous qualified customer acquisition, and cannot prove which organic leads become paying customers. Search Console and GA4 reporting importers and business outcome records are absent. A high internal technical score does not close those gaps.

## Execution evidence

- npm install passed: 139 packages audited, zero reported vulnerabilities.
- Full production verifier passed: 39 routes and 7 endpoints, average response 277 ms. Evidence: local ignored reports/seo-production/seo-production-2026-09-06T01-03-27-596Z.json.
- analytics:verify passed for eight required custom-event mappings.
- Existing analytics:e2e first failed with spawn EPERM in the sandbox. Elevated Chromium execution ran but failed waiting for whatsapp_click. Captured GA4 names: page_view, scroll, cta_click. Backend captured whatsapp_click, but that is not GA4 delivery evidence.
- Browser test stopped at WhatsApp; phone, email, guide, location and mocked quote success were not reached. One initial loader assertion passed. Config-call count was not asserted by this test. No real quote was submitted.
- The test uses Control-click but the application intentionally navigates in the same tab after 350 ms; navigation is a plausible cause, not a proven diagnosis. Do not change the production analytics architecture on this evidence alone.
- gh is unavailable. Public GitHub workflow-history request failed with a connection refusal. Scheduled run history, alert delivery and active Workers Build success remain unverified.

## Automation inventory

| Component | Active/function evidence | Automatic/continuous | Measurement and commercial contribution |
| --- | --- | --- | --- |
| Manifest, metadata, canonical, OG, Twitter | 39 production routes passed verifier | Each build | Discovery prerequisite, not demand evidence |
| Sitemap, robots, route HTML | Production endpoints verified | Build scripts | Crawl support; route HTML is metadata injection, not full React content rendering |
| Worker metadata | Production responses pass; source implementation exists | Request-time | Preserves route discovery; deployment provenance not proven |
| Schema and breadcrumbs | Generated route validation | Build/request time | No active forbidden type found by verifier; FAQ eligibility is not guaranteed |
| Internal links/navigation | 183 generated recommendations at baseline | Every build | Recommendations are not proof of rendered links or sales funnel completion |
| Images | 62 groups, WebP/AVIF/fallback inventory | Manifest refresh | File inventory is not automatic resizing; no new image processor installed |
| Dashboard/reports/content/social drafts | Generator executes | Build only | Previously fixed business score; now explicit unconnected funnel metrics and editorial scoring |
| Production monitor | YAML: push, daily schedule, manual dispatch, 3 retries | Configured; execution history unavailable | 60-day artifacts, issue alerts, concurrency, 30-minute timeout; alert success unproven |
| Analytics mapping | Static verification passed | Client interaction | Two required event names captured live; remaining delivery not established |
| Search Console / GA4 reporting | No importer found | Not connected | Cannot measure query demand or organic lead rate |
| Customer outcomes | No approved outcome data | Business input required | Cannot identify qualified/won leads or revenue |

## Commercial coverage

The dashboard route inventory includes every title, description, canonical, declared keyword, image/alt, FAQ and breadcrumb count, related path and suggested journey. Visible H1/content live in App.jsx separately: metadata/content drift remains a risk. No query-volume evidence is available; keywords below are editorial targets.

| Offering / primary intent | Existing landing coverage | Gap / safest next action |
| --- | --- | --- |
| Tiles Kenya; tile suppliers Nairobi | /tiles, /tiles-kenya, /tiles-nairobi | Consolidate national overlapping intent using Search Console evidence before redirects |
| Floor tiles Nairobi | /floor-tiles, local tile pages | Room/use-case guidance exists; verify slip/load suitability per product |
| Wall/kitchen tiles | /wall-tiles and kitchen project gallery | Kitchen intent supported; link to sink selection, avoid unsupported cabinetry claims |
| Bathroom tiles | /bathroom-tiles and bathroom renovation guide | Compare wet-area suitability, compatibility and quantities |
| Porcelain/ceramic/outdoor/size/finish | Broader tile content only | Confirm actual ranges/specifications before dedicated landing pages |
| Sanitaryware Kenya/Nairobi/Machakos/Makueni | Category and four regional/national pages | WC, basin, fittings, shower and mixer imagery present; stronger kitchen-sink copy implemented |
| Kitchen sinks and mixers | Sanitaryware imagery and projects | Previously omitted from main category intro; now aligned without creating a competing page |
| Paints | Category, selection guide, regional pages | Surface/coverage information supports enquiries; no invented brand or stock assertions |
| Tile adhesive Nairobi / grout | /adhesives-grout, guide | Add manufacturer-approved coverage before calculator publication |
| Tools / finishing materials | Adhesive category and installation content | Dedicated buyer checklist remains an opportunity; confirm current supply list |
| Delivery | Local hubs and service pages | Site access/offloading/quantity planning present; no fixed charge or timing promise |
| Sourcing/advisory/trade procurement | /trade-projects, product and cost guidance | Contractors/developers/designers/institutions need verified procurement documentation |
| Training/fundi support | /installation-support, best-practices guide | Training mentioned; do not imply certification or scheduled courses |
| Commercial/warehouse flooring | Floor tiles/trade context | Warehouse suitability requires load/chemical/traffic specifications, not generic tile claims |

Transactional and local purchase targets should precede broad informational publishing. Commercial investigation: tile quantity, sanitaryware selection, adhesive choice. Trade procurement: staged material lists and specification review. Informational: installation mistakes and maintenance. No extra Kenyan location page is justified by the current evidence.

## Local, trust and funnel findings

Nairobi has traffic/access considerations; Machakos has staged material/logistics planning; Makueni has route-dependent delivery planning. This is useful differentiation, but not verified local project proof. Regional service pages remain templated and risk cannibalization with national/category pages. Confirm service evidence before Kiambu, Kajiado, Kitengela/Athi River, Thika or Nakuru expansion.

Keep the existing restrained contact area. Guide -> relevant product -> genuine project -> contact; location -> product -> guide -> contact; project -> supported product -> similar quote. The new dashboard records these reviewable paths. It does not claim they are all newly rendered links. Removed one duplicate homepage manifest link.

Trust priorities: confirmed address/hours, delivery terms, documented product specifications, approved showroom/project evidence, returns/warranty guidance. Do not invent reviews, brands, counts or installation responsibility. Existing neutral project imagery is useful evidence but not proof of every advertised service.

## Scores and method

These are conservative editorial readiness assessments, not measured ranking/traffic outcomes. Each score weighs implementation coverage (50%), actual verification (30%) and measurement usefulness (20%). Integration and attribution scores measure completed capability; missing access receives no execution credit. Before/after improvements are small because business data remains absent.

| Area | Before | After | Limitation / next improvement |
| --- | ---: | ---: | --- |
| Technical SEO | 85 | 85 | Metadata HTML passes; full rendered content/mobile audit incomplete |
| Product SEO | 76 | 78 | Sink intent improved; specification evidence needed |
| Service SEO | 67 | 67 | Tools/delivery/training depth and proof |
| Local SEO | 74 | 74 | Three hubs present; no query or local project performance data |
| Content SEO | 72 | 74 | Opportunity rubric added; demand unmeasured |
| Image SEO | 85 | 85 | Modern formats present; visual/field performance not fully measured |
| Internal linking | 75 | 77 | Deduplicated manifest and explicit funnel recommendations |
| Schema | 86 | 86 | Validity support exists; no rich-result outcome claim |
| Performance | 65 | 65 | Bundle evidence only; no field CWV baseline |
| Conversion optimization | 76 | 77 | Existing contact paths; clearer compatibility enquiry guidance |
| GA4 tracking | 50 | 50 | Live WhatsApp verification failed; later events untested |
| Search Console integration | 0 | 0 | No reporting importer; ownership not verified here |
| SEO automation | 85 | 87 | Reproducible funnel inventory and honest reporting |
| Continuous monitoring | 50 | 50 | Configuration inspected; history inaccessible |
| Lead attribution | 15 | 20 | Defined source/channel separation; no joined outcomes |
| Customer/revenue attribution | 0 | 5 | Framework only, no records |

Technical automation score: 85 -> 87 (editorial). Client-acquisition readiness: 35 -> 40 (editorial: discoverability 25%, enquiry readiness 25%, search/lead measurement 30%, customer attribution 20%). Legacy automated check score remains 100/100 and has a narrower meaning. Do not compare these as equivalent scoring systems.

## External integrations and privacy

GA4: authorize a read-only reporting identity on the correct property, enable the Analytics Data API, provide the numeric property ID and server-side OAuth/service identity. This is different from the public Measurement ID. Search Console: confirmed property ownership/access, exact property identifier and authorized read-only Search Console API identity. Store credentials only in an approved secret store; neither browser VITE variables nor committed files are suitable for reporting credentials. No credentials were added or printed.

Request daily aggregates by landing page, session source/medium, device and event name. Search Console query/page/device/country rows are aggregate and cannot identify individual customers. Respect incomplete recent days, reporting time zone and small-count privacy suppression. Keep absent values null, not zero; record source, date range, retrieval time and errors. Public dashboard should remain aggregate-only and not contain raw queries or lead IDs.

In GA4 Admin > Data display > Events, mark quote_submit and the approved contact-intent events as key events. Distinguish clicks from confirmed leads; do not mark page_view or guide_view as primary conversions. This account action was not performed. See [Google key-event instructions](https://support.google.com/analytics/answer/13128484?hl=en) and [API setup](https://developers.google.com/analytics/devguides/config/admin/v1/quickstart).

Use a private minimal outcome register: random lead reference, enquiry date, landing page if known, acquisition source, contact channel, product group, broad service area, status NEW/QUALIFIED/QUOTED/WON/LOST, outcome date and optional order value/currency. Record UNKNOWN when provenance is absent. WhatsApp is a channel, not proof of organic source. Owner qualification and confirmed orders are required; never infer paid revenue from clicks or quote submissions. Do not put identities/messages in GA4 or the public repository.

## Priorities and remaining verification

P0: reproduce WhatsApp GA4 behaviour with request/response and navigation evidence, connect read-only reporting, establish baseline. P1: reconcile query-to-page overlap, approve specifications and trust details, use the scored content backlog. P2: review weekly funnel aggregates and owner outcomes; expand only on evidence.

No broad application/Cloudflare/quote rewrite is justified by this audit. Active Workers Build provenance, full mobile visual checks, account settings, field CWV and complete live analytics delivery remain verification gaps. Technical production success alone must not be reported as deployment or customer-acquisition proof.
