// Repository evidence is separate from private search, lead and sales measurements.
export const buildAcquisitionSnapshot = (routes, generatedAt) => {
  const pending = (source, metrics) => ({
    status: 'not_connected', source, observedAt: null,
    metrics: Object.fromEntries(metrics.map((name) => [name, null])),
  })
  return {
    generatedAt,
    classification: 'technical_automation_with_unverified_commercial_outcomes',
    scoreMeaning: 'Technical checks are not rankings, customers or revenue.',
    searchVisibility: pending('Google Search Console API; no importer configured', ['impressions', 'clicks', 'ctr', 'averagePosition', 'indexedPages']),
    organicTraffic: pending('GA4 Data API; no importer configured', ['users', 'sessions', 'engagedSessions']),
    engagement: pending('GA4 Data API', ['guideViews', 'locationViews', 'ctaClicks']),
    leads: {
      ...pending('GA4 Data API and business qualification records', ['whatsappClicks', 'phoneClicks', 'emailClicks', 'quoteSubmissions', 'qualifiedLeads']),
      caveat: 'Contact clicks indicate intent, not a confirmed conversation or unique lead.',
    },
    customers: pending('Private business outcome register; owner input required', ['wonCustomers', 'organicRevenue']),
    attribution: {
      queryToCustomer: 'not_available; Search Console queries are aggregate, not individual identities',
      statuses: ['NEW', 'QUALIFIED', 'QUOTED', 'WON', 'LOST'],
      sources: ['ORGANIC_SEARCH', 'GOOGLE_BUSINESS_PROFILE', 'DIRECT', 'REFERRAL', 'PAID', 'UNKNOWN'],
      channels: ['WHATSAPP', 'PHONE', 'EMAIL', 'QUOTE_FORM'],
      primaryEvents: ['quote_submit', 'whatsapp_click', 'phone_click', 'email_click'],
      secondaryEvents: ['cta_click', 'guide_click', 'guide_view', 'location_view'],
      privacy: 'Keep lead IDs and outcomes private; never publish customer records in this dashboard.',
    },
    routeCoverage: routes.map((route) => ({
      path: route.path,
      intent: route.areaServed ? 'local_purchase' : route.path.includes('guide') || route.path.includes('practices') ? 'commercial_investigation' : route.path === '/trade-projects' ? 'trade_procurement' : 'product_discovery',
      title: route.title, description: route.description, canonical: route.canonical,
      declaredKeywords: route.keywords, image: route.image, imageAlt: route.imageAlt,
      faqCount: route.faqs.length, breadcrumbCount: route.breadcrumbs.length,
      relatedPaths: route.relatedLinks.map((link) => link.href),
      recommendedJourney: [...new Set([
        route.path,
        ...route.relatedLinks.filter((link) => ['/tiles', '/sanitaryware', '/paints', '/adhesives-grout', '/installation-support', '/products'].includes(link.href)).slice(0, 1).map((link) => link.href),
        '/projects', '/#contact',
      ])],
      enquiries: null, qualifiedLeads: null, customers: null,
      source: 'src/seoManifest.js; editorial intent, not measured query demand',
    })),
  }
}

export const scoreOpportunity = (item, routes) => {
  const commercialIntent = { 'Very high': 5, High: 4, 'Medium high': 3, Medium: 2 }[item.commercialValue] || 1
  const contentEffort = /calculator/i.test(item.title) ? 5 : 3
  return {
    ...item,
    status: routes.some((route) => route.path === item.targetRoute) ? 'improve_existing' : 'proposed_not_published',
    searchIntent: /calculator|cost|buying/i.test(item.title) ? 'commercial_investigation' : 'informational_to_commercial',
    commercialIntent, localRelevance: 3, conversionPotential: commercialIntent, contentEffort,
    priorityScore: commercialIntent * 2 + 3 + commercialIntent - contentEffort,
    evidence: 'Editorial 1-5 rubric; not search volume or predicted revenue. Local relevance provisional until query data is connected.',
  }
}
