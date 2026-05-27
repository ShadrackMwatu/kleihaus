const SUCCESS_MESSAGE = 'Request submitted successfully. Our team will respond shortly.'
const EMAIL_SUBJECT = 'New Kleihaus quote request'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...corsHeaders,
    },
  })

const clean = (value, maxLength = 160) =>
  String(value || '')
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .slice(0, maxLength)

const escapeHtml = (value) =>
  clean(value, 5000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br />')

const normalizePayload = (body = {}) => {
  const requestDetails = clean(body.requestDetails || body.message || body.details, 3000)

  return {
    id: crypto.randomUUID(),
    name: clean(body.name),
    email: clean(body.email, 180),
    phone: clean(body.phone, 80),
    location: clean(body.location, 180),
    requestDetails,
    message: requestDetails,
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

const logSafe = (event, payload = {}, extra = {}) => {
  console.log(event, {
    requestId: payload.id,
    source: payload.source,
    hasEmail: Boolean(payload.email),
    hasPhone: Boolean(payload.phone),
    ...extra,
  })
}

const insertQuoteRequest = async (env, payload) => {
  const db = env?.QUOTE_REQUESTS_DB || env?.DB

  if (!db) {
    return {
      success: false,
      configured: false,
      error: 'D1 database binding is not configured.',
    }
  }

  try {
    await db
      .prepare(
        `INSERT INTO quote_requests
          (id, name, email, phone, location, message, source, status, created_at)
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
        payload.status,
        payload.created_at
      )
      .run()

    console.log('D1_INSERT_SUCCESS', { requestId: payload.id, source: payload.source })
    return { success: true, configured: true, stored: true }
  } catch (error) {
    logSafe('D1_INSERT_FAILED', payload, { error: error.message })
    return { success: false, configured: true, stored: false, error: error.message }
  }
}

const buildEmailHtml = (payload) => `
  <h2>New Kleihaus quote request</h2>
  <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(payload.email || 'Not provided')}</p>
  <p><strong>Phone:</strong> ${escapeHtml(payload.phone || 'Not provided')}</p>
  <p><strong>Location:</strong> ${escapeHtml(payload.location || 'Not provided')}</p>
  <p><strong>Request details:</strong></p>
  <p>${escapeHtml(payload.requestDetails)}</p>
  <hr />
  <p><strong>Request ID:</strong> ${escapeHtml(payload.id)}</p>
  <p><strong>Created time:</strong> ${escapeHtml(payload.created_at)}</p>
`

const buildEmailText = (payload) =>
  [
    EMAIL_SUBJECT,
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Location: ${payload.location || 'Not provided'}`,
    '',
    'Request details:',
    payload.requestDetails,
    '',
    `Request ID: ${payload.id}`,
    `Created time: ${payload.created_at}`,
  ].join('\n')

const sendResendEmail = async (env, payload) => {
  const apiKey = clean(env?.RESEND_API_KEY, 500)
  const from = clean(env?.QUOTE_EMAIL_FROM, 300)
  const to = clean(env?.QUOTE_EMAIL_TO || 'sales@kleihaus.com', 300)

  if (!apiKey || !from || !to) {
    return {
      success: false,
      configured: false,
      sent: false,
      error: 'RESEND_API_KEY, QUOTE_EMAIL_FROM, or QUOTE_EMAIL_TO is missing.',
    }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: EMAIL_SUBJECT,
        html: buildEmailHtml(payload),
        text: buildEmailText(payload),
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      logSafe('RESEND_EMAIL_FAILED', payload, { status: response.status })
      return {
        success: false,
        configured: true,
        sent: false,
        status: response.status,
        error: result?.message || 'Resend email request failed.',
      }
    }

    console.log('RESEND_EMAIL_SUCCESS', { requestId: payload.id, emailId: result.id })
    return { success: true, configured: true, sent: true, provider: 'resend', id: result.id }
  } catch (error) {
    logSafe('RESEND_EMAIL_FAILED', payload, { error: error.message })
    return { success: false, configured: true, sent: false, error: error.message }
  }
}

const sendWhatsAppBusinessNotification = async (env, payload) => {
  const token = clean(env?.WHATSAPP_ACCESS_TOKEN, 1000)
  const phoneNumberId = clean(env?.WHATSAPP_PHONE_NUMBER_ID, 120)
  const to = clean(env?.WHATSAPP_TO_NUMBER, 80)

  if (!token || !phoneNumberId || !to) {
    const skipped = {
      success: true,
      configured: false,
      sent: false,
      reason: 'WhatsApp Business API not configured',
    }
    console.log('WHATSAPP_SKIPPED_OR_SENT', { requestId: payload.id, sent: false, reason: skipped.reason })
    return skipped
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
        to,
        type: 'text',
        text: {
          preview_url: false,
          body: `New Kleihaus quote request\n\nName: ${payload.name}\nPhone: ${payload.phone || 'Not provided'}\nEmail: ${payload.email || 'Not provided'}\nLocation: ${payload.location || 'Not provided'}\n\nRequest: ${payload.requestDetails}\n\nRequest ID: ${payload.id}`,
        },
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      logSafe('WHATSAPP_SEND_FAILED', payload, { status: response.status })
      return {
        success: false,
        configured: true,
        sent: false,
        status: response.status,
        error: result?.error?.message || 'WhatsApp Business API request failed.',
      }
    }

    console.log('WHATSAPP_SKIPPED_OR_SENT', { requestId: payload.id, sent: true })
    return { success: true, configured: true, sent: true, provider: 'whatsapp_business_api', response: result }
  } catch (error) {
    logSafe('WHATSAPP_SEND_FAILED', payload, { error: error.message })
    return { success: false, configured: true, sent: false, error: error.message }
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders })
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
  const validationErrors = validatePayload(payload)

  if (validationErrors.length > 0) {
    return json({ success: false, message: 'Quote request validation failed.', errors: validationErrors }, 400)
  }

  console.log('QUOTE_REQUEST_RECEIVED', {
    requestId: payload.id,
    source: payload.source,
    hasEmail: Boolean(payload.email),
    hasPhone: Boolean(payload.phone),
  })

  const storage = await insertQuoteRequest(context.env, payload)
  if (!storage.success) {
    return json({ success: false, message: 'Quote request could not be saved.', storage }, 500)
  }

  const email = await sendResendEmail(context.env, payload)
  if (!email.success) {
    return json({ success: false, message: 'Quote request email could not be sent.', storage, email }, 500)
  }

  const whatsapp = await sendWhatsAppBusinessNotification(context.env, payload)

  return json({
    success: true,
    message: SUCCESS_MESSAGE,
    requestId: payload.id,
    createdAt: payload.created_at,
    storage,
    email,
    whatsapp,
  })
}
