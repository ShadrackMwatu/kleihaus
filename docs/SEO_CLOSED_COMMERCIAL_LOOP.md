# Closed Commercial SEO Feedback Loop

This upgrade provides the repository-controlled framework for:

Google demand → landing-page performance → organic traffic → enquiry → qualified lead → quote → customer → attributable revenue → ROI → SEO opportunity → reviewed optimization → validation → measurement.

## Safe default

All external connectors are inactive unless both an explicit enable variable and the required identifier/credential are present. Missing data stays null. The repository never fabricates rankings, leads, customers, revenue or ROI.

## External configuration

Store identifiers as GitHub Actions variables and credentials as GitHub Actions secrets. Never commit credentials.

Search Console:
- variable: `SEO_GSC_ENABLED=true`
- variable: `SEO_GSC_PROPERTY`
- secret: `SEO_GSC_CREDENTIALS_JSON`

GA4:
- variable: `SEO_GA4_ENABLED=true`
- variable: `SEO_GA4_PROPERTY_ID`
- secret: `SEO_GA4_CREDENTIALS_JSON`

Commercial outcomes:
- variable: `SEO_OUTCOMES_ENABLED=true`
- variable: `SEO_OUTCOMES_SOURCE`
- secret: `SEO_OUTCOMES_TOKEN`

The current implementation validates readiness and keeps these sources inactive. API-specific import adapters should only be enabled after the relevant account/property and data contract are authorized.

## Privacy and attribution

Search Console query data is aggregate and must never be treated as a customer identity. Private lead/customer records are not written to public SEO artifacts. Customer attribution should join only approved pseudonymous enquiry/session identifiers to business outcomes.

Supported business stages: NEW → QUALIFIED → QUOTED → WON/LOST.

## Intelligence rules

The engine can flag measured:
- high-impression / low-CTR pages;
- ranking positions 4–20 with existing clicks;
- organic traffic with zero enquiries;
- customer-producing pages with ranking headroom.

These are review recommendations, not permission to publish, contact third parties, purchase links, alter Google properties or make unsupported business claims.

## Automation

`.github/workflows/seo-commercial-feedback.yml` runs weekly at 04:30 UTC on Monday and can be manually dispatched. Until external sources are authorized it produces an inactive/readiness snapshot rather than fabricated performance data.
