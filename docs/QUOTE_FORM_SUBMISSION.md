# Quote Form Submission

## Current Phase 2 Behavior

The public Kleihaus quote/contact form validates the customer request in the browser and posts the payload to:

```text
https://api.kleihaus.com/quote-request
```

The Cloudflare Pages Function receives the request, validates and sanitizes the payload, optionally stores it in D1, sends email through Resend when configured, and prepares WhatsApp Business API notification support when credentials are available.

On backend success, the customer sees:

```text
Request submitted successfully. Our team will respond shortly.
```

On backend failure, the customer sees:

```text
We could not submit your request. Please try WhatsApp.
```

The manual "Chat on WhatsApp" button remains available and opens:

`https://wa.me/254748827166?text=<encoded quote request>`

The message includes:

- Name
- Email
- Phone
- Location
- Project/request details

The form also tracks the anonymized `quote_form_submitted` analytics event for future reporting. Personal contact fields are not written into behavioral analytics payloads.

## Backend Email Delivery

Backend delivery is handled by:

```text
functions/api/quote-request.js
```

The frontend sends this JSON payload:

```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "location": "...",
  "requestDetails": "...",
  "source": "kleihaus_website"
}
```

## Secure Future Options

Email delivery should be handled by a backend/service endpoint such as:

- Cloudflare Worker using Resend, SendGrid, Mailgun, or SMTP provider credentials stored as Worker secrets
- Formspree or another managed form endpoint
- Resend API route or custom API service
- SendGrid API route or custom API service
- EmailJS only if configured without exposing private credentials and reviewed for production suitability

## Security Rule

Do not put SMTP passwords, email API keys, WhatsApp Business tokens, LLM keys, database credentials, or other secrets in frontend code or `VITE_` environment variables. Vite exposes `VITE_` variables to the browser bundle. Backend secrets must be configured in Cloudflare Pages/Workers settings.

## Recommended Backend Flow

1. Browser validates the request.
2. Browser posts the quote payload to `https://api.kleihaus.com/quote-request`.
3. Backend validates and sanitizes the payload.
4. Backend stores the request if D1 is configured.
5. Backend sends email to `sales@kleihaus.com`.
6. Backend prepares or sends WhatsApp Business notification when configured.
7. Backend can later feed monthly management reporting without exposing intelligence panels on the public website.
