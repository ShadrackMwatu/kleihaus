# Technical Audit and Safe Refactor

## PR #2 Conflict Resolution Follow-up

Current base: `d4a7917`. Git's trial merge confirmed one content conflict in `src/App.jsx`: main inserted `homepageAudienceCopy` next to the inline buttons removed by this PR. Resolution retains that content and main's other changes while keeping the shared-button import. Compared with current main, App differs only by the original button extraction. Main was merged into an isolated repair branch, never the reverse. The original working tree and its pending scrolling/report changes were not edited.

At diagnosis, GitHub returned no commit status entries and no PR-triggered Actions runs. These APIs do not establish whether branch protection exists; the proven mergeability blocker was the content conflict. The PR was also draft. No branch protections or deployment settings were changed.

Fresh validation on the resolved tree:

- Lockfile install and production build passed. Main now has 40 routes and 62 image groups; the automated SEO score is 99/100 with no blocking generator errors.
- 11 SEO unit tests and eight analytics mapping checks passed; git diff --check passed.
- Browser suite: 4 passed, 9 failed. Both button parity tests and both mocked enquiry tests passed.
- All three block-layout viewport tests reached the footer-heading assertion after their route/image/overflow checks, then failed because main now includes additional Contact and Follow Kleihaus headings.
- All three footer tests passed destination-list comparison, then expected three external social anchors but found six across hidden desktop/mobile markup.
- Two browsing tests still expect main's removed Product categories navigation and Kitchen Sinks & Mixers catalogue link.
- The rendered SEO test checked all 40 routes and reported two unmapped destinations: `/solutions` and `/contact`. These references and the unchanged manifest come from current main. The static audit also reports `/not-a-route` from a deliberate negative test fixture.

These failures remain explicitly reported rather than being hidden by relaxed tests or unrelated route/layout changes. No generated outputs or screenshots are included in the conflict-resolution commit. The earlier successful audit results below describe the older base, not this updated main. This PR is reviewable after conflict resolution but is not represented as fully green or deployment-ready.

Audit date: 2026-09-16. Base commit: `279d6bc`. Review branch: `codex/technical-audit-refactor`.

## Executive Summary

The site has a working build, central SEO generation, extensive route checks and tested enquiry flows. Maintainability is constrained by a roughly 4,500-line App component, duplicated route descriptions and limited backend failure-path coverage. This is not a certification of production security, email delivery or GA4 collection.

This change removes duplicated button rendering without changing approved content, navigation, analytics, styles or backend behavior. Higher-risk changes below remain recommendations. No production deployment or main-branch push is authorized.

## Working Tree Boundary

The audit began with existing scrolling fixes in `src/App.jsx` and `src/styles.css`, additional `tests/footer-compact.spec.js` checks, a changelog entry and generated SEO reports. These remain uncommitted and are excluded from this PR. Local browser results include that existing scrolling fix; they must not be interpreted as proving that main already contains it. Generated reports, browser screenshots and build output are not staged.

## Prioritized Findings

No critical defect was established within this review. Private service configuration and production secrets were not inspected.

| Priority | Evidence / component | Problem and consequence | Recommended correction | Change risk |
| --- | --- | --- | --- | --- |
| High | `package-lock.json`, `package.json`; npm audit | Seven advisory-affected packages: four high, two moderate, one low. Includes Vite/esbuild development-server exposure and PostCSS processing advisories. This is not evidence of a production exploit. | Plan toolchain updates in a separate PR; do not expose the development server publicly. Vite's suggested fix is a major upgrade. | Medium/high: build compatibility |
| High | `functions/api/quote-request.js`, `onRequestPost` | D1 persistence precedes email delivery. Email failure returns 500 after storage; retries may create another lead. | Define an idempotency key and retry/reconciliation contract with storage and notification integration tests. | High: customer/backend workflow; deferred |
| High | `src/App.jsx`, `SupportModal` and `ProjectsPage` | Dialogs declare aria-modal and handle Escape, but no explicit initial-focus, focus trap or focus-restoration implementation was found. Keyboard users can remain outside the dialog. | Add isolated dialog focus-management tests and a reviewed focus lifecycle. | Medium: interaction changes; deferred |
| Medium | `functions/api/quote-request.js`, public POST entry | No explicit application rate limit was found before parsing/persistence/notifications; CORS allows any origin. External Cloudflare protections are unverified. CORS is not an abuse-control mechanism. | Verify edge protections and design request-size and rate limits with legitimate enquiry tests. | High: false-positive lead blocking; deferred |
| Medium | `src/App.jsx`, `src/seoManifest.js` | Large inline route/page data and client metadata overlap with central SEO data. Future edits can drift between visible content and generated metadata. | Extract pages incrementally, then reconcile route ownership with parity tests. | High if done wholesale; deferred |
| Medium | `src/main.jsx` | No React error boundary around App; render exceptions can blank the entire experience. | Agree a customer-safe fallback and test recovery before adding a boundary. | Medium: new failure-state UI; deferred |
| Medium | `src/App.jsx`, `src/styles.css` (inherited diff) | Root height/overflow handling was already being corrected to avoid nested scrolling and blank space. | Preserve the pending clip/min-height fix and its regression checks for a separate commit/review. | Medium: cross-route layout; not included here |
| Medium | `playwright.config.js`, `package.json`, `.github/workflows/seo-production-monitor.yml` | Useful test suites exist, but no unified pre-merge test/lint command is defined; production monitoring is not a substitute for PR regression gating. | Introduce a separately reviewed PR pipeline for build, SEO, analytics and mocked browser tests. | Low/medium: CI permissions/runtime |
| Low | `src/App.jsx` Button and ButtonSecondary | Identical native button markup and class assembly duplicated between variants. | Shared `src/components/Buttons.jsx`, preserving exact class strings and forwarded native props. | Low; implemented |
| Low | `src/SmartImage.jsx`, `src/SeoHeader.jsx`, `src/AdminDashboard.jsx`, inline ProductCatalogue/QuantityEstimator, `framer-motion` | Initial reference scans indicate potentially unused modules/dependency. Documentation or operational consumers may exist; Contact is explicitly read by analytics verification. | Confirm all runtime, script, generated and operational consumers before removal. | Medium: accidental deletion; nothing deleted |
| Low | `src/README.md` and component documentation | Some component examples refer to paths different from current files. | Reconcile documentation when ownership/extraction is approved. | Low; deferred to avoid documenting an unapproved architecture |

## Coverage and Strengths

- Architecture: reviewed entry point, large App responsibilities, shared data/services, scripts, Worker entry points and workflow configuration.
- React/CSS: checked repeated buttons, modal effects, focus CSS, reduced-motion support, current height/overflow changes and responsive tests. No styling changes made.
- Routes/SEO: generation covers 39 routes and 62 image groups. Rendered checks enforce one visible H1, canonical parity, alt presence, loaded-image validity and mapped internal destinations. No route or schema edits made.
- Analytics: existing initialization guard and eight custom-event mappings retained. Static verification is not proof of live GA4 delivery; no Measurement ID is published.
- Forms: successful and failed submissions are tested with an intercepted local endpoint, including required details and email-only retry. No real customer enquiry was sent.
- Backend: reviewed Worker dispatch, quote normalization/validation, D1 persistence and notification sequencing. No live D1, Resend or WhatsApp delivery test was performed.
- Security: tracked sensitive-name inventory returned only `.env.example`; this limited inventory is not a historical secret scan. Private bindings, credentials and environment values were not printed or changed. A dedicated history-aware secret scan remains recommended.
- Performance: Vite tree shaking remains enabled. The shared-button refactor reduces reported JS from approximately 354.92 kB to 354.76 kB; CSS remains 38.86 kB. This is a maintenance improvement, not a meaningful Core Web Vitals claim.
- Accessibility: semantic routes, labels, focus CSS, reduced-motion handling and Escape closing are present; full assistive-technology and contrast certification remains outside these automated checks.

## Implemented Architecture

`src/components/Buttons.jsx` owns native button rendering. `Button` and `ButtonSecondary` supply only their existing visual defaults. Callers continue to own event handlers, disabled state, type, ARIA attributes and content. The existing custom-background detection and class order are intentionally unchanged. No default button type or new analytics event was introduced.

`tests/buttons.spec.js` renders both variants through the existing Vite JSX pipeline and checks exact legacy markup for default, extra-class and custom-background cases. Existing browser tests exercise click handlers and submission behavior.

## Verification

| Check | Baseline | After refactor |
| --- | --- | --- |
| Lockfile install | npm ci passed; seven dependency advisories | No dependency or lockfile change |
| Production build | Passed | Passed; 38 additional route HTML files plus homepage |
| SEO generation/audit | 100/100 automated technical score; 39 routes, 62 image groups | Same coverage and score |
| SEO unit tests | 11 passed after subprocess approval | 11 passed |
| Analytics mappings | Eight passed | Eight passed |
| Existing footer/browsing/mocked quote checks | Last-run record passed | Eight passed including 39-route browser audit |
| New button parity tests | Not applicable | Two passed after correcting the test harness |
| Responsive block checks | Existing suite retained | Three viewport tests passed (390, 768, 1440px); eight routes per viewport, loaded images, overflow, page errors and Escape closing checked |
| Whitespace validation | Pending diff preserved | git diff --check passed |

The final responsive run's last-run record is passed with no failed tests. The desktop homepage screenshot was also inspected. Footer heights measured by the dedicated suite are 942px mobile, 590px tablet and 244px desktop. These tests include the inherited scrolling correction; this PR deliberately does not publish that correction.

The first new component-test attempt failed because Playwright transformed JSX into its own component representation. Loading the component through Vite corrected the harness; no application workaround was introduced. The initial sandboxed Node test attempt returned spawn EPERM; the approved subprocess run passed all 11 tests. Browser runs issue a non-blocking NO_COLOR/FORCE_COLOR warning.

## Next Steps Requiring Separate Review

1. Address toolchain advisories with compatibility tests.
2. Test and repair dialog focus management.
3. Design quote idempotency and notification retry semantics.
4. Confirm abuse controls and perform a history-aware secret scan.
5. Extract route data/pages incrementally with generated/client parity tests.
6. Add pre-merge CI and backend integration coverage.

No pages, images, dependencies, Cloudflare settings, customer content or conversion handlers were removed or changed by this refactor. No merge or deployment is performed.
