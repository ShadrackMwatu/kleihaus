import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildAcquisitionSnapshot, scoreOpportunity } from './seo-acquisition.mjs'
import {
  SITE_ORIGIN,
  buildNavigationManifest,
  buildRobotsTxt,
  buildRouteJsonLd,
  buildSitemapXml,
  normalizePathname,
  normalizeSeoRoute,
  primaryNavigation,
  seoConfig,
  seoRoutes,
  toAbsoluteUrl,
} from '../src/seoManifest.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const publicDir = resolve(root, 'public')
const docsDir = resolve(root, 'docs')
const distDir = resolve(root, 'dist')

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const sourceExtensions = new Set(['.jsx', '.js', '.mjs', '.html', '.md'])
const forbiddenSchemaTypes = new Set(['Product', 'Offer', 'Review', 'AggregateRating'])
const highIntentContentOpportunities = [
  {
    title: 'Tile Quantity Calculator',
    targetRoute: '/tile-quantity-calculator',
    commercialValue: 'Very high',
    priority: 1,
    rationale: 'Captures homeowners, contractors and builders who are close to requesting tile quantities and quotes.',
    relatedRoutes: ['/tiles', '/tile-buying-guide', '/cost-estimation-guide'],
  },
  {
    title: 'Adhesive Calculator',
    targetRoute: '/adhesive-calculator',
    commercialValue: 'Very high',
    priority: 2,
    rationale: 'Connects tile size, substrate and area planning to adhesive, grout and accessory quote enquiries.',
    relatedRoutes: ['/adhesives-grout', '/adhesive-grout-guide', '/installation-support'],
  },
  {
    title: 'Bathroom Renovation Cost Guide',
    targetRoute: '/bathroom-renovation-cost-guide',
    commercialValue: 'Very high',
    priority: 3,
    rationale: 'Targets bathroom planners comparing tiles, sanitaryware, taps, showers and installation support.',
    relatedRoutes: ['/bathroom-renovation-guide', '/sanitaryware', '/bathroom-tiles'],
  },
  {
    title: 'Sanitaryware Buying Guide',
    targetRoute: '/sanitaryware-buying-guide',
    commercialValue: 'High',
    priority: 4,
    rationale: 'Supports basin, toilet, mixer, shower and accessory enquiries without unsupported price or stock claims.',
    relatedRoutes: ['/sanitaryware', '/bathroom-renovation-guide', '/sanitaryware-kenya'],
  },
  {
    title: 'Kitchen Renovation Guide',
    targetRoute: '/kitchen-renovation-guide',
    commercialValue: 'High',
    priority: 5,
    rationale: 'Links project-gallery interest to tiles, sinks, mixers, counters and quote-ready kitchen planning.',
    relatedRoutes: ['/projects', '/products', '/tiles'],
  },
  {
    title: 'Tile Installation Guide',
    targetRoute: '/tile-installation-guide',
    commercialValue: 'High',
    priority: 6,
    rationale: 'Builds trust with DIY planners, fundis and contractors while routing them to installation support.',
    relatedRoutes: ['/installation-support', '/installation-best-practices', '/adhesives-grout'],
  },
  {
    title: 'Tile Layout Guide',
    targetRoute: '/tile-layout-guide',
    commercialValue: 'Medium high',
    priority: 7,
    rationale: 'Helps customers choose layouts before asking about tile sizes, trims, wastage and quantities.',
    relatedRoutes: ['/tiles', '/floor-tiles', '/wall-tiles'],
  },
  {
    title: 'Commercial Tile Guide',
    targetRoute: '/commercial-tile-guide',
    commercialValue: 'Medium high',
    priority: 8,
    rationale: 'Serves shops, offices, rentals and institutional buyers with durability and maintenance planning.',
    relatedRoutes: ['/trade-projects', '/tiles-kenya', '/installation-support-kenya'],
  },
  {
    title: 'Warehouse Flooring Guide',
    targetRoute: '/warehouse-flooring-guide',
    commercialValue: 'Medium',
    priority: 9,
    rationale: 'Captures heavier-duty floor planning while keeping claims subject to site and product verification.',
    relatedRoutes: ['/floor-tiles', '/paints-kenya', '/installation-support'],
  },
  {
    title: 'Paint Selection Guide Expansion',
    targetRoute: '/paint-selection-guide',
    commercialValue: 'Medium',
    priority: 10,
    rationale: 'Expands existing paint advice around surface condition, coverage planning and interior/exterior use cases.',
    relatedRoutes: ['/paints', '/paints-kenya', '/cost-estimation-guide'],
  },
  {
    title: 'Tile Tools And Accessories Guide',
    targetRoute: '/tile-tools-accessories-guide',
    commercialValue: 'Medium high',
    priority: 11,
    rationale: 'Targets practical tool, spacer, trim and finishing-accessory searches that support adhesive, grout and installation enquiries.',
    relatedRoutes: ['/adhesives-grout', '/installation-support', '/installation-best-practices'],
  },
  {
    title: 'Delivery Planning Guide',
    targetRoute: '/delivery-planning-guide',
    commercialValue: 'Medium high',
    priority: 12,
    rationale: 'Supports location and logistics searches without promising unsupported delivery prices, timing or service areas.',
    relatedRoutes: ['/locations', '/locations/nairobi', '/cost-estimation-guide'],
  },
  {
    title: 'Fundis And Installer Training Guide',
    targetRoute: '/fundis-installer-training-guide',
    commercialValue: 'Medium',
    priority: 13,
    rationale: 'Connects training and best-practice searches to installation support while avoiding unsupported certification claims.',
    relatedRoutes: ['/installation-support', '/installation-best-practices', '/adhesives-grout'],
  },
  {
    title: 'Project Advisory Checklist',
    targetRoute: '/project-advisory-checklist',
    commercialValue: 'Medium high',
    priority: 14,
    rationale: 'Helps contractors, developers and homeowners prepare measurements, product lists and quote details before contacting Kleihaus.',
    relatedRoutes: ['/trade-projects', '/projects', '/cost-estimation-guide'],
  },
]

const toPosix = (value) => value.replace(/\\/g, '/')

const titleCaseFromSlug = (value) =>
  value
    .replace(/\.[^.]+$/, '')
    .replace(/-\d+(?=($|-))/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

const stripVariantSuffix = (name) => name.replace(/-(96|192|480|768|1024|1440)w?$/, '')

const listFiles = async (directory) => {
  if (!existsSync(directory)) return []
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(directory, entry.name)
      if (entry.isDirectory()) return listFiles(fullPath)
      return fullPath
    }),
  )
  return files.flat()
}

const readTextIfExists = async (filePath) => {
  if (!existsSync(filePath)) return ''
  return readFile(filePath, 'utf8')
}

const groupImages = async () => {
  const imageFiles = (await listFiles(resolve(publicDir, 'images'))).filter((file) => imageExtensions.has(extname(file).toLowerCase()))
  const groups = new Map()

  for (const file of imageFiles) {
    const extension = extname(file).toLowerCase()
    const publicPath = `/${toPosix(relative(publicDir, file))}`
    const directory = toPosix(dirname(publicPath))
    const rawName = publicPath.split('/').pop().replace(/\.[^.]+$/, '')
    const baseName = stripVariantSuffix(rawName)
    const key = `${directory}/${baseName}`
    const fileStat = await stat(file)

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        baseName,
        directory,
        altPlaceholder: titleCaseFromSlug(baseName),
        files: [],
        formats: [],
        responsiveWidths: [],
      })
    }

    const widthMatch = rawName.match(/-(\d{2,5})w?$/)
    const group = groups.get(key)
    group.files.push({
      path: publicPath,
      format: extension.replace('.', ''),
      sizeBytes: fileStat.size,
      width: widthMatch ? Number(widthMatch[1]) : null,
    })
  }

  return [...groups.values()]
    .map((group) => {
      const formats = [...new Set(group.files.map((file) => file.format))].sort()
      const responsiveWidths = [...new Set(group.files.map((file) => file.width).filter(Boolean))].sort((a, b) => a - b)
      const fallback = group.files.find((file) => ['jpg', 'jpeg', 'png'].includes(file.format))?.path || group.files[0]?.path
      const srcset = Object.fromEntries(
        ['avif', 'webp'].map((format) => [
          format,
          group.files
            .filter((file) => file.format === format && file.width)
            .sort((a, b) => a.width - b.width)
            .map((file) => `${file.path} ${file.width}w`)
            .join(', '),
        ]),
      )

      return {
        ...group,
        fallback,
        formats,
        responsiveWidths,
        hasWebp: formats.includes('webp'),
        hasAvif: formats.includes('avif'),
        hasFallback: formats.some((format) => ['jpg', 'jpeg', 'png'].includes(format)),
        srcset,
        totalBytes: group.files.reduce((sum, file) => sum + file.sizeBytes, 0),
      }
    })
    .sort((a, b) => a.key.localeCompare(b.key))
}

const buildInternalLinkManifest = () => {
  const routes = seoConfig
  return Object.fromEntries(
    routes.map((route) => {
      const related = new Map()

      for (const link of route.relatedLinks || []) {
        if (link.href && link.href !== route.path) related.set(link.href, { label: link.label, href: link.href, reason: 'declared' })
      }

      for (const candidate of routes) {
        if (candidate.path === route.path || related.has(candidate.path)) continue
        const sameCategory = route.category && candidate.category && route.category === candidate.category
        const sameService = route.serviceType && candidate.serviceType && route.serviceType === candidate.serviceType
        const sameArea = route.areaServed && candidate.areaServed && route.areaServed === candidate.areaServed
        const guideMatch = route.category && candidate.path.includes('guide') && candidate.title.toLowerCase().includes(route.category.toLowerCase().split(' ')[0])

        if (sameCategory || sameService || sameArea || guideMatch) {
          related.set(candidate.path, {
            label: candidate.category || candidate.title,
            href: candidate.path,
            reason: sameCategory ? 'same category' : sameService ? 'same service' : sameArea ? 'same location' : 'guide match',
          })
        }

        if (related.size >= 6) break
      }

      return [route.path, [...related.values()].slice(0, 6)]
    }),
  )
}

const keywordFrequency = () => {
  const counts = new Map()
  for (const route of seoConfig) {
    for (const keyword of route.keywords || []) {
      const cleaned = keyword.toLowerCase()
      counts.set(cleaned, (counts.get(cleaned) || 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 20)
    .map(([keyword, count]) => ({ keyword, routeCount: count }))
}

const scoreBreakdown = (audit, imageManifest) => {
  const metadataWarnings = audit.warnings.filter((warning) => warning.startsWith('Long title') || warning.startsWith('Long description')).length
  const brokenLinks = audit.warnings.filter((warning) => warning.includes('Internal reference not found')).length
  const missingImageWarnings = audit.warnings.filter((warning) => warning.includes('Route image is missing')).length
  const imageReadiness = imageManifest.length
    ? Math.round(((imageManifest.filter((image) => image.hasWebp).length + imageManifest.filter((image) => image.hasAvif).length + imageManifest.filter((image) => image.hasFallback).length) / (imageManifest.length * 3)) * 100)
    : 100

  return {
    overallSeoScore: audit.score,
    technicalSeoScore: audit.score,
    contentScore: Math.max(0, 100 - metadataWarnings * 2),
    localSeoScore: seoConfig.some((route) => route.path === '/locations/nairobi') && seoConfig.some((route) => route.path === '/locations/machakos') && seoConfig.some((route) => route.path === '/locations/makueni') ? 94 : 78,
    productSeoScore: seoConfig.some((route) => route.path === '/products') && seoConfig.some((route) => route.path === '/sanitaryware') && seoConfig.some((route) => route.path === '/adhesives-grout') ? 92 : 76,
    automationScore: audit.issues.length === 0 ? 100 : Math.max(0, 100 - audit.issues.length * 10),
    performanceScore: audit.warnings.some((warning) => warning.toLowerCase().includes('oversized')) ? 88 : 94,
    imageSeoScore: Math.max(0, imageReadiness - missingImageWarnings * 4),
    schemaScore: audit.issues.some((issue) => issue.includes('schema')) ? 70 : 96,
    monitoringScore: 88,
    internalLinkScore: Math.max(0, 100 - brokenLinks * 5),
    businessSeoScore: null,
  }
}

const countInternalLinkRecommendations = (internalLinks) =>
  Object.values(internalLinks).reduce((total, links) => total + links.length, 0)

const topInternalLinkOpportunities = (internalLinks, limit = 12) =>
  Object.entries(internalLinks)
    .filter(([, links]) => links.length > 0)
    .map(([path, links]) => ({
      path,
      links,
      score: links.filter((link) => link.reason === 'declared').length * 2 + links.length,
    }))
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
    .slice(0, limit)

const extractInternalReferences = async () => {
  const files = (await listFiles(root)).filter((file) => {
    const rel = toPosix(relative(root, file))
    if (rel.startsWith('node_modules/') || rel.startsWith('dist/') || rel.startsWith('.git/')) return false
    return sourceExtensions.has(extname(file).toLowerCase())
  })

  const references = []
  const pattern = /(?:href|src|image|img|to):\s*['"`](\/[^'"`#?]+)|(?:href|src)=["'](\/[^"']+)/g

  for (const file of files) {
    const content = await readTextIfExists(file)
    let match
    while ((match = pattern.exec(content))) {
      const value = match[1] || match[2]
      if (!value || value.includes('${') || value.startsWith('/api/') || value.startsWith('/images/') || value.startsWith('/src/')) continue
      references.push({ file: toPosix(relative(root, file)), path: normalizePathname(value) })
    }
  }

  return references
}

const routeHtmlPath = (route) => {
  if (route.path === '/') return resolve(distDir, 'index.html')
  const childPrefix = `${route.path}/`
  const hasChildRoute = seoConfig.some((candidate) => candidate.path.startsWith(childPrefix))
  return resolve(distDir, hasChildRoute ? `${route.path.slice(1)}/index.html` : route.path.slice(1))
}

const auditSeo = async (imageManifest) => {
  const issues = []
  const warnings = []
  const titles = new Map()
  const descriptions = new Map()
  const routeSet = new Set(seoConfig.map((route) => route.path))
  const imageSet = new Set(imageManifest.flatMap((image) => image.files.map((file) => file.path)))

  for (const route of seoConfig) {
    if (!route.title) issues.push(`Missing title for ${route.path}`)
    if (!route.description) issues.push(`Missing description for ${route.path}`)
    if (!route.canonical) issues.push(`Missing canonical for ${route.path}`)
    if (!route.breadcrumbs?.length) issues.push(`Missing breadcrumbs for ${route.path}`)
    if (!route.schema) issues.push(`Missing schema for ${route.path}`)
    if (route.title?.length > 65) warnings.push(`Long title (${route.title.length}) for ${route.path}`)
    if (route.description?.length > 165) warnings.push(`Long description (${route.description.length}) for ${route.path}`)
    if (route.image && !imageSet.has(route.image)) warnings.push(`Route image is missing from manifest: ${route.path} -> ${route.image}`)

    const schemaTypes = JSON.stringify(buildRouteJsonLd(route)).match(/"@type":"([^"]+)"/g) || []
    for (const schemaTypeText of schemaTypes) {
      const schemaType = schemaTypeText.replace('"@type":"', '').replace('"', '')
      if (forbiddenSchemaTypes.has(schemaType)) issues.push(`Forbidden schema type ${schemaType} on ${route.path}`)
    }

    if (titles.has(route.title)) issues.push(`Duplicate title: ${route.title} (${titles.get(route.title)} and ${route.path})`)
    if (descriptions.has(route.description)) issues.push(`Duplicate description: ${route.description} (${descriptions.get(route.description)} and ${route.path})`)
    titles.set(route.title, route.path)
    descriptions.set(route.description, route.path)
  }

  for (const image of imageManifest) {
    if (!image.hasWebp) warnings.push(`Image group missing WebP: ${image.key}`)
    if (!image.hasAvif) warnings.push(`Image group missing AVIF: ${image.key}`)
    if (!image.hasFallback) warnings.push(`Image group missing JPG/PNG fallback: ${image.key}`)
    if (image.responsiveWidths.length === 0 && image.files.length === 1) warnings.push(`Image group has no responsive variants: ${image.key}`)
  }

  const internalRefs = await extractInternalReferences()
  for (const ref of internalRefs) {
    if (!routeSet.has(ref.path) && !existsSync(resolve(publicDir, ref.path.slice(1)))) {
      warnings.push(`Internal reference not found in route manifest or public assets: ${ref.path} (${ref.file})`)
    }
  }

  if (!existsSync(resolve(publicDir, 'robots.txt'))) issues.push('Missing public/robots.txt')
  if (!existsSync(resolve(publicDir, 'sitemap.xml'))) issues.push('Missing public/sitemap.xml')

  const robots = await readTextIfExists(resolve(publicDir, 'robots.txt'))
  if (!robots.includes(`${SITE_ORIGIN}/sitemap.xml`)) issues.push('robots.txt does not point to the canonical sitemap URL')

  if (existsSync(distDir)) {
    for (const route of seoConfig) {
      const expectedPath = routeHtmlPath(route)
      if (!existsSync(expectedPath)) warnings.push(`Generated route HTML missing for ${route.path}`)
    }
  }

  const score = Math.max(0, 100 - issues.length * 10 - warnings.length * 0.4)
  return {
    generatedAt: new Date().toISOString(),
    score: Math.round(score),
    routeCount: seoConfig.length,
    imageGroupCount: imageManifest.length,
    issues,
    warnings,
  }
}

const buildReportMarkdown = (audit, internalLinks) => {
  const topWarnings = audit.warnings.slice(0, 40)
  const status = audit.issues.length === 0 ? 'PASS' : 'ACTION REQUIRED'
  const linkCount = countInternalLinkRecommendations(internalLinks)
  const scores = scoreBreakdown(audit, [])
  const suggestedPages = seoConfig
    .filter((route) => route.path.includes('guide') || route.path.includes('locations'))
    .slice(0, 8)
    .map((route) => `- Expand ${route.title} with owner-confirmed FAQs, visible project proof and stronger related links.`)
    .join('\n')

  return `# Kleihaus Automated SEO Report

Generated: ${audit.generatedAt}

Status: ${status}

Technical check score: ${audit.score}/100. This is not a commercial effectiveness score.

Acquisition measurement is not connected. See SEO_CLIENT_ACQUISITION_AUDIT.md and SEO_30_DAY_CLIENT_ACQUISITION_PLAN.md for evidence, limitations and business KPIs.

## Coverage

- Routes audited: ${audit.routeCount}
- Image groups audited: ${audit.imageGroupCount}
- Primary navigation items generated: ${primaryNavigation.length}
- Internal-link recommendation sets: ${Object.keys(internalLinks).length}
- Internal-link recommendations generated: ${linkCount}

## Score Breakdown

- Overall SEO effectiveness: ${scores.overallSeoScore}/100
- Technical SEO score: ${scores.technicalSeoScore}/100
- Content score: ${scores.contentScore}/100
- Local SEO score: ${scores.localSeoScore}/100
- Product SEO score: ${scores.productSeoScore}/100
- Automation score: ${scores.automationScore}/100
- Performance score: ${scores.performanceScore}/100
- Internal linking score: ${scores.internalLinkScore}/100
- Schema score: ${scores.schemaScore}/100
- Image SEO score: ${scores.imageSeoScore}/100
- Monitoring score: ${scores.monitoringScore}/100
- Business SEO score: unmeasured; private acquisition data is not connected.

## Blocking Issues

${audit.issues.length ? audit.issues.map((issue) => `- ${issue}`).join('\n') : '- None detected.'}

## Warnings

${topWarnings.length ? topWarnings.map((warning) => `- ${warning}`).join('\n') : '- None detected.'}

## Automation Outputs

- public/sitemap.xml
- public/robots.txt
- public/seo-navigation.json
- public/seo-internal-links.json
- public/seo-dashboard.json
- public/images/image-manifest.json
- docs/SEO_REPORT.md
- docs/SEO_CONTENT_SUGGESTIONS.md
- docs/GBP_SOCIAL_DRAFTS.md
- docs/SEO_EXECUTIVE_REPORT.md

## Production Verification

Run \`npm run seo:verify-production\` after deployment to confirm Cloudflare is serving these generated outputs and route-specific metadata from the public site.

Continuous monitoring runs \`npm run seo:verify-production -- --all-routes\` from GitHub Actions after relevant pushes to \`main\`, daily at 04:00 UTC and on manual dispatch. Reports are uploaded as GitHub Actions artifacts rather than committed as daily timestamped files.

## Content Suggestions For Review

${suggestedPages || '- No suggestions generated.'}

## High-Intent Content Opportunities

${highIntentContentOpportunities.map((item) => `- P${item.priority}: ${item.title} (${item.commercialValue}) -> ${item.rationale}`).join('\n')}

## Monthly Draft Workflow

- Review Google Search Console queries and GA4 conversion paths.
- Compare quote requests, WhatsApp clicks, phone clicks and email leads by landing page.
- Use the internal-link manifest to strengthen pages with rising impressions but weak conversion.
- Prepare Google Business Profile and social captions from pages with fresh project, guide or product evidence.

## Guardrails

- Do not add Product, Offer, Review or AggregateRating schema unless explicitly approved and supported by visible, truthful content.
- Do not invent prices, ratings, testimonials, branches, project dates, customer names or exact stock claims.
- Keep homepage conversion prompts consolidated in the final Contact section unless the owner changes that strategy.
`
}

const buildContentSuggestionsMarkdown = (audit, internalLinks) => {
  const metadataTargets = audit.warnings
    .filter((warning) => warning.startsWith('Long title') || warning.startsWith('Long description'))
    .slice(0, 12)
    .map((warning) => `- Tighten metadata: ${warning}`)
    .join('\n')

  const linkTargets = topInternalLinkOpportunities(internalLinks)
    .map((item) => `- ${item.path}: add or review links to ${item.links.map((link) => link.href).join(', ')}`)
    .join('\n')

  const guideIdeas = seoConfig
    .filter((route) => route.serviceType || route.path.includes('guide'))
    .slice(0, 10)
    .map((route) => `- ${route.category || route.title}: add owner-confirmed FAQs, visible proof, care guidance and related project links.`)
    .join('\n')

  return `# Kleihaus SEO Content Suggestions

Generated: ${audit.generatedAt}

These are review-ready suggestions from the automated SEO engine. They do not publish content and they do not invent facts.

## Metadata Quick Wins

${metadataTargets || '- No metadata quick wins detected.'}

## Internal Linking Opportunities

${linkTargets || '- No internal-link opportunities detected.'}

## New Or Expanded Content Ideas

${guideIdeas || '- No content ideas generated.'}

## Ranked High-Intent Opportunities

| Priority | Content opportunity | Estimated commercial value | Recommended route | Related routes |
| --- | --- | --- | --- | --- |
${highIntentContentOpportunities.map((item) => `| ${item.priority} | ${item.title} | ${item.commercialValue} | ${item.targetRoute} | ${item.relatedRoutes.join(', ')} |`).join('\n')}

## Opportunity Rationale

Editorial scoring uses 1-5 scales, not measured search demand. Higher effort reduces priority. Improve existing pages before proposing another URL for the same intent.

| Opportunity | Search intent | Commercial intent | Local relevance | Conversion potential | Effort | Priority score | Status |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
${highIntentContentOpportunities.map((item) => scoreOpportunity(item, seoConfig)).sort((a, b) => b.priorityScore - a.priorityScore).map((item) => `| ${item.title} | ${item.searchIntent} | ${item.commercialIntent} | ${item.localRelevance} | ${item.conversionPotential} | ${item.contentEffort} | ${item.priorityScore} | ${item.status} |`).join('\n')}

${highIntentContentOpportunities.map((item) => `- ${item.title}: ${item.rationale}`).join('\n')}

## Data Needed For Better Suggestions

- Google Search Console queries, pages, impressions, clicks, CTR and average position.
- GA4 landing-page engagement and contact-event paths.
- Quote request categories, locations and project types.
- WhatsApp, phone and email click event counts by landing page.
- Owner-approved business hours, delivery areas, brands, warranties, returns, showroom photos and project proof.
`
}

const buildSocialDraftsMarkdown = (audit) => {
  const sourceRoutes = seoConfig.filter((route) => ['Products', 'Tiles', 'Sanitaryware', 'Paints', 'Projects', 'Guides', 'Locations'].includes(route.category)).slice(0, 10)
  const posts = sourceRoutes.map((route, index) => {
    const url = toAbsoluteUrl(route.path)
    return `## Draft ${index + 1}: ${route.category || route.title}

GBP post:
${route.description} Explore the page and contact Kleihaus when you are ready to plan materials, quantities or next steps: ${url}

Facebook:
Planning finishes for a home or project? ${route.title.replace(/\s*\|.*$/, '')}. Start here: ${url}

LinkedIn:
Kleihaus Ceramics supports practical finishing-material planning through ${route.category || route.title}. Review the page for product context, guide links and next-step support: ${url}

Instagram caption:
Finishing inspiration from Kleihaus Ceramics. Explore ${route.category || route.title} and save the idea for your next project. ${url}
`
  })

  return `# Kleihaus GBP And Social Drafts

Generated: ${audit.generatedAt}

These drafts are for human review only. Nothing is posted automatically.

${posts.join('\n').trimEnd()}

## Weekly Google Business Profile Post Ideas

- Week 1: Tile planning checklist for homeowners comparing floor, wall and bathroom tiles.
- Week 2: Sanitaryware feature covering basins, toilets, taps, mixers and showers for bathroom planning.
- Week 3: Paint selection education for interior, exterior, roof and floor finish decisions.
- Week 4: Project-planning reminder linking measurements, photos, location and quote details.

## Seasonal And Campaign Ideas

- Back-to-school or rental-refresh post: durable tiles and easy-clean paint planning for busy homes.
- Rain-season preparation post: exterior paint, roof paint and wet-area tile planning.
- Year-end renovation post: bathroom, kitchen and floor finish planning before contractor schedules fill.
- New-build planning post: tile, sanitaryware, paint, adhesive and grout quote checklist for builders.

## Showroom And Project Highlights

- Showroom highlight: invite customers to compare tile, sanitaryware and paint finishes before requesting a quote.
- New project announcement: share owner-approved project images only when Kleihaus involvement is verified.
- Kitchen finishing highlight: link project-gallery photos to kitchen tiles, sinks, mixers and quote planning.
- Bathroom feature: pair bathroom tiles with sanitaryware planning and installation support.

## Customer Education Topics

- What measurements to share before requesting a tile quote.
- How adhesive, grout and trims affect tile project planning.
- How to compare sanitaryware choices without relying on unsupported stock or price claims.
- Why surface condition matters before choosing interior or exterior paint.
`
}

const buildDashboardSnapshot = (audit, internalLinks, imageManifest) => {
  const scores = scoreBreakdown(audit, imageManifest)
  return {
    generatedAt: audit.generatedAt,
    seoScore: audit.score,
    scores,
    status: audit.issues.length === 0 ? 'pass' : 'action_required',
    monitoringStatus: {
      buildAutomation: 'active',
      productionVerification: 'active',
      githubActionsMonitor: 'active',
      scheduledContinuity: 'configured_not_yet_longitudinally_proven',
      failureAlerting: 'implemented_not_yet_observed',
    },
    organicTraffic: null,
    ctr: null,
    averagePosition: null,
    whatsappLeads: null,
    quoteRequests: null,
    phoneCalls: null,
    emailLeads: null,
    gbpViews: null,
    gbpClicks: null,
    websiteSpeed: {
      buildMeasured: true,
      oversizedAssetWarnings: audit.warnings.filter((warning) => warning.toLowerCase().includes('oversized')),
    },
    routeCount: audit.routeCount,
    sitemapCoverage: {
      manifestRoutes: audit.routeCount,
      generatedFromManifest: true,
    },
    imageGroupCount: audit.imageGroupCount,
    brokenLinks: audit.warnings.filter((warning) => warning.includes('Internal reference not found')),
    missingSeoItems: audit.issues,
    metadataWarnings: audit.warnings.filter((warning) => warning.startsWith('Long title') || warning.startsWith('Long description')),
    outstandingRecommendations: [
      ...audit.warnings.slice(0, 10),
      ...highIntentContentOpportunities.slice(0, 5).map((item) => `Create or expand ${item.title} after owner review.`),
      'Connect Google Search Console and GA4 APIs with approved credentials for live performance reporting.',
    ],
    topKeywords: null,
    topPages: null,
    configuredKeywordFrequency: keywordFrequency(),
    configuredPriorityPages: seoConfig.slice(0, 12).map((route) => ({
      path: route.path,
      title: route.title,
      priority: route.priority,
      changefreq: route.changefreq,
    })),
    internalLinkSets: Object.keys(internalLinks).length,
    internalLinkRecommendations: countInternalLinkRecommendations(internalLinks),
    acquisition: buildAcquisitionSnapshot(seoConfig, audit.generatedAt),
    scoreProvenance: 'Legacy heuristic technical checks; content/local/performance scores are proxies, not measured outcomes or Core Web Vitals.',
    highIntentContentOpportunities: highIntentContentOpportunities.map((item) => scoreOpportunity(item, seoConfig)).sort((a, b) => b.priorityScore - a.priorityScore),
    imageReadiness: {
      withWebp: imageManifest.filter((image) => image.hasWebp).length,
      withAvif: imageManifest.filter((image) => image.hasAvif).length,
      withFallback: imageManifest.filter((image) => image.hasFallback).length,
      missingAltPlaceholders: imageManifest.filter((image) => !image.altPlaceholder).length,
      oversizedGroups: imageManifest.filter((image) => image.totalBytes > 2_000_000).map((image) => ({ key: image.key, totalBytes: image.totalBytes })),
    },
    dataConnectionsNeeded: ['Google Search Console', 'GA4', 'Google Business Profile performance', 'quote request records'],
    backlinkOpportunities: ['supplier profiles', 'contractor partner pages', 'local business directories', 'project partner mentions'],
  }
}

const buildExecutiveReportMarkdown = (audit, internalLinks, imageManifest) => {
  const scores = scoreBreakdown(audit, imageManifest)
  const linkCount = countInternalLinkRecommendations(internalLinks)
  return `# Kleihaus SEO Executive Report

Generated: ${audit.generatedAt}

## Current SEO Health

Commercial classification: technical automation with unverified customer outcomes. No connected Search Console, GA4 reporting or sales register is available to this generator. Contact clicks are intent signals, not confirmed leads. Existing scorecard values are legacy technical proxies, not field performance, rankings or commercial results. See SEO_CLIENT_ACQUISITION_AUDIT.md for the separate evidence-based readiness assessment and current production test limitations.

Kleihaus has a strong automated SEO foundation. The current automation score is ${audit.score}/100 across ${audit.routeCount} routes and ${audit.imageGroupCount} image groups. The build-time engine generates route metadata, sitemap, robots, navigation, internal-link recommendations, image manifest, dashboard, reporting, content suggestions and Google Business Profile/social drafts.

## Scorecard

| Area | Score |
| --- | ---: |
| Technical SEO | ${scores.technicalSeoScore}/100 |
| Content SEO | ${scores.contentScore}/100 |
| Local SEO | ${scores.localSeoScore}/100 |
| Product SEO | ${scores.productSeoScore}/100 |
| Automation | ${scores.automationScore}/100 |
| Performance SEO | ${scores.performanceScore}/100 |
| Image SEO | ${scores.imageSeoScore}/100 |
| Schema SEO | ${scores.schemaScore}/100 |
| Monitoring readiness | ${scores.monitoringScore}/100 |
| Internal linking | ${scores.internalLinkScore}/100 |
| Business SEO | Unmeasured |

## Improvements Generated

- Regenerated sitemap, robots, navigation, internal links, image manifest, SEO dashboard, SEO report, content suggestions and GBP/social drafts.
- Refreshed route metadata from the central SEO manifest.
- Produced ${linkCount} internal-link recommendations across ${Object.keys(internalLinks).length} route sets.
- Re-ranked ${highIntentContentOpportunities.length} high-intent content opportunities for commercial review, including tools, delivery, training and project advisory gaps.
- Kept GA4, Search Console and GBP performance fields null where live private data is not connected.

## Priority Opportunities

| Priority | Opportunity | Estimated impact |
| --- | --- | --- |
${highIntentContentOpportunities.slice(0, 10).map((item) => `| ${item.priority} | ${item.title} | ${item.commercialValue}: ${item.rationale} |`).join('\n')}

## Next Month Roadmap

1. Review and approve the top three high-intent pages: Tile Quantity Calculator, Adhesive Calculator and Bathroom Renovation Cost Guide.
2. Use the generated internal-link recommendations to connect guides, products, locations, projects and services in visible page sections.
3. Publish owner-approved Google Business Profile posts weekly using the refreshed draft themes.
4. Connect Google Search Console and GA4 APIs only after approved credentials are available.
5. Keep avoiding Product, Offer, Review and AggregateRating schema until truthful product-level price, availability and review content exists.

## Measurement Notes

The technical SEO system is measurable automatically. Organic traffic, CTR, average position, GBP views, GBP clicks and lead counts remain unavailable to the automation until Search Console, GA4, GBP and quote data integrations are connected. No private metrics are fabricated in this report.
`
}

const writeJson = async (filePath, value) => {
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

const run = async () => {
  const auditOnly = process.argv.includes('--audit-only')
  const imageManifest = await groupImages()
  const internalLinks = buildInternalLinkManifest()

  if (!auditOnly) {
    await writeFile(resolve(publicDir, 'sitemap.xml'), buildSitemapXml(), 'utf8')
    await writeFile(resolve(publicDir, 'robots.txt'), buildRobotsTxt(), 'utf8')
    await writeJson(resolve(publicDir, 'seo-navigation.json'), buildNavigationManifest())
    await writeJson(resolve(publicDir, 'seo-internal-links.json'), internalLinks)
    await writeJson(resolve(publicDir, 'images/image-manifest.json'), imageManifest)
  }

  const audit = await auditSeo(imageManifest)
  await writeFile(resolve(docsDir, 'SEO_REPORT.md'), buildReportMarkdown(audit, internalLinks), 'utf8')
  await writeFile(resolve(docsDir, 'SEO_CONTENT_SUGGESTIONS.md'), buildContentSuggestionsMarkdown(audit, internalLinks), 'utf8')
  await writeFile(resolve(docsDir, 'GBP_SOCIAL_DRAFTS.md'), buildSocialDraftsMarkdown(audit), 'utf8')
  await writeFile(resolve(docsDir, 'SEO_EXECUTIVE_REPORT.md'), buildExecutiveReportMarkdown(audit, internalLinks, imageManifest), 'utf8')
  await writeJson(resolve(publicDir, 'seo-dashboard.json'), buildDashboardSnapshot(audit, internalLinks, imageManifest))

  if (audit.issues.length) {
    console.error(`SEO automation found ${audit.issues.length} blocking issue(s). See docs/SEO_REPORT.md.`)
    process.exitCode = 1
    return
  }

  console.log(`SEO automation passed with score ${audit.score}/100 across ${audit.routeCount} routes and ${audit.imageGroupCount} image groups.`)
}

await run()
