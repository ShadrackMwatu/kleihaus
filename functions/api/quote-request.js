const SUCCESS_MESSAGE = 'Request submitted successfully. Our team will respond shortly.'
const EMAIL_SUBJECT_PREFIX = 'Kleihaus Lead'

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

const includesAny = (text, keywords) => keywords.some((keyword) => text.includes(keyword))

const getLeadReferenceParts = (createdAt) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    hourCycle: 'h23',
  })
    .formatToParts(new Date(createdAt))
    .reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
  }
}

const buildLeadReference = (payload) => {
  const parts = getLeadReferenceParts(payload.created_at)
  return `KLH-${parts.year}${parts.month}${parts.day}-${parts.hour}${parts.minute}`
}

const formatTimestampEat = (createdAt) => {
  const formatted = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(createdAt))

  return `${formatted.replace(',', ' —').replace(/\b(am|pm)\b/i, (value) => value.toUpperCase())} EAT`
}

const normalizeKenyanPhone = (phone) => {
  const digits = clean(phone, 80).replace(/\D/g, '')

  if (!digits) return ''
  if (digits.startsWith('254') && digits.length >= 12) return digits
  if (digits.startsWith('0') && digits.length >= 10) return `254${digits.slice(1)}`
  if ((digits.startsWith('7') || digits.startsWith('1')) && digits.length >= 9) return `254${digits}`

  return digits
}

const classifyInquiryType = (payload) => {
  const text = `${payload.requestDetails} ${payload.location} ${payload.source}`.toLowerCase()

  if (includesAny(text, ['warehouse', 'bulk', 'large quantity', 'container', 'pallet', 'supply order'])) return 'Warehouse / Bulk Supply'
  if (includesAny(text, ['wholesale', 'reseller', 'dealer', 'distributor', 'trade price'])) return 'Wholesale Inquiry'
  if (includesAny(text, ['showroom', 'display', 'sample', 'samples', 'visit'])) return 'Showroom Inquiry'
  if (includesAny(text, ['commercial', 'hotel', 'school', 'hospital', 'office', 'mall', 'developer', 'contractor', 'institution'])) {
    return 'Commercial Project'
  }
  if (includesAny(text, ['home', 'house', 'residential', 'bathroom', 'kitchen', 'living room', 'floor'])) return 'Residential Project'

  return 'General Product Inquiry'
}

const getLeadPriority = (payload, inquiryType) => {
  const text = `${payload.requestDetails} ${payload.location}`.toLowerCase()
  const highPriorityKeywords = ['wholesale', 'bulk', 'warehouse', 'urgent', 'large quantity', 'contractor', 'project', 'hotel', 'school', 'hospital']
  const mediumPriorityKeywords = ['residential', 'bathroom', 'kitchen', 'floor', 'house', 'home']

  if (includesAny(text, highPriorityKeywords) || ['Warehouse / Bulk Supply', 'Wholesale Inquiry', 'Commercial Project'].includes(inquiryType)) {
    return 'High'
  }

  if (includesAny(text, mediumPriorityKeywords) || inquiryType === 'Residential Project') return 'Medium'

  return 'Normal'
}

const getFollowUpWindow = (priority) => {
  if (priority === 'High') return 'Within 1 hour'
  if (priority === 'Medium') return 'Within 2 hours'
  return 'Same business day'
}

const getLeadInsights = (payload) => {
  const inquiryType = classifyInquiryType(payload)
  const priority = getLeadPriority(payload, inquiryType)

  return {
    inquiryType,
    priority,
    followUpWindow: getFollowUpWindow(priority),
    leadReference: buildLeadReference(payload),
    createdAtEat: formatTimestampEat(payload.created_at),
    normalizedPhone: normalizeKenyanPhone(payload.phone),
  }
}

const buildEmailSubject = (payload, insights) =>
  `${EMAIL_SUBJECT_PREFIX} • ${payload.location || 'Website'} • ${insights.inquiryType}`

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

  console.log('D1_INSERT_ATTEMPT', { requestId: payload.id, source: payload.source })

  if (!db) {
    logSafe('D1_INSERT_FAILED', payload, { error: 'D1 database binding is not configured.' })
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

const buildEmailHtml = (payload, insights) => {
  const priorityColor = insights.priority === 'High' ? '#b91c1c' : insights.priority === 'Medium' ? '#a65f1e' : '#166534'
  const whatsappUrl = insights.normalizedPhone ? `https://wa.me/${insights.normalizedPhone}` : ''

  return `
  <div style="margin:0;padding:0;background:#f5f1eb;font-family:Arial,Helvetica,sans-serif;color:#1f1a17;">
    <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
      <div style="background:#1f1a17;border-radius:14px 14px 0 0;padding:28px;border-bottom:5px solid #a65f1e;">
        <p style="margin:0 0 8px;color:#d8a15f;font-size:12px;letter-spacing:2px;font-weight:700;">KLEIHAUS CERAMICS</p>
        <h1 style="margin:0;color:#ffffff;font-size:26px;line-height:1.25;">New Project &amp; Product Inquiry</h1>
        <p style="margin:10px 0 0;color:#f2dfc8;font-size:14px;">Inspiring Living</p>
      </div>

      <div style="background:#ffffff;border:1px solid #e7ded2;border-top:0;border-radius:0 0 14px 14px;padding:24px;">
        <div style="border:1px solid #eadfce;background:#fffaf3;border-radius:12px;padding:18px;margin-bottom:18px;">
          <p style="margin:0 0 6px;color:#6f4a24;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Lead Reference</p>
          <h2 style="margin:0;color:#1f1a17;font-size:24px;">${escapeHtml(insights.leadReference)}</h2>
          <p style="margin:8px 0 0;color:#6b6258;font-size:14px;">Submitted ${escapeHtml(insights.createdAtEat)}</p>
        </div>

        <div style="display:block;border:1px solid #eadfce;border-radius:12px;padding:18px;margin-bottom:18px;">
          <h3 style="margin:0 0 14px;color:#1f1a17;font-size:18px;">Customer Information</h3>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6b6258;width:120px;">Name</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(payload.name)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">Email</td><td style="padding:8px 0;">${escapeHtml(payload.email || 'Not provided')}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">Phone</td><td style="padding:8px 0;">${escapeHtml(payload.phone || 'Not provided')}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">Location</td><td style="padding:8px 0;">${escapeHtml(payload.location || 'Not provided')}</td></tr>
          </table>
          ${
            whatsappUrl
              ? `<div style="margin-top:16px;"><a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#0f2418;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:8px;">Reply on WhatsApp</a></div>`
              : ''
          }
        </div>

        <div style="border:1px solid #eadfce;border-radius:12px;padding:18px;margin-bottom:18px;">
          <h3 style="margin:0 0 14px;color:#1f1a17;font-size:18px;">Inquiry Intelligence</h3>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6b6258;width:170px;">Inquiry Type</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(insights.inquiryType)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">Priority</td><td style="padding:8px 0;font-weight:700;color:${priorityColor};">${escapeHtml(insights.priority)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">Follow-up Window</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(insights.followUpWindow)}</td></tr>
          </table>
        </div>

        <div style="border:1px solid #eadfce;border-radius:12px;padding:18px;margin-bottom:18px;">
          <h3 style="margin:0 0 12px;color:#1f1a17;font-size:18px;">Request Details</h3>
          <div style="background:#fbf8f3;border-left:4px solid #a65f1e;padding:14px 16px;border-radius:8px;color:#302923;font-size:15px;line-height:1.6;">
            ${escapeHtml(payload.requestDetails)}
          </div>
        </div>

        <div style="background:#1f1a17;border-radius:12px;padding:16px;color:#f2dfc8;font-size:13px;">
          <p style="margin:0 0 10px;color:#d8a15f;font-weight:700;">Internal Business Intelligence</p>
          <p style="margin:4px 0;">Lead Source: Website</p>
          <p style="margin:4px 0;">Submission Channel: Kleihaus.com</p>
          <p style="margin:4px 0;">Region: ${escapeHtml(payload.location || 'Not provided')}</p>
          <p style="margin:4px 0;">Backend: Cloudflare Worker</p>
          <p style="margin:4px 0;">Storage: D1</p>
          <p style="margin:12px 0 0;color:#9d9489;">Internal UUID: ${escapeHtml(payload.id)}</p>
        </div>
      </div>
    </div>
  </div>
`
}

const buildEmailText = (payload, insights, subject) =>
  [
    subject,
    '',
    `Lead Reference: ${insights.leadReference}`,
    `Submitted: ${insights.createdAtEat}`,
    '',
    'Customer Information:',
    `Name: ${payload.name}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Location: ${payload.location || 'Not provided'}`,
    '',
    'Inquiry Intelligence:',
    `Inquiry Type: ${insights.inquiryType}`,
    `Priority: ${insights.priority}`,
    `Follow-up Window: ${insights.followUpWindow}`,
    insights.normalizedPhone ? `WhatsApp: https://wa.me/${insights.normalizedPhone}` : 'WhatsApp: Phone number not available',
    '',
    'Request Details:',
    payload.requestDetails,
    '',
    'Internal Business Intelligence:',
    'Lead Source: Website',
    'Submission Channel: Kleihaus.com',
    `Region: ${payload.location || 'Not provided'}`,
    'Backend: Cloudflare Worker',
    'Storage: D1',
    `Internal UUID: ${payload.id}`,
  ].join('\n')

const sendResendEmail = async (env, payload) => {
  const apiKey = clean(env?.RESEND_API_KEY, 500)
  const from = clean(env?.QUOTE_EMAIL_FROM, 300)
  const to = clean(env?.QUOTE_EMAIL_TO || 'sales@kleihaus.com', 300)
  const insights = getLeadInsights(payload)
  const subject = buildEmailSubject(payload, insights)
  const missing = [
    !apiKey && 'RESEND_API_KEY',
    !from && 'QUOTE_EMAIL_FROM',
    !to && 'QUOTE_EMAIL_TO',
  ].filter(Boolean)

  console.log('RESEND_EMAIL_ATTEMPT', { requestId: payload.id, to })

  if (missing.length > 0) {
    logSafe('RESEND_EMAIL_FAILED', payload, { missing })
    return {
      success: false,
      configured: false,
      sent: false,
      error: `Missing email configuration: ${missing.join(', ')}`,
      missing,
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
        subject,
        html: buildEmailHtml(payload, insights),
        text: buildEmailText(payload, insights, subject),
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
  const missing = [
    !token && 'WHATSAPP_ACCESS_TOKEN',
    !phoneNumberId && 'WHATSAPP_PHONE_NUMBER_ID',
    !to && 'WHATSAPP_TO_NUMBER',
  ].filter(Boolean)

  console.log('WHATSAPP_ATTEMPT', { requestId: payload.id })

  if (missing.length > 0) {
    const skipped = {
      success: true,
      configured: false,
      sent: false,
      reason: 'WhatsApp Business API not configured',
      missing,
    }
    console.log('WHATSAPP_SKIPPED', { requestId: payload.id, reason: skipped.reason, missing })
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
      logSafe('WHATSAPP_FAILED', payload, { status: response.status })
      return {
        success: false,
        configured: true,
        sent: false,
        status: response.status,
        error: result?.error?.message || 'WhatsApp Business API request failed.',
      }
    }

    console.log('WHATSAPP_SUCCESS', { requestId: payload.id })
    return { success: true, configured: true, sent: true, provider: 'whatsapp_business_api', response: result }
  } catch (error) {
    logSafe('WHATSAPP_FAILED', payload, { error: error.message })
    return { success: false, configured: true, sent: false, error: error.message }
  }
}

const getWaitUntil = (context) => {
  if (typeof context?.waitUntil === 'function') return context.waitUntil.bind(context)
  if (typeof context?.ctx?.waitUntil === 'function') return context.ctx.waitUntil.bind(context.ctx)
  return null
}

const settleNotification = (result, fallback) => {
  if (result.status === 'fulfilled') return result.value

  return {
    success: false,
    configured: true,
    sent: false,
    error: result.reason?.message || fallback,
  }
}

const deliverQuoteNotifications = async (env, payload) => {
  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendResendEmail(env, payload),
    sendWhatsAppBusinessNotification(env, payload),
  ])

  return {
    email: settleNotification(emailResult, 'Email delivery failed.'),
    whatsapp: settleNotification(whatsappResult, 'WhatsApp delivery failed.'),
  }
}

const logNotificationResults = (payload, results) => {
  console.log('QUOTE_NOTIFICATIONS_SETTLED', {
    requestId: payload.id,
    emailSent: Boolean(results.email?.sent),
    whatsappSent: Boolean(results.whatsapp?.sent),
    whatsappReason: results.whatsapp?.reason,
  })
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

  const notificationWork = deliverQuoteNotifications(context.env, payload)
  const waitUntil = getWaitUntil(context)

  if (waitUntil) {
    waitUntil(notificationWork.then((results) => logNotificationResults(payload, results)))

    return json({
      success: true,
      message: SUCCESS_MESSAGE,
      requestId: payload.id,
      createdAt: payload.created_at,
      storage,
      email: { success: true, queued: true, sent: null, mode: 'background' },
      whatsapp: { success: true, queued: true, sent: null, mode: 'background' },
    })
  }

  const notifications = await notificationWork

  return json({
    success: true,
    message: SUCCESS_MESSAGE,
    requestId: payload.id,
    createdAt: payload.created_at,
    storage,
    email: notifications.email,
    whatsapp: notifications.whatsapp,
  })
}
