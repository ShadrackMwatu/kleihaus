# Quote Backend Automation

Kleihaus Phase 2 quote automation moves the main quote form from browser-to-WhatsApp submission to a secure backend submission flow.

## Flow

1. Customer fills the quote form on the website.
2. Frontend validates name, contact detail and request details.
3. Frontend posts JSON to `https://api.kleihaus.com/quote-request`.
4. Cloudflare Pages Function validates and sanitizes the payload.
5. Backend inserts the inquiry into the D1 `quote_requests` table.
6. Backend sends the email notification through Resend.
7. Backend sends WhatsApp Business / Meta Graph API notification only when configured.
8. Customer sees: "Request submitted successfully. Our team will respond shortly."
9. If D1 or Resend fails, the backend returns `success: false` and the frontend shows the manual WhatsApp fallback message.

The separate "Chat on WhatsApp" button remains available as the manual fallback.

## Frontend Endpoint

The frontend posts to:

```text
https://api.kleihaus.com/quote-request
```

The fetch URL must use the permanent API domain, never a temporary preview deployment URL:

```js
fetch('https://api.kleihaus.com/quote-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name,
    email,
    phone,
    location,
    requestDetails,
  }),
})
```

The browser must not contain email API keys, SMTP passwords, WhatsApp tokens or database credentials.

## Request Payload

```json
{
  "name": "Customer name",
  "email": "customer@example.com",
  "phone": "+254...",
  "location": "Nairobi",
  "requestDetails": "Request details",
  "source": "kleihaus_website"
}
```

## Cloudflare Pages Function

Backend endpoint:

```text
functions/api/quote-request.js
```

The permanent API domain is served by the repo-based Worker entrypoint:

```text
src/api-worker.js
```

Worker deployment config:

```text
wrangler.api.toml
```

Production URL:

```text
https://api.kleihaus.com/quote-request
```

The function:

- accepts `POST` JSON;
- exports `onRequestPost(context)` for Cloudflare Pages Functions;
- validates required fields;
- sanitizes user input;
- generates a server timestamp and request ID;
- inserts into D1 table `quote_requests`;
- sends real email through Resend at `https://api.resend.com/emails`;
- skips WhatsApp unless WhatsApp Business Cloud API variables are configured;
- returns customer-safe JSON success only after D1 and Resend succeed.

## Backend Environment Variables

Configure these in Cloudflare Pages project settings, not in frontend code:

```env
RESEND_API_KEY=
QUOTE_EMAIL_TO=sales@kleihaus.com
QUOTE_EMAIL_FROM=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_TO_NUMBER=254748827166
```

`QUOTE_EMAIL_TO`, `QUOTE_EMAIL_FROM`, and `WHATSAPP_TO_NUMBER` are non-secret Worker vars in `wrangler.api.toml`. `RESEND_API_KEY`, `WHATSAPP_ACCESS_TOKEN`, and any other tokens must be set as Cloudflare secrets.

Do not prefix these with `VITE_`. `VITE_` variables are exposed to the browser bundle.

## Resend Email Setup

Required:

- `RESEND_API_KEY`
- `QUOTE_EMAIL_FROM`
- `QUOTE_EMAIL_TO`

`QUOTE_EMAIL_FROM` must be a verified sender/domain in Resend before real email delivery is enabled. If Resend variables are missing or Resend rejects the request, the backend returns `success: false`.

## WhatsApp Business API Readiness

Optional variables:

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_TO_NUMBER`

If these are missing, the backend skips WhatsApp notification gracefully. Tokens must remain server-side as Cloudflare environment variables or secrets.

## Cloudflare D1 Storage Option

Bind a D1 database to either:

```text
QUOTE_REQUESTS_DB
```

or:

```text
DB
```

Suggested table:

```sql
CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL
);
```

If D1 is not configured, the function returns `success: false` because production success requires database persistence.

## Testing Steps

Local frontend:

```bash
npm run build
npm run dev
```

Verify:

- empty form shows Kleihaus field validation;
- valid form posts to `https://api.kleihaus.com/quote-request`;
- success displays "Request submitted successfully. Our team will respond shortly.";
- D1 failure does not return success;
- Resend failure does not return success;
- Send request does not open WhatsApp;
- manual "Chat on WhatsApp" still opens WhatsApp;
- no secrets appear in browser code or source maps.

For full backend testing, deploy through the repo to Cloudflare Pages and test `https://api.kleihaus.com/quote-request`.

## Security Notes

- Keep Resend, WhatsApp and database credentials server-side only.
- Never commit real `.env` files or secrets.
- Keep behavioral analytics anonymized.
- Do not expose internal quote storage, email delivery details or WhatsApp token status to customers.
