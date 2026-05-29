const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const allowedEventTypes = new Set([
  'page_view',
  'quote_form_view',
  'quote_form_start',
  'quote_form_submit_attempt',
  'quote_form_submit_success',
  'quote_form_submit_error',
  'whatsapp_click',
  'product_click',
  'category_click',
  'search_query',
  'contact_click',
  'phone_click',
  'email_click',
])

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...corsHeaders,
    },
  })

const clean = (value, maxLength = 240) =>
  String(value || '')
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .slice(0, maxLength)

const cleanLong = (value, maxLength = 1200) => clean(value, maxLength)

const getDb = (env) => env?.QUOTE_REQUESTS_DB || env?.DB

const ensureJourneyEventsTable = async (db) => {
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

const normalizeEvent = (body = {}) => {
  const eventType = clean(body.eventType, 80)
  const metadata = {
    source: clean(body.source, 80),
    requestId: clean(body.requestId, 120),
  }

  return {
    id: clean(body.id, 120) || crypto.randomUUID(),
    anonymousVisitorId: clean(body.anonymousVisitorId, 120),
    sessionId: clean(body.sessionId, 120),
    eventType,
    pagePath: cleanLong(body.pagePath, 600),
    referrer: cleanLong(body.referrer, 600),
    utmSource: clean(body.utmSource || body.utm_source, 160),
    utmMedium: clean(body.utmMedium || body.utm_medium, 160),
    utmCampaign: clean(body.utmCampaign || body.utm_campaign, 180),
    searchQuery: clean(body.searchQuery || body.query, 240),
    clickedElement: clean(body.clickedElement || body.source || body.element, 240),
    productCategory: clean(body.productCategory || body.category, 180),
    productName: clean(body.productName || body.product, 180),
    leadReference: clean(body.leadReference, 120),
    metadataJson: JSON.stringify(metadata),
    createdAt: clean(body.timestamp, 80) || new Date().toISOString(),
  }
}

const validateEvent = (event) => {
  const errors = []

  if (!allowedEventTypes.has(event.eventType)) errors.push('Unsupported event type.')
  if (!event.anonymousVisitorId) errors.push('anonymousVisitorId is required.')
  if (!event.sessionId) errors.push('sessionId is required.')

  return errors
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

export async function onRequestPost(context) {
  let body

  try {
    body = await context.request.json()
  } catch {
    return json({ success: true })
  }

  const event = normalizeEvent(body)
  const errors = validateEvent(event)

  if (errors.length > 0) {
    console.log('JOURNEY_EVENT_SKIPPED', { eventType: event.eventType, errors })
    return json({ success: true })
  }

  const db = getDb(context.env)
  if (!db) {
    console.log('JOURNEY_EVENT_DB_MISSING', { eventType: event.eventType })
    return json({ success: true })
  }

  try {
    await ensureJourneyEventsTable(db)
    await db
      .prepare(
        `INSERT OR IGNORE INTO customer_journey_events
          (id, anonymous_visitor_id, session_id, event_type, page_path, referrer, utm_source, utm_medium, utm_campaign,
           search_query, clicked_element, product_category, product_name, lead_reference, metadata_json, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        event.id,
        event.anonymousVisitorId,
        event.sessionId,
        event.eventType,
        event.pagePath,
        event.referrer,
        event.utmSource,
        event.utmMedium,
        event.utmCampaign,
        event.searchQuery,
        event.clickedElement,
        event.productCategory,
        event.productName,
        event.leadReference,
        event.metadataJson,
        event.createdAt
      )
      .run()

    console.log('JOURNEY_EVENT_STORED', { eventType: event.eventType, sessionId: event.sessionId })
  } catch (error) {
    console.log('JOURNEY_EVENT_STORE_FAILED', { eventType: event.eventType, error: error.message })
  }

  return json({ success: true })
}
