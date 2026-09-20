import { commercialKeywordTargets } from './seo-keywords.mjs'

export const AUTOMATION_STATUS = Object.freeze({
  FUNCTIONING: 'fully_automated_functioning',
  CONFIGURED: 'configured_not_verified',
  MANUAL: 'manual',
  MISSING: 'missing',
  EXTERNAL: 'external_access_or_human_approval_required',
})

export const buildAutomationRegistry = (generatedAt) => ({
  generatedAt,
  truthfulness: 'Status describes repository evidence; it does not infer external account access or business outcomes.',
  components: [
    { capability: 'Build-time metadata, canonical, schema, sitemap, robots and route HTML generation', status: AUTOMATION_STATUS.FUNCTIONING, evidence: 'npm run build -> seo:generate -> Vite -> route HTML -> seo:audit', schedule: 'every production build' },
    { capability: 'Production SEO verification', status: AUTOMATION_STATUS.CONFIGURED, evidence: 'scripts/verify-production-seo.mjs and GitHub Actions workflow', schedule: 'push + daily 04:00 UTC + manual; run history must be checked separately' },
    { capability: 'Failure alerts', status: AUTOMATION_STATUS.CONFIGURED, evidence: 'GitHub issue creation after verifier retries fail', schedule: 'on persistent workflow failure' },
    { capability: 'Commercial keyword registry', status: AUTOMATION_STATUS.FUNCTIONING, evidence: `${commercialKeywordTargets.length} editorial targets with null measurement fields`, schedule: 'generated with repository' },
    { capability: 'Google Search Console performance import', status: AUTOMATION_STATUS.EXTERNAL, evidence: 'Closed-loop connector readiness gate exists; verified property and approved read-only credentials are still required', schedule: 'weekly framework; connector inactive until explicitly enabled' },
    { capability: 'GA4 Data API performance import', status: AUTOMATION_STATUS.EXTERNAL, evidence: 'Closed-loop connector readiness gate exists; reporting API credentials/property access are still required', schedule: 'weekly framework; connector inactive until explicitly enabled' },
    { capability: 'Qualified lead and revenue attribution', status: AUTOMATION_STATUS.EXTERNAL, evidence: 'Closed-loop funnel and privacy-safe attribution contract exist; private business/CRM outcomes and approved joining rules are still required', schedule: 'weekly framework; connector inactive until explicitly enabled' },
    { capability: 'Backlink monitoring and prospect preparation', status: AUTOMATION_STATUS.MANUAL, evidence: 'Ethical plan exists; no autonomous outreach or third-party changes', schedule: 'human review' },
    { capability: 'Backlink publication, paid links or third-party changes', status: AUTOMATION_STATUS.EXTERNAL, evidence: 'Explicit authorization required; intentionally not automated', schedule: 'none' },
    { capability: 'Competitor intelligence feed', status: AUTOMATION_STATUS.MISSING, evidence: 'Editorial benchmarking exists but no authenticated recurring external data feed', schedule: 'none' },
    { capability: 'Email/priority support/dedicated SEO manager', status: AUTOMATION_STATUS.MANUAL, evidence: 'Human service; must not be represented as software automation', schedule: 'human process' },
  ],
})

export const buildReportingWorkflow = (generatedAt) => ({
  generatedAt,
  weekly: {
    status: 'framework_ready_external_data_pending',
    metrics: ['rankings','impressions','clicks','ctr','organicTraffic','enquiries','conversions','technicalHealth','contentPerformance','competitors','prioritizedActions'],
    cadence: 'weekly after complete source periods are available',
  },
  monthly: {
    status: 'framework_ready_external_data_pending',
    metrics: ['rankings','impressions','clicks','ctr','organicTraffic','enquiries','qualifiedLeads','conversions','revenue','roi','technicalHealth','contentPerformance','backlinks','competitors','prioritizedActions'],
    formulas: {
      ctr: 'clicks / impressions',
      organicLeadRate: 'unique organic sessions with a primary lead event / organic sessions',
      roi: '(verified attributable organic revenue - verified SEO cost) / verified SEO cost',
    },
    safeguards: ['Use null when source data is unavailable or denominator is zero.','Do not infer revenue, qualified leads, rankings or backlinks.','Record source, extraction time, date range and errors.'],
  },
})
