import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCategoryAudit, extractBaseSchema, categoryReports } from '../scripts/seo-categories.mjs'
import { seoConfig } from '../src/seoManifest.js'

const fixture = (extra = {}) => buildCategoryAudit({ routes: seoConfig, imageManifest: [], technicalAudit: { score: 100, issues: [] }, generatedAt: '2026-09-08T00:00:00Z', ...extra })
test('six categories keep external metrics unknown and schema gated', () => {
  const result = fixture()
  assert.equal(result.offPage.backlinks, null)
  assert.equal(result.technical.coreWebVitals.inpP75, null)
  assert.equal(result.local.schemaNapConsistency, 'insufficient_schema_evidence')
  assert.match(result.ecommerce.productSchema, /not_published/)
  assert.equal(Object.keys(categoryReports(result)).length, 2)
})
test('content ageing and broken links are detected without changing lastmod', () => {
  const routes = [{ ...seoConfig[0], lastModified: '2020-01-01', relatedLinks: [{ href: '/not-a-route' }] }]
  const result = fixture({ routes })
  assert.deepEqual(result.content.reviewQueue, ['/'])
  assert.deepEqual(result.onPage.routeChecks[0].brokenDeclaredLinks, ['/not-a-route'])
  assert.equal(routes[0].lastModified, '2020-01-01')
})
test('NAP conflicts and asset budgets are independently detectable', () => {
  const schemas = extractBaseSchema('<script type="application/ld+json">{"@graph":[{"@type":"Organization","name":"A"},{"@type":["LocalBusiness"],"name":"B"}]}</script>')
  const result = fixture({ schemas, assets: [{ path: 'assets/app.js', sizeBytes: 500000 }] })
  assert.deepEqual(result.local.napConflicts, ['name'])
  assert.equal(result.technical.oversizedAssets.length, 1)
  assert.throws(() => extractBaseSchema('<script type="application/ld+json">invalid</script>'))
})
