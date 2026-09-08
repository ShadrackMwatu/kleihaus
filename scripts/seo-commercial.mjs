// Editorial demand hypotheses, not observed search volume or verified inventory.
export const intentTaxonomy = {
  transactional_high: 96, transactional_medium: 82, commercial_investigation: 78,
  project_procurement: 94, professional_specification: 72, local_purchase: 92,
  problem_to_purchase: 55, informational: 25,
}

export const priorityScore = ({ commercialIntentScore, productFit, audienceValue, routeGap, conversionPotential }) => {
  const factors = [commercialIntentScore, productFit, audienceValue, routeGap, conversionPotential]
  if (factors.some((value) => !Number.isFinite(value) || value < 0 || value > 100)) throw new Error('Commercial priority factors must be 0-100')
  return Math.round(factors.reduce((sum, value, index) => sum + value * [0.30, 0.25, 0.15, 0.15, 0.15][index], 0))
}

// One primary route per query; size/material terms remain unverified selection requests.
const clusters = [
  ['tile-formats', '/tiles', 'commercial_investigation', 'homeowners', '600x600 tiles Kenya|600x600 tiles Nairobi|porcelain tiles Kenya|porcelain tiles Nairobi', 'Verify size, material, finish and carton specifications before promoting a range.'],
  ['bathroom-tiles', '/bathroom-tiles', 'transactional_medium', 'renovators', 'bathroom tiles Kenya|bathroom tiles Nairobi|best tiles for bathroom floor Kenya', 'Verify wet-area suitability and slip-resistance specifications.'],
  ['floor-tiles', '/floor-tiles', 'transactional_medium', 'homeowners', 'floor tiles Kenya|tiles for rental apartments Kenya', 'Add verified wear, maintenance and room-use specifications.'],
  ['wall-tiles', '/wall-tiles', 'transactional_medium', 'renovators', 'wall tiles Kenya|best tiles for kitchen Kenya', 'Clarify splashback sizes and finish selection using verified specifications.'],
  ['sanitaryware', '/sanitaryware', 'transactional_high', 'plumbers', 'sanitaryware suppliers Kenya|sanitaryware suppliers Nairobi', 'Add verified dimensions and fitting compatibility.'],
  ['kitchen-sinks', '/sanitaryware', 'transactional_high', 'interior designers', 'kitchen sinks Kenya|kitchen sinks Nairobi', 'Existing shared page needs clearer sink dimensions and mixer compatibility.'],
  ['adhesive-grout', '/adhesives-grout', 'transactional_medium', 'tilers', 'tile adhesive Kenya|grout Kenya', 'Obtain coverage rates, substrate compatibility and technical sheets.'],
  ['paint-purchase', '/paints-nairobi', 'local_purchase', 'painters', 'paints Nairobi', 'Confirm paint systems, coverage rates and available finishes.'],
  ['tile-prices', '/tiles', 'transactional_high', 'homeowners', '600x600 tiles price Kenya|porcelain tiles price Kenya|tiles quotation Kenya', 'Request current price, dimensions and availability; never publish invented prices.'],
  ['bathroom-prices', '/bathroom-tiles', 'transactional_high', 'renovators', 'bathroom tiles price Nairobi', 'Explain size, finish, area and current quotation requirements.'],
  ['fixture-prices', '/sanitaryware', 'transactional_high', 'plumbers', 'sanitaryware price Kenya|kitchen sink price Kenya', 'Request current price and fitting dimensions; do not imply stock.'],
  ['adhesive-prices', '/adhesives-grout', 'transactional_high', 'tilers', 'tile adhesive price Kenya', 'Connect area and substrate requirements to a current quote.'],
  ['quantity-planning', '/tile-buying-guide', 'problem_to_purchase', 'homeowners', 'how many tiles do I need|how many tiles for 50 square metres|tile carton calculator Kenya|tile wastage calculator', 'Explain measurement, wastage, carton rounding and quote progression.'],
  ['paint-quantity', '/paint-selection-guide', 'problem_to_purchase', 'painters', 'how much paint do I need|paint quantity calculator', 'Cover coats, net surface area and verified coverage-rate assumptions.'],
  ['tile-comparison', '/tile-buying-guide', 'commercial_investigation', 'renovators', 'porcelain vs ceramic tiles Kenya', 'Explain use-case trade-offs without claiming unverified product performance.'],
  ['project-procurement', '/trade-projects', 'project_procurement', 'developers', 'bulk tiles Kenya|bulk tiles Nairobi|bulk porcelain tile supplier Nairobi|tiles supplier for apartment project Kenya|sanitaryware supplier for developers Kenya|building finishing materials supplier Kenya|finishing materials supplier Nairobi|tiles supplier for developers Kenya|BOQ building materials quotation Kenya|project tile supplier Kenya|contractor tile supplier Nairobi|apartment finishing materials Kenya|building finishing materials quotation Kenya', 'Verify procurement process, phased requirements and project references; no capacity or discount promises.'],
  ['professional-specification', '/trade-projects', 'professional_specification', 'architects', 'tile supplier for interior designers Kenya|tile supplier for architects Kenya|tile supplier for contractors Nairobi|sanitaryware supplier for contractors Kenya|building finishes supplier for architects Kenya|project finishes supplier Kenya|specification support tiles Kenya|contractor building materials quotation Kenya', 'Provide approved specification packs and a documented specification-enquiry process.'],
  ['institutional-procurement', '/trade-projects', 'project_procurement', 'institutions', 'building finishes for schools Kenya|hotel bathroom sanitaryware Kenya|commercial floor tiles Kenya|warehouse flooring Kenya', 'Verify loading, durability and tender requirements; no implied warehouse flooring suitability.'],
  ['repeat-procurement', '/trade-projects', 'project_procurement', 'dealers/resellers', 'tile reseller supplier Kenya|replacement tiles for property managers Kenya|building finishes for facilities managers Kenya', 'Confirm repeat-order identification, terms and procurement evidence.'],
  ['installation-support', '/installation-support', 'transactional_medium', 'contractors', 'tile installation support Kenya|tile tools Kenya', 'Confirm support scope, tool list and installation evidence.'],
  ['project-inspiration', '/projects', 'commercial_investigation', 'interior designers', 'kitchen finishing projects Kenya', 'Identify materials visible in supplied projects without inventing installation ownership.'],
  ['education-baseline', '/tile-buying-guide', 'informational', 'homeowners', 'history of ceramic tiles', 'Low-fit benchmark only; do not prioritize a history article.'],
  ...['nairobi', 'machakos', 'makueni'].map((area) => [`local-${area}`, `/locations/${area}`, 'local_purchase', 'homeowners', `finishing materials ${area}|tiles and sanitaryware ${area}|building materials quote ${area}`, 'Verify delivery coverage, contact details and local project evidence; no branch claims.']),
]

export const clientSegments = ['homeowners', 'renovators', 'interior designers', 'architects', 'contractors', 'tilers', 'plumbers', 'painters', 'developers', 'property managers', 'facilities managers', 'hotels/hospitality', 'institutions', 'dealers/resellers']
const audienceValue = (audience) => ['homeowners', 'renovators'].includes(audience) ? 65 : 90
const ctaFor = (type) => type === 'project_procurement' ? 'Request a BOQ-based project quote' : type === 'professional_specification' ? 'Discuss your specification' : type === 'problem_to_purchase' ? 'Send measurements for a quote' : 'Request current price and availability'
const percent = (items, predicate) => items.length ? Math.round(100 * items.filter(predicate).length / items.length) : null

export function buildCommercialModel(routes) {
  const routeMap = new Map(routes.map((route) => [route.path, route]))
  const matrix = clusters.flatMap(([keywordCluster, recommendedRoute, commercialIntentType, targetAudience, queries, contentGap]) => queries.split('|').map((keyword) => {
    const route = routeMap.get(recommendedRoute)
    const commercialIntentScore = intentTaxonomy[commercialIntentType]
    const productFit = keywordCluster === 'education-baseline' ? 10 : /warehouse/.test(keyword) ? 45 : keywordCluster === 'tile-formats' ? 70 : 90
    const related = (route?.relatedLinks || []).filter((link) => routeMap.has(link.href.split('#')[0]))
    const conversionCta = route && routeMap.has('/') ? 'shared_enquiry_path_present' : 'missing'
    // Published imagery is not proof of specifications, installation or customer outcomes.
    const evidence = { productImagery: route?.image && !route.image.includes('kleihaus-structure') ? 'published_not_independently_verified' : 'unverified', specifications: 'unverified', projectExamples: recommendedRoute === '/projects' || related.some((link) => link.href === '/projects') ? 'linked_scope_limited' : 'unverified', installation: 'unverified', businessLocation: 'owner_confirmation_needed', deliveryArea: 'owner_confirmation_needed', customerProof: 'unverified' }
    const verifiedEvidence = route?.commercialEvidence?.filter((item) => item.status === 'verified' && item.source) || []
    for (const item of verifiedEvidence) if (Object.hasOwn(evidence, item.kind)) evidence[item.kind] = 'verified'
    const evidenceReady = evidence.specifications === 'verified' && (evidence.projectExamples === 'verified' || evidence.productImagery === 'verified')
    const procurementCopy = /BOQ|specification/i.test(route?.description || '') && /procurement|specification/.test(keywordCluster)
    const routeFitScore = route ? Math.min(evidenceReady ? 100 : 74, 25 + (conversionCta !== 'missing' ? 5 : 0) + (route.category ? 10 : 0) + (related.length >= 3 ? 15 : 0) + (route.faqs?.length ? 5 : 0) + (productFit >= 80 ? 10 : 0) + (procurementCopy ? 5 : 0) + (evidenceReady ? 20 : 0)) : 0
    const internalLinkGap = related.length >= 3 ? 'Review context and CTA progression; manifest links do not prove visible journeys.' : 'Add relevant product, guide or local links to the existing page.'
    const functionalConversionGap = keywordCluster === 'quantity-planning' ? 'Tile quantity/carton calculator with explicit wastage assumptions' : keywordCluster === 'paint-quantity' ? 'Paint quantity calculator with verified coverage inputs' : /procurement|specification/.test(keywordCluster) ? 'Structured BOQ/specification intake (current form has no dedicated BOQ upload)' : ['tile-formats', 'kitchen-sinks', 'sanitaryware'].includes(keywordCluster) ? 'Verified product-specification filtering' : null
    const factors = { commercialIntentScore, productFit, audienceValue: audienceValue(targetAudience), routeGap: 100 - routeFitScore, conversionPotential: commercialIntentType === 'informational' ? 10 : 85 }
    const score = priorityScore(factors)
    return { keyword, keywordCluster, commercialIntentType, commercialIntentScore, targetAudience, buyerJourneyStage: commercialIntentScore >= 90 ? 'purchase_or_procurement' : commercialIntentType === 'informational' ? 'awareness' : 'consideration', likelyCustomerNeed: contentGap, recommendedRoute, existingRoute: route ? recommendedRoute : null, routeFitScore, strongRoute: routeFitScore >= 75, conversionGoal: commercialIntentType === 'project_procurement' ? 'qualified_project_enquiry' : 'quote_or_product_enquiry', recommendedCTA: ctaFor(commercialIntentType), conversionCta, contentGap, internalLinkGap, evidenceGap: evidence, functionalConversionGap, priorityScore: score, priority: score >= 80 ? 'P1' : score >= 65 ? 'P2' : 'P3', factors, measurement: { query: keyword, landingPage: recommendedRoute, period: null, impressions: null, clicks: null, ctr: null, averagePosition: null, quoteSubmissions: null, whatsappClicks: null, qualifiedLeads: null }, provenance: 'Editorial hypothesis; routeFit capped below strong until specifications and trust evidence are verified.' }
  })).sort((a, b) => b.priorityScore - a.priorityScore || a.keyword.localeCompare(b.keyword))
  const commercial = matrix.filter((row) => row.commercialIntentScore >= 60)
  const uniqueRoutes = [...new Map(commercial.map((row) => [row.recommendedRoute, row])).values()]
  const weightedFit = Math.round(matrix.reduce((sum, row) => sum + row.routeFitScore * row.commercialIntentScore, 0) / matrix.reduce((sum, row) => sum + row.commercialIntentScore, 0))
  const metrics = {
    commercialIntentCoverageScore: weightedFit,
    tier1StrongRouteCoverage: percent(matrix.filter((row) => row.commercialIntentScore >= 90), (row) => row.strongRoute),
    highIntentProductCoverage: percent([...new Map(commercial.filter((row) => !/procurement|specification|local-|inspiration|comparison/.test(row.keywordCluster)).map((row) => [row.keywordCluster, row])).values()], (row) => row.strongRoute),
    projectProcurementCoverage: percent(matrix.filter((row) => row.commercialIntentType === 'project_procurement'), (row) => row.strongRoute),
    professionalBuyerCoverage: percent(matrix.filter((row) => row.commercialIntentType === 'professional_specification'), (row) => row.strongRoute),
    problemToPurchaseCoverage: percent(matrix.filter((row) => row.commercialIntentType === 'problem_to_purchase'), (row) => row.strongRoute),
    localCommercialCoverage: percent(matrix.filter((row) => row.commercialIntentType === 'local_purchase'), (row) => row.strongRoute),
    conversionCtaCoverage: percent(uniqueRoutes, (row) => row.conversionCta === 'shared_enquiry_path_present'),
    declaredInternalLinkCoverage: percent(uniqueRoutes, (row) => (routeMap.get(row.recommendedRoute)?.relatedLinks?.length || 0) >= 3),
    verifiedEvidenceCoverage: percent(uniqueRoutes, (row) => Object.values(row.evidenceGap).every((value) => value === 'verified')),
    highPriorityOpportunityCount: matrix.filter((row) => row.priority === 'P1').length,
  }
  return { modelVersion: 1, metrics, taxonomy: intentTaxonomy, priorityFormula: '0.30 intent + 0.25 product fit + 0.15 audience value + 0.15 route gap + 0.15 conversion potential; editorial 0-100 factors', scoreMeaning: 'Intent-weighted route readiness, not demand volume, rankings or business results. Strong coverage requires 75+; unverified evidence caps fit at 74. Zero strong coverage does not mean no useful pages exist.', matrix, segments: clientSegments.map((segment) => { const rows = matrix.filter((row) => row.targetAudience === segment || (['property managers', 'facilities managers', 'hotels/hospitality'].includes(segment) && /procurement/.test(row.keywordCluster))); return { segment, highestValueSearches: rows.slice(0, 5).map((row) => row.keyword), bestExistingRoute: rows[0]?.existingRoute || '/trade-projects', preferredCTA: rows[0]?.recommendedCTA || 'Discuss your project requirements', likelyRepeatValue: audienceValue(segment), procurementIntent: !['homeowners', 'renovators'].includes(segment), missingCommercialContent: rows[0]?.contentGap || 'Segment-specific specification and project evidence require owner input.' } }), cannibalizationRisks: ['Category and Kenya/local variants share product topics; retain one primary query owner and differentiate geographic planning copy.', 'Sink demand shares /sanitaryware; improve its existing section before proposing a separate route.', 'Calculator intent maps to guides as an interim pathway, not a claim that a calculator exists.'], measurementContract: { status: 'not_connected', joinKeys: ['normalizedLandingPage', 'dateRange', 'keywordCluster'], queryAttribution: 'Search Console is aggregate; GA4 route enquiries cannot be attributed to individual search queries.', privacy: 'Public outputs contain null aggregate metrics only; no customer records or credentials.' } }
}

export function commercialReports(model, technicalScore) {
  const clusterLeaders = new Map()
  for (const row of model.matrix) if (!clusterLeaders.has(row.keywordCluster)) clusterLeaders.set(row.keywordCluster, row)
  const top = [...clusterLeaders.values()].slice(0, 20)
  const header = '# Kleihaus Commercial SEO\n\nGenerated from the existing SEO acquisition engine. Editorial demand hypotheses, not measured search volumes.\n\n'
  const actions = top.map((row, index) => `${index + 1}. **${row.keywordCluster}** (${row.priorityScore}/100): ${row.contentGap} Route: ${row.recommendedRoute}. Functional gap: ${row.functionalConversionGap || 'None identified; review existing enquiry pathway.'}`).join('\n')
  const functionalGaps = [...new Map(model.matrix.filter((row) => row.functionalConversionGap).map((row) => [row.functionalConversionGap, row])).values()]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .map((row) => `- ${row.functionalConversionGap}: ${row.priority}, ${row.priorityScore}/100; interim route ${row.recommendedRoute}.`).join('\n')
  const notes = '\n\nPreserve existing routes and shared enquiries. No new calculators, BOQ upload, inventory claims, prices, brands, customer proof or location pages were published. Obtain verified specifications, delivery scope and project permission before stronger claims.\n\n## Functional Conversion Gaps\n\n' + functionalGaps + '\n'
  return {
    'KLEIHAUS_COMMERCIAL_SEARCH_INTENT_REPORT.md': `${header}## Readiness\n\nTechnical checks: ${technicalScore}/100. Commercial route readiness: ${model.metrics.commercialIntentCoverageScore}/100.\n\n${model.scoreMeaning}\n\n${model.priorityFormula}\n\n## Top 20 Actions\n\n${actions}${notes}\n## Cannibalization Review\n\n${model.cannibalizationRisks.map((item) => `- ${item}`).join('\n')}\n`,
    'KLEIHAUS_HIGH_INTENT_KEYWORD_MAP.md': `${header}| Query | Cluster | Intent / score | Primary route | Fit | Priority | CTA |\n| --- | --- | --- | --- | ---: | ---: | --- |\n${model.matrix.map((row) => `| ${row.keyword} | ${row.keywordCluster} | ${row.commercialIntentType} / ${row.commercialIntentScore} | ${row.existingRoute || 'Missing'} | ${row.routeFitScore} | ${row.priorityScore} | ${row.recommendedCTA} |`).join('\n')}\n`,
    'KLEIHAUS_COMMERCIAL_SEO_GAPS.md': `${header}## Prioritized Gaps\n\n${actions}${notes}\n## Evidence\n\nPublished images and linked project examples are partial evidence, not verified specifications, installation ownership or genuine customer outcomes. Contact routes are present, but physical location and delivery terms require confirmation.\n\n## Internal Links\n\n${top.map((row) => `- ${row.recommendedRoute}: ${row.internalLinkGap}`).join('\n')}\n`,
    'KLEIHAUS_INBOUND_ACQUISITION_SCORECARD.md': `${header}| Metric | Value |\n| --- | ---: |\n| Technical readiness | ${technicalScore} |\n${Object.entries(model.metrics).map(([key, value]) => `| ${key} | ${value ?? 'Unavailable'} |`).join('\n')}\n\n${model.scoreMeaning}\n\n## Client Segments\n\n${model.segments.map((row) => `- ${row.segment}: ${row.bestExistingRoute}; ${row.preferredCTA}. Gap: ${row.missingCommercialContent}`).join('\n')}\n\n## Measurement Readiness\n\nNo GSC or GA4 reporting importer is configured. Future aggregate joins use normalized landing page and date range; query clusters provide an aggregate demand lens, not query-to-person attribution. Metrics remain null. Collection of GA4 events is distinct from access to GA4 reporting.\n`,
  }
}
