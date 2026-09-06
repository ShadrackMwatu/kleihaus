import test from 'node:test'
import assert from 'node:assert/strict'
import { buildAcquisitionSnapshot, scoreOpportunity } from '../scripts/seo-acquisition.mjs'
import { seoConfig } from '../src/seoManifest.js'

test('unconnected acquisition metrics stay null and have provenance', () => {
  const result = buildAcquisitionSnapshot(seoConfig, '2026-09-06T00:00:00Z')
  for (const stage of ['searchVisibility', 'organicTraffic', 'engagement', 'leads', 'customers']) {
    assert.equal(result[stage].status, 'not_connected')
    assert.ok(result[stage].source)
    assert.ok(Object.values(result[stage].metrics).every((value) => value === null))
  }
  assert.equal(result.routeCoverage.length, seoConfig.length)
  assert.ok(!result.attribution.primaryEvents.includes('page_view'))
  assert.ok(!result.attribution.sources.includes('WHATSAPP'))
  assert.equal(result.targetClientModel.segmentCount, 9)
  assert.equal(result.targetClientModel.keywordClusterCount, 8)
  assert.equal(result.targetClientModel.segments.length, 9)
  assert.ok(result.targetClientModel.segments.every((segment) => segment.landingPageExists))
  assert.ok(result.routeCoverage.every((route) => route.targetAudience.length > 0 && route.conversionGoal))
})

test('existing opportunities are improvements, not duplicate page proposals', () => {
  const result = scoreOpportunity({ title: 'Paint Selection', targetRoute: '/paint-selection-guide', commercialValue: 'High' }, seoConfig)
  assert.equal(result.status, 'improve_existing')
  assert.equal(result.priorityScore, 12)
})

test('location hubs and installation guidance use consistent intent', () => {
  const result = buildAcquisitionSnapshot(seoConfig, '2026-09-06T00:00:00Z')
  const nairobi = result.routeCoverage.find((route) => route.path === '/locations/nairobi')
  assert.equal(nairobi.searchIntent, 'local_purchase')
  assert.equal(nairobi.locationCluster, 'Nairobi')
  const guide = result.routeCoverage.find((route) => route.path === '/installation-best-practices')
  assert.equal(guide.buyerJourneyStage, 'consideration')
  assert.ok(result.routeCoverage.every((route) => route.intent === route.searchIntent))
})

test('deleted audience routes are detected and valid service next steps clear guide gaps', () => {
  const routes = seoConfig.filter((route) => route.path !== '/trade-projects').map((route) => route.path === '/installation-best-practices' ? { ...route, relatedLinks: [{ href: '/installation-support' }] } : route)
  const gaps = buildAcquisitionSnapshot(routes, '2026-09-06T00:00:00Z').targetClientModel.coverageGaps
  assert.ok(gaps.some((gap) => gap.type === 'audience'))
  assert.ok(!gaps.some((gap) => gap.route === '/installation-best-practices'))
})
