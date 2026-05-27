# Cloudflare Email Architecture

Kleihaus quote requests use a secure backend endpoint for email delivery. The public website prepares the request payload and posts it to `https://api.kleihaus.com/quote-request`, while email provider credentials stay on the server side.

## Target Flow

1. Customer submits the quote/contact form on the Kleihaus website.
2. The frontend validates required fields.
3. The frontend posts a JSON payload to `https://api.kleihaus.com/quote-request`.
4. A Cloudflare Pages Function receives the payload, validates it and sanitizes the message.
5. The Function stores the request in D1 when configured.
6. The Function sends the email through Resend when backend variables are configured.
7. Email is delivered to `sales@kleihaus.com`.
8. WhatsApp Business API notification is skipped gracefully unless backend credentials are configured.

## Frontend Payload

The browser sends only a JSON request body. It does not contain API keys, SMTP passwords, tokens, or provider credentials.

```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "location": "...",
  "message": "...",
  "source": "kleihaus_website"
}
```

## Backend Environment Variables

```env
RESEND_API_KEY=
QUOTE_EMAIL_TO=sales@kleihaus.com
QUOTE_EMAIL_FROM=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_TO_NUMBER=254748827166
```

These values belong in Cloudflare Pages/Workers settings. Do not prefix backend secrets with `VITE_`.

## Why Secrets Stay Server-Side

Vite exposes `VITE_` environment variables to the browser bundle. Any API key, SMTP password, WhatsApp token, database credential, or LLM key placed in frontend code can be inspected by visitors. Provider credentials must be stored as Cloudflare Worker secrets or in another secure backend secret store.

## Future Email Providers

The Cloudflare Worker can later integrate with:

- Resend
- SendGrid
- Mailgun
- EmailJS

For production, prefer providers that support secure server-side API keys, domain verification, sender authentication, retry handling, and abuse protection.

## Cloudflare Pages Function Responsibilities

- Accept `POST` requests only.
- Validate contact fields and message length.
- Reject malformed or abusive submissions.
- Store provider API keys as backend secrets.
- Send the quote request to `sales@kleihaus.com`.
- Return a simple success or failure response to the frontend.

## Future Monthly AI Reporting

The same secure backend pattern can later support monthly management reporting:

- Aggregate privacy-preserving search, category, WhatsApp, guide-topic, and quote trends.
- Generate monthly recommendations in a backend/service layer.
- Send reports to `muthamimwatu@gmail.com` and `sales@kleihaus.com`.
- Keep reporting logic and email credentials out of the public frontend.

No real email sending is implemented in the frontend. Email delivery begins only after Cloudflare backend variables are configured.
