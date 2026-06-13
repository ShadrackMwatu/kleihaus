const ALERT_STORAGE_KEY = 'kleihaus_high_value_whatsapp_alerts_v1'
const REPEATED_CATEGORY_THRESHOLD = 3

const urgentSearchTerms = ['quotation', 'quote', 'price', 'pricing', 'delivery', 'installation']
const productSearchTerms = [
  'tile',
  'tiles',
  'sanitaryware',
  'basin',
  'toilet',
  'shower',
  'tap',
  'mixer',
  'paint',
  'adhesive',
  'grout',
  'floor',
  'wall',
  'bathroom',
  'kitchen',
  'outdoor',
]

const canUseStorage = () => {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage)
  } catch {
    return false
  }
}

const readAlerts = () => {
  if (!canUseStorage()) return []

  try {
    return JSON.parse(window.localStorage.getItem(ALERT_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

const writeAlerts = (alerts) => {
  const cappedAlerts = alerts.slice(-100)
  if (typeof window !== 'undefined') window.__kleihausHighValueWhatsAppAlerts = cappedAlerts
  if (canUseStorage()) window.localStorage.setItem(ALERT_STORAGE_KEY, JSON.stringify(cappedAlerts))
}

const includesAny = (value = '', terms = []) => {
  const normalized = value.toLowerCase()
  return terms.some((term) => normalized.includes(term))
}

const countCategoryViews = (events, category) =>
  events.filter((event) => event.eventType === 'category_click' && (event.productCategory || event.payload?.category) === category).length

const getAlertReason = (event, events) => {
  if (event.eventType === 'whatsapp_click') return 'clicked WhatsApp'
  if (event.eventType === 'quote_form_submit_attempt') return 'started quote submission'
  if (event.eventType === 'quote_form_submit_success') return 'submitted quote form'

  if (event.eventType === 'search_query') {
    const query = event.searchQuery || event.payload?.query || ''
    if (includesAny(query, urgentSearchTerms)) return `searched high-intent term: ${query}`
    if (includesAny(query, productSearchTerms)) return `searched product: ${query}`
  }

  if (event.eventType === 'category_click') {
    const category = event.productCategory || event.payload?.category
    if (category && countCategoryViews(events, category) >= REPEATED_CATEGORY_THRESHOLD) {
      return `viewed category repeatedly: ${category}`
    }
  }

  return null
}

const buildAlertMessage = (event, reason) => {
  const payload = event.payload || {}
  return [
    'Kleihaus high-value website action',
    `Reason: ${reason}`,
    `Action: ${event.eventType}`,
    event.searchQuery || payload.query ? `Search: ${event.searchQuery || payload.query}` : null,
    event.productCategory || payload.category ? `Category: ${event.productCategory || payload.category}` : null,
    event.productName || payload.product ? `Product: ${event.productName || payload.product}` : null,
    event.clickedElement || payload.source ? `Source: ${event.clickedElement || payload.source}` : null,
    payload.projectType ? `Project type: ${payload.projectType}` : null,
    `Session: ${event.sessionId || event.anonymousSessionId}`,
    `Time: ${event.timestamp}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export const whatsappAlertService = {
  processEvent(event, events) {
    const reason = getAlertReason(event, events)
    if (!reason) return null

    const message = buildAlertMessage(event, reason)
    const alert = {
      id: crypto.randomUUID(),
      reason,
      eventId: event.id,
      eventType: event.eventType,
      message,
      status: 'ready_for_whatsapp_business_api',
      timestamp: new Date().toISOString(),
    }

    writeAlerts([...readAlerts(), alert])
    return alert
  },

  getAlerts() {
    return readAlerts()
  },

  futureIntegrations: {
    whatsappBusinessApi: 'placeholder: send approved high-value alert template through WhatsApp Business Cloud API',
    alertWebhook: 'placeholder: POST high-value alert payload to a serverless endpoint when backend credentials are available',
  },
}
