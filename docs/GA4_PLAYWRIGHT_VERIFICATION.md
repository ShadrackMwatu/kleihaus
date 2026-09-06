# Kleihaus GA4 Playwright Production Verification

## 2026-09-06 reconciliation

Elevated Chromium now runs. The original test missed events in batched GA4 request bodies. The corrected parser reads every event name; outbound WhatsApp requests receive an intercepted 204 response so the source document stays available. Guide view is independently verified and soft event assertions allow later checks to run after a missing event.

Before the guide-navigation correction, the live run confirmed page_view, cta_click, whatsapp_click, phone_click, email_click, location_view, guide_view and quote_submit. Only guide_click was missing from GA4, although first-party tracking captured it. One initial GA4 loader was observed; config-call count was not asserted. Quote submission was intercepted with a local success response; no real enquiry was sent.

Helpful guide cards now use the existing internal route navigator after tracking, avoiding immediate document unload. Their content, URLs and styling are unchanged. Post-deployment verification is required to confirm guide_click delivery. This does not establish GA4 reporting ingestion or real quote backend delivery.

Verification date: 2026-08-06

Production URL: https://www.kleihaus.com

## Purpose

This document records the Playwright-based GA4 production verification added to the repository.

Command:

```bash
npm run analytics:e2e
```

## Events Tested

- `page_view`
- `cta_click`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `guide_click`
- `guide_view`
- `location_view`
- `quote_submit`

## Privacy Safeguards

- The test does not log full GA4 Measurement IDs.
- GA4 `tid` values are redacted in test memory.
- The test does not print names, phone numbers, emails, messages or quote details.
- Playwright trace capture is disabled so raw GA4 request URLs are not preserved in artifacts.
- External `tel:` and `mailto:` navigation is prevented in the browser before default navigation.
- WhatsApp is tested with a modified click and intercepted outbound navigation so the original production page remains alive long enough to capture GA4 requests.
- The production quote endpoint is intercepted by Playwright and fulfilled locally, so no real production quote request is submitted.

## Verification Method

The test opens the live production site, listens for:

- `googletagmanager.com/gtag/js`
- `google-analytics.com/g/collect`
- `analytics.google.com/g/collect`

It then performs safe user interactions and checks that each expected event name appears in a GA4 collection request through the `en` request parameter.

## Current Result

- Playwright package added: `@playwright/test`.
- Browser installed: Chromium only.
- Initial sandbox run failed with `spawn EPERM`; the approved escalated run launched Chromium and captured live production network traffic.
- Live production GA4 evidence before the repo fix captured `page_view`, `scroll`, `cta_click` and `quote_form_view` GA4 collect requests.
- The same live run captured the site's anonymous backend `/api/track-event` request for `whatsapp_click`, but did not capture a matching GA4 `whatsapp_click` collect request.
- Verified defect: outbound/contact events could be recorded by first-party analytics while missing from GA4 collection.
- Fix applied in `src/services/analyticsService.js`: existing GA4 events now include `send_to` for the configured Measurement ID, `transport_type: 'beacon'` and compact non-empty GA4 parameters for safer outbound-event delivery.
- Fix applied in `src/App.jsx`: the primary contact WhatsApp action now waits 350 ms after tracking before same-tab WhatsApp navigation so the custom GA4 event can flush.
- Local preview could not prove GA4 delivery because the real Measurement ID is injected through production deployment, not committed into the repository.

## Events Confirmed Before Fix

- `page_view`
- `cta_click`

## Events Not Confirmed Before Fix

- `whatsapp_click` was confirmed in backend tracking but not in GA4 collect.
- The remaining interaction checks were not executed in the failed pre-fix run because the test stops at the first missing required GA4 event.

## Limitations

- GA4 delivery can be affected by local browser privacy settings, network filtering, Google endpoint availability or consent/property settings outside the repo.
- This test proves browser-level collection requests were emitted from the live site when the test passes. It does not prove that GA4 standard reports have processed the events.
- `quote_submit` is verified through a mocked `/api/quote-request` response to avoid creating a real customer enquiry.
- A final all-event production pass requires the fixed bundle to be deployed before rerunning `npm run analytics:e2e` against https://www.kleihaus.com.
