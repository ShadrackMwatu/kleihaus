# Kleihaus Analytics And Search Console Setup

Date: 2026-06-25

This guide covers the remaining post-Phase 1 analytics and Google Search Console configuration steps for the live Kleihaus website.

Production architecture:

```text
GitHub main
-> Cloudflare Workers Builds
-> Worker Assets
-> Worker "kleihaus"
-> https://www.kleihaus.com/
```

Active API endpoint:

```text
/api/quote-request
```

Do not commit real Google Analytics or Search Console verification secrets to the repository.

## GA4 Readiness

The frontend supports optional Google Analytics 4 through this Vite build-time environment variable:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The example above shows the expected format only. Use the real Measurement ID issued by the official Kleihaus GA4 property.

Current behavior:

- If `VITE_GA_MEASUREMENT_ID` is present during the Cloudflare Workers Builds build, the site loads GA4.
- If it is absent, GA4 is not loaded.
- Missing GA4 configuration does not create console errors.
- GA4 failures do not block quote submission, WhatsApp links, phone links, email links or first-party journey tracking.
- First-party anonymous journey events still go to `/api/track-event`.

## Configure GA4 In Cloudflare Workers Builds

Add the real GA4 Measurement ID in the Cloudflare project/build environment that runs the GitHub connected Worker build.

Recommended Cloudflare path:

1. Open Cloudflare Dashboard.
2. Select the Kleihaus account.
3. Go to Workers & Pages.
4. Open Worker `kleihaus`.
5. Open Settings.
6. Find build/deployment environment variables for Workers Builds.
7. Add:

```env
VITE_GA_MEASUREMENT_ID=<real GA4 Measurement ID>
```

8. Save.
9. Trigger a new production build from `main`.
10. Verify the deployed JavaScript includes GA4 only after the variable is configured.

Do not add the GA4 Measurement ID to source files, `README.md`, `.env.example` or docs.

## Optional Analytics Debug Mode

For local or temporary build debugging, the repo supports:

```env
VITE_ANALYTICS_DEBUG=true
```

Debug behavior:

- Disabled by default.
- Logs `KLEIHAUS_ANALYTICS_DEBUG` in the browser console.
- Logs only non-sensitive metadata: event name, GA event name, page path, clicked element, product/category and UTM source.
- Does not log names, phone numbers, email addresses or customer messages.
- Should remain blank or false in production unless temporarily debugging a deployment.

## GA4 Event Verification Checklist

Use GA4 DebugView or Realtime after the real Measurement ID is configured and deployed.

| Event | User action | Where to test | Expected GA4 result |
| --- | --- | --- | --- |
| `quote_submit` | Submit the quote form successfully. | Homepage Quote panel or Contact section. | Event appears after backend confirms successful email-channel quote submission. |
| `whatsapp_click` | Click a WhatsApp CTA. | Header, hero, footer, mobile sticky CTA or support modal "Chat on WhatsApp". | Event appears with CTA/source metadata before same-tab WhatsApp navigation. |
| `phone_click` | Click a phone link. | Top bar, Contact section or footer. | Event appears with phone CTA source metadata. |
| `email_click` | Click an email link. | Top bar, Contact section or footer. | Event appears with email CTA source metadata. |
| `guide_click` | Click a guide or planning topic. | Buying Guide & FAQs or guide-related links. | Event appears with guide/topic metadata. |
| `guide_view` | Open a guide route. | `/tile-buying-guide`, `/bathroom-renovation-guide`, `/paint-selection-guide`, `/adhesive-grout-guide`, `/installation-best-practices`, `/cost-estimation-guide`. | Event appears with route path and guide category. |
| `location_view` | Open a location hub. | `/locations/nairobi`, `/locations/machakos`, `/locations/makueni`. | Event appears with route path and location category. |
| `cta_click` | Click tracked generic CTA events. | Category cards, quote CTAs and contact actions. | Event appears with CTA source metadata where mapped from first-party events. |

Troubleshooting:

- If no events appear, confirm the production build was created after `VITE_GA_MEASUREMENT_ID` was added.
- Confirm the value is available to the build environment, not only to runtime Worker variables.
- Confirm browser extensions are not blocking GA.
- Confirm the browser console has no `KLEIHAUS_ANALYTICS_DEBUG` errors if debug mode is enabled.
- Confirm first-party `/api/track-event` responses return success so local journey tracking still works.

## Google Search Console Setup

Recommended property:

```text
https://www.kleihaus.com/
```

Setup steps:

1. Open Google Search Console.
2. Add the URL-prefix property for `https://www.kleihaus.com/`.
3. Verify ownership.
4. Use the existing HTML verification file only if Google issues the matching filename/content.
5. If using a meta-tag method, add the real meta tag to `index.html` only after Google provides it.
6. Do not commit fake placeholder verification tags.
7. Submit the sitemap:

```text
https://www.kleihaus.com/sitemap.xml
```

8. Use URL Inspection for key routes.
9. Request indexing for important pages after deployment.
10. Monitor Pages, Sitemaps, Search Performance and Enhancements reports.

Current crawler files:

- `public/robots.txt` allows crawling and points to `https://www.kleihaus.com/sitemap.xml`.
- `public/sitemap.xml` lists homepage, category pages, location hubs, service-location pages and guide pages.
- `public/google1e52ed9d448e7c74.html` exists. Treat it as real only if it matches the active Search Console property verification file.

## Indexing Verification Checklist

Use Search Console URL Inspection for these routes.

Homepage:

- `https://www.kleihaus.com/`

Core product/service pages:

- `https://www.kleihaus.com/tiles`
- `https://www.kleihaus.com/floor-tiles`
- `https://www.kleihaus.com/wall-tiles`
- `https://www.kleihaus.com/bathroom-tiles`
- `https://www.kleihaus.com/sanitaryware`
- `https://www.kleihaus.com/paints`
- `https://www.kleihaus.com/adhesives-grout`
- `https://www.kleihaus.com/installation-support`

Location hubs:

- `https://www.kleihaus.com/locations/nairobi`
- `https://www.kleihaus.com/locations/machakos`
- `https://www.kleihaus.com/locations/makueni`

Main category-location pages:

- `https://www.kleihaus.com/tiles-nairobi`
- `https://www.kleihaus.com/tiles-machakos`
- `https://www.kleihaus.com/tiles-makueni`
- `https://www.kleihaus.com/sanitaryware-nairobi`
- `https://www.kleihaus.com/sanitaryware-machakos`
- `https://www.kleihaus.com/sanitaryware-makueni`
- `https://www.kleihaus.com/paints-nairobi`
- `https://www.kleihaus.com/paints-machakos`
- `https://www.kleihaus.com/paints-makueni`
- `https://www.kleihaus.com/installation-support-nairobi`
- `https://www.kleihaus.com/installation-support-machakos`
- `https://www.kleihaus.com/installation-support-makueni`

Guide pages:

- `https://www.kleihaus.com/tile-buying-guide`
- `https://www.kleihaus.com/bathroom-renovation-guide`
- `https://www.kleihaus.com/paint-selection-guide`
- `https://www.kleihaus.com/adhesive-grout-guide`
- `https://www.kleihaus.com/installation-best-practices`
- `https://www.kleihaus.com/cost-estimation-guide`

For each inspected URL, confirm:

- URL is allowed by robots.
- Canonical is `https://www.kleihaus.com/...`.
- Page is indexed or eligible for indexing.
- Rendered HTML shows the expected visible content.
- No Product or Offer structured data warnings appear.
- Sitemap discovery works.

## Ongoing Monitoring

Monthly checks:

- Search Console performance by query, page and country.
- Pages indexed vs submitted.
- Sitemap fetch status.
- Top organic landing pages.
- Quote submissions by landing page from first-party journey data.
- GA4 conversions for quote, WhatsApp, phone, email, guide and location events.

Keep personal contact details out of analytics tools unless there is a reviewed consent and privacy policy process.
