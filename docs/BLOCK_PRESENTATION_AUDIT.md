# Block presentation audit

Scope: current homepage blocks and shared product, guide, location, trade and project templates. Reviewed source plus Chromium at 390, 768 and 1440 pixels. This is a presentation audit, not independent verification of business claims.

## Block findings and decisions

| Block | Purpose and finding | Action |
| --- | --- | --- |
| Header and category navigation | Brand and product discovery are clear; horizontal category scrolling is intentional. | Retained navigation and labels. |
| Hero | Main offer is clear. Mobile indicators were stretched by a general button-height rule. | Separated small visual dots from stable touch targets; preserved rotation and accessible labels. |
| Service badges | Four badges occupied a five-column desktop grid. | Four equal desktop columns; no empty slot. |
| Product catalogue | Product-first content fits the block; padding differed from adjacent sections. | Aligned outer spacing to 24px mobile / 32px larger screens. Retained all images, categories and CTAs. |
| Applications | Intro described the block instead of helping a buyer. | Replaced it with room/surface selection context. |
| Homepage projects | Repeated editorial caveats distracted from the photographs. | Shortened to material details and neutral supplied/supported wording. |
| Audience pathways | Six established audience cards support self-selection. | Retained; distinct audience context is useful rather than unnecessary repetition. |
| About and values | Internal website-organization language replaced business value; 64px padding and larger heading interrupted the rhythm. | Customer-focused selection/planning copy; aligned section spacing, heading scale and body leading. Values retained. |
| Helpful guides / FAQs | Useful education and expandable answers; slightly compressed spacing. | Aligned outer spacing; preserved questions, answers and routing. |
| Contact / quote | Contact channels and form serve different needs. | Aligned outer spacing; preserved contact data, labels, submissions and WhatsApp behavior. |
| Product/guide/location hub heroes | Image layout left a tall, poorly balanced stack and unused space. | Explicit picture grid items and two fixed rows form one large image with two smaller images. |
| Category galleries | Responsive images, descriptive captions and source variants already exist. | Retained gallery inventory and image stories. Shared mosaic corrected above the gallery. |
| Trade hero and audience detail | Distinct procurement contexts are useful. | Shared mosaic corrected; no new commercial promises. |
| Project hero / gallery | Featured image left unused letterbox space; introduction repeated internal guardrails. | Filled the frame using object-fit: cover; full-image lightbox retained. Shortened intro to the pictured kitchen subject. |
| Guide detail / local FAQ / related links | Education, local planning and onward navigation are distinct purposes. | Retained content and structured-data relationships. Compact supporting sections keep a smaller spacing tier. |
| Main footer | Products, Services, Projects, Contact remain in the approved order. | Preserved brown background, width, social/contact links and navigation. Fixed duplicate React list keys for different labels sharing a destination. |
| Secondary footer | Products and project links repeated the main footer. | Removed the repeated groups; retained useful guide navigation and copyright/brand strip. |

## Spacing and photographs

Normal word spacing and zero heading/eyebrow letter spacing provide consistent typesetting. Main homepage sections use a common 24px/32px padding scale; compact supporting sections, cards, forms and navigation intentionally use smaller spacing. Uniformity means consistent roles, not identical padding on every component.

Photo mosaics use explicit grid items, a 4:3 overall frame, two equal rows, responsive sources and object-fit: cover. Thumbnails are cropped for presentation; originals remain intact and project lightboxes provide enlarged inspection. No files were deleted or recompressed.

## Validation

- Production build and SEO audit passed: 39 routes and 62 image groups.
- Chromium layout checks passed for eight representative routes at each of three widths: 24 route/viewport combinations. Checked H1 presence, overflow, broken loaded images, mosaic geometry, carousel selection, lightbox opening/Escape closing and JavaScript exceptions.
- Visual review confirmed compact mosaics and the mobile hero indicator correction.
- Static analytics verification passed. Fresh live GA4 run passed all nine expected events in 18 collect requests, one loader and one config call; quote success was mocked.
- Post-deployment results are reported separately; local screenshots remain ignored test artifacts.

## Remaining evidence needs

Premium credibility still depends on approved specifications, showroom/business photographs, location/hours, delivery terms and project context. The existing warehouse/showroom-style hero should not be treated as independent proof of a real physical facility: its provenance needs owner confirmation. No new imagery or business claims were created in this pass. Private reporting data and video rendering capability remain separate dependencies documented in PENDING_WORK_RECONCILIATION.md.
