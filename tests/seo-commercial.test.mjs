import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCommercialModel, commercialReports, intentTaxonomy, priorityScore } from '../scripts/seo-commercial.mjs'
import { seoConfig } from '../src/seoManifest.js'

test('commercial query owners are unique, live and span all eight intents', () => {
  const model = buildCommercialModel(seoConfig)
  assert.equal(new Set(model.matrix.map((row) => row.keyword.toLowerCase())).size, model.matrix.length)
  assert.equal(new Set(model.matrix.map((row) => row.commercialIntentType)).size, 8)
  assert.equal(Object.keys(intentTaxonomy).length, 8)
  assert.ok(model.matrix.every((row) => row.existingRoute && row.priorityScore <= 100 && row.priorityScore >= 0))
  assert.equal(model.segments.length, 14)
  assert.equal(model.metrics.conversionCtaCoverage, 100)
})

test('procurement outranks informational traffic and missing pages lower coverage', () => {
  const model = buildCommercialModel(seoConfig)
  assert.ok(model.matrix.find((row) => row.keyword === 'bulk porcelain tile supplier Nairobi').priorityScore > model.matrix.find((row) => row.keyword === 'history of ceramic tiles').priorityScore)
  const missing = buildCommercialModel(seoConfig.filter((route) => route.path !== '/trade-projects'))
  assert.ok(missing.metrics.commercialIntentCoverageScore < model.metrics.commercialIntentCoverageScore)
  assert.equal(missing.matrix.find((row) => row.keyword === 'bulk tiles Kenya').existingRoute, null)
  assert.throws(() => priorityScore({ commercialIntentScore: 101 }))
})

test('trust is not inferred from images; reporting metrics stay null', () => {
  const model = buildCommercialModel(seoConfig)
  assert.equal(model.metrics.verifiedEvidenceCoverage, 0)
  assert.ok(model.matrix.every((row) => !row.strongRoute))
  assert.ok(model.matrix.every((row) => row.measurement.clicks === null && row.measurement.quoteSubmissions === null))
  const verified = buildCommercialModel(seoConfig.map((route) => route.path === '/tiles' ? { ...route, commercialEvidence: [{ kind: 'specifications', status: 'verified', source: 'test fixture only' }, { kind: 'productImagery', status: 'verified', source: 'test fixture only' }] } : route))
  assert.ok(verified.metrics.commercialIntentCoverageScore > model.metrics.commercialIntentCoverageScore)
})

test('functional gaps and reports do not create speculative routes', () => {
  const model = buildCommercialModel(seoConfig)
  assert.match(model.matrix.find((row) => row.keyword === 'tile carton calculator Kenya').functionalConversionGap, /calculator/)
  assert.equal(Object.keys(commercialReports(model, 100)).length, 4)
  assert.ok(!model.matrix.some((row) => row.recommendedRoute.includes('calculator')))
})
