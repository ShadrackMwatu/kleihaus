const ALERT_STORAGE_KEY = 'kleihaus_high_value_whatsapp_alerts_v1'
const BUSINESS_WHATSAPP_NUMBER = '254748827166'
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
  events.filter((event) => event.eventType === 'category_click' && event.payload?.category === category).length

const getAlertReason = (event, events) => {
  if (event.eventType === 'whatsapp_click') return 'clicked WhatsApp'
  if (event.eventType === 'contact_form_submit') return 'submitted contact form'

  if (event.eventType === 'search') {
    const query = event.payload?.query || ''
    if (includesAny(query, urgentSearchTerms)) return `searched high-intent term: ${query}`
    if (includesAny(query, productSearchTerms)) return `searched product: ${query}`
  }

  if (event.eventType === 'category_click') {
    const category = event.payload?.category
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
    payload.query ? `Search: ${payload.query}` : null,
    payload.category ? `Category: ${payload.category}` : null,
    payload.product ? `Product: ${payload.product}` : null,
    payload.source ? `Source: ${payload.source}` : null,
    payload.projectType ? `Project type: ${payload.projectType}` : null,
    `Session: ${event.anonymousSessionId}`,
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
      whatsappUrl: `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
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
