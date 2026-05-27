const successMessage = 'Request submitted successfully. Our team will respond shortly.'

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

const safeLog = (message, payload = {}, extra = {}) => {
  console.log(message, {
    requestId: payload.id,
    source: payload.source,
    hasEmail: Boolean(payload.email),
    hasPhone: Boolean(payload.phone),
    ...extra,
  })
}

const storeInquiry = async (env, payload) => {
  const db = env?.QUOTE_REQUESTS_DB || env?.DB

  if (!db) {
    return { configured: false, stored: false, error: 'D1 binding missing' }
  }

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
  } catch (error) {
    safeLog('quote storage failed', payload, {
      mode: 'storage_failed',
      error: error.message,
    })

    return {
      configured: true,
      stored: false,
      error: error.message,
    }
  }
}

const sendEmailNotification = async (env, payload) => {
  if (!env?.RESEND_API_KEY) {
    return { configured: false, sent: false, error: 'RESEND_API_KEY missing' }
  }

  const from = env.QUOTE_EMAIL_FROM || 'Kleihaus Ceramics <onboarding@resend.dev>'
  const to = env.QUOTE_EMAIL_TO || 'sales@kleihaus.com'

  const html = `
    <h2>New Kleihaus Quote Request</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email || 'Not provided'}</p>
    <p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p>
    <p><strong>Location:</strong> ${payload.location || 'Not provided'}</p>
    <p><strong>Request details:</strong></p>
    <p>${payload.requestDetails}</p>
    <hr />
    <p><strong>Request ID:</strong> ${payload.id}</p>
    <p><strong>Captured at:</strong> ${payload.created_at}</p>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New quote request from ${payload.name}`,
      html,
    }),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    safeLog('email notification failed', payload, {
      mode: 'email_failed',
      status: response.status,
      error: JSON.stringify(result),
    })

    return {
      configured: true,
      sent: false,
      status: response.status,
      error: result,
    }
  }

  return {
    configured: true,
    sent: true,
    provider: 'resend',
    id: result.id,
  }
}

const prepareWhatsAppNotification = () => {
  return {
    configured: false,
    sent: false,
    note: 'Automatic WhatsApp sending requires WhatsApp Business API.',
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
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
  const email = await sendEmailNotification(context.env, payload)
  const whatsapp = prepareWhatsAppNotification()

  safeLog('quote request captured', payload, {
    storage,
    email,
    whatsapp,
  })

  return json({
    success: true,
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