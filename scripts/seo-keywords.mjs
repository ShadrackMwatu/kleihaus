// Commercial keyword targets are editorial monitoring targets, never fabricated rankings or search volumes.
const categories = [
  ['tiles', ['tiles Kenya','tiles Nairobi','tiles Machakos','tiles Makueni','floor tiles Kenya','floor tiles Nairobi','wall tiles Kenya','bathroom tiles Kenya','kitchen tiles Kenya','porcelain tiles Kenya','ceramic tiles Kenya','outdoor tiles Kenya','60x60 tiles Kenya','60x120 tiles Kenya','tile suppliers Kenya','tile suppliers Nairobi','tile shop Nairobi','buy tiles Nairobi']],
  ['sanitaryware', ['sanitaryware Kenya','sanitaryware Nairobi','sanitaryware Machakos','sanitaryware Makueni','bathroom fittings Kenya','toilets Kenya','wash basins Kenya','showers Kenya','taps Kenya','bathroom accessories Kenya']],
  ['sinks_mixers', ['kitchen sinks Kenya','kitchen sinks Nairobi','kitchen mixers Kenya','sink mixers Nairobi','undermount kitchen sink Kenya','matte kitchen sink Kenya']],
  ['paints', ['paints Kenya','paint suppliers Kenya','paint suppliers Nairobi','interior paint Kenya','exterior paint Kenya','house paint Kenya','paint shop Nairobi','paint selection Kenya']],
  ['adhesives_grout_tools', ['tile adhesive Kenya','tile adhesive Nairobi','tile grout Kenya','tile grout Nairobi','tiling tools Kenya','tile spacers Kenya','tile levelling tools Kenya','adhesive and grout Kenya']],
  ['tiling_installation', ['tiling services Kenya','tiling Nairobi','tile installation Kenya','tile installation Nairobi','tile installer Kenya','fundi tiling Nairobi','installation support Kenya','tile installation guide Kenya']],
  ['finishing_projects', ['finishing materials Kenya','building finishes Kenya','interior finishes Kenya','construction finishes Nairobi','renovation materials Kenya','bathroom renovation Kenya','home finishing materials Kenya','project sourcing Kenya','bulk tiles Kenya','commercial tiles Kenya','tiles for contractors Kenya','tiles for property developers Kenya']],
  ['local', ['tiles near Nairobi','sanitaryware near Nairobi','paint near Nairobi','tiles Machakos town','sanitaryware Machakos','paint Machakos','tiles Makueni','sanitaryware Makueni','paint Makueni','building materials Nairobi','building materials Machakos','building materials Makueni']],
]
const locationFor = (keyword) => ['Nairobi','Machakos','Makueni'].find((place) => keyword.includes(place)) || 'Kenya'
const intentFor = (keyword) => /guide|selection/.test(keyword) ? 'commercial_investigation' : /contractors|developers|bulk|project/.test(keyword) ? 'trade_procurement' : 'local_purchase'
const rawTargets = categories.flatMap(([cluster, keywords]) => keywords.map((keyword, index) => ({
  keyword, cluster, location: locationFor(keyword), intent: intentFor(keyword), priority: index < 4 ? 'P1' : 'P2',
  measurement: { impressions: null, clicks: null, ctr: null, averagePosition: null, observedAt: null },
  source: 'editorial_target_pending_search_console_or_approved_rank_tracker',
})))
// Keep one canonical target per query. Duplicate editorial phrases across product/local clusters must not create competing owners.
export const commercialKeywordTargets = [...new Map(rawTargets.map((item) => [item.keyword.toLowerCase(), item])).values()]
if (commercialKeywordTargets.length > 100) throw new Error('Commercial keyword target registry exceeds 100 keywords')
