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
const getDb = (env) => env?.QUOTE_REQUESTS_DB || env?.DB

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

const classifyInquiryType = (payload, journey = {}) => {
  const journeyText = [
    journey.searchQuery,
    ...(journey.clickedProducts || []),
    ...(journey.clickedCategories || []),
  ].join(' ')
  const text = `${payload.requestDetails} ${payload.location} ${payload.source} ${journeyText}`.toLowerCase()

  if (includesAny(text, ['warehouse', 'bulk', 'large quantity', 'container', 'pallet', 'supply order'])) return 'Warehouse / Bulk Supply'
  if (includesAny(text, ['wholesale', 'reseller', 'dealer', 'distributor', 'trade price'])) return 'Wholesale Inquiry'
  if (includesAny(text, ['showroom', 'display', 'sample', 'samples', 'visit'])) return 'Showroom Inquiry'
  if (includesAny(text, ['commercial', 'hotel', 'school', 'hospital', 'office', 'mall', 'developer', 'contractor', 'institution'])) {
    return 'Commercial Project'
  }
  if (includesAny(text, ['home', 'house', 'residential', 'bathroom', 'kitchen', 'living room', 'floor'])) return 'Residential Project'

  return 'General Product Inquiry'
}

const getLeadPriority = (payload, inquiryType, journey = {}) => {
  const text = `${payload.requestDetails} ${payload.location} ${journey.searchQuery || ''}`.toLowerCase()
  const highPriorityKeywords = ['wholesale', 'bulk', 'warehouse', 'urgent', 'large quantity', 'contractor', 'project', 'hotel', 'school', 'hospital']
  const mediumPriorityKeywords = ['residential', 'bathroom', 'kitchen', 'floor', 'house', 'home']

  if ((journey.engagementScore || 0) >= 8) return 'High'
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

const getLeadInsights = (payload, journey = {}) => {
  const inquiryType = classifyInquiryType(payload, journey)
  const priority = getLeadPriority(payload, inquiryType, journey)

  return {
    inquiryType,
    priority,
    followUpWindow: getFollowUpWindow(priority),
    leadReference: buildLeadReference(payload),
    createdAtEat: formatTimestampEat(payload.created_at),
    normalizedPhone: normalizeKenyanPhone(payload.phone),
    journey,
  }
}

const buildEmailSubject = (payload, insights) =>
  `${EMAIL_SUBJECT_PREFIX} • ${payload.location || 'Website'} • ${insights.inquiryType}`

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(email, 180))

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
    anonymousVisitorId: clean(body.anonymousVisitorId, 120),
    sessionId: clean(body.sessionId, 120),
    pagePath: clean(body.pagePath, 600),
    referrer: clean(body.referrer, 600),
    utmSource: clean(body.utmSource || body.utm_source, 160),
    utmMedium: clean(body.utmMedium || body.utm_medium, 160),
    utmCampaign: clean(body.utmCampaign || body.utm_campaign, 180),
    lastSearchQuery: clean(body.lastSearchQuery || body.searchQuery, 240),
    clickedProducts: Array.isArray(body.clickedProducts) ? body.clickedProducts.map((item) => clean(item, 180)).filter(Boolean).slice(-8) : [],
    clickedCategories: Array.isArray(body.clickedCategories) ? body.clickedCategories.map((item) => clean(item, 180)).filter(Boolean).slice(-8) : [],
    whatsappClicked: Boolean(body.whatsappClicked),
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

const ensureCustomerJourneyEventsTable = async (db) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS customer_journey_events (
        id TEXT PRIMARY KEY,
        anonymous_visitor_id TEXT NOT NULL,
        session_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        page_path TEXT,
        referrer TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        search_query TEXT,
        clicked_element TEXT,
        product_category TEXT,
        product_name TEXT,
        lead_reference TEXT,
        metadata_json TEXT,
        created_at TEXT NOT NULL
      )`
    )
    .run()
}

const ignoreDuplicateColumn = async (operation) => {
  try {
    await operation()
  } catch (error) {
    if (!/duplicate column|already exists/i.test(error.message || '')) throw error
  }
}

const ensureQuoteJourneyColumns = async (db) => {
  await ignoreDuplicateColumn(() => db.prepare('ALTER TABLE quote_requests ADD COLUMN anonymous_visitor_id TEXT').run())
  await ignoreDuplicateColumn(() => db.prepare('ALTER TABLE quote_requests ADD COLUMN session_id TEXT').run())
  await ignoreDuplicateColumn(() => db.prepare('ALTER TABLE quote_requests ADD COLUMN lead_reference TEXT').run())
  await ignoreDuplicateColumn(() => db.prepare('ALTER TABLE quote_requests ADD COLUMN journey_summary_json TEXT').run())
  await ignoreDuplicateColumn(() => db.prepare('ALTER TABLE quote_requests ADD COLUMN lead_score INTEGER DEFAULT 0').run())
}

const getEventResults = (result) => result?.results || []

const summarizeJourneyContext = (payload, events = []) => {
  const searchQueries = [
    payload.lastSearchQuery,
    ...events.map((event) => event.search_query),
  ].filter(Boolean)
  const clickedProducts = [
    ...payload.clickedProducts,
    ...events.map((event) => event.product_name),
  ].filter(Boolean)
  const clickedCategories = [
    ...payload.clickedCategories,
    ...events.map((event) => event.product_category),
  ].filter(Boolean)
  const keyClicks = events
    .map((event) => event.clicked_element || event.product_name || event.product_category)
    .filter(Boolean)
    .slice(-8)
  const whatsappClicked = payload.whatsappClicked || events.some((event) => event.event_type === 'whatsapp_click')
  const searchQuery = searchQueries[0] || ''
  const source = payload.utmSource || events.find((event) => event.utm_source)?.utm_source || ''
  const referrer = payload.referrer || events.find((event) => event.referrer)?.referrer || ''
  const utmCampaign = payload.utmCampaign || events.find((event) => event.utm_campaign)?.utm_campaign || ''
  const engagementScore = Math.min(
    10,
    events.length +
      (searchQuery ? 2 : 0) +
      (whatsappClicked ? 2 : 0) +
      Math.min(clickedProducts.length, 3) +
      Math.min(clickedCategories.length, 2) +
      (source || referrer ? 1 : 0)
  )
  const opportunitySignals = [
    searchQuery && includesAny(searchQuery.toLowerCase(), ['600x600', '450x450', 'tiles', 'tile']) ? 'strong tile search intent' : '',
    whatsappClicked ? 'clicked WhatsApp before quote' : '',
    includesAny(`${payload.requestDetails} ${searchQuery}`.toLowerCase(), ['urgent', 'wholesale', 'bulk', 'project']) ? 'project or urgency signal' : '',
    source || referrer ? 'attributed acquisition source' : '',
  ].filter(Boolean)

  return {
    source: source || 'Website',
    referrer,
    utmSource: source,
    utmMedium: payload.utmMedium || events.find((event) => event.utm_medium)?.utm_medium || '',
    utmCampaign,
    searchQuery,
    clickedProducts: [...new Set(clickedProducts)].slice(-8),
    clickedCategories: [...new Set(clickedCategories)].slice(-8),
    keyClicks: [...new Set(keyClicks)].slice(-8),
    whatsappClicked,
    engagementScore,
    eventCount: events.length,
    opportunitySignals,
    journeySummary:
      events.length || searchQuery || whatsappClicked
        ? `${searchQuery ? `Searched "${searchQuery}". ` : ''}${clickedProducts.length ? `Clicked ${[...new Set(clickedProducts)].slice(0, 3).join(', ')}. ` : ''}${whatsappClicked ? 'Used WhatsApp before submitting. ' : ''}${source ? `Source: ${source}.` : ''}`.trim()
        : 'No prior journey signals captured.',
  }
}

const loadJourneyContext = async (env, payload) => {
  const db = getDb(env)
  const fallback = summarizeJourneyContext(payload, [])

  if (!db || !payload.sessionId) return fallback

  try {
    await ensureCustomerJourneyEventsTable(db)
    const result = await db
      .prepare(
        `SELECT event_type, page_path, referrer, utm_source, utm_medium, utm_campaign, search_query,
                clicked_element, product_category, product_name, created_at
           FROM customer_journey_events
          WHERE session_id = ?
          ORDER BY created_at DESC
          LIMIT 40`
      )
      .bind(payload.sessionId)
      .all()

    return summarizeJourneyContext(payload, getEventResults(result).reverse())
  } catch (error) {
    logSafe('JOURNEY_CONTEXT_FAILED', payload, { error: error.message })
    return fallback
  }
}

const linkJourneyEventsToLead = async (env, payload, leadReference) => {
  const db = getDb(env)
  if (!db || !payload.sessionId) return { success: true, linked: false, reason: 'No journey session.' }

  try {
    await ensureCustomerJourneyEventsTable(db)
    await db
      .prepare('UPDATE customer_journey_events SET lead_reference = ? WHERE session_id = ? AND (lead_reference IS NULL OR lead_reference = "")')
      .bind(leadReference, payload.sessionId)
      .run()

    return { success: true, linked: true }
  } catch (error) {
    logSafe('JOURNEY_LINK_FAILED', payload, { error: error.message })
    return { success: false, linked: false, error: error.message }
  }
}

const insertQuoteRequest = async (env, payload) => {
  const db = getDb(env)

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
    await ensureQuoteJourneyColumns(db)
    await db
      .prepare(
        `INSERT INTO quote_requests
          (id, name, email, phone, location, message, source, status, created_at,
           anonymous_visitor_id, session_id, lead_reference, journey_summary_json, lead_score)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
        payload.created_at,
        payload.anonymousVisitorId,
        payload.sessionId,
        payload.leadReference,
        JSON.stringify(payload.journey || {}),
        payload.journey?.engagementScore || 0
      )
      .run()

    console.log('D1_INSERT_SUCCESS', { requestId: payload.id, source: payload.source })
    return { success: true, configured: true, stored: true }
  } catch (error) {
    logSafe('D1_EXTENDED_INSERT_FAILED', payload, { error: error.message })

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

      console.log('D1_INSERT_SUCCESS', { requestId: payload.id, source: payload.source, mode: 'fallback' })
      return { success: true, configured: true, stored: true, fallback: true }
    } catch (fallbackError) {
      logSafe('D1_INSERT_FAILED', payload, { error: fallbackError.message })
      return { success: false, configured: true, stored: false, error: fallbackError.message }
    }
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
            <tr><td style="padding:8px 0;color:#6b6258;">Engagement Score</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(String(insights.journey?.engagementScore || 0))}/10</td></tr>
          </table>
        </div>

        <div style="border:1px solid #eadfce;border-radius:12px;padding:18px;margin-bottom:18px;">
          <h3 style="margin:0 0 14px;color:#1f1a17;font-size:18px;">Customer Journey Signals</h3>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6b6258;width:170px;">Source / Referrer</td><td style="padding:8px 0;">${escapeHtml(insights.journey?.source || insights.journey?.referrer || 'Not captured')}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">UTM Campaign</td><td style="padding:8px 0;">${escapeHtml(insights.journey?.utmCampaign || 'Not captured')}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">Search Query</td><td style="padding:8px 0;">${escapeHtml(insights.journey?.searchQuery || 'Not captured')}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">Key Clicks</td><td style="padding:8px 0;">${escapeHtml((insights.journey?.keyClicks || []).join(', ') || 'Not captured')}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6258;">WhatsApp Clicked</td><td style="padding:8px 0;font-weight:700;">${insights.journey?.whatsappClicked ? 'Yes' : 'No'}</td></tr>
          </table>
          <div style="margin-top:12px;background:#fbf8f3;border-left:4px solid #166534;padding:12px 14px;border-radius:8px;color:#302923;font-size:14px;line-height:1.5;">
            ${escapeHtml(insights.journey?.journeySummary || 'No prior journey signals captured.')}
          </div>
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
    `Engagement Score: ${insights.journey?.engagementScore || 0}/10`,
    insights.normalizedPhone ? `WhatsApp: https://wa.me/${insights.normalizedPhone}` : 'WhatsApp: Phone number not available',
    '',
    'Customer Journey Signals:',
    `Source / Referrer: ${insights.journey?.source || insights.journey?.referrer || 'Not captured'}`,
    `UTM Campaign: ${insights.journey?.utmCampaign || 'Not captured'}`,
    `Search Query: ${insights.journey?.searchQuery || 'Not captured'}`,
    `Key Clicks: ${(insights.journey?.keyClicks || []).join(', ') || 'Not captured'}`,
    `WhatsApp Clicked: ${insights.journey?.whatsappClicked ? 'Yes' : 'No'}`,
    `Journey Summary: ${insights.journey?.journeySummary || 'No prior journey signals captured.'}`,
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

const createResendClient = (apiKey) => ({
  emails: {
    async send(emailPayload) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        const error = new Error(result?.message || 'Resend email request failed.')
        error.status = response.status
        error.result = result
        throw error
      }

      return result
    },
  },
})

const sendResendEmail = async (env = {}, payload, journey) => {
  const apiKey = clean(env.RESEND_API_KEY, 500)
  const from = clean(env.QUOTE_EMAIL_FROM, 300)
  const salesEmail = env.SALES_EMAIL || 'sales@kleihaus.com'
  const to = clean(salesEmail, 300)
  const insights = getLeadInsights(payload, journey)
  const subject = buildEmailSubject(payload, insights)
  const missing = [
    !apiKey && 'RESEND_API_KEY',
    !from && 'QUOTE_EMAIL_FROM',
    !to && 'SALES_EMAIL',
  ].filter(Boolean)

  console.log('INTERNAL_EMAIL_ATTEMPT', { requestId: payload.id, to })
  console.log('RESEND_ATTEMPT', { requestId: payload.id, to })
  console.log('RESEND_EMAIL_ATTEMPT', { requestId: payload.id, to })

  if (missing.length > 0) {
    console.error('INTERNAL_EMAIL_FAILED', new Error(`Missing email configuration: ${missing.join(', ')}`))
    console.error('RESEND_FAILURE', { requestId: payload.id, missing })
    logSafe('INTERNAL_EMAIL_FAILED', payload, { missing })
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
    const resend = createResendClient(apiKey)
    const internalEmailResult = await resend.emails.send({
      from,
      to,
      subject,
      html: buildEmailHtml(payload, insights),
      text: buildEmailText(payload, insights, subject),
    })

    console.log('INTERNAL_EMAIL_SUCCESS', { requestId: payload.id, emailId: internalEmailResult.id })
    console.log('RESEND_SUCCESS', { requestId: payload.id, emailId: internalEmailResult.id })
    console.log('RESEND_EMAIL_SUCCESS', { requestId: payload.id, emailId: internalEmailResult.id })
    return { success: true, configured: true, sent: true, provider: 'resend', id: internalEmailResult.id }
  } catch (error) {
    console.error('INTERNAL_EMAIL_FAILED', error)
    console.error('RESEND_FAILURE', { requestId: payload.id, status: error.status, error: error.message })
    logSafe('INTERNAL_EMAIL_FAILED', payload, { error: error.message })
    logSafe('RESEND_EMAIL_FAILED', payload, { error: error.message })
    return { success: false, configured: true, sent: false, status: error.status, error: error.message }
  }
}

const buildCustomerEmailHtml = (payload, insights) => {
  const whatsappUrl = 'https://wa.me/254748827166'

  return `
  <div style="margin:0;padding:0;background:#f5f1eb;font-family:Arial,Helvetica,sans-serif;color:#1f1a17;">
    <div style="max-width:640px;margin:0 auto;padding:28px 16px;">
      <div style="background:#1f1a17;border-radius:14px 14px 0 0;padding:26px;border-bottom:5px solid #a65f1e;">
        <p style="margin:0 0 8px;color:#d8a15f;font-size:12px;letter-spacing:2px;font-weight:700;">KLEIHAUS CERAMICS</p>
        <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.25;">We received your request</h1>
        <p style="margin:10px 0 0;color:#f2dfc8;font-size:14px;">Inspiring Living</p>
      </div>

      <div style="background:#ffffff;border:1px solid #e7ded2;border-top:0;border-radius:0 0 14px 14px;padding:24px;">
        <p style="margin:0 0 14px;font-size:16px;line-height:1.7;">Hello ${escapeHtml(payload.name)},</p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#3d352e;">
          Thank you for contacting Kleihaus Ceramics. Our team has received your request and will review it shortly.
        </p>

        <div style="border:1px solid #eadfce;background:#fffaf3;border-radius:12px;padding:16px;margin:18px 0;">
          <p style="margin:0 0 6px;color:#6f4a24;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Lead Reference</p>
          <p style="margin:0;color:#1f1a17;font-size:22px;font-weight:700;">${escapeHtml(insights.leadReference)}</p>
          ${payload.location ? `<p style="margin:8px 0 0;color:#6b6258;font-size:14px;">Location: ${escapeHtml(payload.location)}</p>` : ''}
        </div>

        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3d352e;">
          For urgent project support, you can also reach us directly on WhatsApp.
        </p>

        <a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#0f2418;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:8px;">Chat with Kleihaus on WhatsApp</a>

        <p style="margin:22px 0 0;font-size:13px;line-height:1.6;color:#6b6258;">
          Kleihaus Ceramics<br />
          Tiles, sanitaryware, paints and finishing materials for homes and projects.
        </p>
      </div>
    </div>
  </div>
`
}

const buildCustomerEmailText = (payload, insights) =>
  [
    'We received your Kleihaus request',
    '',
    `Hello ${payload.name},`,
    '',
    'Thank you for contacting Kleihaus Ceramics. Our team has received your request and will review it shortly.',
    '',
    `Lead Reference: ${insights.leadReference}`,
    payload.location ? `Location: ${payload.location}` : '',
    '',
    'For urgent project support, you can also reach us directly on WhatsApp:',
    'https://wa.me/254748827166',
    '',
    'Kleihaus Ceramics',
    'Tiles, sanitaryware, paints and finishing materials for homes and projects.',
  ]
    .filter(Boolean)
    .join('\n')

const sendCustomerConfirmationEmail = async (env, payload) => {
  const customerEmail = clean(payload.email, 180)
  const apiKey = clean(env?.RESEND_API_KEY, 500)
  const from = clean(env?.QUOTE_EMAIL_FROM, 300)
  const insights = getLeadInsights(payload)
  const missing = [
    !apiKey && 'RESEND_API_KEY',
    !from && 'QUOTE_EMAIL_FROM',
  ].filter(Boolean)

  console.log('CUSTOMER_EMAIL_ATTEMPT', {
    requestId: payload.id,
    hasCustomerEmail: Boolean(customerEmail),
  })

  if (!customerEmail || !isValidEmail(customerEmail)) {
    return {
      success: true,
      configured: true,
      sent: false,
      skipped: true,
      reason: 'Customer email not provided or invalid.',
    }
  }

  if (missing.length > 0) {
    logSafe('CUSTOMER_EMAIL_FAILED', payload, { missing })
    return {
      success: false,
      configured: false,
      sent: false,
      error: `Missing customer email configuration: ${missing.join(', ')}`,
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
        to: customerEmail,
        subject: 'We received your Kleihaus request',
        html: buildCustomerEmailHtml(payload, insights),
        text: buildCustomerEmailText(payload, insights),
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      logSafe('CUSTOMER_EMAIL_FAILED', payload, { status: response.status })
      return {
        success: false,
        configured: true,
        sent: false,
        status: response.status,
        error: result?.message || 'Customer confirmation email request failed.',
      }
    }

    console.log('CUSTOMER_EMAIL_SUCCESS', { requestId: payload.id, emailId: result.id })
    return { success: true, configured: true, sent: true, provider: 'resend', id: result.id }
  } catch (error) {
    logSafe('CUSTOMER_EMAIL_FAILED', payload, { error: error.message })
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

const getWhatsAppStatusForResponse = (env) => {
  const missing = [
    !clean(env?.WHATSAPP_ACCESS_TOKEN, 1000) && 'WHATSAPP_ACCESS_TOKEN',
    !clean(env?.WHATSAPP_PHONE_NUMBER_ID, 120) && 'WHATSAPP_PHONE_NUMBER_ID',
    !clean(env?.WHATSAPP_TO_NUMBER, 80) && 'WHATSAPP_TO_NUMBER',
  ].filter(Boolean)

  if (missing.length > 0) {
    return {
      success: true,
      configured: false,
      sent: false,
      reason: 'WhatsApp Business API not configured',
      missing,
    }
  }

  return { success: true, queued: true, sent: null, mode: 'background' }
}

const deliverBackgroundNotifications = async (env, payload) => {
  const [customerEmailResult, whatsappResult] = await Promise.allSettled([
    sendCustomerConfirmationEmail(env, payload),
    sendWhatsAppBusinessNotification(env, payload),
  ])

  return {
    customerEmail: settleNotification(customerEmailResult, 'Customer confirmation email delivery failed.'),
    whatsapp: settleNotification(whatsappResult, 'WhatsApp delivery failed.'),
  }
}

const logNotificationResults = (payload, results) => {
  console.log('QUOTE_NOTIFICATIONS_SETTLED', {
    requestId: payload.id,
    customerEmailSent: Boolean(results.customerEmail?.sent),
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

  payload.leadReference = buildLeadReference(payload)
  payload.journey = await loadJourneyContext(context.env, payload)

  console.log('QUOTE_REQUEST_RECEIVED', {
    requestId: payload.id,
    source: payload.source,
    hasEmail: Boolean(payload.email),
    hasPhone: Boolean(payload.phone),
  })
  console.log('FRONTEND_PAYLOAD_RECEIVED', {
    requestId: payload.id,
    hasName: Boolean(payload.name),
    hasEmail: Boolean(payload.email),
    hasPhone: Boolean(payload.phone),
    hasLocation: Boolean(payload.location),
    hasRequestDetails: Boolean(payload.requestDetails),
    hasJourneySession: Boolean(payload.sessionId),
  })

  const storage = await insertQuoteRequest(context.env, payload)
  if (!storage.success) {
    return json({ success: false, message: 'Quote request could not be saved.', storage }, 500)
  }

  await linkJourneyEventsToLead(context.env, payload, payload.leadReference)

  const email = await sendResendEmail(context.env, payload, payload.journey)
  if (!email.success) {
    return json({ success: false, error: 'Internal email failed' }, 500)
  }

  const backgroundWork = deliverBackgroundNotifications(context.env, payload)
  const waitUntil = getWaitUntil(context)
  const whatsapp = getWhatsAppStatusForResponse(context.env)
  const customerEmail = payload.email && isValidEmail(payload.email)
    ? { success: true, queued: true, sent: null, mode: 'background' }
    : {
        success: true,
        configured: true,
        sent: false,
        skipped: true,
        reason: 'Customer email not provided or invalid.',
      }

  if (waitUntil) {
    waitUntil(backgroundWork.then((results) => logNotificationResults(payload, results)))

    return json({
      success: true,
      message: SUCCESS_MESSAGE,
      requestId: payload.id,
      leadReference: payload.leadReference,
      createdAt: payload.created_at,
      storage,
      email,
      customerEmail,
      whatsapp,
    })
  }

  const notifications = await backgroundWork

  return json({
    success: true,
    message: SUCCESS_MESSAGE,
    requestId: payload.id,
    leadReference: payload.leadReference,
    createdAt: payload.created_at,
    storage,
    email,
    customerEmail: notifications.customerEmail,
    whatsapp: notifications.whatsapp,
  })
}
