import { buildCommercialModel } from './seo-commercial.mjs'

const percent = (rows, predicate) => rows.length ? Math.round(100 * rows.filter(predicate).length / rows.length) : null
const daysSince = (date, now) => {
  const parsed = Date.parse(date)
  return Number.isFinite(parsed) ? Math.floor((Date.parse(now) - parsed) / 86400000) : null
}

export function extractBaseSchema(html) {
  const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  return blocks.flatMap((match) => {
    const value = JSON.parse(match[1])
    return value['@graph'] || [value]
  })
}

export function buildCategoryAudit({ routes, imageManifest, assets = [], schemas = [], technicalAudit, generatedAt }) {
  const paths = new Set(routes.map((route) => route.path))
  const commercial = buildCommercialModel(routes)
  const types = (node) => Array.isArray(node['@type']) ? node['@type'] : [node['@type']]
  const businesses = schemas.filter((node) => types(node).some((type) => ['Organization', 'LocalBusiness'].includes(type)))
  const napConflicts = ['name', 'telephone', 'email'].filter((key) => new Set(businesses.map((node) => node[key]).filter(Boolean)).size > 1)
  const store = businesses.find((node) => types(node).includes('LocalBusiness'))
  const routeChecks = routes.map((route) => ({
    path: route.path,
    titlePresent: Boolean(route.title?.trim()),
    descriptionPresent: Boolean(route.description?.trim()),
    cleanUrl: /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(route.path),
    canonicalHttps: route.canonical?.startsWith('https://') || false,
    descriptiveImageAlt: Boolean(route.imageAlt?.trim()),
    brokenDeclaredLinks: (route.relatedLinks || []).filter((link) => !paths.has(link.href.split('#')[0] || '/')).map((link) => link.href),
    lastModified: route.lastModified,
    reviewAgeDays: daysSince(route.lastModified, generatedAt),
    reviewRequired: daysSince(route.lastModified, generatedAt) === null || daysSince(route.lastModified, generatedAt) > 180,
    reviewMeaning: 'Editorial review reminder, not a reason to change lastmod without a substantive edit.',
  }))
  const oversizedAssets = assets.filter((asset) => asset.sizeBytes > (asset.path.endsWith('.js') ? 400000 : 100000))
  const oversizedImages = imageManifest.flatMap((group) => group.files.filter((file) => file.sizeBytes > 500000))
  return {
    generatedAt,
    mode: 'checks_and_human_review_workflows',
    onPage: {
      routeChecks,
      metadataPresencePercent: percent(routeChecks, (route) => route.titlePresent && route.descriptionPresent),
      altMappingPercent: percent(routeChecks, (route) => route.descriptiveImageAlt),
      keywordModel: 'acquisition.commercialIntent; editorial hypotheses until Search Console import exists',
      renderedContentCheck: 'npm run seo:browser; heading hierarchy, visible content, image alts and internal destinations',
      contentDepthRule: 'Match the buyer question; no target word count or keyword density quota.',
    },
    offPage: {
      status: 'drafts_only', backlinks: null, brandMentions: null, referralLeads: null,
      workflows: ['verified supplier profile', 'approved project-partner mention', 'useful guest contribution', 'evidence-backed digital PR', 'relevant creator collaboration'],
      safeguards: ['No paid ranking links or reciprocal-link schemes', 'No mass outreach or automatic directory submissions', 'Disclose sponsored collaborations and qualify paid links', 'Social activity is referral/discovery support, not a claimed direct ranking signal'],
      evidenceRequired: ['recipient relevance', 'relationship or editorial rationale', 'source URL', 'permission for project images', 'owner approval'],
    },
    technical: {
      existingAuditScore: technicalAudit.score,
      issues: technicalAudit.issues,
      assetBudgets: { javascriptBytesPerFile: 400000, cssBytesPerFile: 100000, imageBytesPerFile: 500000, basis: 'uncompressed warning thresholds, not Core Web Vitals' },
      assets, oversizedAssets, oversizedImages,
      buildAssetsStatus: assets.length ? 'measured_from_dist' : 'not_built',
      coreWebVitals: { status: 'not_connected', lcpP75: null, inpP75: null, clsP75: null, sourceNeeded: 'CrUX or approved real-user measurement; browser lab timings are not field CWV' },
      networkAndRedirects: 'Use existing all-route production verifier; do not change redirects or Worker settings automatically.',
      mobile: 'Existing block-layout Playwright suite; results are not inferred from CSS.',
    },
    local: {
      schemaNapConsistency: businesses.length >= 2 ? napConflicts.length ? 'conflict' : 'consistent_between_schema_nodes' : 'insufficient_schema_evidence',
      napConflicts,
      source: 'index.html Organization and LocalBusiness; not externally verified GBP data',
      physicalAddressStatus: store?.address?.streetAddress ? 'declared_requires_owner_verification' : 'not_provided',
      serviceAreas: (store?.areaServed || []).map((area) => area.name),
      gbpStatus: 'owner_access_required', citationStatus: 'external_verification_required', reviewCount: null,
      reviewPolicy: 'Ask customers neutrally after a genuine interaction; no incentives, review gating, fabricated reviews or customer details in public reports.',
      unverifiedPriceRange: store?.priceRange ? 'Owner confirmation required for existing priceRange; not treated as verified pricing.' : null,
    },
    content: {
      reviewCadenceDays: 180,
      reviewQueue: routeChecks.filter((route) => route.reviewRequired).map((route) => route.path),
      briefs: [...new Set(commercial.matrix.filter((row) => row.priority === 'P1').map((row) => row.recommendedRoute))].map((path) => {
        const row = commercial.matrix.find((item) => item.recommendedRoute === path)
        return { path, intent: row.commercialIntentType, primaryQuery: row.keyword, brief: row.contentGap, conversion: row.recommendedCTA, evidence: 'Verified specifications, approved project context and factual business details; never invented authorship or experience.' }
      }),
    },
    ecommerce: {
      operatingModel: 'quote_led_category_site',
      categoryRoutes: routes.filter((route) => ['Tiles', 'Sanitaryware', 'Paints', 'Products', 'Adhesives & Grout'].includes(route.category)).map((route) => route.path),
      productSchema: 'not_published_without_verified_individual_product_data_and_approval',
      reviewSchema: 'not_published_without_genuine_visible_eligible_reviews_and_approval',
      readinessChecklist: ['Individual product identity and canonical page', 'Verified specifications and image ownership', 'Visible accurate data matching any proposed schema', 'Applicable Google product-feature requirements checked', 'Genuine review provenance and eligibility', 'Owner approval before changing existing schema safeguards'],
      nextAction: 'Improve existing categories and specification evidence before building product detail pages or rich-result markup.',
    },
  }
}

export function categoryReports(audit) {
  const categories = ['onPage', 'offPage', 'technical', 'local', 'content', 'ecommerce']
  const status = `# Six-Category SEO Automation\n\nGenerated: ${audit.generatedAt}\n\nBuild-time checks and review workflows are separate from measured ranking or sales results.\n\n${categories.map((name) => `## ${name}\n\n\`\`\`json\n${JSON.stringify(audit[name], null, 2)}\n\`\`\``).join('\n\n')}\n`
  const outreach = `# Off-Page and Local SEO Review Queue\n\nGenerated: ${audit.generatedAt}\n\nDrafts only. No messages, listings, reviews or social posts are published by this engine. Existing GBP_SOCIAL_DRAFTS.md remains the social draft source.\n\n## Prospect Qualification\n\nPrioritize genuine suppliers, permissioned project partners, relevant Kenyan building/design publications and legitimate business directories. Verify each recipient and URL before outreach; no prospect or backlink is claimed as secured. Track status privately as proposed, approved, contacted, replied or published, with source URL and date.\n\n## Supplier / Partner Draft\n\nHello, we would like to confirm whether Kleihaus is eligible for a factual supplier or partner listing on your website. We can provide approved business details and product-category information for your review. Please advise your editorial requirements.\n\n## Guest Contribution Draft\n\nHello, would your readers find a practical guide to preparing measurements and specifications for a finishing-material quotation useful? Kleihaus can propose an outline for editorial review. Any technical statements and project examples would be checked before submission.\n\n## Digital PR / Creator Brief\n\nUse an approved project photo story or a genuinely useful quantity-planning resource. Confirm image rights and Kleihaus involvement, disclose commercial relationships, and avoid unsupported claims or keyword-rich paid links. No invented news, spokesperson credentials or project results.\n\n## Local Listing Checklist\n\nConfirm business name, public phone, physical address or service-area status, hours and official GBP URL with the owner. Compare those details across GBP, the website and approved citations. Schema consistency alone is not external NAP verification.\n\n## Neutral Review Request Draft\n\nThank you for your enquiry or purchase with Kleihaus. You are welcome to share an honest review of your experience using our verified Google Business Profile review link. Your feedback helps us improve.\n\nDo not send until the genuine interaction and official review URL are confirmed. Ask consistently without selecting only satisfied customers; do not offer rewards.\n\n## Review Response Draft\n\nThank you for sharing your feedback. Please contact our team through the contact details on our website if you would like us to follow up.\n\nAdapt to the actual review privately; never disclose order details or personal information.\n\n## Sources\n\n- [Google link spam policies](https://developers.google.com/search/docs/essentials/spam-policies)\n- [Google local ranking guidance](https://support.google.com/business/answer/7091)\n- [Google product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)\n`
  return { 'SEO_CATEGORY_AUTOMATION_REPORT.md': status, 'SEO_OFFPAGE_LOCAL_REVIEW_QUEUE.md': outreach }
}
