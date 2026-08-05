# Kleihaus GA4 Custom Event Verification

Verification date: 2026-08-05

Production URL checked: https://www.kleihaus.com

Final classification: **Local wiring correct; production browser verification incomplete**

## Executive Summary

Kleihaus GA4 is active in the live production bundle and the custom-event wiring is present for all eight expected events. The latest active Cloudflare Workers Build for commit `3082e25` succeeded and live production serves the GA4 loader/config path from `VITE_GA_MEASUREMENT_ID`.

This verification found one safe repo-level improvement: the analytics debug output did not show whether `gtag` was available at send time. That was hardened, and a deterministic analytics wiring audit script was added.

Browser-level network capture of `google-analytics.com/g/collect` requests could not be completed reliably in this local headless browser environment because the DevTools socket and netlog captures did not expose stable GA collection traffic. Therefore, GA4 Realtime/DebugView remains the final authority for confirming event receipt inside the property. Because GA4 Realtime already shows active users and the live bundle contains the tag, a summary card showing event count `0` is most likely a reporting-card/date-range/processing delay unless DebugView also fails to show events after manual test clicks.

No real Measurement ID is recorded in this document.

## Deployment Checked

- Branch: `main`.
- Local HEAD and `origin/main`: `3082e25fc04af872331bb2a2411d86eb9ace61a8`.
- Active deployment check: `Workers Builds: kleihaus`.
- Active Workers Build ID: `d73af71b-55c8-469b-aa2b-0f5b32f28f08`.
- Active Worker Version ID: `cdac114f-d4b2-40de-81fe-e9b302bf7dc5`.
- Active Workers Build conclusion: success.
- Known stale check: `Cloudflare Pages` still reports failure and is not the active Worker Assets deployment path.
- GitHub Actions `Verify production SEO` check also passed for the same commit.

## Live GA4 Tag Evidence

Live production bundle check after the latest deployment:

- Homepage HTTP status: `200`.
- JavaScript asset: `/assets/index-BwGzMVw6.js`.
- One redacted GA4 Measurement ID present.
- One `googletagmanager.com/gtag/js` reference present.
- One GA4 config call present.
- Initial HTML does not contain a manual Google tag snippet.
- No duplicate GA4 loader was detected.
- Live bundle includes `page_view`, `page_location` and `page_title` support.

## Analytics Service Audit

Source: `src/services/analyticsService.js`

Confirmed behavior:

- Reads the Measurement ID from `import.meta.env?.VITE_GA_MEASUREMENT_ID`.
- Does not hardcode the real Measurement ID.
- Loads GA4 only when the build-time variable exists.
- Uses a single dynamic `googletagmanager.com/gtag/js` script insertion path.
- Prevents duplicate initialization with `gaInitialized`.
- Keeps `send_page_view: false` to avoid duplicate automatic plus manual page views.
- Sends manual `page_view` through the same tracking service on route load.
- Filters sensitive keys before analytics normalization: `name`, `email`, `phone`, `message`, `requestdetails`, `details`.
- Sends first-party `/api/track-event` and GA4 events in non-blocking paths; failures are caught and do not block navigation, quote submission or contact actions.

Safe improvement made:

- Debug mode now logs event timestamp and whether `window.gtag` was available.
- Debug mode remains disabled unless `VITE_ANALYTICS_DEBUG=true`.
- Debug output still excludes names, phone numbers, emails and free-form messages.

## Event Wiring Matrix

| Expected GA4 event | Source event / mapping | Source file | Triggering user action | Key non-sensitive parameters |
| --- | --- | --- | --- | --- |
| `quote_submit` | `quote_form_submit_success` -> `quote_submit` | `src/App.jsx`, `src/services/analyticsService.js` | Successful quote or support form submission after backend success | `pageType`, `ctaLabel`, `ctaPosition`, `contactMethod`, `enquiryIntent`, `formName`, `formStep`, `formStatus`, IDs/reference from backend |
| `whatsapp_click` | `whatsapp_click` -> `whatsapp_click` | `src/App.jsx`, `src/services/analyticsService.js` | WhatsApp CTA click or support modal WhatsApp action | `clickedElement`, `ctaLabel`, `ctaPosition`, `contactMethod`, `enquiryIntent`, product/category context |
| `phone_click` | `phone_click` -> `phone_click` | `src/App.jsx`, `src/services/analyticsService.js` | `tel:` link click | `clickedElement`, `contactMethod`, product/category context |
| `email_click` | `email_click` -> `email_click` | `src/App.jsx`, `src/services/analyticsService.js` | `mailto:` link click | `clickedElement`, `contactMethod`, product/category context |
| `guide_click` | `guide_topic_clicked` alias -> `guide_click`; direct `guide_click` mapping exists | `src/App.jsx`, `src/services/analyticsService.js` | Guide topic/card/link click | `guideName`, `ctaLabel`, `ctaPosition`, `enquiryIntent` |
| `guide_view` | `guide_view` -> `guide_view` | `src/App.jsx`, `src/services/analyticsService.js` | Opening a guide route | `pagePath`, `guideName`, `pageType` |
| `location_view` | `location_view` -> `location_view` | `src/App.jsx`, `src/services/analyticsService.js` | Opening a location route or clicking a Contact location link | `pagePath`, `location`, `pageType`, CTA metadata |
| `cta_click` | `hub_click`, `contact_click`, `project_click`, `audience_pathway_click`, `category_click`, `product_click` -> `cta_click` | `src/App.jsx`, `src/services/analyticsService.js` | Product, project, category, quote and hub CTA clicks | `clickedElement`, `ctaLabel`, `ctaPosition`, `pageType`, `productCategory`, `enquiryIntent` |

## Page-View And SPA Navigation

Source: `src/App.jsx`

The main app route effect runs when `currentPath` or route metadata changes. It sends:

- `page_view` for each route view.
- `location_view` when the active route is a location route.
- `guide_view` when the active route is a guide route.

The effect is not tied to arbitrary state such as search text or form input, so it should not fire on every render. React Strict Mode is not enabled in `src/main.jsx`, reducing development-only duplicate effect risk. Production SPA route changes are expected to produce meaningful page views.

## Local Debug And Static Verification

Command added:

```bash
npm run analytics:verify
```

Result:

```text
Analytics event verification passed for 8 required GA4 custom events.
```

The script verifies:

- All eight required GA4 event names are mapped or referenced.
- Source wiring exists for each expected event.
- GA4 reads from `import.meta.env?.VITE_GA_MEASUREMENT_ID`.
- `index.html` does not contain a manual Google tag snippet.
- The analytics service has exactly one GA4 loader reference and one config call.
- `page_view` is explicitly mapped.
- `page_location` and `page_title` are present.
- Sensitive customer keys are listed in the sanitizer and do not appear in the GA4 payload block.

Additional temporary local build verification used a non-real Measurement ID and confirmed:

- The temporary ID appears once in local build output only.
- The Google tag loader is present.
- One config call is present.
- Page-view support, `page_location` and `page_title` are present.

No fake Measurement ID was committed.

## Production Network Verification

Production browser checks confirmed:

- Live homepage returns `200`.
- Live JavaScript contains one redacted GA4 Measurement ID.
- Live JavaScript contains one GA4 loader path.
- Live JavaScript contains one GA4 config call.
- No manual tag snippet appears in initial HTML.
- No duplicate loader was found in the live bundle.

Attempted network capture:

- In-app browser inspection could see the injected Google tag script element, but the read-only browser evaluation context did not expose page `dataLayer`, `gtag` or performance resource entries reliably.
- Temporary local headless browser DevTools and netlog capture attempts were unstable or did not expose GA collection traffic in this environment.
- Because of that environment limitation, this audit does not claim direct observed `google-analytics.com/g/collect` delivery for every custom event.

Required final manual confirmation:

1. Open GA4 Realtime or DebugView for the active Kleihaus property.
2. Open `https://www.kleihaus.com` in a normal browser profile with ad blockers/privacy extensions disabled.
3. Confirm an active user appears.
4. Trigger each event in the matrix.
5. Confirm the event names appear in Realtime/DebugView.

## Quote Event Safety

The source fires:

- `quote_form_submit_attempt` when a valid quote/support payload is submitted.
- `quote_form_submit_success`, mapped to GA4 `quote_submit`, only after `quoteRequestService.submitBackend(...)` returns `ok`.

This verification did not submit a production quote to avoid creating a misleading customer enquiry. Manual GA4 quote testing should use an owner-approved test enquiry clearly marked as an analytics test.

## Privacy Findings

No sensitive fields are intentionally sent to GA4:

- Names are filtered.
- Emails are filtered.
- Phone numbers are filtered.
- Messages/request details are filtered.
- GA4 receives only non-sensitive interaction metadata such as path, CTA label, position, contact method, enquiry intent, guide name, product category and device type.

The first-party backend event endpoint also runs through the sanitized analytics event object from the frontend, not raw quote form data.

## GA4 Reporting Interpretation

GA4 surfaces update at different speeds:

- Realtime is the fastest way to confirm an active user and recent event names.
- DebugView is best for development/debug sessions when debug mode or debug parameters are available.
- Standard reports can lag by hours and often require the right date range, dimension and event selection.
- Home/summary cards can show `0` even while Realtime has active users, especially soon after setup or when the card has not refreshed.

Given current evidence, a summary screen event count of `0` is most likely one of:

- Standard-report processing delay.
- Date-range or card behavior.
- Looking at the wrong property or stream.
- Browser/ad-blocking during the specific test session.
- Consent or property configuration outside the repo.

It should be treated as a repo-level defect only if GA4 Realtime/DebugView fails to show events after the latest deployed bundle is loaded in a normal browser without blockers.

## Fixes Made

- Added `scripts/verify-analytics-events.mjs`.
- Added `npm run analytics:verify`.
- Improved debug output in `src/services/analyticsService.js` with timestamp and `gtagAvailable`.
- Documented this verification in the changelog and project audit.

No Cloudflare configuration, DNS, routes, bindings, secrets, Worker architecture, manual Google tag, second GA4 loader, quote UX, WhatsApp behavior, SEO automation or forbidden schema was changed.

## Final Status

Classification: **Local wiring correct; production browser verification incomplete**

The repo-level custom-event implementation is wired correctly and now has an automated regression check. Live production is serving the single GA4 tag/config path. Direct GA4 collection delivery must be confirmed in GA4 Realtime/DebugView because local headless browser network capture was not reliable enough to claim observed `g/collect` delivery for each custom event.
