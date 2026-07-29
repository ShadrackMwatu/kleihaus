# Kleihaus SEO And Digital Marketing Campaign

Date: 2026-07-29

Scope: evidence-based SEO optimization and a 90-day digital marketing campaign for Kleihaus Ceramics, covering tiles, sanitaryware, kitchen sinks and mixers, paints, tile adhesives and grout, building and finishing tools, finishing advisory, delivery/logistics coordination, installation support and tailored product training.

Guardrails: no fake prices, stock, brands, branches, reviews, ratings, testimonials, delivery promises, warranties, completed-project claims or Product/Offer/Review/AggregateRating schema.

## Executive Summary

Kleihaus has a strong quote-led SEO base: route-specific metadata is live for important pages, the sitemap is generated from a shared route manifest, the website has category, guide, location, project and conversion pathways, and the recent Projects and Sanitaryware image updates provide genuine visual proof. The main remaining opportunity is to turn broad product interest into audience-specific enquiry paths without creating thin doorway pages.

Implemented in this pass:

- Reused the existing `/trade-projects` hub instead of creating a duplicate route.
- Consolidated the website and campaign plan around six priority pathways: Homeowners, Home Builders, Contractors, Property Developers, Design Professionals, and Dealers & Institutional Buyers.
- Updated homepage pathway content, `/trade-projects` pathway cards, CTA labels and analytics payloads for the six consolidated audiences.
- Updated route metadata, generated sitemap/route HTML inputs and documentation while preserving the existing quote, WhatsApp, social, API, SEO and Cloudflare architecture.
- Kept schema conservative: no Product, Offer, Review or AggregateRating schema.

## Baseline Audit

### Evidence Reviewed

- Repository files: `src/App.jsx`, `src/seoManifest.js`, `src/seoHtml.js`, `src/worker.js`, `src/services/analyticsService.js`, `public/robots.txt`, `public/sitemap.xml`, `package.json`, README and SEO/project documentation.
- Production checks on 2026-07-29: `https://www.kleihaus.com/`, `/sanitaryware`, `/projects`, `/trade-projects` and `/sitemap.xml` returned HTTP 200 through Cloudflare.
- Production route evidence: `/trade-projects` already exists, so the safe choice was refinement of the current hub, not a duplicate `/who-we-serve` route.
- Competitor/source review on 2026-07-29: SAWANGA Investments, Rangau Tiles, Durahard, Parklands Hardware, Coast Metals Traders, Alamdar Enterprises, KK Empire Trades, MAS Group, Zebra Ceramics, Bicaputo Hardware, Rose Hardware, Paints & Hardware, Twyford Tiles Kenya and other Kenya finishing-material suppliers.

### Current Inventory

| Area | Status | Evidence | Decision |
| --- | --- | --- | --- |
| Audience hub | Existing and useful | `/trade-projects` route, metadata, sitemap entry and homepage links exist. | Improve in place. |
| Homepage audience block | Existing and useful | Six pathway cards exist but used older labels. | Consolidate to the requested six pathway names. |
| Category pages | Existing | Tiles, floor tiles, wall tiles, bathroom tiles, sanitaryware, paints, adhesives/grout and installation support are indexed in the route manifest. | Preserve and link from pathways. |
| Local pages | Existing | Nairobi, Machakos, Makueni hubs and service-location pages exist. | Preserve; improve later with owner-verified evidence. |
| Projects proof | Existing | `/projects` uses supplied genuine images and neutral wording. | Link from relevant pathways. |
| Analytics | Existing | `audience_pathway_click` maps to GA4 `cta_click`. | Preserve and enrich with clearer CTA labels. |
| Schema | Existing safe model | Organization/LocalBusiness, WebSite, WebPage, CollectionPage, BreadcrumbList, FAQPage, Service and ItemList patterns. | Preserve; do not add product/offer/review/rating schema. |

## Strengths

- Route coverage includes products, locations, service-location pages, guides, projects and a trade/project hub.
- Titles, meta descriptions, canonical URLs, Open Graph and Twitter/X tags are generated consistently from `src/seoManifest.js`.
- `robots.txt` and `sitemap.xml` are present, and the build regenerates the sitemap and route-specific HTML.
- Conservative schema strategy is appropriate for a quote-led catalogue.
- Conversion paths include quote form, WhatsApp, telephone, email, social profile links and mobile sticky actions.
- Projects and Sanitaryware galleries use genuine repository images with visible-content-only copy.
- Analytics is privacy-safe and supports first-party events plus optional GA4.

## Gaps And Risks

- Trust proof still depends on owner-provided evidence: verified business hours, showroom details, product brands, stock practices, warranties, delivery areas, project approvals and genuine customer reviews.
- Product discovery remains category-led, with limited room/use-case filtering.
- Local pages need more real local evidence over time so they do not become too templated.
- Competitors often show larger catalogues, ecommerce filters, multiple product lines or clearer trade/distributor language.
- External SEO actions, including Google Business Profile updates, citation consistency, Search Console review and paid campaigns, require owner account access.

## Keyword-To-Page Map

| Search theme | Audience | Intent | Primary page | Supporting page | Geographic relevance | CTA | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tiles Kenya, tiles Nairobi, floor tiles Kenya | Homeowners, Home Builders, Contractors | Commercial/local | `/tiles` | `/floor-tiles`, `/tile-buying-guide`, `/trade-projects#homeowners` | Kenya, Nairobi, Machakos, Makueni | Request quote | Existing |
| wall tiles, bathroom tiles, kitchen tiles | Homeowners, Design Professionals, Contractors | Commercial/inspiration | `/wall-tiles` | `/bathroom-tiles`, `/bathroom-renovation-guide`, `/projects` | Kenya and local hubs | View pathway / Request quote | Existing |
| sanitaryware Kenya, toilets, basins, taps, showers | Homeowners, Contractors, Property Developers | Commercial/local | `/sanitaryware` | `/sanitaryware-kenya`, `/sanitaryware-nairobi`, `/trade-projects` | Kenya, Nairobi, Machakos, Makueni | Request quote / WhatsApp support | Existing |
| kitchen sinks and mixers Kenya | Homeowners, Design Professionals, Contractors | Commercial/inspiration | `/sanitaryware` | `/projects`, `/trade-projects#design-professionals` | Kenya and local service pages | Discuss specifications | Existing |
| paints Kenya, interior paint, exterior paint | Homeowners, Contractors, Dealers & Institutional Buyers | Commercial/informational | `/paints` | `/paint-selection-guide`, `/paints-makueni` | Kenya, Makueni, Nairobi, Machakos | Request quote | Existing |
| tile adhesive Kenya, tile grout, installation materials | Contractors, Dealers & Institutional Buyers | Commercial/technical | `/adhesives-grout` | `/adhesive-grout-guide`, `/installation-support` | Kenya and project sites | Request contractor support | Existing |
| tile quantity, renovation budget, finishing quote | Homeowners, Home Builders | Informational/lead | `/cost-estimation-guide` | `/tile-buying-guide`, `/bathroom-renovation-guide`, `/trade-projects` | Kenya-wide | Request homeowner quote | Existing |
| new home finishing materials Kenya | Home Builders | Commercial/project | `/trade-projects#home-builders` | `/tiles`, `/sanitaryware`, `/paints`, `/projects` | Kenya, Nairobi, Machakos, Makueni | Request new-home materials quote | Improved |
| contractor finishing materials Kenya | Contractors | Trade/project | `/trade-projects#contractors` | `/installation-support`, `/adhesives-grout`, `/projects` | Kenya and service areas | Request contractor support | Improved |
| developer tile supplier Kenya, apartment finishing materials | Property Developers | Trade/project | `/trade-projects#property-developers` | `/tiles-kenya`, `/installation-support`, `/projects` | Kenya and future verified project areas | Request developer quote | Improved |
| interior designer tile specification Kenya | Design Professionals | Commercial/specification | `/trade-projects#design-professionals` | `/wall-tiles`, `/paint-selection-guide`, `/projects` | Kenya and project locations | Discuss specifications | Improved |
| wholesale tiles Kenya, hardware dealer sanitaryware, institutional finishing materials | Dealers & Institutional Buyers | Trade/institutional | `/trade-projects#dealers-institutional-buyers` | `/adhesives-grout`, `/tiles`, `/#contact` | Kenya-wide, subject to confirmed trade terms | Start trade or institutional enquiry | Improved |

Avoided: repetitive doorway pages such as `/tiles-for-homeowners-nairobi`, `/contractor-tiles-machakos`, `/developer-sanitaryware-makueni` and similar thin combinations.

## Audience And Messaging Matrix

| Audience | Included customer types | Principal need | Message | Primary CTA | Landing destination |
| --- | --- | --- | --- | --- | --- |
| Homeowners | Apartment owners, condo owners, landlords, rental-property owners, first-time buyers, self-builders, diaspora clients, bathroom/kitchen/living-room renovators | Simple product guidance, measurements, finishes, replacement planning and quote clarity | Share your room details, preferred look, quantity, location and timing so Kleihaus can guide the next quote step. | Request homeowner quote | `/trade-projects#homeowners` |
| Home Builders | New-home builders, retirement-home builders, rental-unit investors, owner-builders, gated-community clients, housing-cooperative members | Coordinated material planning across tiles, sanitaryware, paints and installation essentials | Plan home finishes before purchase decisions by clarifying quantities, finishes, logistics and support needs. | Request new-home materials quote | `/trade-projects#home-builders` |
| Contractors | General contractors, renovation contractors, tilers, plumbers, painters, flooring/waterproofing teams, kitchen/bathroom installers, fundis, foremen, supervisors, maintenance contractors | Practical product lists, accessories, delivery details and site guidance | Prepare cleaner client and site enquiries across tiles, sanitaryware, adhesives, grout, tools and paints. | Request contractor support | `/trade-projects#contractors` |
| Property Developers | Residential, commercial and mixed-use developers, apartments, gated communities, affordable/luxury housing, student housing, build-to-rent, industrial premises, property flippers, real-estate groups, SACCOs | Multi-unit specifications, consistent finishes, project quotes and phased supply conversations | Discuss repeatable finish selections and quotation needs without unsupported stock, price or delivery claims. | Request developer quote | `/trade-projects#property-developers` |
| Design Professionals | Architects, interior designers, decorators, kitchen/bathroom designers, quantity surveyors, project managers, engineers, consultants, specifiers, design-build teams, space planners | Specification-friendly finish coordination and client-ready options | Coordinate tiles, sinks, mixers, sanitaryware and paints into clear client review paths. | Discuss specifications | `/trade-projects#design-professionals` |
| Dealers & Institutional Buyers | Hardware stores, resellers, wholesalers, distributors, tile/sanitaryware/plumbing/paint retailers, hotels, offices, malls, factories, warehouses, facilities managers, schools, hospitals, NGOs, religious organizations, public-sector suppliers | Dealer/resale discussions, bulk quotes, institutional purchasing and maintenance supply needs | Start a trade, resale, facilities or institutional enquiry with the categories and quantities needed. | Start trade or institutional enquiry | `/trade-projects#dealers-institutional-buyers` |

## Competitor And Market Benchmark

Reviewed sources on 2026-07-29:

| Source | URL | Observed positioning | Kleihaus implication |
| --- | --- | --- | --- |
| SAWANGA Investments | `https://www.sawangainvestments.com/` | Finishing and building-material supply with project-oriented language. | Compete on quote preparation and clear audience pathways. |
| Rangau Tiles | `https://rangautiles.com/` | Tiles, sanitaryware, cement/adhesive categories, tips and FAQs. | Keep guide/category content practical and internally linked. |
| Durahard | `https://durahard.co.ke/about-company/` | Construction and hardware supply positioning. | Strengthen contractor and institutional language without fake terms. |
| Parklands Hardware | `https://www.parklands-hardware.co.ke/about-us` | Broad hardware and building supply positioning. | Use Kleihaus' focused finishing expertise as a differentiator. |
| Coast Metals Traders | `https://coastmetalstradersltd.co.ke/` | Hardware/building-material supply with institutional relevance. | Include institutional buyer pathway conservatively. |
| Alamdar Enterprises | `https://alamdarenterprises.com/` | Hardware, tools and construction materials. | Keep tools/adhesives/grout visible for trade searches. |
| KK Empire Trades | `https://kkempiretradesslimited.com/` | Construction materials and supplier language. | Use project quote support to capture B2B intent. |
| MAS Group | `https://www.masgroup.co.ke/` | Interior and construction materials with broader B2B orientation. | Strengthen design professional and developer routes. |
| Zebra Ceramics | `https://zebraceramicsltd.co.ke/` | Catalogue including kitchen sinks, sanitaryware, adhesives and grout. | Continue sanitaryware/sink imagery and category depth. |
| Bicaputo Hardware | `https://www.bicaputohardware.co.ke/` | Hardware categories and commercial supply language. | Keep trade enquiries easy from footer and hub. |
| Rose Hardware | `https://rosehardwareltd.co.ke/our-products/` | Hardware categories plus sanitaryware, flooring, paint and construction accessories. | Preserve broad finishing-material coverage. |
| Paints & Hardware | `https://paintshardware.co.ke/about-us/` | Paints and hardware ecommerce/category presence. | Improve paint guide and local paint pages after Search Console data. |

Implications for Kleihaus:

- Compete with clearer quote preparation, local service-area relevance and audience-specific support, not unsupported price or stock claims.
- Use genuine project/gallery assets to offset competitors with larger catalogues.
- Strengthen trade/project language because several competitors target developers, contractors, institutions or distributors directly.
- Avoid ecommerce claims until Kleihaus can maintain real prices, stock, delivery terms and product availability.

## On-Site Optimization Implemented

- The `/trade-projects` route now supports six consolidated pathways in this exact order: Homeowners, Home Builders, Contractors, Property Developers, Design Professionals, Dealers & Institutional Buyers.
- The homepage pathway block now uses the same six pathways and sends visitors to anchors on `/trade-projects`.
- Pathway CTAs now use more precise labels, such as `Request contractor support`, `Discuss specifications` and `Start trade or institutional enquiry`.
- Analytics events retain the existing `audience_pathway_click` event name and carry clearer `ctaLabel`, `ctaPosition`, `enquiryIntent` and `audienceSegment` values.
- Route metadata now describes the consolidated six-audience hub.

## 90-Day Campaign Plan

### Objectives And KPIs

- Increase qualified organic enquiries from the six priority audiences.
- Improve visibility for tiles, sanitaryware, sinks/mixers, paints, adhesives/grout and project-support searches.
- Raise quote quality by encouraging measurements, product category, quantity, location and project context.
- KPIs: organic sessions, Search Console clicks/impressions/CTR, `/trade-projects` visits, audience-pathway clicks, WhatsApp clicks, phone/email clicks, quote starts, quote successes, project-gallery engagement and GBP website visits.

### Month 1: Foundation And Audience Launch

- Promote `/trade-projects` through homepage pathways, footer guide links and organic social posts.
- Publish GBP posts introducing the six audience pathways and quote-preparation steps.
- Review Search Console and GA4 setup; mark quote success, WhatsApp, phone and high-intent CTA events as key events where appropriate.
- Prepare owner-approved business facts: hours, location details, delivery areas, brands, warranties and response expectations.

### Month 2: Content And Local Demand

- Create one substantial contractor/project quote checklist guide if enquiries or Search Console data justify it.
- Refresh GBP posts for Nairobi, Machakos and Makueni without creating fake branches.
- Promote project gallery and sanitaryware sink/mixer gallery on Facebook, Instagram and LinkedIn.
- Build a citation list for consistent NAP details after confirmed address/hours are available.

### Month 3: Conversion And Paid Testing

- Test small paid campaigns only after owner approval and budget confirmation.
- Review search terms and add negative keywords.
- Compare conversion by audience pathway, product category and channel.
- Plan next content from Search Console query gaps and real enquiry patterns.

## Organic Content Calendar

| Week | SEO/content task | Social/GBP task |
| --- | --- | --- |
| 1 | Announce six Trade & Projects pathways | GBP post: audience-specific quote support |
| 2 | Refresh internal links from guides to `/trade-projects` if data supports it | Instagram/Facebook post: kitchen sinks and mixers |
| 3 | Draft contractor quote checklist | LinkedIn post: contractor and developer planning |
| 4 | Review Search Console query gaps | GBP Q&A seed based on real customer questions |
| 5 | Expand paint or adhesive guide examples | Facebook post: paint and tile matching |
| 6 | Add owner-approved delivery/service-area notes | GBP post: Nairobi/Machakos/Makueni support |
| 7 | Prepare genuine case-study template entries if approved | Project-gallery social carousel |
| 8 | Review CTR and title opportunities | WhatsApp campaign draft for opt-in contacts |
| 9 | Publish checklist guide if approved | LinkedIn post: dealer and institutional enquiry |
| 10 | Update FAQs from real enquiries | GBP post: how to request a better quote |
| 11 | Review image performance and gallery engagement | Instagram post: bathroom and kitchen finishes |
| 12 | Monthly SEO report and next roadmap | Summary post: what Kleihaus supports |

## Paid Media Structure

Google Search campaigns:

- Campaign 1: Tiles and bathroom finishes. Ad groups: floor tiles, wall tiles, bathroom tiles, tiles Nairobi/Machakos/Makueni.
- Campaign 2: Sanitaryware and sinks. Ad groups: sanitaryware, toilets/basins, kitchen sinks, mixers/taps.
- Campaign 3: Paints and installation materials. Ad groups: paints, tile adhesive, grout, installation support.
- Campaign 4: Trade and projects. Ad groups: contractor supplies, developer materials, hardware dealer supply, institutional finishing materials.

Suggested negative keywords: free, jobs, careers, training college, pdf only, second hand, used, diy only, repair manual, salary, wholesale terms if not approved, warranty if not verified, cheapest, best, number one.

Meta campaigns:

- Awareness: project and sanitaryware gallery imagery.
- Consideration: guide snippets and category education.
- Enquiry: WhatsApp and quote CTAs to `/trade-projects`, `/sanitaryware`, `/tiles`, `/paints` and `/projects`.
- Retargeting: visitors to guides, projects and trade hub, with owner-approved consent and platform setup.

UTM convention:

```text
utm_source=google|facebook|instagram|linkedin|whatsapp|gbp
utm_medium=cpc|organic_social|organic|referral|whatsapp
utm_campaign=2026q3_trade_projects|2026q3_sanitaryware|2026q3_tiles|2026q3_paints
utm_content=audience_homeowners|audience_home_builders|audience_contractors|audience_developers|audience_design_professionals|audience_dealers_institutions
```

## Referral, Partnership And Influencer Strategy

Use only real relationships and owner-approved outreach. Do not imply endorsements before they exist.

| Partner type | Why it matters | Safe action |
| --- | --- | --- |
| Real estate agents and property managers | They meet owners planning repairs, sales preparation and rental upgrades. | Share quote-preparation links and offer a referral conversation without promising commissions unless approved. |
| Valuers, banks, mortgage brokers and insurers/loss assessors | They influence repair, renovation and property-readiness conversations. | Provide educational guides for renovation material planning. |
| Project managers, foremen and site supervisors | They translate specifications into purchase lists. | Promote contractor pathway and quote checklist. |
| Architects, designers and quantity surveyors | They specify finishes and prepare budgets. | Promote design professional pathway and project gallery. |
| Hardware dealers and resellers | They can create recurring trade enquiries. | Use dealer/institutional pathway and document trade terms only after confirmation. |
| Facilities managers and institutions | They buy for maintenance, refurbishments and multi-site needs. | Promote institutional enquiry steps with product categories and quantities. |
| Associations, training institutions and creator educators | They can build practical authority. | Offer useful, non-promotional guides; avoid fake partnerships. |
| Manufacturers/importers/suppliers | They can support topical authority and product education. | Seek verified product guidance or co-created educational content only after approval. |
| Previous customers | Real proof improves conversion. | Request permission for reviews, project photos and case studies; never fabricate. |

## Ready-To-Review Campaign Materials

Search headlines:

- Tiles and Finishing Materials Kenya
- Request Kleihaus Project Quote
- Sanitaryware, Sinks And Mixers
- Tile Adhesive And Grout Support
- Nairobi Machakos Makueni Finishes
- Trade And Project Supply Support

Search descriptions:

- Plan tiles, sanitaryware, paints, adhesives, grout and tools with Kleihaus quote support.
- Share measurements, product needs and location for practical finishing guidance.
- Support for homeowners, home builders, contractors, developers, designers, dealers and institutional buyers.

Social post draft:

```text
Planning a home build, renovation or finishing project? Kleihaus supports quote-led enquiries for tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout and tools. Share your room details, quantity, finish preference and location so the team can guide the next step.
```

WhatsApp campaign draft:

```text
Hello from Kleihaus Ceramics. We now have a clearer Trade & Projects pathway for homeowners, home builders, contractors, property developers, design professionals, dealers and institutional buyers. Reply with your product list, quantity, location and timing if you would like quote guidance.
```

Project-gallery promotion template:

```text
Explore selected kitchen finishing references featuring tiles, sinks, mixers, countertops and finishing support. Use the gallery to share the look you want, then request a similar quote from Kleihaus.
```

## Google Business Profile Checklist

- Confirm exact business name, primary category and service categories.
- Use tracked website URL: `https://www.kleihaus.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
- Add products/services only where owner can keep descriptions current.
- Add Nairobi, Machakos and Makueni as service-area focus without creating fake branches.
- Upload genuine showroom, product and project photos with no unsupported claims.
- Post weekly for projects, sanitaryware, tiles, paints, adhesives and quote guidance.
- Add Q&A based on real customer questions.
- Generate review link and QR code only from the verified GBP account.
- Request reviews ethically after genuine customer interactions; do not incentivize or fabricate reviews.
- Keep citations consistent after confirmed address/hours are available.

## Analytics Measurement Plan

Existing events to retain:

- `page_view`
- `category_click`
- `product_click`
- `project_click`
- `project_gallery_open`
- `guide_view`
- `guide_click`
- `quote_form_start`
- `quote_form_submit_success`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `social_click`
- `audience_pathway_click`

Recommended GA4 key events:

- `quote_submit`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `cta_click` filtered by high-intent `enquiry_intent`

Recommended reports:

- Acquisition by UTM campaign/source/medium.
- Landing page conversion by `/trade-projects`, `/projects`, product pages, guides and location pages.
- Audience pathway click-to-lead comparison.
- Product category interest versus quote submissions.
- GBP organic traffic and conversion path.

## Recommendations Intentionally Rejected Or Deferred

- Do not add product ecommerce pages until Kleihaus can maintain truthful prices, stock and availability.
- Do not add Product/Offer/Review/AggregateRating schema.
- Do not create standalone audience-location doorway pages unless real content and demand justify them.
- Do not claim fastest delivery, cheapest prices, official brands, exclusive partnerships or completed installations without evidence.
- Do not create fake local branches for Nairobi, Machakos or Makueni.
- Do not create fake testimonials, ratings, review markup or case studies.
- Do not launch paid media before owner approval of budget, targeting, landing pages, negative keywords and conversion measurement.

## External Actions And Owner Inputs Required

- Confirm business hours, physical/showroom location wording, delivery areas and service limits.
- Confirm product brands, availability practices, warranty/returns policy and trade terms.
- Provide owner-approved project photos, customer permissions and any real case-study facts.
- Verify Google Business Profile, Search Console and GA4 access.
- Approve ad budgets, targeting, negative keywords and campaign copy before launch.
- Provide review request link/QR code from the verified Google Business Profile.
