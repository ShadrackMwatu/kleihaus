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
})

test('existing opportunities are improvements, not duplicate page proposals', () => {
  const result = scoreOpportunity({ title: 'Paint Selection', targetRoute: '/paint-selection-guide', commercialValue: 'High' }, seoConfig)
  assert.equal(result.status, 'improve_existing')
  assert.equal(result.priorityScore, 12)
})
