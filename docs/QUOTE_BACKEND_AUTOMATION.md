# Quote Backend Automation

Kleihaus Phase 2 quote automation moves the main quote form from browser-to-WhatsApp submission to a secure backend submission flow.

## Flow

1. Customer fills the quote form on the website.
2. Frontend validates name, contact detail and request details.
3. Frontend posts JSON to `/api/quote-request`.
4. Cloudflare Pages Function validates and sanitizes the payload.
5. Backend prepares/stores the inquiry if a server-side storage binding is configured.
6. Backend prepares email notification hooks for Resend, EmailJS, SMTP, or a custom API.
7. Backend prepares WhatsApp Business / Meta Graph API notification hooks.
8. Customer sees: "Request submitted successfully. Our team will respond shortly."
9. If notification credentials are missing, the backend still captures the request and returns success with `mode: "captured_without_notifications"`.
10. If the local Vite dev server cannot reach `/api/quote-request`, the frontend shows: "Request prepared. Please use WhatsApp if submission does not complete."

The separate "Chat on WhatsApp" button remains available as the manual fallback.

## Frontend Endpoint

The frontend posts to:

```text
/api/quote-request
```

The fetch URL must remain relative and include the leading slash:

```js
fetch('/api/quote-request', {
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
  "message": "Request details",
  "source": "kleihaus_website"
}
```

## Cloudflare Pages Function

Backend endpoint:

```text
functions/api/quote-request.js
```

Cloudflare Pages maps this to:

```text
https://www.kleihaus.com/api/quote-request
```

The function:

- accepts `POST` JSON;
- exports `onRequestPost(context)` for Cloudflare Pages Functions;
- validates required fields;
- sanitizes user input;
- generates a server timestamp and request ID;
- prepares optional D1/Supabase/Firebase/Airtable persistence hooks;
- prepares email notification hooks without exposing credentials;
- prepares WhatsApp Business Cloud API notification hooks;
- returns customer-safe JSON success/failure.

When email or WhatsApp credentials are not configured, the function logs a safe server-side message and returns:

```json
{
  "success": true,
  "mode": "captured_without_notifications",
  "message": "Request submitted successfully. Our team will respond shortly."
}
```

## Backend Environment Variables

Configure these in Cloudflare Pages project settings, not in frontend code:

```env
RESEND_API_KEY=
QUOTE_EMAIL_TO=sales@kleihaus.com
QUOTE_EMAIL_FROM=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_NOTIFY_TO=254748827166
```

Do not prefix these with `VITE_`. `VITE_` variables are exposed to the browser bundle.

## Resend Email Setup

Required:

- `RESEND_API_KEY`
- `QUOTE_EMAIL_FROM`
- `QUOTE_EMAIL_TO`

`QUOTE_EMAIL_FROM` must be a verified sender/domain in Resend before real email delivery is enabled. If notification credentials are not configured, the backend does not fail publicly; it captures the request and returns success.

## WhatsApp Business API Readiness

Optional variables:

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_NOTIFY_TO`

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

If D1 is not configured, the function continues safely and returns a captured response.

## Testing Steps

Local frontend:

```bash
npm run build
npm run dev
```

Verify:

- empty form shows Kleihaus field validation;
- valid form posts to `/api/quote-request`;
- success displays "Request submitted successfully. Our team will respond shortly.";
- missing notification credentials still display the success message;
- local Vite-only function unavailability displays "Request prepared. Please use WhatsApp if submission does not complete.";
- Send request does not open WhatsApp;
- manual "Chat on WhatsApp" still opens WhatsApp;
- no secrets appear in browser code or source maps.

For full backend testing, run with Cloudflare Pages Functions locally or deploy to a Cloudflare Pages preview with environment variables configured.

## Security Notes

- Keep Resend, WhatsApp and database credentials server-side only.
- Never commit real `.env` files or secrets.
- Keep behavioral analytics anonymized.
- Do not expose internal quote storage, email delivery details or WhatsApp token status to customers.
