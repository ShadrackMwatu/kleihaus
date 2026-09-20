// Closed-loop commercial SEO core. External connectors are inert unless explicitly enabled and configured.
export const CONNECTOR_NAMES = Object.freeze({
  SEARCH_CONSOLE: 'search_console',
  GA4: 'ga4',
  COMMERCIAL_OUTCOMES: 'commercial_outcomes',
})

export const connectorConfig = (env = process.env) => ({
  searchConsole: {
    enabled: env.SEO_GSC_ENABLED === 'true',
    property: env.SEO_GSC_PROPERTY || null,
    credentialPresent: Boolean(env.SEO_GSC_CREDENTIALS_JSON),
  },
  ga4: {
    enabled: env.SEO_GA4_ENABLED === 'true',
    propertyId: env.SEO_GA4_PROPERTY_ID || null,
    credentialPresent: Boolean(env.SEO_GA4_CREDENTIALS_JSON),
  },
  commercialOutcomes: {
    enabled: env.SEO_OUTCOMES_ENABLED === 'true',
    source: env.SEO_OUTCOMES_SOURCE || null,
    credentialPresent: Boolean(env.SEO_OUTCOMES_TOKEN),
  },
})

export const connectorReadiness = (config) => ({
  searchConsole: {
    active: Boolean(config.searchConsole.enabled && config.searchConsole.property && config.searchConsole.credentialPresent),
    missing: [
      !config.searchConsole.enabled && 'SEO_GSC_ENABLED=true',
      !config.searchConsole.property && 'SEO_GSC_PROPERTY',
      !config.searchConsole.credentialPresent && 'SEO_GSC_CREDENTIALS_JSON',
    ].filter(Boolean),
  },
  ga4: {
    active: Boolean(config.ga4.enabled && config.ga4.propertyId && config.ga4.credentialPresent),
    missing: [
      !config.ga4.enabled && 'SEO_GA4_ENABLED=true',
      !config.ga4.propertyId && 'SEO_GA4_PROPERTY_ID',
      !config.ga4.credentialPresent && 'SEO_GA4_CREDENTIALS_JSON',
    ].filter(Boolean),
  },
  commercialOutcomes: {
    active: Boolean(config.commercialOutcomes.enabled && config.commercialOutcomes.source && config.commercialOutcomes.credentialPresent),
    missing: [
      !config.commercialOutcomes.enabled && 'SEO_OUTCOMES_ENABLED=true',
      !config.commercialOutcomes.source && 'SEO_OUTCOMES_SOURCE',
      !config.commercialOutcomes.credentialPresent && 'SEO_OUTCOMES_TOKEN',
    ].filter(Boolean),
  },
})

const safeRate = (numerator, denominator) =>
  Number.isFinite(numerator) && Number.isFinite(denominator) && denominator > 0 ? numerator / denominator : null

export const buildCommercialFunnel = ({ search = {}, analytics = {}, outcomes = {}, costs = {} } = {}) => {
  const revenue = Number.isFinite(outcomes.organicRevenue) ? outcomes.organicRevenue : null
  const seoCost = Number.isFinite(costs.verifiedSeoCost) ? costs.verifiedSeoCost : null
  return {
    demand: {
      impressions: search.impressions ?? null,
      clicks: search.clicks ?? null,
      ctr: search.ctr ?? safeRate(search.clicks, search.impressions),
      averagePosition: search.averagePosition ?? null,
    },
    traffic: {
      organicSessions: analytics.organicSessions ?? null,
      engagedSessions: analytics.engagedSessions ?? null,
    },
    enquiries: {
      total: analytics.enquiries ?? null,
      rate: safeRate(analytics.enquiries, analytics.organicSessions),
    },
    qualified: {
      total: outcomes.qualifiedLeads ?? null,
      rate: safeRate(outcomes.qualifiedLeads, analytics.enquiries),
    },
    quotes: {
      total: outcomes.quotedLeads ?? null,
      rate: safeRate(outcomes.quotedLeads, outcomes.qualifiedLeads),
    },
    customers: {
      total: outcomes.wonCustomers ?? null,
      winRate: safeRate(outcomes.wonCustomers, outcomes.quotedLeads),
    },
    revenue: {
      attributableOrganicRevenue: revenue,
      verifiedSeoCost: seoCost,
      roi: revenue !== null && seoCost !== null && seoCost > 0 ? (revenue - seoCost) / seoCost : null,
    },
  }
}

export const detectSeoOpportunities = ({ pages = [] } = {}) =>
  pages.flatMap((page) => {
    const items = []
    if ((page.impressions ?? 0) >= 100 && Number.isFinite(page.ctr) && page.ctr < 0.02)
      items.push({ type: 'high_impressions_low_ctr', path: page.path, priority: 'review', evidence: { impressions: page.impressions, ctr: page.ctr } })
    if (Number.isFinite(page.averagePosition) && page.averagePosition >= 4 && page.averagePosition <= 20 && (page.clicks ?? 0) > 0)
      items.push({ type: 'ranking_headroom', path: page.path, priority: 'review', evidence: { clicks: page.clicks, averagePosition: page.averagePosition } })
    if ((page.organicSessions ?? 0) >= 25 && Number.isFinite(page.enquiries) && page.enquiries === 0)
      items.push({ type: 'traffic_without_enquiries', path: page.path, priority: 'review', evidence: { organicSessions: page.organicSessions, enquiries: page.enquiries } })
    if ((page.wonCustomers ?? 0) > 0 && Number.isFinite(page.averagePosition) && page.averagePosition > 3)
      items.push({ type: 'revenue_page_ranking_headroom', path: page.path, priority: 'high', evidence: { wonCustomers: page.wonCustomers, averagePosition: page.averagePosition } })
    return items
  })

export const buildClosedLoopSnapshot = ({ generatedAt, search, analytics, outcomes, costs, pages, env = process.env } = {}) => {
  const readiness = connectorReadiness(connectorConfig(env))
  return {
    generatedAt,
    classification: Object.values(readiness).every((item) => item.active)
      ? 'closed_loop_sources_ready'
      : 'closed_loop_framework_ready_sources_inactive',
    readiness,
    funnel: buildCommercialFunnel({ search, analytics, outcomes, costs }),
    opportunities: detectSeoOpportunities({ pages }),
    safeguards: [
      'Missing measurements remain null; never fabricate rankings, leads, revenue or ROI.',
      'Search Console queries are aggregate and are never joined to an identified customer.',
      'Customer and revenue records remain private and are not written to public SEO artifacts.',
      'Recommendations require review; this engine does not publish content, contact third parties or buy links.',
    ],
  }
}
