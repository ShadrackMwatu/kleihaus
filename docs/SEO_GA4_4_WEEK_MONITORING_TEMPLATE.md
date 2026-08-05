# Kleihaus SEO And GA4 4-Week Monitoring Template

Start date: TBD

Do not invent values. Fill this template only from Google Search Console, GA4, Google Business Profile, first-party quote records and verified contact-event reports.

## Weekly Cadence

- Run `npm run seo:verify-production` after every deployment and once per week.
- Check Search Console once per week for indexing, sitemap and query movement.
- Check GA4 Realtime and DebugView after deployment, then standard GA4 reports weekly.
- Compare quote submissions, WhatsApp interactions, phone clicks and email clicks against landing pages.
- Record recommended action for the following week.

## Search Console Monitoring

Weekly checks:

- Indexed pages
- Excluded pages
- Sitemap processing status
- Crawl errors
- Page indexing issues
- Search impressions
- Clicks
- CTR
- Average position
- Top queries
- Top pages
- Location-related queries
- Guide-related queries

| Week | Metric | Current value | Previous value | Change | Interpretation | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
| Week 1 | Indexed pages | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Excluded pages | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Sitemap processed URLs | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Impressions | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Clicks | TBD | TBD | TBD | TBD | TBD |
| Week 1 | CTR | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Average position | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Indexed pages | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Excluded pages | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Sitemap processed URLs | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Impressions | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Clicks | TBD | TBD | TBD | TBD | TBD |
| Week 2 | CTR | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Average position | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Indexed pages | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Excluded pages | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Sitemap processed URLs | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Impressions | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Clicks | TBD | TBD | TBD | TBD | TBD |
| Week 3 | CTR | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Average position | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Indexed pages | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Excluded pages | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Sitemap processed URLs | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Impressions | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Clicks | TBD | TBD | TBD | TBD | TBD |
| Week 4 | CTR | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Average position | TBD | TBD | TBD | TBD | TBD |

## GA4 Monitoring

Traffic checks:

- Organic sessions
- Engagement rate
- Engaged sessions
- Average engagement time
- Landing pages
- Traffic source/medium
- GBP UTM traffic

| Week | Metric | Current value | Previous value | Change | Interpretation | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
| Week 1 | Organic sessions | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Engagement rate | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Engaged sessions | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Average engagement time | TBD | TBD | TBD | TBD | TBD |
| Week 1 | GBP UTM sessions | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Organic sessions | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Engagement rate | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Engaged sessions | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Average engagement time | TBD | TBD | TBD | TBD | TBD |
| Week 2 | GBP UTM sessions | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Organic sessions | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Engagement rate | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Engaged sessions | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Average engagement time | TBD | TBD | TBD | TBD | TBD |
| Week 3 | GBP UTM sessions | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Organic sessions | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Engagement rate | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Engaged sessions | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Average engagement time | TBD | TBD | TBD | TBD | TBD |
| Week 4 | GBP UTM sessions | TBD | TBD | TBD | TBD | TBD |

## GA4 Event Verification

| Event | Expected trigger | Where to test | Realtime verification | DebugView verification | Investigate if missing |
| --- | --- | --- | --- | --- | --- |
| `quote_submit` | Successful quote request submission after backend confirmation. | Homepage Contact quote form. | Event appears after form success. | Event includes quote form metadata and success status. | Confirm `VITE_GA_MEASUREMENT_ID`, backend success, `/api/quote-request`, blockers and event mapping. |
| `whatsapp_click` | Click a WhatsApp CTA. | Final Contact action or support modal. | Event appears before same-tab WhatsApp navigation. | Event shows `contactMethod=whatsapp`. | Confirm same-tab behavior, click handler and browser blockers. |
| `phone_click` | Click a telephone link. | Contact or footer phone link. | Event appears on click. | Event shows `contactMethod=phone`. | Confirm tel link and event handler. |
| `email_click` | Click an email link. | Contact or footer email link. | Event appears on click. | Event shows `contactMethod=email`. | Confirm mailto link and event handler. |
| `guide_click` | Click a guide card or guide link. | Homepage Guides or route related links. | Event appears on guide click. | Event includes guide/topic metadata. | Confirm CTA handler and route navigation. |
| `guide_view` | Open a guide route. | `/tile-buying-guide` and other guide routes. | Event appears after page load. | Event includes route path and guide name. | Confirm route detection and page-view effect. |
| `location_view` | Open a location route or click Contact location link. | `/locations/nairobi`, `/locations/machakos`, `/locations/makueni`. | Event appears after page load or click. | Event includes location metadata. | Confirm route exists, route data and click handler. |
| `cta_click` | Generic tracked CTA where mapped. | Product/category/project/solution CTAs. | Event appears on click where configured. | Event includes CTA label and position. | Confirm analytics mapping and user path. |

## Google Business Profile

| Week | Metric | Current value | Previous value | Change | Interpretation | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
| Week 1 | GBP views | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Website clicks | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Calls | TBD | TBD | TBD | TBD | TBD |
| Week 1 | Direction requests | TBD | TBD | TBD | TBD | TBD |
| Week 2 | GBP views | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Website clicks | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Calls | TBD | TBD | TBD | TBD | TBD |
| Week 2 | Direction requests | TBD | TBD | TBD | TBD | TBD |
| Week 3 | GBP views | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Website clicks | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Calls | TBD | TBD | TBD | TBD | TBD |
| Week 3 | Direction requests | TBD | TBD | TBD | TBD | TBD |
| Week 4 | GBP views | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Website clicks | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Calls | TBD | TBD | TBD | TBD | TBD |
| Week 4 | Direction requests | TBD | TBD | TBD | TBD | TBD |

## Lead And Contact Review

| Week | Quote submissions | WhatsApp interactions | Phone clicks | Email clicks | Best-performing pages | Pages losing visibility | Technical issues | Recommended actions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Week 1 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Week 2 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Week 3 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Week 4 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
