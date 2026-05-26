import { whatsappAlertService } from './whatsappAlertService'

const STORAGE_KEY = 'kleihaus_ai_intelligence_events_v1'
const SESSION_KEY = 'kleihaus_anonymous_session_v1'
const MAX_EVENTS = 250
let memoryEvents = []
let memorySessionId = null

const canUseStorage = () => {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage)
  } catch {
    return false
  }
}

const getSessionId = () => {
  if (!canUseStorage()) {
    if (!memorySessionId) memorySessionId = `anon_memory_${crypto.randomUUID()}`
    return memorySessionId
  }

  const existing = window.localStorage.getItem(SESSION_KEY)
  if (existing) return existing

  const anonymousId = `anon_${crypto.randomUUID()}`
  window.localStorage.setItem(SESSION_KEY, anonymousId)
  return anonymousId
}

const readEvents = () => {
  if (!canUseStorage()) return memoryEvents

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

const writeEvents = (events) => {
  const cappedEvents = events.slice(-MAX_EVENTS)
  memoryEvents = cappedEvents

  if (!canUseStorage()) {
    if (typeof window !== 'undefined') window.__kleihausIntelligenceEvents = cappedEvents
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cappedEvents))
  window.__kleihausIntelligenceEvents = cappedEvents
}

const sanitizePayload = (payload = {}) =>
  Object.fromEntries(
    Object.entries(payload).filter(([key]) => !['name', 'email', 'phone', 'message'].includes(key.toLowerCase())),
  )

export const analyticsService = {
  track(eventType, payload = {}) {
    const event = {
      id: crypto.randomUUID(),
      eventType,
      payload: sanitizePayload(payload),
      anonymousSessionId: getSessionId(),
      timestamp: new Date().toISOString(),
      source: 'kleihaus_website',
    }

    const events = [...readEvents(), event]
    writeEvents(events)
    whatsappAlertService.processEvent(event, events)
    return event
  },

  getEvents() {
    return readEvents()
  },

  getCollections() {
    const events = readEvents()
    return {
      search_logs: events.filter((event) => event.eventType === 'search'),
      category_interest: events.filter((event) => event.eventType === 'category_click'),
      product_interest: events.filter((event) => event.eventType === 'product_interest'),
      recommendation_signals: events.filter((event) => event.eventType === 'recommendation_signal'),
      high_value_whatsapp_alerts: whatsappAlertService.getAlerts(),
      monthly_summary_data: this.buildMonthlySummary(events),
    }
  },

  buildMonthlySummary(events = readEvents()) {
    const countBy = (eventType, field) =>
      events
        .filter((event) => event.eventType === eventType && event.payload?.[field])
        .reduce((acc, event) => {
          const key = event.payload[field]
          acc[key] = (acc[key] || 0) + 1
          return acc
        }, {})

    return {
      top_searches: countBy('search', 'query'),
      emerging_searches: countBy('autocomplete_select', 'query'),
      most_viewed_categories: countBy('category_click', 'category'),
      product_interest: countBy('product_interest', 'product'),
      whatsapp_inquiry_trends: countBy('whatsapp_click', 'source'),
      high_value_whatsapp_alerts: whatsappAlertService.getAlerts().map((alert) => alert.reason),
      county_location_interest: countBy('location_interest', 'location'),
      weak_signals: events
        .filter((event) => event.eventType === 'search' && event.payload?.query?.length > 2)
        .map((event) => event.payload.query)
        .slice(-8),
    }
  },

  futureIntegrations: {
    llmIntentClassifier: 'placeholder: classify searches into room, budget, material and urgency intent',
    cloudWarehouseSync: 'placeholder: sync anonymized aggregate events to a consent-aware analytics backend',
    recommendationTraining: 'placeholder: train monthly category affinity and complementary-product models',
  },
}
