# Cloudflare Email Architecture

Kleihaus quote requests should use a secure backend endpoint for email delivery. The public website should prepare the request payload and open WhatsApp immediately, while email provider credentials stay on the server side.

## Target Flow

1. Customer submits the quote/contact form on the Kleihaus website.
2. The frontend validates required fields and opens WhatsApp with a formatted quote message.
3. The frontend prepares a JSON payload and posts it to `VITE_QUOTE_ENDPOINT` when configured.
4. A Cloudflare Worker receives the payload, validates it, rate-limits abuse, and sanitizes the message.
5. The Worker sends the email through a server-side email provider.
6. Email is delivered to `sales@kleihaus.com`.

## Frontend Payload

The browser sends only a JSON request body. It does not contain API keys, SMTP passwords, tokens, or provider credentials.

```json
{
  "type": "quote_request",
  "name": "...",
  "email": "...",
  "phone": "...",
  "location": "...",
  "message": "...",
  "timestamp": "ISO_DATE",
  "source": "kleihaus_website"
}
```

## Environment Placeholder

```env
VITE_QUOTE_ENDPOINT=
```

This value should be the public HTTPS URL of the Cloudflare Worker endpoint. It must not contain a secret.

## Why Secrets Stay Server-Side

Vite exposes `VITE_` environment variables to the browser bundle. Any API key, SMTP password, WhatsApp token, database credential, or LLM key placed in frontend code can be inspected by visitors. Provider credentials must be stored as Cloudflare Worker secrets or in another secure backend secret store.

## Future Email Providers

The Cloudflare Worker can later integrate with:

- Resend
- SendGrid
- Mailgun
- EmailJS

For production, prefer providers that support secure server-side API keys, domain verification, sender authentication, retry handling, and abuse protection.

## Cloudflare Worker Responsibilities

- Accept `POST` requests only.
- Validate `type`, contact fields, message length, and timestamp.
- Reject malformed or abusive submissions.
- Apply CORS only for `https://www.kleihaus.com`.
- Store provider API keys as Worker secrets.
- Send the quote request to `sales@kleihaus.com`.
- Return a simple success or failure response to the frontend.

## Future Monthly AI Reporting

The same secure backend pattern can later support monthly management reporting:

- Aggregate privacy-preserving search, category, WhatsApp, guide-topic, and quote trends.
- Generate monthly recommendations in a backend/service layer.
- Send reports to `muthamimwatu@gmail.com` and `sales@kleihaus.com`.
- Keep reporting logic and email credentials out of the public frontend.

No real email sending is implemented in the frontend. Email delivery begins only after a secure backend endpoint is configured.
