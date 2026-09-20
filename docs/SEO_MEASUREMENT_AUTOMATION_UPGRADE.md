# SEO measurement and automation upgrade

Date: 2026-09-20

This upgrade preserves the existing SEO architecture and adds truth-preserving commercial measurement scaffolding.

## Implemented

- A bounded commercial keyword registry covering tiles, sanitaryware, kitchen sinks/mixers, paints, adhesives/grout/tools, tiling/installation, finishing/project procurement and Nairobi/Machakos/Makueni intent.
- Every keyword measurement field starts as null. No ranking, volume, click or CTR value is invented.
- A machine-readable automation registry classifies capabilities as fully automated/functioning, configured-not-verified, manual, missing, or external-access/human-approval-required.
- A weekly/monthly reporting contract covers rankings, impressions, clicks, CTR, organic traffic, enquiries, conversions, revenue/ROI when verified, technical health, content, backlinks, competitors and prioritized actions.
- Tests enforce the 100-keyword ceiling, uniqueness, null external measurements, external-access boundaries and verified-input ROI rule.

## Verified boundaries

Search Console performance import, GA4 Data API reporting, qualified-lead/customer outcomes and revenue attribution remain dependent on approved external/private access. Backlink publication, outreach sending and third-party changes remain human-authorized. Competitor intelligence remains editorial until an approved recurring external source is connected.

The daily production verifier remains configured for 04:00 UTC, plus relevant pushes and manual dispatch. Its execution history must be verified from GitHub Actions; configuration alone is not evidence of a successful run.

## Next safe integrations

1. Authorize read-only Search Console access and exact property identifier.
2. Authorize GA4 Data API access and numeric property ID.
3. Define a private CRM/outcome join for qualified/won leads and attributable revenue.
4. Add an approved rank/backlink/competitor provider only if Search Console does not meet the business need.
5. Keep outreach and third-party publication behind explicit human approval.
