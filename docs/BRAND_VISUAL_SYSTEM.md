# Kleihaus Visual System

## Tokens

Tailwind is the colour source of truth; shared CSS variables reference its tokens.

- Forest: #064E3B, major brand surfaces, headings and principal CTAs.
- Copper: #B87333, restrained borders and focus accents.
- Copper text: #895124, accessible small labels on light surfaces.
- Emerald action: #16A34A, reserved action token, not a general surface colour.
- WhatsApp: #075E54, recognizable dark WhatsApp green with white labels.
- Charcoal: #171717; ivory: #FAF8F3; white: #FFFFFF.
- Existing emerald/neutral utility families map to forest-tinted and warm-neutral shades centrally. Platform-specific social icon colours and semantic error/success colours remain distinct.

## Typography And Components

System Georgia/Cambria headings paired with the existing system sans-serif body. No font download or dependency added. Existing heading sizes and zero letter spacing remain.

Original logo retained with object-contain and a slightly larger fixed display size. Header dimensions and navigation structure remain compact. Hero copy adds Tiling; carousel timing and controls remain unchanged. A single charcoal overlay replaces layered gradients. Cards use 8px radii, restrained shadows and no hover lift. Footer and copyright band use forest rather than legacy brown and bright green. Primary buttons use forest with white text; secondary buttons use forest borders. WhatsApp destinations and analytics remain unchanged.

## Verification

Production build and generated SEO audit pass: 39 routes, 62 image groups. Node SEO regression suite: 11 passed. Static analytics: eight mappings passed. Rendered SEO audit: 39 routes, zero heading skips and zero unmapped destinations. Responsive checks cover 390, 768 and 1440px, category navigation, About disclosure, typography and safely intercepted quotation requests. No production enquiry is submitted.

Calculated contrast: forest/white 9.72:1; copper-text/ivory 6.06:1; warm muted text/white 5.35:1. Copper is not used for small text on white. Keyboard focus and logo object-fit are browser-tested. These are focused checks, not a claim of exhaustive WCAG certification. No live Core Web Vitals measurement or live GA4 delivery is inferred.

Image assets, routing, substantive copy, SEO schema, backend, contacts, dependencies and Cloudflare configuration are deliberately unchanged. Existing social brand colours are exceptions to the house palette. Dedicated image layout logic and reduced-motion support remain intact.
