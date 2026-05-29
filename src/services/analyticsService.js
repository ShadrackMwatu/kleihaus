import { whatsappAlertService } from './whatsappAlertService'

const STORAGE_KEY = 'kleihaus_ai_intelligence_events_v1'
const VISITOR_KEY = 'kleihaus_anonymous_visitor_v1'
const SESSION_KEY = 'kleihaus_anonymous_session_v1'
const MAX_EVENTS = 250
const TRACK_ENDPOINT = '/api/track-event'
const EVENT_ALIASES = {
  search: 'search_query',
  search_submitted: 'search_query',
  autocomplete_select: 'search_query',
  category_clicked: 'category_click',
  product_interest: 'product_click',
  product_interest_clicked: 'product_click',
  whatsapp_cta_clicked: 'whatsapp_click',
  quote_form_submitted: 'quote_form_submit_attempt',
  contact_form_submit: 'quote_form_submit_attempt',
}
let memoryEvents = []
let memoryVisitorId = null
let memorySessionId = null

const canUseStorage = () => {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage)
  } catch {
    return false
  }
}

const createAnonymousId = (prefix) => `${prefix}_${crypto.randomUUID()}`

const getStoredId = (key, prefix, memoryValueSetter) => {
  if (!canUseStorage()) {
    const memoryValue = memoryValueSetter()
    return memoryValue
  }

  const existing = window.localStorage.getItem(key)
  if (existing) return existing

  const anonymousId = createAnonymousId(prefix)
  window.localStorage.setItem(key, anonymousId)
  return anonymousId
}

const getAnonymousVisitorId = () =>
  getStoredId(VISITOR_KEY, 'visitor', () => {
    if (!memoryVisitorId) memoryVisitorId = createAnonymousId('visitor_memory')
    return memoryVisitorId
  })

const getSessionId = () =>
  getStoredId(SESSION_KEY, 'session', () => {
    if (!memorySessionId) memorySessionId = createAnonymousId('session_memory')
    return memorySessionId
  })

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

const getUrlContext = () => {
  if (typeof window === 'undefined') {
    return {
      pagePath: '',
      referrer: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
    }
  }

  const params = new URLSearchParams(window.location.search)

  return {
    pagePath: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || '',
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
  }
}

const sanitizePayload = (payload = {}) =>
  Object.fromEntries(
    Object.entries(payload).filter(([key]) => !['name', 'email', 'phone', 'message', 'requestdetails', 'details'].includes(key.toLowerCase())),
  )

const normalizeEventType = (eventType) => EVENT_ALIASES[eventType] || eventType

const normalizeEvent = (eventType, payload = {}) => {
  const safePayload = sanitizePayload(payload)
  const urlContext = getUrlContext()

  return {
    id: crypto.randomUUID(),
    eventType: normalizeEventType(eventType),
    sessionId: getSessionId(),
    anonymousVisitorId: getAnonymousVisitorId(),
    pagePath: safePayload.pagePath || urlContext.pagePath,
    referrer: safePayload.referrer || urlContext.referrer,
    utmSource: safePayload.utmSource || safePayload.utm_source || urlContext.utmSource,
    utmMedium: safePayload.utmMedium || safePayload.utm_medium || urlContext.utmMedium,
    utmCampaign: safePayload.utmCampaign || safePayload.utm_campaign || urlContext.utmCampaign,
    searchQuery: safePayload.searchQuery || safePayload.query || '',
    clickedElement: safePayload.clickedElement || safePayload.source || safePayload.element || '',
    productCategory: safePayload.productCategory || safePayload.category || '',
    productName: safePayload.productName || safePayload.product || '',
    timestamp: new Date().toISOString(),
    source: 'kleihaus_website',
    payload: safePayload,
  }
}

const sendEventToBackend = (event) => {
  if (typeof fetch !== 'function') return

  const body = JSON.stringify(event)

  // Privacy guard: backend analytics receives only anonymous IDs and business interaction metadata.
  fetch(TRACK_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: body.length < 60000,
  }).catch(() => {
    // Tracking must never block or break the public website.
  })
}

export const analyticsService = {
  track(eventType, payload = {}) {
    const event = normalizeEvent(eventType, payload)

    const events = [...readEvents(), event]
    writeEvents(events)
    whatsappAlertService.processEvent(event, events)
    sendEventToBackend(event)
    return event
  },

  getJourneyContext() {
    const events = readEvents()
    const recentEvents = events.slice(-30)
    const lastSearch = [...recentEvents].reverse().find((event) => event.searchQuery)
    const clickedProducts = recentEvents.map((event) => event.productName).filter(Boolean)
    const clickedCategories = recentEvents.map((event) => event.productCategory).filter(Boolean)
    const whatsappClicked = recentEvents.some((event) => event.eventType === 'whatsapp_click')
    const urlContext = getUrlContext()

    return {
      anonymousVisitorId: getAnonymousVisitorId(),
      sessionId: getSessionId(),
      pagePath: urlContext.pagePath,
      referrer: urlContext.referrer,
      utmSource: urlContext.utmSource,
      utmMedium: urlContext.utmMedium,
      utmCampaign: urlContext.utmCampaign,
      lastSearchQuery: lastSearch?.searchQuery || '',
      clickedProducts: [...new Set(clickedProducts)].slice(-8),
      clickedCategories: [...new Set(clickedCategories)].slice(-8),
      whatsappClicked,
    }
  },

  getEvents() {
    return readEvents()
  },

  getCollections() {
    const events = readEvents()
    return {
      search_logs: events.filter((event) => event.eventType === 'search_query'),
      category_interest: events.filter((event) => event.eventType === 'category_click'),
      product_interest: events.filter((event) => event.eventType === 'product_click'),
      recommendation_signals: events.filter((event) => event.eventType === 'recommendation_signal'),
      lead_generation_events: events.filter((event) =>
        ['search_query', 'category_click', 'product_click', 'whatsapp_click', 'quote_form_submit_attempt', 'quote_form_submit_success', 'guide_topic_clicked'].includes(event.eventType),
      ),
      high_value_whatsapp_alerts: whatsappAlertService.getAlerts(),
      monthly_summary_data: this.buildMonthlySummary(events),
    }
  },

  buildMonthlySummary(events = readEvents()) {
    const getField = (event, field) => event?.[field] || event?.payload?.[field]
    const countBy = (eventType, field) =>
      events
        .filter((event) => event.eventType === eventType && getField(event, field))
        .reduce((acc, event) => {
          const key = getField(event, field)
          acc[key] = (acc[key] || 0) + 1
          return acc
        }, {})
    const countByAny = (eventTypes, field) =>
      events
        .filter((event) => eventTypes.includes(event.eventType) && getField(event, field))
        .reduce((acc, event) => {
          const key = getField(event, field)
          acc[key] = (acc[key] || 0) + 1
          return acc
        }, {})

    return {
      top_searches: countByAny(['search_query'], 'searchQuery'),
      emerging_searches: countBy('search_query', 'searchQuery'),
      most_viewed_categories: countByAny(['category_click'], 'productCategory'),
      product_interest: countByAny(['product_click'], 'productName'),
      whatsapp_inquiry_trends: countByAny(['whatsapp_click'], 'clickedElement'),
      quote_request_trends: countBy('quote_form_submit_success', 'clickedElement'),
      top_traffic_sources: countByAny(['page_view', 'quote_form_submit_success'], 'utmSource'),
      clicked_products: countByAny(['product_click'], 'productName'),
      clicked_categories: countByAny(['category_click'], 'productCategory'),
      lead_sources_by_utm: countByAny(['quote_form_submit_attempt', 'quote_form_submit_success'], 'utmSource'),
      search_to_lead_patterns: events
        .filter((event) => event.eventType === 'quote_form_submit_success')
        .map((event) => event.searchQuery || event.payload?.searchQuery)
        .filter(Boolean)
        .slice(-12),
      journey_opportunity_areas: events
        .filter((event) => event.eventType === 'search_query' && /600x600|450x450|wholesale|bulk|urgent|machakos|tiles?/i.test(event.searchQuery || ''))
        .map((event) => event.searchQuery)
        .slice(-12),
      guide_topics_clicked: countBy('guide_topic_clicked', 'topic'),
      high_value_whatsapp_alerts: whatsappAlertService.getAlerts().map((alert) => alert.reason),
      county_location_interest: countBy('location_interest', 'location'),
      weak_signals: events
        .filter((event) => event.eventType === 'search_query' && event.searchQuery?.length > 2)
        .map((event) => event.searchQuery)
        .slice(-8),
    }
  },

  futureIntegrations: {
    llmIntentClassifier: 'placeholder: classify searches into room, budget, material and urgency intent',
    cloudWarehouseSync: 'placeholder: sync anonymized aggregate events to a consent-aware analytics backend',
    recommendationTraining: 'placeholder: train monthly category affinity and complementary-product models',
  },
}
