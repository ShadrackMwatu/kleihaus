// Repository evidence is separate from private search, lead and sales measurements.
const targetClientSegments = [
  {
    segment: 'Homeowners and renovators', intent: 'local_purchase', keywords: ['tiles Nairobi', 'bathroom tiles Kenya', 'sanitaryware Nairobi', 'paint suppliers Kenya'],
    products: ['Tiles', 'Sanitaryware', 'Paints', 'Adhesives and grout'], services: ['Product guidance', 'Delivery coordination', 'Installation guidance'],
    route: '/', cta: 'Explore Products / Contact', priority: 'P1', contentGap: 'Verified showroom, hours, delivery terms and catalogue specifications.',
  },
  {
    segment: 'Home builders', intent: 'commercial_investigation', keywords: ['tiles for new house Kenya', 'building finishes Kenya'],
    products: ['Tiles', 'Sanitaryware', 'Paints'], services: ['Quantity planning', 'Project guidance', 'Delivery coordination'],
    route: '/trade-projects', cta: 'Request product guidance', priority: 'P1', contentGap: 'Owner-approved new-build checklist and staged procurement evidence.',
  },
  {
    segment: 'Contractors and fundis', intent: 'trade_procurement', keywords: ['tile suppliers for contractors', 'tile adhesive Nairobi', 'tile tools Kenya'],
    products: ['Tiles', 'Adhesives and grout', 'Tools'], services: ['Installation support', 'Training guidance', 'Project sourcing'],
    route: '/trade-projects', cta: 'Request trade or project quote', priority: 'P1', contentGap: 'Verified tool list, technical sheets and repeat-order process.',
  },
  {
    segment: 'Interior designers and architects', intent: 'commercial_investigation', keywords: ['tile specification Kenya', 'sanitaryware suppliers Kenya', 'interior finishes Kenya'],
    products: ['Tiles', 'Sanitaryware', 'Sinks and mixers', 'Paints'], services: ['Product matching', 'Project advisory', 'Sample/specification support'],
    route: '/trade-projects', cta: 'Discuss a project', priority: 'P1', contentGap: 'Approved specification packs, sample process and portfolio context.',
  },
  {
    segment: 'Property developers and project managers', intent: 'trade_procurement', keywords: ['tiles for property developers Kenya', 'bulk sanitaryware Kenya', 'commercial tiles Kenya'],
    products: ['Tiles', 'Sanitaryware', 'Paints', 'Adhesives and grout'], services: ['Bulk quote planning', 'Phased procurement', 'Delivery coordination'],
    route: '/trade-projects', cta: 'Request trade or project quote', priority: 'P1', contentGap: 'Verified capacity, procurement workflow, delivery coverage and project proof.',
  },
  {
    segment: 'Hardware dealers and resellers', intent: 'trade_procurement', keywords: ['building materials wholesale Kenya', 'tile reseller supplier Kenya'],
    products: ['Tiles', 'Sanitaryware', 'Paints', 'Finishing materials'], services: ['Sourcing support', 'Trade enquiry', 'Repeat-order support'],
    route: '/trade-projects', cta: 'Start trade enquiry', priority: 'P2', contentGap: 'Trade terms, current range and reorder process require business evidence.',
  },
  {
    segment: 'Hotels, restaurants and hospitality', intent: 'project_procurement', keywords: ['hotel bathroom sanitaryware Kenya', 'tiles for hotels Kenya'],
    products: ['Tiles', 'Sanitaryware', 'Sinks and mixers', 'Paints'], services: ['Project advisory', 'Phased quote planning', 'Delivery coordination'],
    route: '/trade-projects', cta: 'Discuss a project', priority: 'P2', contentGap: 'Hospitality case studies, durability specifications and procurement proof.',
  },
  {
    segment: 'Commercial and institutional buyers', intent: 'project_procurement', keywords: ['tiles for offices Kenya', 'tiles for schools Kenya', 'warehouse flooring Kenya'],
    products: ['Tiles', 'Paints', 'Adhesives and grout'], services: ['Project sourcing', 'Quantity planning', 'Delivery coordination'],
    route: '/trade-projects', cta: 'Request project guidance', priority: 'P2', contentGap: 'Load/use specifications, institutional references and tender process information.',
  },
  {
    segment: 'Plumbers and kitchen installers', intent: 'commercial_investigation', keywords: ['kitchen sinks Nairobi', 'mixers Nairobi', 'bathroom fittings Kenya'],
    products: ['Sanitaryware', 'Kitchen sinks and mixers', 'Bathroom accessories'], services: ['Product matching', 'Installation guidance', 'Sourcing support'],
    route: '/sanitaryware', cta: 'Discuss product guidance', priority: 'P2', contentGap: 'Verified dimensions, fitting compatibility and installer-focused selection notes.',
  },
]

const keywordClusters = [
  'tile purchase and local', 'sanitaryware and bathroom fixtures', 'paint purchase', 'adhesive grout and tools',
  'installation and fundi support', 'trade and project procurement', 'renovation and cost planning', 'commercial and institutional finishes',
]

const buildSegmentCoverage = (routes) => targetClientSegments.map((item) => {
  const matchedRoute = routes.find((route) => route.path === item.route)
  return {
    ...item,
    landingPageExists: Boolean(matchedRoute),
    seoCoverage: matchedRoute ? 'pathway_present' : 'missing',
    conversionPath: [item.route, ...matchedRoute?.relatedLinks?.slice(0, 3).map((link) => link.href) || [], '/#contact'],
    measurement: { organicVisitors: null, enquiries: null, qualifiedLeads: null, customers: null },
    evidence: 'Segment model is editorial and repository-derived; demand, conversion and revenue are not connected.',
  }
})

const isGuide = (route) => /(?:-guide|-best-practices)$/.test(route.path)
const routeLocation = (route) => route.areaServed || ({ '/locations/nairobi': 'Nairobi', '/locations/machakos': 'Machakos', '/locations/makueni': 'Makueni' }[route.path] || '')

const deriveRouteTargeting = (route) => ({
  targetAudience: route.path === '/trade-projects' ? ['Contractors and fundis', 'Home builders', 'Interior designers and architects', 'Property developers and project managers', 'Hardware dealers and resellers', 'Commercial and institutional buyers'] : route.areaServed ? ['Homeowners and renovators', 'Home builders', 'Contractors and fundis'] : route.path.includes('guide') ? ['Homeowners and renovators', 'Home builders', 'Contractors and fundis'] : ['Homeowners and renovators', 'Home builders', 'Contractors and fundis'],
  searchIntent: routeLocation(route) ? 'local_purchase' : route.path === '/trade-projects' ? 'trade_procurement' : isGuide(route) ? 'commercial_investigation' : 'product_discovery',
  commercialIntent: isGuide(route) ? 'medium_to_high' : 'high',
  productCluster: route.category || 'finishing materials',
  serviceCluster: [...new Set([route.serviceType, route.path.includes('trade') ? 'project advisory' : '', route.path.includes('location') || route.areaServed ? 'delivery coordination' : ''].filter(Boolean))],
  locationCluster: routeLocation(route) || 'Nairobi, Machakos and Makueni',
  buyerJourneyStage: isGuide(route) ? 'consideration' : 'discovery_to_consideration',
  conversionGoal: isGuide(route) ? 'relevant product or enquiry' : 'product guidance or quote',
  priority: route.priority,
})

const buildCoverageGaps = (routes, segmentCoverage) => {
  const gaps = []
  const routePaths = new Set(routes.map((route) => route.path))
  if (!routePaths.has('/products')) gaps.push({ type: 'product', priority: 'P0', recommendation: 'Create a product hub.' })
  if (!routePaths.has('/trade-projects')) gaps.push({ type: 'audience', priority: 'P0', recommendation: 'Create a trade/project pathway.' })
  for (const segment of segmentCoverage.filter((item) => item.seoCoverage !== 'pathway_present')) gaps.push({ type: 'audience', priority: segment.priority, segment: segment.segment, recommendation: `Map ${segment.segment} to an evidence-backed landing page.` })
  for (const segment of segmentCoverage.filter((item) => item.contentGap)) gaps.push({ type: 'evidence', priority: segment.priority, segment: segment.segment, recommendation: segment.contentGap })
  for (const route of routes) {
    if (isGuide(route) && !route.relatedLinks.some((link) => routePaths.has(link.href.split('#')[0]) && ['/products', '/tiles', '/sanitaryware', '/paints', '/adhesives-grout', '/installation-support', '/#contact'].includes(link.href))) gaps.push({ type: 'funnel', priority: 'P1', route: route.path, recommendation: 'Review the rendered guide next step and declare its relevant product or contact link in the manifest; an absent manifest link does not prove an absent visible CTA.' })
  }
  return gaps
}

export const buildAcquisitionSnapshot = (routes, generatedAt) => {
  const segmentCoverage = buildSegmentCoverage(routes)
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
    targetClientModel: {
      segmentCount: targetClientSegments.length,
      keywordClusterCount: keywordClusters.length,
      keywordClusters,
      segments: segmentCoverage,
      coverageGaps: buildCoverageGaps(routes, segmentCoverage),
      commercialPriority: ['Homeowners and renovators', 'Contractors and fundis', 'Home builders', 'Interior designers and architects', 'Property developers and project managers'],
    },
    routeCoverage: routes.map((route) => ({
      path: route.path,
      ...deriveRouteTargeting(route),
      intent: deriveRouteTargeting(route).searchIntent,
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
