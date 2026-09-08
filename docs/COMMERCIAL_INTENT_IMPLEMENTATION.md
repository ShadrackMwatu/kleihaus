# Commercial Intent Implementation

## Scope and Baseline

Baseline commit: 5a4609f. Technical readiness before: 100/100 (existing automated checks). The old acquisition model had no comparable numeric commercial score. Applying the new rubric to its unchanged route manifest gives 61/100; this is a retrospective editorial baseline, not measured acquisition performance.

The new model lives in scripts/seo-commercial.mjs and extends scripts/seo-acquisition.mjs. Build and audit generate four KLEIHAUS commercial reports and embed the complete query matrix under acquisition.commercialIntent in public/seo-dashboard.json. Existing technical metrics and private-data placeholders remain intact.

## Implementation

- 73 unique queries in 25 clusters, with eight intent classes and 14 client segments. One primary existing route per query avoids mass publishing and minor-variation pages.
- Weighted 0-100 opportunity priority: intent 30%, product fit 25%, audience value 15%, gap 15%, conversion potential 15%. These are editorial estimates, not keyword volume or sales forecasts.
- Intent-weighted route readiness, separate strong-route percentages, CTA-path, declared-link and verified-evidence coverage. CTA presence is a shared-template assumption, not proof of qualified leads or a BOQ upload facility.
- Evidence defaults to unverified. Optional route commercialEvidence entries require a kind, verified status and source. Specifications plus product/project evidence unlock scores above the conservative cap; source review remains a human responsibility.
- Existing project page metadata, introduction and quote label now explain BOQ quantities and specification-based enquiries. No upload feature, delivery promise, stock claim or bulk discount was introduced.
- Inferred internal-link candidates prioritize commercial routes only after existing contextual category/service/location matching. Explicit links retain priority; the generated manifest remains recommendations, not proof of rendered links.
- Functional gaps remain proposals: tile/carton calculator, paint calculator, specification filtering and structured BOQ intake. Existing guides are interim destinations, never represented as working calculators.

## Interpretation and Remaining Work

Post-change commercial readiness: 63/100, compared with 61/100 using the same rubric on baseline 5a4609f. The two-point gain reflects explicit BOQ/specification language on the existing project route, not new evidence or measured leads. Technical readiness remains 100/100; adding a scoring model does not itself improve rankings. Verified specifications and trustworthy project evidence remain missing.

The top 20 deduplicated cluster actions are generated in KLEIHAUS_COMMERCIAL_SEARCH_INTENT_REPORT.md. Price-intent enquiries ask for a current quote rather than publishing prices. Local targets are limited to existing Nairobi, Machakos and Makueni routes. Product and country/local variants need ongoing query-owner review; a unique mapping does not prove Google will not rank competing pages.

GSC and GA4 reporting importers are not configured. Future aggregate query/landing-page/date-range data may be joined to route-level enquiries, never individual query-to-customer identities. No credentials or customer records belong in public generated outputs.

## Validation

Run npm install, npm run build, node --test tests/seo-acquisition.test.mjs tests/seo-commercial.test.mjs, npm run analytics:verify, npm run seo:verify-production -- --all-routes and git diff --check. Production verification before push checks the existing deployment; post-deployment verification is needed for the new metadata.

Local validation passed: installation (zero vulnerabilities), production build (39 routes, 62 image groups), eight Node acquisition/commercial regression tests and all eight required custom-event wiring checks. The pre-deployment production check reached 39 routes and seven endpoints; only the three intentionally updated description fields on /trade-projects differed from the older live deployment. Post-push deployment results are reported separately rather than recorded prematurely here.

No architecture, DNS, Worker configuration, analytics implementation, quote/WhatsApp workflow, images or unrelated video assets are changed.
