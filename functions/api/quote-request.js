const defaultEmailTo = 'sales@kleihaus.com'
const defaultWhatsAppNotifyTo = '254748827166'

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

const trimValue = (value) => String(value || '').trim()
const sanitizeField = (value, maxLength = 120) =>
  trimValue(value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .slice(0, maxLength)

const normalizeQuoteRequest = (body = {}) => ({
  id: crypto.randomUUID(),
  name: sanitizeField(body.name),
  email: sanitizeField(body.email, 180),
  phone: sanitizeField(body.phone, 80),
  location: sanitizeField(body.location, 180),
  message: sanitizeField(body.message, 3000),
  source: sanitizeField(body.source || 'kleihaus_website', 80),
  created_at: new Date().toISOString(),
  status: 'received',
})

const validateQuoteRequest = (payload) => {
  const errors = []

  if (!payload.name) errors.push('Name is required.')
  if (!payload.email && !payload.phone) errors.push('Phone or email is required.')
  if (!payload.message) errors.push('Request details are required.')

  return errors
}

const getQuoteDatabase = (env = {}) => env.QUOTE_REQUESTS_DB || env.DB

const storeQuoteRequest = async (env, payload) => {
  const db = getQuoteDatabase(env)
  if (!db) return { ok: true, configured: false }

  try {
    await db
      .prepare(
        `INSERT INTO quote_requests
          (id, name, email, phone, location, message, source, created_at, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        payload.id,
        payload.name,
        payload.email,
        payload.phone,
        payload.location,
        payload.message,
        payload.source,
        payload.created_at,
        payload.status
      )
      .run()

    return { ok: true, configured: true }
  } catch (error) {
    console.warn('Quote request storage failed.', error?.message || error)
    return { ok: false, configured: true }
  }
}

const buildEmailText = (payload) =>
  [
    'New Kleihaus quote request',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Location: ${payload.location || 'Not provided'}`,
    `Source: ${payload.source}`,
    `Received: ${payload.created_at}`,
    '',
    'Request:',
    payload.message,
  ].join('\n')

const sendEmailNotification = async (env, payload) => {
  const apiKey = trimValue(env?.RESEND_API_KEY)
  const from = trimValue(env?.QUOTE_EMAIL_FROM)
  const to = trimValue(env?.QUOTE_EMAIL_TO) || defaultEmailTo

  if (!apiKey || !from || !to) {
    console.warn('Quote email notification skipped: Resend environment variables are not configured.')
    return { ok: false, configured: false }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New Kleihaus quote request from ${payload.name}`,
      text: buildEmailText(payload),
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.warn('Quote email notification failed.', response.status, errorText.slice(0, 300))
    return { ok: false, configured: true }
  }

  return { ok: true, configured: true }
}

const buildWhatsAppNotification = (payload) =>
  [
    'New Kleihaus quote request',
    '',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Location: ${payload.location || 'Not provided'}`,
    '',
    `Request: ${payload.message}`,
  ].join('\n')

const sendWhatsAppNotification = async (env, payload) => {
  const token = trimValue(env?.WHATSAPP_ACCESS_TOKEN)
  const phoneNumberId = trimValue(env?.WHATSAPP_PHONE_NUMBER_ID)
  const notifyTo = trimValue(env?.WHATSAPP_NOTIFY_TO) || defaultWhatsAppNotifyTo

  if (!token || !phoneNumberId || !notifyTo) {
    return { ok: true, configured: false }
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: notifyTo,
        type: 'text',
        text: {
          preview_url: false,
          body: buildWhatsAppNotification(payload),
        },
      }),
    })

    if (!response.ok) {
      console.warn('WhatsApp notification failed.', response.status)
      return { ok: false, configured: true }
    }

    return { ok: true, configured: true }
  } catch (error) {
    console.warn('WhatsApp notification failed.', error?.message || error)
    return { ok: false, configured: true }
  }
}

const handleQuoteRequest = async ({ request, env }) => {
  let body

  try {
    body = await request.json()
  } catch {
    return jsonResponse({ ok: false, message: 'Invalid JSON payload.' }, 400)
  }

  const payload = normalizeQuoteRequest(body)
  const errors = validateQuoteRequest(payload)

  if (errors.length > 0) {
    return jsonResponse({ ok: false, message: 'Quote request validation failed.', errors }, 400)
  }

  const storage = await storeQuoteRequest(env, payload)
  const email = await sendEmailNotification(env, payload)

  if (!email.ok) {
    return jsonResponse(
      {
        ok: false,
        message: 'Quote request could not be delivered.',
        storage,
        email: { ok: email.ok, configured: email.configured },
      },
      503
    )
  }

  const whatsapp = await sendWhatsAppNotification(env, payload)

  return jsonResponse({
    ok: true,
    message: 'Quote request submitted successfully.',
    id: payload.id,
    storage,
    email: { ok: email.ok, configured: email.configured },
    whatsapp: { ok: whatsapp.ok, configured: whatsapp.configured },
  })
}

export const onRequest = async (context) => {
  if (context.request.method === 'OPTIONS') return jsonResponse({ ok: true })
  if (context.request.method !== 'POST') return jsonResponse({ ok: false, message: 'Method not allowed.' }, 405)

  return handleQuoteRequest(context)
}
