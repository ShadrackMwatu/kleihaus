const successMessage = 'Request submitted successfully. Our team will respond shortly.'

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

const clean = (value, maxLength = 160) =>
  String(value || '')
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .slice(0, maxLength)

const normalizePayload = (body = {}) => {
  const details = clean(body.requestDetails || body.message || body.details, 3000)

  return {
    id: crypto.randomUUID(),
    name: clean(body.name),
    email: clean(body.email, 180),
    phone: clean(body.phone, 80),
    location: clean(body.location, 180),
    requestDetails: details,
    message: details,
    source: clean(body.source || 'kleihaus_website', 80),
    created_at: new Date().toISOString(),
    status: 'captured',
  }
}

const validatePayload = (payload) => {
  const errors = []

  if (!payload.name) errors.push('Name is required.')
  if (!payload.phone && !payload.email) errors.push('Phone or email is required.')
  if (!payload.requestDetails) errors.push('Request details are required.')

  return errors
}

const safeLog = (message, payload, extra = {}) => {
  console.log(message, {
    requestId: payload.id,
    source: payload.source,
    hasEmail: Boolean(payload.email),
    hasPhone: Boolean(payload.phone),
    ...extra,
  })
}

const storeInquiry = async (env, payload) => {
  // Future persistence hooks can extend this cleanly:
  // Cloudflare D1, Supabase, Firebase, Airtable, or a custom API.
  const db = env?.QUOTE_REQUESTS_DB || env?.DB
  if (!db) return { configured: false, stored: false }

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
        payload.requestDetails,
        payload.source,
        payload.created_at,
        payload.status
      )
      .run()

    return { configured: true, stored: true }
  } catch {
    safeLog('quote storage failed', payload, { mode: 'storage_failed' })
    return { configured: true, stored: false }
  }
}

const prepareEmailNotification = (env, payload) => {
  // Future email hooks:
  // Resend, EmailJS through a backend relay, SMTP, or a custom API.
  const hasResend = Boolean(env?.RESEND_API_KEY && env?.QUOTE_EMAIL_FROM)
  if (!hasResend) {
    safeLog('notification credentials not configured', payload, { mode: 'email_skipped' })
    return { configured: false, prepared: false }
  }

  return { configured: true, prepared: true, provider: 'resend_ready' }
}

const prepareWhatsAppNotification = (env) => {
  // Future WhatsApp hooks:
  // WhatsApp Business API / Meta Graph API.
  const hasWhatsApp = Boolean(env?.WHATSAPP_ACCESS_TOKEN && env?.WHATSAPP_PHONE_NUMBER_ID)
  if (!hasWhatsApp) return { configured: false, prepared: false }

  return { configured: true, prepared: true, provider: 'meta_graph_ready' }
}

export async function onRequestOptions() {
  return json({ success: true })
}

export async function onRequestGet() {
  return json({ success: false, message: 'Method not allowed' }, 405)
}

export async function onRequestPost(context) {
  let body

  try {
    body = await context.request.json()
  } catch {
    return json({ success: false, message: 'Invalid JSON payload.' }, 400)
  }

  const payload = normalizePayload(body)
  const errors = validatePayload(payload)

  if (errors.length > 0) {
    return json({ success: false, message: 'Quote request validation failed.', errors }, 400)
  }

  const storage = await storeInquiry(context.env, payload)
  const email = prepareEmailNotification(context.env, payload)
  const whatsapp = prepareWhatsAppNotification(context.env)
  const notificationsReady = email.configured || whatsapp.configured
  const mode = notificationsReady ? 'captured_notifications_ready' : 'captured_without_notifications'

  safeLog('quote request captured', payload, { mode })

  return json({
    success: true,
    mode,
    message: successMessage,
    requestId: payload.id,
    capturedAt: payload.created_at,
    storage,
    notifications: {
      email,
      whatsapp,
    },
  })
}
