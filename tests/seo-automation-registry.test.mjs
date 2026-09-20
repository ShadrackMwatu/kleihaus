import test from 'node:test'
import assert from 'node:assert/strict'
import { commercialKeywordTargets } from '../scripts/seo-keywords.mjs'
import { AUTOMATION_STATUS, buildAutomationRegistry, buildReportingWorkflow } from '../scripts/seo-automation-registry.mjs'

test('commercial keyword registry stays bounded, unique and explicitly unmeasured', () => {
  assert.ok(commercialKeywordTargets.length > 50)
  assert.ok(commercialKeywordTargets.length <= 100)
  assert.equal(new Set(commercialKeywordTargets.map((item) => item.keyword.toLowerCase())).size, commercialKeywordTargets.length)
  assert.ok(commercialKeywordTargets.every((item) => Object.values(item.measurement).every((value) => value === null)))
  assert.ok(commercialKeywordTargets.every((item) => item.cluster && item.location && item.intent && item.source))
})

test('automation registry never upgrades external dependencies to functioning', () => {
  const registry = buildAutomationRegistry('2026-09-20T00:00:00Z')
  const external = registry.components.filter((item) => /Search Console|GA4 Data API|revenue attribution|third-party/.test(item.capability))
  assert.ok(external.length >= 4)
  assert.ok(external.every((item) => item.status === AUTOMATION_STATUS.EXTERNAL))
  assert.ok(registry.components.some((item) => item.status === AUTOMATION_STATUS.CONFIGURED))
})

test('reporting workflow defines revenue and ROI only from verified inputs', () => {
  const report = buildReportingWorkflow('2026-09-20T00:00:00Z')
  assert.match(report.monthly.formulas.roi, /verified attributable organic revenue/)
  assert.ok(report.monthly.safeguards.some((item) => /Do not infer revenue/.test(item)))
})
