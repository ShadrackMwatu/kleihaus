const successMessage = 'Request submitted successfully. Our team will respond shortly.'
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

const sanitizeMessage = (value) =>
  sanitizeField(value, 3000)
    .replace(/\r\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')

const safeLog = (message, details = {}) => {
  console.log(message, {
    requestId: details.requestId,
    source: details.source,
    mode: details.mode,
    hasEmail: details.hasEmail,
    hasPhone: details.hasPhone,
  })
}

const normalizeQuoteRequest = (body = {}) => ({
  id: crypto.randomUUID(),
  name: sanitizeField(body.name),
  email: sanitizeField(body.email, 180),
  phone: sanitizeField(body.phone, 80),
  location: sanitizeField(body.location, 180),
  message: sanitizeMessage(body.message),
  source: sanitizeField(body.source || 'kleihaus_website', 80),
  created_at: new Date().toISOString(),
  status: 'captured',
})

const validateQuoteRequest = (payload) => {
  const errors = []

  if (!payload.name) errors.push('Name is required.')
  if (!payload.email && !payload.phone) errors.push('Phone or email is required.')
  if (!payload.message) errors.push('Request details are required.')

  return errors
}

const hasNotificationCredentials = (env = {}) =>
  Boolean(
    (trimValue(env.RESEND_API_KEY) && trimValue(env.QUOTE_EMAIL_FROM)) ||
      (trimValue(env.WHATSAPP_ACCESS_TOKEN) && trimValue(env.WHATSAPP_PHONE_NUMBER_ID))
  )

const prepareInquiryPayload = (payload) => ({
  id: payload.id,
  name: payload.name,
  email: payload.email,
  phone: payload.phone,
  location: payload.location,
  message: payload.message,
  source: payload.source,
  created_at: payload.created_at,
  status: payload.status,
})

const prepareStorageHook = async (env, inquiry) => {
  // Future persistence hook:
  // - Cloudflare D1 binding: QUOTE_REQUESTS_DB or DB
  // - Supabase REST/RPC endpoint
  // - Firebase Admin endpoint
  // - Airtable API integration
  // This function intentionally avoids hardcoded credentials and returns safely
  // until a storage provider is configured server-side.
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
        inquiry.id,
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.location,
        inquiry.message,
        inquiry.source,
        inquiry.created_at,
        inquiry.status
      )
      .run()

    return { configured: true, stored: true }
  } catch {
    safeLog('quote request storage hook failed', {
      requestId: inquiry.id,
      source: inquiry.source,
      mode: 'storage_failed',
      hasEmail: Boolean(inquiry.email),
      hasPhone: Boolean(inquiry.phone),
    })
    return { configured: true, stored: false }
  }
}

const prepareEmailNotificationHook = async (env, inquiry) => {
  // Future email delivery hook:
  // - Resend using RESEND_API_KEY, QUOTE_EMAIL_FROM, QUOTE_EMAIL_TO
  // - EmailJS through a server-side relay
  // - SMTP through a secure backend provider
  // - Custom API endpoint with server-held credentials
  const apiKey = trimValue(env?.RESEND_API_KEY)
  const from = trimValue(env?.QUOTE_EMAIL_FROM)
  const to = trimValue(env?.QUOTE_EMAIL_TO) || defaultEmailTo

  if (!apiKey || !from || !to) {
    safeLog('notification credentials not configured', {
      requestId: inquiry.id,
      source: inquiry.source,
      mode: 'email_skipped',
      hasEmail: Boolean(inquiry.email),
      hasPhone: Boolean(inquiry.phone),
    })
    return { configured: false, sent: false }
  }

  // The actual Resend API call will be enabled after sender/domain verification
  // and Cloudflare environment variables are confirmed in production.
  return { configured: true, sent: false, provider: 'resend_ready' }
}

const prepareWhatsAppNotificationHook = async (env, inquiry) => {
  // Future WhatsApp notification hook:
  // - WhatsApp Business Cloud API
  // - Meta Graph API messages endpoint
  // Required backend-only variables:
  // WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_NOTIFY_TO
  const token = trimValue(env?.WHATSAPP_ACCESS_TOKEN)
  const phoneNumberId = trimValue(env?.WHATSAPP_PHONE_NUMBER_ID)
  const notifyTo = trimValue(env?.WHATSAPP_NOTIFY_TO) || defaultWhatsAppNotifyTo

  if (!token || !phoneNumberId || !notifyTo) {
    return { configured: false, prepared: false }
  }

  return { configured: true, prepared: true, provider: 'meta_graph_ready' }
}

export async function onRequestOptions() {
  return jsonResponse({ success: true })
}

export async function onRequestPost(context) {
  let body

  try {
    body = await context.request.json()
  } catch {
    return jsonResponse({ success: false, message: 'Invalid request payload.' }, 400)
  }

  const payload = normalizeQuoteRequest(body)
  const errors = validateQuoteRequest(payload)

  if (errors.length > 0) {
    return jsonResponse({ success: false, message: 'Quote request validation failed.', errors }, 400)
  }

  const inquiry = prepareInquiryPayload(payload)
  const storage = await prepareStorageHook(context.env, inquiry)
  const email = await prepareEmailNotificationHook(context.env, inquiry)
  const whatsapp = await prepareWhatsAppNotificationHook(context.env, inquiry)

  const notificationsConfigured = hasNotificationCredentials(context.env)
  const mode = notificationsConfigured ? 'captured_notifications_ready' : 'captured_without_notifications'

  safeLog('quote request captured', {
    requestId: inquiry.id,
    source: inquiry.source,
    mode,
    hasEmail: Boolean(inquiry.email),
    hasPhone: Boolean(inquiry.phone),
  })

  return jsonResponse({
    success: true,
    ok: true,
    mode,
    message: successMessage,
    requestId: inquiry.id,
    capturedAt: inquiry.created_at,
    storage,
    notifications: {
      email,
      whatsapp,
    },
  })
}
