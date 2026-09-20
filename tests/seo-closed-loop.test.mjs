import test from 'node:test'
import assert from 'node:assert/strict'
import { buildClosedLoopSnapshot, buildCommercialFunnel, connectorConfig, connectorReadiness, detectSeoOpportunities } from '../scripts/seo-closed-loop.mjs'

test('external connectors are inactive by default', () => {
  const readiness = connectorReadiness(connectorConfig({}))
  assert.ok(Object.values(readiness).every((item) => item.active === false))
  assert.ok(readiness.searchConsole.missing.includes('SEO_GSC_ENABLED=true'))
  assert.ok(readiness.ga4.missing.includes('SEO_GA4_PROPERTY_ID'))
  assert.ok(readiness.commercialOutcomes.missing.includes('SEO_OUTCOMES_TOKEN'))
})

test('connector activation requires explicit enablement, identifiers and credentials', () => {
  const readiness = connectorReadiness(connectorConfig({
    SEO_GSC_ENABLED: 'true', SEO_GSC_PROPERTY: 'sc-domain:kleihaus.com', SEO_GSC_CREDENTIALS_JSON: 'present',
    SEO_GA4_ENABLED: 'true', SEO_GA4_PROPERTY_ID: '123', SEO_GA4_CREDENTIALS_JSON: 'present',
    SEO_OUTCOMES_ENABLED: 'true', SEO_OUTCOMES_SOURCE: 'private-crm', SEO_OUTCOMES_TOKEN: 'present',
  }))
  assert.ok(Object.values(readiness).every((item) => item.active))
})

test('commercial funnel calculates only supported rates and ROI', () => {
  const funnel = buildCommercialFunnel({
    search: { impressions: 1000, clicks: 50 },
    analytics: { organicSessions: 40, enquiries: 4 },
    outcomes: { qualifiedLeads: 3, quotedLeads: 2, wonCustomers: 1, organicRevenue: 100000 },
    costs: { verifiedSeoCost: 20000 },
  })
  assert.equal(funnel.demand.ctr, 0.05)
  assert.equal(funnel.enquiries.rate, 0.1)
  assert.equal(funnel.qualified.rate, 0.75)
  assert.equal(funnel.quotes.rate, 2 / 3)
  assert.equal(funnel.customers.winRate, 0.5)
  assert.equal(funnel.revenue.roi, 4)
})

test('missing commercial evidence stays null', () => {
  const funnel = buildCommercialFunnel()
  assert.equal(funnel.demand.ctr, null)
  assert.equal(funnel.enquiries.rate, null)
  assert.equal(funnel.revenue.roi, null)
})

test('opportunity detection uses measured evidence without autonomous publishing', () => {
  const opportunities = detectSeoOpportunities({ pages: [
    { path: '/tiles', impressions: 1000, clicks: 10, ctr: 0.01, averagePosition: 8, organicSessions: 50, enquiries: 0 },
    { path: '/sanitaryware', impressions: 300, clicks: 20, ctr: 0.06, averagePosition: 6, wonCustomers: 2 },
  ] })
  assert.ok(opportunities.some((item) => item.type === 'high_impressions_low_ctr'))
  assert.ok(opportunities.some((item) => item.type === 'ranking_headroom'))
  assert.ok(opportunities.some((item) => item.type === 'traffic_without_enquiries'))
  assert.ok(opportunities.some((item) => item.type === 'revenue_page_ranking_headroom'))
})

test('snapshot clearly reports inactive sources and privacy safeguards', () => {
  const result = buildClosedLoopSnapshot({ generatedAt: '2026-09-20T00:00:00Z', env: {} })
  assert.equal(result.classification, 'closed_loop_framework_ready_sources_inactive')
  assert.ok(result.safeguards.some((item) => item.includes('never fabricated') || item.includes('never fabricate')))
  assert.ok(result.safeguards.some((item) => item.includes('private')))
})
