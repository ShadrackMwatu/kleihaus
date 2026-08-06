import { whatsappAlertService } from './whatsappAlertService'

const STORAGE_KEY = 'kleihaus_ai_intelligence_events_v1'
const VISITOR_KEY = 'kleihaus_anonymous_visitor_v1'
const SESSION_KEY = 'kleihaus_anonymous_session_v1'
const MAX_EVENTS = 250
const TRACK_ENDPOINT = '/api/track-event'
const GA_MEASUREMENT_ID =
  typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GA_MEASUREMENT_ID : ''
const ANALYTICS_DEBUG =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_ANALYTICS_DEBUG === 'true'
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
  guide_topic_clicked: 'guide_click',
}
const GA_EVENT_NAMES = {
  page_view: 'page_view',
  quote_form_submit_success: 'quote_submit',
  whatsapp_click: 'whatsapp_click',
  phone_click: 'phone_click',
  email_click: 'email_click',
  social_click: 'social_click',
  hub_click: 'cta_click',
  guide_click: 'guide_click',
  guide_view: 'guide_view',
  location_view: 'location_view',
  contact_click: 'cta_click',
  project_click: 'cta_click',
  audience_pathway_click: 'cta_click',
  category_click: 'cta_click',
  product_click: 'cta_click',
  project_gallery_open: 'select_content',
  project_gallery_next: 'select_content',
  project_gallery_previous: 'select_content',
  project_gallery_close: 'select_content',
}
let memoryEvents = []
let memoryVisitorId = null
let memorySessionId = null
let gaInitialized = false

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
      deviceType: '',
    }
  }

  const params = new URLSearchParams(window.location.search)
  const width = window.innerWidth || 0

  return {
    pagePath: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || '',
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    deviceType: width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop',
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
    pageType: safePayload.pageType || '',
    ctaLabel: safePayload.ctaLabel || '',
    ctaPosition: safePayload.ctaPosition || safePayload.clickedElement || '',
    contactMethod: safePayload.contactMethod || '',
    enquiryIntent: safePayload.enquiryIntent || safePayload.intent || '',
    guideName: safePayload.guideName || safePayload.guide || '',
    formName: safePayload.formName || '',
    formStep: safePayload.formStep || '',
    formStatus: safePayload.formStatus || '',
    leadSource: safePayload.leadSource || safePayload.source || urlContext.utmSource || '',
    deviceType: safePayload.deviceType || urlContext.deviceType,
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

const getGaMeasurementId = () => String(GA_MEASUREMENT_ID || '').trim()

const initializeGa = () => {
  const measurementId = getGaMeasurementId()
  if (!measurementId || gaInitialized || typeof window === 'undefined' || typeof document === 'undefined') return Boolean(measurementId)

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }

  const existingScript = document.querySelector(`script[src*="${measurementId}"]`)
  if (!existingScript) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: false,
  })
  gaInitialized = true
  return true
}

const toGaEventName = (eventType) => GA_EVENT_NAMES[eventType] || eventType

const getGaPageLocation = (pagePath) => {
  if (typeof window === 'undefined') return undefined

  try {
    return new URL(pagePath || window.location.pathname || '/', window.location.origin).href
  } catch {
    return window.location.href
  }
}

const logAnalyticsDebug = (event, status) => {
  if (!ANALYTICS_DEBUG || typeof console === 'undefined') return

  console.info('KLEIHAUS_ANALYTICS_DEBUG', {
    eventType: event.eventType,
    gaEventName: toGaEventName(event.eventType),
    status,
    timestamp: event.timestamp,
    gtagAvailable: typeof window !== 'undefined' && typeof window.gtag === 'function',
    pagePath: event.pagePath,
    clickedElement: event.clickedElement,
    productCategory: event.productCategory,
    productName: event.productName,
    utmSource: event.utmSource,
  })
}

const sendEventToGa = (event) => {
  try {
    const measurementId = getGaMeasurementId()
    if (!initializeGa() || typeof window === 'undefined' || typeof window.gtag !== 'function') {
      logAnalyticsDebug(event, 'ga_not_configured')
      return
    }

    window.gtag('event', toGaEventName(event.eventType), {
      send_to: measurementId,
      transport_type: 'beacon',
      event_category: 'kleihaus_website',
      event_label: event.clickedElement || event.productCategory || event.productName || event.searchQuery || event.pagePath,
      page_path: event.pagePath,
      page_location: getGaPageLocation(event.pagePath),
      page_title: typeof document !== 'undefined' ? document.title : undefined,
      search_term: event.searchQuery || undefined,
      item_category: event.productCategory || undefined,
      item_name: event.productName || undefined,
      traffic_source: event.utmSource || undefined,
      traffic_medium: event.utmMedium || undefined,
      campaign: event.utmCampaign || undefined,
      page_type: event.pageType || undefined,
      cta_label: event.ctaLabel || undefined,
      cta_position: event.ctaPosition || undefined,
      contact_method: event.contactMethod || undefined,
      enquiry_intent: event.enquiryIntent || undefined,
      guide_name: event.guideName || undefined,
      form_name: event.formName || undefined,
      form_step: event.formStep || undefined,
      form_status: event.formStatus || undefined,
      lead_source: event.leadSource || undefined,
      device_type: event.deviceType || undefined,
    })
    logAnalyticsDebug(event, 'ga_event_sent')
  } catch {
    logAnalyticsDebug(event, 'ga_event_failed')
    // GA4 is optional; analytics failures must not affect the customer journey.
  }
}

export const analyticsService = {
  track(eventType, payload = {}) {
    const event = normalizeEvent(eventType, payload)

    const events = [...readEvents(), event]
    writeEvents(events)
    whatsappAlertService.processEvent(event, events)
    sendEventToBackend(event)
    sendEventToGa(event)
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
