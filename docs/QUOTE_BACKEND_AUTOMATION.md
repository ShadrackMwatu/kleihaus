# Quote Backend Automation

Kleihaus Phase 2 quote automation moves the main quote form from browser-to-WhatsApp submission to a secure backend submission flow.

## Flow

1. Customer fills the quote form on the website.
2. Frontend validates name, contact detail and request details.
3. Frontend posts JSON to `/api/quote-request`.
4. Cloudflare Pages Function validates and sanitizes the payload.
5. Backend stores the inquiry if D1 storage is configured.
6. Backend sends an email notification to `sales@kleihaus.com` through Resend when configured.
7. Backend prepares/sends a WhatsApp Business Cloud API notification when credentials are configured.
8. Customer sees: "Request submitted successfully. Our team will respond shortly."
9. If backend delivery fails, customer sees: "We could not submit your request. Please try WhatsApp."

The separate "Chat on WhatsApp" button remains available as the manual fallback.

## Frontend Endpoint

The frontend posts to:

```text
/api/quote-request
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
- validates required fields;
- sanitizes user input;
- generates a server timestamp and request ID;
- optionally stores the request in D1;
- sends email through Resend when configured;
- optionally sends WhatsApp Business Cloud API notification;
- returns JSON success/failure.

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

`QUOTE_EMAIL_FROM` must be a verified sender/domain in Resend. If Resend is not configured, the backend returns a safe failure response and the frontend asks the customer to use WhatsApp.

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

If D1 is not configured, the function continues with email delivery.

## Testing Steps

Local frontend:

```bash
npm run build
npm run dev
```

Verify:

- empty form shows browser validation / field validation;
- valid form posts to `/api/quote-request`;
- success displays "Request submitted successfully. Our team will respond shortly.";
- backend failure displays "We could not submit your request. Please try WhatsApp.";
- Send request does not open WhatsApp;
- manual "Chat on WhatsApp" still opens WhatsApp;
- no secrets appear in browser code or source maps.

For full backend testing, run with Cloudflare Pages Functions locally or deploy to a Cloudflare Pages preview with environment variables configured.

## Security Notes

- Keep Resend, WhatsApp and database credentials server-side only.
- Never commit real `.env` files or secrets.
- Keep behavioral analytics anonymized.
- Do not expose internal quote storage, email delivery details or WhatsApp token status to customers.
