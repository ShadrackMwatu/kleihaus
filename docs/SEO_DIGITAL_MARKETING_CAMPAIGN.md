# Kleihaus SEO And Digital Marketing Campaign

Date: 2026-07-29

Scope: evidence-based SEO optimization and a 90-day digital marketing campaign for Kleihaus Ceramics, covering tiles, sanitaryware, kitchen sinks and mixers, paints, tile adhesives and grout, building and finishing tools, finishing advisory, delivery/logistics coordination, installation support and tailored product training.

Guardrails: no fake prices, stock, brands, branches, reviews, ratings, testimonials, delivery promises, warranties, completed-project claims or Product/Offer/Review/AggregateRating schema.

## Executive Summary

Kleihaus has a strong quote-led SEO base: route-specific metadata is live for important pages, the sitemap is generated from a shared route manifest, the website has category, guide, location, project and conversion pathways, and the recent Projects and Sanitaryware image updates provide genuine visual proof. The main remaining gap is audience-specific conversion clarity. The safest immediate improvement is one substantial `Trade & Projects` hub plus homepage audience pathways, rather than dozens of thin audience/location pages.

Implemented in this pass:

- Added `/trade-projects` for home builders, property developers, renovation contractors, interior designers, hardware dealers and homeowners.
- Added a homepage audience-pathway section linking each audience to the new hub, quote form and WhatsApp support.
- Added route metadata, sitemap coverage, breadcrumbs and generated route HTML for `/trade-projects`.
- Added privacy-safe `audience_pathway_click` tracking mapped to GA4 `cta_click`.
- Updated documentation, changelog, project audit and README.

## Baseline Audit

### Evidence Reviewed

- Repository files: `src/App.jsx`, `src/seoManifest.js`, `src/seoHtml.js`, `src/worker.js`, `src/services/analyticsService.js`, `public/robots.txt`, `public/sitemap.xml`, `package.json`, README and SEO/project documentation.
- Production checks on 2026-07-29: `https://www.kleihaus.com/`, `/sanitaryware`, `/projects` and `/sitemap.xml` returned HTTP 200 through Cloudflare. Production HTML for `/sanitaryware` and `/projects` contained route-specific titles, meta descriptions, canonicals, Open Graph/Twitter descriptions and safe route JSON-LD.
- Competitor/source review on 2026-07-29: Rangau Tiles, Twyford Tiles Kenya, Twyford Kenya, Zebra Ceramics, A&D Store, Epic Ceramic, Atmus Kenya, SAWANGA Investments, ZYNMIX/IZOMIX, MZITO and Rose Hardware.

### Strengths

- Route coverage includes products, locations, service-location pages, guides and projects.
- Titles, meta descriptions, canonical URLs, Open Graph and Twitter/X tags are generated consistently from `src/seoManifest.js`.
- `robots.txt` and `sitemap.xml` are present, and the build regenerates the sitemap.
- Conservative schema strategy is appropriate for a quote-led catalogue: Organization/LocalBusiness, WebSite, WebPage/CollectionPage, BreadcrumbList, Service, FAQPage and ItemList are used where supported.
- Conversion paths include quote form, WhatsApp, telephone, email, social profile links and mobile sticky actions.
- Projects and Sanitaryware galleries now use genuine repository images with visible-content-only copy.
- Analytics is privacy-safe and supports first-party events plus optional GA4.

### Gaps And Risks

- Audience journeys were implied across the site but not organized into a clear hub for developers, contractors, designers, dealers and homeowners.
- Product discovery remains category-led, with limited room/use-case filtering.
- Trust proof still depends on owner-provided evidence: verified business hours, showroom details, product brands, stock practices, warranties, delivery areas, project approvals and genuine customer reviews.
- Some older imagery remains larger than ideal; current build size is acceptable but should be monitored after each gallery expansion.
- External SEO actions, including Google Business Profile updates, citation consistency, Search Console review and paid campaigns, require owner account access.

### Priority Actions

High priority:

- Launch `/trade-projects` and homepage audience pathways. Completed.
- Add owner-verified business hours, showroom/location details, delivery areas and response expectations.
- Add genuine GBP posts and approved project/gallery photos.
- Review Search Console queries monthly and update titles/copy based on real impressions and CTR.

Medium priority:

- Add a contractor/project quote checklist guide if Search Console or enquiries show repeated bulk/project intent.
- Add room/use-case discovery filters when real product taxonomy is available.
- Add genuine case studies only after customer/project approval.

Low priority:

- Consider route-level code splitting after field performance data.
- Replace or prune older heavy images as safer optimized versions become available.

## Keyword-To-Page Map

| Keyword group | Search intent | Target page |
| --- | --- | --- |
| tiles Kenya, tiles Nairobi, floor tiles Kenya | Commercial/local | `/tiles`, `/floor-tiles`, `/tiles-nairobi` |
| wall tiles, kitchen tiles, bathroom tiles | Commercial/inspiration | `/wall-tiles`, `/bathroom-tiles`, `/bathroom-renovation-guide` |
| sanitaryware Kenya, toilets basins taps showers | Commercial/local | `/sanitaryware`, `/sanitaryware-nairobi`, `/sanitaryware-kenya` |
| kitchen sinks and mixers Kenya | Commercial/inspiration | `/sanitaryware`, `/trade-projects`, `/projects` |
| paints Kenya, interior paint, exterior paint | Commercial/informational | `/paints`, `/paint-selection-guide`, `/paints-makueni` |
| tile adhesive Kenya, tile grout, installation materials | Commercial/technical | `/adhesives-grout`, `/adhesive-grout-guide`, `/installation-support` |
| tile quantity, renovation budget, finishing quote | Informational/lead | `/tile-buying-guide`, `/cost-estimation-guide`, `/bathroom-renovation-guide` |
| developer tile supplier, contractor finishing materials, hardware dealer supply | Trade/project | `/trade-projects`, `/installation-support`, `/projects` |
| tiles Machakos, sanitaryware Makueni, paints Nairobi | Local commercial | Existing service-location pages |

Avoided: repetitive doorway pages such as `/tiles-for-homeowners-nairobi`, `/tiles-for-contractors-machakos` and similar thin combinations.

## Audience And Messaging Matrix

| Audience | Principal need | Message | Primary CTA | Landing destination |
| --- | --- | --- | --- | --- |
| Home builders | Quantities, durability, budgeting, coordinated delivery | Plan tiles, sanitaryware, paints and installation essentials before requesting a quote. | Request home-build quote | `/trade-projects#home-builders` |
| Property developers | Volume supply, specifications, consistency, coordination | Prepare project quotations around repeatable finishes and site logistics. | Request project quote | `/trade-projects#property-developers` |
| Renovation contractors | Suitable materials, fast quote details, accessories | Share room, measurement and accessory details for practical renovation support. | Request contractor support | `/trade-projects#renovation-contractors` |
| Interior designers | Finishes, colours, visual inspiration, specifications | Coordinate tiles, sinks, sanitaryware and paints into client-ready palettes. | Discuss finish palette | `/trade-projects#interior-designers` |
| Hardware dealers | Trade supply, range, repeat enquiries | Open a trade conversation around finishing materials and customer support needs. | Start trade enquiry | `/trade-projects#hardware-dealers` |
| Homeowners | Simple guidance, measurements, trusted enquiry path | Share your room, preferred look, location and quantity for clear quote guidance. | Request homeowner quote | `/trade-projects#homeowners` |

## Competitor Benchmark

Reviewed sources on 2026-07-29:

| Source | URL | Observed positioning |
| --- | --- | --- |
| Rangau Tiles | `https://rangautiles.com/` | Wall tiles, floor tiles, cement/adhesives, sanitaryware, tips and FAQs. |
| Twyford Tiles Kenya | `https://twyfordtilekenya.com/` | Tiles, paints, taps, sinks, specialty products, delivery and quote requests. |
| Twyford Kenya | `https://twyford.co.ke/` | Kenya presence, tiles, sanitaryware, hardware and showroom contact. |
| Zebra Ceramics | `https://zebraceramicsltd.co.ke/` | Product catalogue including kitchen sinks, sanitaryware, adhesives and grout. |
| A&D Store | `https://www.aanddstore.co.ke/category/tile-and-sanitary` | Ecommerce filters, prices and checkout for tile and sanitary products. |
| Epic Ceramic | `https://epicceramic.com/` | Premium experience center for tiles, sanitaryware, kitchens and wider interiors. |
| Atmus Kenya | `https://atmuskenya.com/` | Tiles, sanitaryware, kitchens, doors, tools and broader interior products. |
| SAWANGA Investments | `https://www.sawangainvestments.com/` | Finishing products and developer-oriented supply language. |
| ZYNMIX/IZOMIX | `https://zynmix.com/` | Tile adhesives, grout, fillers, finishes and technical/project positioning. |
| MZITO | `https://www.mzito.build/` | Building essentials, adhesives, grout, technical support and distribution. |
| Rose Hardware | `https://rosehardwareltd.co.ke/our-products/` | Hardware categories plus sanitaryware, flooring, paint and construction accessories. |

Implications for Kleihaus:

- Compete with clearer quote preparation, local service-area relevance and audience-specific support, not unsupported price or stock claims.
- Use genuine project/gallery assets to offset competitors with larger catalogues.
- Strengthen trade/project language because several competitors target developers, contractors or distributors directly.

## 90-Day Campaign Plan

### Objectives And KPIs

- Increase qualified organic enquiries from the six priority audiences.
- Improve visibility for tiles, sanitaryware, sinks/mixers, paints, adhesives/grout and project-support searches.
- Raise quote quality by encouraging measurements, product category, quantity, location and project context.
- KPIs: organic sessions, Search Console clicks/impressions/CTR, `/trade-projects` visits, audience-pathway clicks, WhatsApp clicks, phone/email clicks, quote starts, quote successes, project-gallery engagement and GBP website visits.

### Month 1: Foundation And Audience Launch

- Promote `/trade-projects` through homepage pathways, footer guide links and organic social posts.
- Publish GBP posts introducing trade/project support, sanitaryware sink/mixer imagery and project-gallery inspiration.
- Review Search Console and GA4 setup; mark quote success, WhatsApp, phone and audience-pathway events as key events where appropriate.
- Prepare owner-approved business facts: hours, location details, delivery areas, brands, warranties and response expectations.

### Month 2: Content And Local Demand

- Create one substantial contractor/project quote checklist guide if enquiries justify it.
- Refresh local GBP posts for Nairobi, Machakos and Makueni without creating fake branches.
- Promote project gallery and sanitaryware sink/mixer gallery on Facebook, Instagram and LinkedIn.
- Build citation list for consistent NAP details after owner confirmation.

### Month 3: Conversion And Paid Testing

- Test small paid campaigns only after owner approval and budget confirmation.
- Review search terms and add negative keywords.
- Compare conversion by audience pathway, product category and channel.
- Plan next content from Search Console query gaps and real enquiry patterns.

## Organic Content Calendar

| Week | SEO/content task | Social/GBP task |
| --- | --- | --- |
| 1 | Announce Trade & Projects hub | GBP post: trade/project quote support |
| 2 | Refresh internal links from guides to `/trade-projects` if data supports it | Instagram/Facebook post: kitchen sinks and mixers |
| 3 | Draft contractor quote checklist | LinkedIn post: developer and contractor planning |
| 4 | Review Search Console query gaps | GBP Q&A seed based on real customer questions |
| 5 | Expand paint or adhesive guide examples | Facebook post: paint and tile matching |
| 6 | Add owner-approved delivery/service-area notes | GBP post: Nairobi/Machakos/Makueni support |
| 7 | Prepare genuine case-study template entries if approved | Project-gallery social carousel |
| 8 | Review CTR and title opportunities | WhatsApp broadcast draft for opt-in contacts |
| 9 | Publish checklist guide if approved | LinkedIn post: hardware dealer/trade enquiry |
| 10 | Update FAQs from real enquiries | GBP post: how to request a better quote |
| 11 | Review image performance and gallery engagement | Instagram post: bathroom and kitchen finishes |
| 12 | Monthly SEO report and next roadmap | Summary post: what Kleihaus supports |

## Paid Media Structure

Google Search campaigns:

- Campaign 1: Tiles and bathroom finishes. Ad groups: floor tiles, wall tiles, bathroom tiles, tiles Nairobi/Machakos/Makueni.
- Campaign 2: Sanitaryware and sinks. Ad groups: sanitaryware, toilets/basins, kitchen sinks, mixers/taps.
- Campaign 3: Paints and installation materials. Ad groups: paints, tile adhesive, grout, installation support.
- Campaign 4: Trade and projects. Ad groups: contractor supplies, developer materials, hardware dealer supply.

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
utm_content=audience_home_builders|audience_developers|gallery_kitchen|guide_quote_checklist
```

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
- Support for homeowners, contractors, developers, designers and hardware dealers.

Social post draft:

```text
Planning a home build, renovation or finishing project? Kleihaus supports quote-led enquiries for tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout and tools. Share your room details, quantity, finish preference and location so the team can guide the next step.
```

WhatsApp campaign draft:

```text
Hello from Kleihaus Ceramics. We now have a clearer Trade & Projects pathway for home builders, contractors, developers, designers, hardware dealers and homeowners. Reply with your product list, quantity, location and timing if you would like quote guidance.
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

Added in this pass:

- `audience_pathway_click`, mapped to GA4 `cta_click`.

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

## External Actions And Owner Inputs Required

- Confirm business hours, physical/showroom location wording, delivery areas and service limits.
- Confirm product brands, availability practices, warranty/returns policy and trade terms.
- Provide owner-approved project photos, customer permissions and any real case-study facts.
- Verify Google Business Profile, Search Console and GA4 access.
- Approve ad budgets, targeting, negative keywords and campaign copy before launch.
- Provide review request link/QR code from the verified Google Business Profile.

## Deferred Recommendations

- Do not add product ecommerce pages until Kleihaus can maintain truthful prices, stock and availability.
- Do not add Product/Offer/Review/AggregateRating schema.
- Do not create standalone audience-location doorway pages unless real content and demand justify them.
- Do not claim fastest delivery, cheapest prices, official brands or completed installations without evidence.
