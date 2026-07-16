# Kleihaus Full Website Conversion Audit

Date: 2026-07-16

Scope: full repository and website audit focused on commercial effectiveness, customer acquisition and conversion. This audit reviews the current React/Vite/Tailwind website, route data, Cloudflare Worker metadata strategy, quote and support forms, WhatsApp/call/email paths, analytics, sitemap, structured data and documentation.

Guardrails: no fake reviews, ratings, prices, projects, partnerships, warranties, product availability or locations are assumed. Product, Offer, AggregateRating and Review schema remain excluded.

## A. Executive Summary

Kleihaus Ceramics now has a strong technical SEO foundation and a wide lead-generation surface: homepage, category routes, location routes, guide routes, WhatsApp actions, phone/email links, quote form, support modal, mobile sticky bar, sitemap automation, Worker-side metadata injection and privacy-conscious analytics. The site clearly communicates that Kleihaus sells tiles, sanitaryware, paints, adhesives, grout and installation support across Nairobi, Machakos and Makueni.

The main commercial gap is not discoverability alone; it is buyer confidence. Visitors can contact Kleihaus, but several blocks still need sharper reassurance about response expectations, delivery details, showroom/location specifics, payment methods, product brands, availability, warranties/returns and real project proof. These require owner input and real assets.

### Scores

| Area | Score |
| --- | ---: |
| Overall commercial effectiveness | 86/100 |
| Conversion readiness | 88/100 |
| Mobile conversion | 89/100 |
| Trust and credibility | 76/100 |
| Product discovery | 82/100 |
| Local SEO/customer acquisition | 88/100 |
| Measurement readiness | 88/100 |

### Ten Most Important Findings

1. The site has strong CTA coverage, but the quote form previously under-explained what to send and what happens after submission.
2. WhatsApp and phone paths are strong on mobile through header and sticky CTAs.
3. Trust proof is the largest gap: no verified testimonials, project case studies, business hours, exact showroom details, brand/supplier list, warranty or return guidance.
4. Product discovery is category-led and guide-led, but lacks filters by room, finish, size, color, budget, indoor/outdoor and project type.
5. Location targeting is broad and useful, but Nairobi, Machakos and Makueni need owner-confirmed delivery areas, nearby towns, directions and local project examples.
6. Guide pages now connect better to commercial enquiries, but future guide content should include calculators, checklists and more product-specific advice.
7. The quote form fields are lean and appropriate; the main improvement is guidance and response reassurance, not adding fields.
8. Analytics is privacy-conscious and now supports richer parameters for page type, CTA position, contact method, enquiry intent, form status and device type.
9. Technical SEO is strong after Worker metadata injection, sitemap automation and breadcrumbs.
10. The quickest path to more leads is not a redesign; it is sharper copy, clearer form reassurance, stronger location proof, and real business evidence.

## B. Complete Page And Block Inventory

| Route | Page | Block/component | Current purpose | Main issue | Commercial impact | Recommended improvement | Priority | Effort | Owner input |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| All | Global | Top strip | Shows service areas, email, phone | Hidden on mobile | Desktop trust only | Keep; mobile has sticky actions | P2 | Low | No |
| All | Global | Header logo/nav | Brand, navigation, search, WhatsApp | Desktop nav omits direct quote button | Some users may need quote path earlier | Add quote CTA to header on desktop later if space allows | P2 | Low | No |
| All | Global | Mobile header WhatsApp | Immediate mobile contact | Strong | Good mobile lead path | Preserve same-tab WhatsApp | P0 | None | No |
| All | Global | Category nav pills | Fast category discovery | No room/use-case grouping | Product discovery by category only | Add future room/use-case filters | P2 | Medium | No |
| All | Global | Search autocomplete | Helps product discovery | Suggestions not tied to availability | Can create expectation if stock unknown | Keep language as planning/search, not availability | P2 | Low | Owner for stock if expanded |
| / | Homepage | Hero carousel | First impression, product scope, CTAs | Value proposition is clear but proof-light | Strong acquisition start, limited trust proof | Add owner-confirmed response time and showroom proof later | P1 | Low/Medium | Yes |
| / | Homepage | Hero trust badges | Fast trust and service cues | Generic without evidence | Helps orientation but not proof | Link to support/process docs later | P2 | Low | Partial |
| / | Homepage | GBP support block | Converts Google/local visitors | Good, but depends on GBP owner action | Strong local conversion path | Update GBP profile URL externally | P1 | External | Yes |
| / | Homepage | Compact tabs | Dense access to catalogue/about/guidance/quote | Some users may not notice tabs | Efficient but can hide content | Keep first tab catalogue; consider quote tab highlight on mobile | P2 | Low | No |
| / | Homepage | Shop by category | Product discovery and quote path | Categories are broad | Strong early commercial block | Add future room/use-case landing pages | P2 | Medium | No |
| / | Homepage | Product catalogue | Product examples | No availability/brand/price cues | Good visual intent, weaker purchase confidence | Add current availability/brands only when confirmed | P1 | Medium | Yes |
| / | Homepage | Quantity estimator | Reduces quote friction | Tile-only, simple assumptions | Strong lead qualifier | Add "send this estimate" in future | P2 | Medium | No |
| / | Homepage | Project inspiration | Shows use cases | Not real case studies | Inspiration without proof | Replace/augment with real approved project case studies | P1 | Medium | Yes |
| / | Homepage | FAQs/guides | Research support | Good but could guide to quote faster | Helps informational visitors convert | Now supported by guide CTA block on guide routes | P1 | Done | No |
| / | Homepage | Contact/quote form | Main conversion form | Needed clearer guidance and next-step reassurance | Critical lead path | Implemented stronger guidance and messages | P0 | Done | No |
| / | Homepage | Footer | Links, contact, local SEO | Footer services are text-only | Useful but not primary | Add delivery/payment/returns links after owner input | P2 | Medium | Yes |
| /tiles | Category | Hero | Tile quote landing | Good broad relevance | Strong category acquisition | Add specific subcategory links over time | P2 | Low | No |
| /floor-tiles | Category | Hero/gallery | Floor tile focus | Needs finish/size/use-case filters | Good intent capture | Add future floor tile use-case sections | P2 | Medium | Maybe |
| /wall-tiles | Category | Hero/gallery | Wall tile focus | Kitchen/bath/feature wall could be clearer | Captures wall tile search intent | Add room-specific guidance | P2 | Low | No |
| /bathroom-tiles | Category | Hero/gallery | Bathroom tile planning | Good cross-link to sanitaryware | Good commercial intent | Add bathroom package planning later | P2 | Medium | Yes |
| /sanitaryware | Category | Gallery | Shows real uploaded sanitaryware images | No brands/availability | Strong visual confidence, limited purchase certainty | Add brand/stock notes only when confirmed | P1 | Low/Medium | Yes |
| /paints | Category | Paint planning | Clear paint use cases | No brand/coverage info | Converts planning, not product choice | Add paint brand/coverage guidance when confirmed | P2 | Medium | Yes |
| /adhesives-grout | Category | Install materials | Helps technical buyers | Could emphasize fundi/contractor needs | Good contractor relevance | Add contractor checklist | P2 | Medium | No |
| /installation-support | Category | Support/services | Communicates advisory/training | Needs clearer service boundaries | Reduces installation risk | Confirm actual installation/training availability by location | P1 | Low | Yes |
| Category routes | Shared | Breadcrumbs | Navigation and schema alignment | Good | Supports SEO/UX | Preserve | P1 | Done | No |
| Category routes | Shared | Quote planning block | Explains info to share | Good | Reduces form friction | Keep; add BOQ examples later | P2 | Low | No |
| Category routes | Shared | Galleries | Visual proof | Some images are generic older assets | Helps intent but not proof | Replace with owner-approved showroom/project images | P1 | Medium | Yes |
| Category routes | Shared | Sections/cards | Adds guidance | Some template similarity | SEO and conversion support | Continue unique examples per category | P2 | Medium | Partial |
| Category routes | Shared | Local support block | Bridges product to location | Strong | Good local lead path | Keep and track location clicks | P1 | Low | No |
| Category routes | Shared | Related links | Internal discovery | Strong after recent additions | Good journey continuation | Keep aligned with sitemap | P1 | Low | No |
| Location hubs | Nairobi/Machakos/Makueni | Hero/introduction | Local relevance | No exact address/directions/hours | Good SEO, incomplete visit planning | Add verified showroom/delivery details | P1 | Medium | Yes |
| Location hubs | Shared | FAQs | Local planning support | Good but proof-light | Reduces uncertainty | Add nearby towns and delivery questions after confirmation | P1 | Low | Yes |
| Service-location routes | Tiles/Sanitaryware/Paints/Installation + locations | Local product intent | Some generated structure remains similar | Good SEO coverage, potential thinness risk | Add real local examples and demand notes | P1 | Medium | Yes |
| Guide routes | Buying/cost/install guides | Educate visitors | Previously could end as research | Medium conversion risk | Implemented project planning CTA | P1 | Done | No |
| Guide routes | Related links | Commercial continuation | Improved local links | Good | Keep | P1 | Done | No |
| Support modal | Modal | Support/WhatsApp form | Immediate help | Needed clearer request examples | High-intent capture | Implemented clearer copy and tracking | P0 | Done | No |
| Mobile | Sticky actions | Immediate WhatsApp/quote | Strong | Critical mobile conversion | Preserve | P0 | None | No |
| Analytics | Services | First-party + optional GA4 | Could not fully answer funnel questions before parameter enrichment | Measurement gap | Implemented richer parameters | P1 | Done | No |
| Technical SEO | Worker/manifest | Metadata/sitemap/schema | Strong | Low risk | Supports acquisition | Preserve | P0 | None | No |

## C. Customer Journey Analysis

### Homeowner

Current: lands on homepage or category, sees products, browses gallery, uses WhatsApp or quote form.  
Proposed: homepage -> room/use case -> category guide -> quote form with measurements/photos -> follow-up by phone/WhatsApp.

### Contractor

Current: can find adhesives, grout, installation support and quote form.  
Proposed: contractor checklist page -> bulk/project quote CTA -> BOQ upload or text details -> phone follow-up.

### Property Developer

Current: can infer wholesale/project support but proof is limited.  
Proposed: developers page -> bulk tile/sanitaryware/paint planning -> delivery/logistics guidance -> project quote.

### Institutional Buyer

Current: not directly addressed except commercial/project language.  
Proposed: institutions landing section or page after owner confirms service scope, with procurement-friendly CTA and BOQ guidance.

### Reseller

Current: wholesale is mentioned, but reseller terms are not explained.  
Proposed: reseller/bulk enquiry path only after owner confirms reseller support, payment terms and product categories.

### Customer Seeking Installation Support

Current: installation support route and modal provide guidance.  
Proposed: installation checklist -> location support -> WhatsApp/call adviser -> quote or training/service discussion.

## D. Prioritised Recommendations

### P0: Critical Conversion Or Technical Failure

- Preserve mobile sticky WhatsApp and quote actions.
- Preserve same-origin quote endpoint and same-tab WhatsApp behavior.
- Keep quote form lean and accessible.
- Keep Worker metadata and sitemap generation intact.

### P1: High-Impact Customer Acquisition

- Add response expectation once owner confirms it.
- Add business hours and showroom/directions once verified.
- Add delivery areas, nearby towns and logistics details for Nairobi, Machakos and Makueni.
- Add brand/supplier information and availability cues only when confirmed.
- Publish real approved case studies and showroom/project photos.
- Add a contractor/project quote checklist page.
- Add room/use-case product discovery pages where content is distinct.

### P2: Important Optimisation

- Add product discovery filters by room, finish, size, color, indoor/outdoor, project type and budget band.
- Add "send this estimate" behavior to the quantity estimator.
- Add payment methods, warranty and returns guidance after owner input.
- Add formal browser accessibility/Lighthouse checks to release workflow.

### P3: Longer-Term Enhancement

- Guided quote builder for tiles, paints and sanitaryware.
- Monthly lead dashboard combining Search Console, GA4 and first-party events.
- A/B testing CTA labels after traffic volume grows.
- SSR/prerender only if Worker metadata injection proves insufficient.

## E. Quick Wins Implemented Immediately

- Improved quote form guidance to request measurements, location, timing, finish and budget details.
- Improved quote success/failure messages with clearer next steps.
- Improved support modal heading, prompt and WhatsApp tracking.
- Improved category/route CTA labels from generic help to quotation/adviser/local-question language.
- Added richer analytics parameters without adding duplicate event types.

## F. Owner-Input Requirements

| Needed item | Why it matters | Can implement without owner? |
| --- | --- | --- |
| Confirmed physical showroom/location details | Enables visits, map links and stronger local trust | No |
| Opening hours | Reduces contact uncertainty | No |
| Delivery areas and nearby towns | Improves local conversion and SEO | No |
| Response-time commitment | Reassures form submitters | No |
| Payment methods | Reduces purchase friction | No |
| Product brands/suppliers | Builds product trust | No |
| Availability/stock policy | Prevents false expectations | No |
| Price ranges or quotation bands | Helps budget qualification | No |
| Warranties | Builds confidence | No |
| Returns/replacement guidance | Reduces perceived risk | No |
| Showroom photographs | Improves trust and GBP | No |
| Completed-project photographs | Enables real case studies | No |
| Customer testimonials/reviews | Builds proof | No |
| Google Business Profile review link | Enables review workflow | No |

## G. Proposed Revised Page Structure

### Homepage

1. Header with search, categories, WhatsApp and quote path.
2. Hero: what Kleihaus sells, who it serves, primary quote/WhatsApp CTAs.
3. Trust/quick proof strip: locations, quote help, delivery, installation support.
4. Product category discovery.
5. Project support / what to send for quote.
6. Featured product groups.
7. Quantity estimator.
8. Real project/showroom proof when available.
9. Guides and FAQs.
10. Contact and quote form.
11. Footer.

### Product/Category Pages

1. Breadcrumb.
2. Category-specific H1 and product intent.
3. Quote/WhatsApp/call actions.
4. Gallery with descriptive labels.
5. What to share for a quotation.
6. Buying guidance and fit/use-case notes.
7. Location support.
8. Related guides and local service pages.
9. Final quote CTA.

### Location Hubs

1. Breadcrumb.
2. Local support headline.
3. Delivery/service-area explanation.
4. Product categories served locally.
5. Location-specific FAQs.
6. Links to local service pages.
7. Call/WhatsApp/quote CTAs.
8. Owner-confirmed address, hours, directions and nearby towns when available.

### Guide Pages

1. Breadcrumb.
2. Guide H1 and practical promise.
3. Key planning points.
4. Examples/checklists/calculators.
5. Project planning CTA.
6. Links to product categories and location pages.
7. Quote/WhatsApp CTA.

### Contact Section

1. Direct call, WhatsApp and email actions.
2. Quote form with guidance.
3. Reassurance about what happens next.
4. Location/service areas.
5. Owner-confirmed response time and hours when available.

## H. Proposed Content Rewrites

| Element | Current/weak pattern | Proposed replacement |
| --- | --- | --- |
| Hero H1 | Finish homes and projects with Kleihaus Ceramics. | Tiles, sanitaryware and paints for homes, contractors and projects. |
| Hero support copy | General product list | Send measurements, product type and location for practical quote guidance across Nairobi, Machakos and Makueni. |
| Primary CTA | Request quote | Request a quotation |
| WhatsApp CTA | WhatsApp inquiry | Ask on WhatsApp |
| Category CTA | Request quote | Request quotation for this category |
| Product card CTA | Request quote | Confirm availability and quotation |
| Guide CTA | Request quote | Request guide-based quote |
| Contact heading | Request a quote. | Request a quotation or talk to Kleihaus now. |
| Form intro | Quote requests are emailed... | Send your measurements, location and product needs. Kleihaus will review the request and respond by phone or email. |
| Form placeholder | Example: 32 m2... | Example: 32 m2 floor tiles, matte finish, delivery to Machakos, budget range, and whether installation guidance is needed. |
| Success message | Request sent successfully. | Request sent successfully. The Kleihaus team will review your details and respond by phone or email. |
| Error message | Please try again or call Kleihaus. | Please try again, call +254 748 827 166, or use WhatsApp for immediate help. |
| Location intro | Kleihaus support for Nairobi projects | Kleihaus helps Nairobi customers plan product choice, quantities, delivery and installation support for homes, apartments and project sites. |
| Delivery statement | Delivery support is planned... | Share delivery location, order size and site access so Kleihaus can advise the practical delivery plan. |
| Trust statement | Finishing partner | Product guidance, quantity planning, delivery coordination and installation support from first enquiry to handover. |

## I. Analytics Plan

### Lead Funnel

1. Landing/page view.
2. Product/category interest.
3. Guide/location engagement.
4. CTA click.
5. Quote/support form start.
6. Form submit attempt.
7. Submit success or error.
8. Contact method used: WhatsApp, phone, email or form.

### Recommended Events

| Event | Purpose | Key parameters |
| --- | --- | --- |
| `page_view` | Route-level engagement | `page_path`, `page_type`, `product_category`, `location`, `device_type`, `lead_source` |
| `category_click` | Product discovery | `product_category`, `cta_position`, `page_type`, `device_type` |
| `product_click` | Product interest | `product_name`, `product_category`, `cta_position` |
| `guide_view` | Informational content | `guide_name`, `page_path`, `device_type` |
| `location_view` | Local demand | `location`, `page_path`, `device_type` |
| `whatsapp_click` | Direct lead | `contact_method`, `cta_label`, `cta_position`, `enquiry_intent`, `product_category`, `location` |
| `phone_click` | Direct lead | `contact_method`, `cta_position`, `page_type` |
| `email_click` | Direct lead | `contact_method`, `cta_position`, `page_type` |
| `quote_form_start` | Form intent | `form_name`, `form_step`, `page_type` |
| `quote_form_submit_attempt` | Lead attempt | `form_name`, `form_status`, `enquiry_intent`, `location`, `product_category` |
| `quote_form_submit_success` | Conversion | `form_name`, `form_status`, `lead_source`, `device_type` |
| `quote_form_submit_error` | Friction | `form_name`, `form_status`, `reason`, `device_type` |

### Conversion Definitions

- Primary conversions: quote form success, WhatsApp click, phone click.
- Secondary conversions: email click, guide-to-quote CTA click, location support click.
- Diagnostic events: form start, submit error, search query, guide view.

## J. Implementation Roadmap

### Phase 1: Immediate Conversion Fixes

- Keep improved form guidance and clearer status messages.
- Add owner-confirmed response time near forms.
- Add desktop header quote button if layout allows.
- Add "send estimate" CTA to quantity estimator.
- Add payment/delivery reassurance after owner input.

### Phase 2: Trust And Product Discovery

- Add real showroom photos and project photos.
- Add brand/supplier list if confirmed.
- Add warranty and returns guidance.
- Add product discovery filters or sections by room, finish, size, color and project type.
- Add contractor/bulk quotation checklist.

### Phase 3: Local Acquisition And Content Growth

- Expand location hubs with nearby towns, delivery areas and local FAQs.
- Create distinct pages for commercially justified demand such as bathroom tiles in Nairobi, floor tiles in Machakos, paint suppliers in Makueni, bulk tile supply and contractor finishing materials.
- Publish approved project case studies.
- Keep GBP posts/photos/reviews active.

### Phase 4: Measurement, Testing And Optimisation

- Verify GA4/Search Console/GBP data.
- Review monthly report template.
- Compare WhatsApp, phone, email and quote-form conversion rates.
- Test CTA wording after enough traffic.
- Use Search Console queries to prioritize content updates.

## Commercial Landing Pages To Consider

Implement only where Kleihaus can provide distinct, useful content:

- Bathroom tiles in Nairobi.
- Floor tiles in Machakos.
- Kitchen tiles in Makueni.
- Sanitaryware suppliers in Nairobi.
- Toilet and basin suppliers in Machakos.
- Paint suppliers in Makueni.
- Tile adhesive and grout suppliers.
- Building-finishes supplier for contractors.
- Tiles and sanitaryware for property developers.
- Bulk tile supply.
- Bathroom renovation product packages.
- New-home finishing checklist.
- Rental-property finishing products.
- School, hotel, hospital or institutional finishing supplies.

## Verification Notes

This audit was followed by safe implementation work in the repository:

- Quote and support copy improvements.
- More specific CTA labels.
- Richer analytics parameters.
- No fake claims or unsupported business details.
- No Cloudflare configuration changes.
- No Product, Offer, AggregateRating or Review schema.

