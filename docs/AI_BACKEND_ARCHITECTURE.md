# Kleihaus AI Backend Architecture

## Public Frontend

The customer-facing website should stay focused on:

- Catalogue search and autocomplete suggestions
- Category navigation and product/category cards
- Inspiration galleries
- Quantity estimator
- Request quotation workflow
- WhatsApp and contact conversion
- Subtle public demand cues such as popular searches, trending ranges, and helpful matches

The public frontend must not display admin dashboards, raw event logs, internal analytics tables, ML scoring rules, LLM prompts, API keys, provider tokens, database credentials, or private operational intelligence.

## Backend / Service Layer

The current Phase 1 service layer is organized around:

- `src/services/analyticsService.js`: anonymized event capture for searches, category clicks, product interest, WhatsApp clicks, quotation requests, and contact submissions.
- `src/services/recommendationService.js`: customer-facing recommendation preparation plus internal category/search signal aggregation.
- `src/services/whatsappAlertService.js`: high-value action filtering and WhatsApp-ready alert payload preparation.
- `src/services/reportingService.js`: monthly management report summary preparation.
- `src/services/notificationService.js`: email and WhatsApp notification payload preparation.
- `src/services/llmInsightService.js`: intent classification and future LLM insight placeholders.
- `src/data/intelligenceData.js`: AI-ready data structures, category relationships, search suggestions, trending products, project-type signals, and inspiration data.

## Future Persistence

The frontend currently prepares privacy-preserving client-side events. A later backend can persist aggregated events in:

- Cloudflare Workers plus Cloudflare D1
- Supabase
- Another consent-aware database or warehouse

Recommended future flow:

1. Frontend captures anonymized behavioral events.
2. Frontend sends only allowed event payloads to `VITE_ANALYTICS_ENDPOINT`.
3. Cloudflare Worker validates, strips personal fields, and stores aggregate-safe records.
4. Monthly scheduled job summarizes trends and prepares reports.

## Monthly Email Reporting

Monthly reporting should include:

- Top Searches
- Emerging Demand Signals
- Most Requested Product Types
- County/Location Interest
- Most Clicked Categories
- High-Intent Customer Signals
- Weak Signals
- Inventory Recommendations
- Marketing Recommendations
- Supplier Recommendations

Reports should be sent to:

- `muthamimwatu@gmail.com`
- `sales@kleihaus.com`

These recipients should be configured through environment variables or backend secrets, not hardcoded into public frontend logic.

## Privacy Rules

- Anonymize visitor events.
- Exclude contact form personal fields from behavioral analytics unless explicit consent is added.
- Do not store names, emails, phone numbers, free-form messages, API keys, email passwords, WhatsApp tokens, LLM keys, or database credentials in frontend code.
- Keep prompts, scoring rules, procurement intelligence, and reporting jobs in backend/service layers.

## Environment Placeholders

Use placeholders only:

```env
VITE_ENABLE_ANALYTICS=false
VITE_ANALYTICS_ENDPOINT=
VITE_ENABLE_RECOMMENDATIONS=true
VITE_ENABLE_MONTHLY_REPORTS=false
VITE_MONTHLY_REPORT_RECIPIENTS=
VITE_MONTHLY_REPORT_ENDPOINT=
VITE_GA_MEASUREMENT_ID=
VITE_QUOTE_ENDPOINT=
```

Production secrets must be configured in the backend or deployment platform, never committed to the repository.
