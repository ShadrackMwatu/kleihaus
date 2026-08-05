import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
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
  const suggestedPages = seoConfig
    .filter((route) => route.path.includes('guide') || route.path.includes('locations'))
    .slice(0, 8)
    .map((route) => `- Expand ${route.title} with owner-confirmed FAQs, visible project proof and stronger related links.`)
    .join('\n')

  return `# Kleihaus Automated SEO Report

Generated: ${audit.generatedAt}

Status: ${status}

Score: ${audit.score}/100

## Coverage

- Routes audited: ${audit.routeCount}
- Image groups audited: ${audit.imageGroupCount}
- Primary navigation items generated: ${primaryNavigation.length}
- Internal-link recommendation sets: ${Object.keys(internalLinks).length}

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

## Production Verification

Run \`npm run seo:verify-production\` after deployment to confirm Cloudflare is serving these generated outputs and route-specific metadata from the public site.

## Content Suggestions For Review

${suggestedPages || '- No suggestions generated.'}

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

  const linkTargets = Object.entries(internalLinks)
    .filter(([, links]) => links.length > 0)
    .slice(0, 12)
    .map(([path, links]) => `- ${path}: add or review links to ${links.map((link) => link.href).join(', ')}`)
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
`
}

const buildDashboardSnapshot = (audit, internalLinks, imageManifest) => ({
  generatedAt: audit.generatedAt,
  seoScore: audit.score,
  status: audit.issues.length === 0 ? 'pass' : 'action_required',
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
  imageGroupCount: audit.imageGroupCount,
  brokenLinks: audit.warnings.filter((warning) => warning.includes('Internal reference not found')),
  missingSeoItems: audit.issues,
  metadataWarnings: audit.warnings.filter((warning) => warning.startsWith('Long title') || warning.startsWith('Long description')),
  topKeywords: keywordFrequency(),
  topPages: seoConfig.slice(0, 12).map((route) => ({
    path: route.path,
    title: route.title,
    priority: route.priority,
    changefreq: route.changefreq,
  })),
  internalLinkSets: Object.keys(internalLinks).length,
  imageReadiness: {
    withWebp: imageManifest.filter((image) => image.hasWebp).length,
    withAvif: imageManifest.filter((image) => image.hasAvif).length,
    withFallback: imageManifest.filter((image) => image.hasFallback).length,
  },
  dataConnectionsNeeded: ['Google Search Console', 'GA4', 'Google Business Profile performance', 'quote request records'],
  backlinkOpportunities: ['supplier profiles', 'contractor partner pages', 'local business directories', 'project partner mentions'],
})

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
  await writeJson(resolve(publicDir, 'seo-dashboard.json'), buildDashboardSnapshot(audit, internalLinks, imageManifest))

  if (audit.issues.length) {
    console.error(`SEO automation found ${audit.issues.length} blocking issue(s). See docs/SEO_REPORT.md.`)
    process.exitCode = 1
    return
  }

  console.log(`SEO automation passed with score ${audit.score}/100 across ${audit.routeCount} routes and ${audit.imageGroupCount} image groups.`)
}

await run()
