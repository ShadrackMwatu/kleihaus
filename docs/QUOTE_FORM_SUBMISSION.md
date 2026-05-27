# Quote Form Submission

## Current Phase 1 Behavior

The public Kleihaus quote/contact form validates the customer request in the browser, prepares a formatted WhatsApp quote message, and opens:

`https://wa.me/254748827166?text=<encoded quote request>`

The message includes:

- Name
- Email
- Phone
- Location
- Project/request details

The form also tracks the anonymized `quote_form_submitted` analytics event for future reporting. Personal contact fields are not written into behavioral analytics payloads.

## Backend-Ready Email Delivery

The frontend can optionally send the same quote request payload to a secure backend endpoint using:

```env
VITE_QUOTE_ENDPOINT=
```

When `VITE_QUOTE_ENDPOINT` is empty, the form still works through WhatsApp and shows a customer-friendly message: "Your WhatsApp quote request is ready. Please send it in WhatsApp so our team can respond." When configured, the frontend sends this JSON payload:

```json
{
  "type": "quote_request",
  "name": "...",
  "email": "...",
  "phone": "...",
  "location": "...",
  "message": "...",
  "source": "kleihaus_website",
  "timestamp": "ISO_DATE"
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

Do not put SMTP passwords, email API keys, WhatsApp Business tokens, LLM keys, database credentials, or other secrets in frontend code or `VITE_` environment variables. Vite exposes `VITE_` variables to the browser bundle, so `VITE_QUOTE_ENDPOINT` must only contain a public endpoint URL, never a private key.

## Recommended Backend Flow

1. Browser validates the request and opens WhatsApp for immediate customer action.
2. Browser posts the quote payload to `VITE_QUOTE_ENDPOINT` if configured.
3. Backend validates and sanitizes the payload.
4. Backend sends email to `sales@kleihaus.com`.
5. Backend stores only consent-aware, privacy-preserving operational data.
6. Backend can later feed monthly management reporting without exposing intelligence panels on the public website.
