import { mkdir, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE_ORIGIN,
  buildRouteJsonLd,
  normalizePathname,
  seoConfig,
  toAbsoluteUrl,
} from '../src/seoManifest.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const reportsDir = resolve(root, 'reports/seo-production')

const criticalEndpoints = [
  '/',
  '/sitemap.xml',
  '/robots.txt',
  '/seo-navigation.json',
  '/seo-internal-links.json',
  '/seo-dashboard.json',
  '/images/image-manifest.json',
]

const representativeRoutes = [
  '/locations/nairobi',
  '/locations/machakos',
  '/locations/makueni',
  '/tiles-nairobi',
  '/sanitaryware-nairobi',
  '/paints-nairobi',
  '/installation-support',
  '/tile-buying-guide',
]

const forbiddenSchemaTypes = new Set(['Product', 'Offer', 'Review', 'AggregateRating'])

const parseArgs = () => {
  const args = process.argv.slice(2)
  const baseIndex = args.findIndex((arg) => arg === '--base-url' || arg === '--base')
  const reportIndex = args.findIndex((arg) => arg === '--report')
  const jsonReportIndex = args.findIndex((arg) => arg === '--json-report')
  const reportDirIndex = args.findIndex((arg) => arg === '--report-dir')
  const allRoutes = args.includes('--all-routes')

  return {
    baseUrl: (baseIndex >= 0 && args[baseIndex + 1] ? args[baseIndex + 1] : SITE_ORIGIN).replace(/\/+$/, ''),
    reportPath: reportIndex >= 0 && args[reportIndex + 1] ? resolve(root, args[reportIndex + 1]) : null,
    jsonReportPath: jsonReportIndex >= 0 && args[jsonReportIndex + 1] ? resolve(root, args[jsonReportIndex + 1]) : null,
    reportDir: reportDirIndex >= 0 && args[reportDirIndex + 1] ? resolve(root, args[reportDirIndex + 1]) : reportsDir,
    allRoutes,
  }
}

const absoluteFromBase = (baseUrl, path) => `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`

const fetchText = async (baseUrl, path) => {
  const url = absoluteFromBase(baseUrl, path)
  const startedAt = Date.now()
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Kleihaus SEO Production Verifier/1.0',
      Accept: path.endsWith('.json') ? 'application/json,text/plain,*/*' : 'text/html,application/xhtml+xml,application/xml,text/plain,*/*',
    },
  })
  const text = await response.text()

  return {
    path,
    url,
    status: response.status,
    ok: response.ok,
    contentType: response.headers.get('content-type') || '',
    durationMs: Date.now() - startedAt,
    text,
  }
}

const extractTag = (html, pattern) => html.match(pattern)?.[1]?.trim() || ''

const decodeHtml = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const extractMetadata = (html) => ({
  title: decodeHtml(extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i)),
  description: decodeHtml(extractTag(html, /<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)),
  canonical: decodeHtml(extractTag(html, /<link\s+rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i)),
  ogTitle: decodeHtml(extractTag(html, /<meta\s+property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i)),
  ogDescription: decodeHtml(extractTag(html, /<meta\s+property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i)),
  ogUrl: decodeHtml(extractTag(html, /<meta\s+property=["']og:url["'][^>]*content=["']([^"']*)["'][^>]*>/i)),
  twitterTitle: decodeHtml(extractTag(html, /<meta\s+name=["']twitter:title["'][^>]*content=["']([^"']*)["'][^>]*>/i)),
  twitterDescription: decodeHtml(extractTag(html, /<meta\s+name=["']twitter:description["'][^>]*content=["']([^"']*)["'][^>]*>/i)),
  jsonLdBlocks: [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1].trim()),
})

const unique = (items) => [...new Set(items)]

const schemaTypesFrom = (value) => {
  const types = []
  const visit = (node) => {
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }
    if (node['@type']) types.push(String(node['@type']))
    Object.values(node).forEach(visit)
  }
  visit(value)
  return types
}

const validateRouteMetadata = (route, result, baseUrl) => {
  const failures = []
  const warnings = []
  const metadata = extractMetadata(result.text)
  const expectedCanonical = absoluteFromBase(baseUrl, route.path)

  if (!result.ok) failures.push(`HTTP ${result.status}`)
  if (!metadata.title) failures.push('Missing <title>')
  if (!metadata.description) failures.push('Missing meta description')
  if (!metadata.canonical) failures.push('Missing canonical URL')
  if (!metadata.ogTitle) failures.push('Missing Open Graph title')
  if (!metadata.ogDescription) failures.push('Missing Open Graph description')
  if (!metadata.ogUrl) failures.push('Missing Open Graph URL')
  if (!metadata.twitterTitle) failures.push('Missing Twitter/X title')
  if (!metadata.twitterDescription) failures.push('Missing Twitter/X description')
  if (!metadata.jsonLdBlocks.length) failures.push('Missing JSON-LD')

  if (metadata.title && metadata.title !== route.title) failures.push(`Title mismatch: expected "${route.title}", got "${metadata.title}"`)
  if (metadata.description && metadata.description !== route.description) failures.push(`Description mismatch for ${route.path}`)
  if (metadata.canonical && metadata.canonical !== expectedCanonical) failures.push(`Canonical mismatch: expected ${expectedCanonical}, got ${metadata.canonical}`)
  if (metadata.ogTitle && metadata.ogTitle !== route.title) failures.push('Open Graph title mismatch')
  if (metadata.ogDescription && metadata.ogDescription !== route.description) failures.push('Open Graph description mismatch')
  if (metadata.ogUrl && metadata.ogUrl !== expectedCanonical) failures.push(`Open Graph URL mismatch: expected ${expectedCanonical}, got ${metadata.ogUrl}`)
  if (metadata.twitterTitle && metadata.twitterTitle !== route.title) failures.push('Twitter/X title mismatch')
  if (metadata.twitterDescription && metadata.twitterDescription !== route.description) failures.push('Twitter/X description mismatch')

  for (const block of metadata.jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block)
      const types = schemaTypesFrom(parsed)
      const forbidden = types.filter((type) => forbiddenSchemaTypes.has(type))
      if (forbidden.length) failures.push(`Forbidden schema type(s): ${unique(forbidden).join(', ')}`)
    } catch (error) {
      failures.push(`Invalid JSON-LD: ${error.message}`)
    }
  }

  const expectedSchema = buildRouteJsonLd(route)
  if (expectedSchema && !metadata.jsonLdBlocks.some((block) => block.includes(`${toAbsoluteUrl(route.path)}#webpage`))) {
    warnings.push('JSON-LD exists but expected route webpage @id was not found')
  }

  return {
    path: route.path,
    url: result.url,
    status: result.status,
    contentType: result.contentType,
    durationMs: result.durationMs,
    title: metadata.title,
    canonical: metadata.canonical,
    jsonLdBlocks: metadata.jsonLdBlocks.length,
    failures,
    warnings,
  }
}

const validateJsonEndpoint = (result) => {
  const failures = []
  let parsed = null
  if (!result.ok) failures.push(`HTTP ${result.status}`)
  try {
    parsed = JSON.parse(result.text)
  } catch (error) {
    failures.push(`Invalid JSON: ${error.message}`)
  }
  return {
    path: result.path,
    status: result.status,
    contentType: result.contentType,
    durationMs: result.durationMs,
    validJson: Boolean(parsed),
    failures,
  }
}

const parseSitemapUrls = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])

const responseStats = (items) => {
  const measured = items.filter((item) => Number.isFinite(item.durationMs) && item.durationMs > 0)
  const totalMs = measured.reduce((total, item) => total + item.durationMs, 0)

  return {
    averageMs: measured.length ? Math.round(totalMs / measured.length) : 0,
    slowest: [...measured]
      .sort((a, b) => b.durationMs - a.durationMs)
      .slice(0, 5)
      .map((item) => ({
        path: item.path,
        status: item.status,
        durationMs: item.durationMs,
      })),
  }
}

const reportPathsFor = (options, generatedAt) => {
  const timestamp = generatedAt.replace(/[:.]/g, '-')
  const markdownPath = options.reportPath || resolve(options.reportDir, `seo-production-${timestamp}.md`)
  const parsedExt = extname(markdownPath)
  const jsonPath =
    options.jsonReportPath ||
    resolve(dirname(markdownPath), `${basename(markdownPath, parsedExt || '.md')}.json`)

  return {
    markdownPath,
    jsonPath,
  }
}

const buildMarkdownReport = (summary) => `# Kleihaus Production SEO Verification

Verification date: ${summary.generatedAt}

Production base URL: ${summary.baseUrl}

Status: ${summary.failures.length === 0 ? 'PASS' : 'ACTION REQUIRED'}

Mode: ${summary.allRoutes ? 'Full-route production verification' : 'Representative production verification'}

## Endpoints Tested

${summary.endpointResults.map((item) => `- ${item.path}: HTTP ${item.status}, ${item.durationMs}ms${item.validJson === undefined ? '' : item.validJson ? ', valid JSON' : ', invalid JSON'}`).join('\n')}

## Routes Tested

${summary.routeResults.map((item) => `- ${item.path}: HTTP ${item.status}, ${item.durationMs}ms, title ${item.title ? 'present' : 'missing'}, canonical ${item.canonical ? 'present' : 'missing'}, JSON-LD blocks ${item.jsonLdBlocks}, metadata ${item.metadataValid ? 'valid' : 'needs review'}`).join('\n')}

## Route HTML Coverage

- Manifest routes: ${summary.manifestRouteCount}
- Sitemap URLs: ${summary.sitemapUrlCount}
- Routes checked in production: ${summary.routeResults.length}
- Sitemap URLs missing from manifest: ${summary.sitemapUrlsMissingFromManifest.length}
- Manifest routes missing from sitemap: ${summary.manifestRoutesMissingFromSitemap.length}
- Full manifest route coverage: ${summary.routeResults.length === summary.manifestRouteCount ? 'yes' : 'no'}

## Response Times

- Average response time: ${summary.averageResponseMs}ms
- Slowest responses:
${summary.slowestResponses.length ? summary.slowestResponses.map((item) => `  - ${item.path}: HTTP ${item.status}, ${item.durationMs}ms`).join('\n') : '  - None recorded.'}

## Generated JSON Endpoints

${summary.jsonResults.map((item) => `- ${item.path}: HTTP ${item.status}, ${item.durationMs}ms, ${item.validJson ? 'valid JSON' : 'invalid JSON'}`).join('\n')}

## Metadata Validation

- Routes with valid metadata: ${summary.metadata.validRoutes}
- Routes with blocking metadata failures: ${summary.metadata.invalidRoutes}
- JSON endpoint validity: ${summary.jsonResults.every((item) => item.validJson && item.failures.length === 0) ? 'pass' : 'action required'}
- Sitemap/manifest consistency: ${summary.sitemapUrlsMissingFromManifest.length === 0 && summary.manifestRoutesMissingFromSitemap.length === 0 ? 'pass' : 'action required'}

## Findings

${summary.failures.length ? summary.failures.map((failure) => `- ${failure}`).join('\n') : '- No blocking production mismatches detected.'}

## Warnings

${summary.warnings.length ? summary.warnings.map((warning) => `- ${warning}`).join('\n') : '- None.'}

## Limitations

- This verifier checks public HTTP responses and static metadata. It does not log in to Google Search Console, GA4 or Google Business Profile.
- It does not fabricate analytics values. Dashboard metrics that require private sources remain null until connected manually or through approved credentials.
- It performs basic JSON-LD structural validation and forbidden-schema detection, not a full Google Rich Results test.

## Manual Follow-Up

- Review the GitHub Actions SEO Production Monitor after pushes and scheduled runs.
- Download Markdown/JSON report artifacts when a workflow warning or failure needs investigation.
- Review Google Search Console sitemap processing, indexed pages, excluded pages and crawl errors weekly for four weeks.
- Review GA4 Realtime and DebugView for quote, WhatsApp, phone, email, guide and location events.
`

const run = async () => {
  const options = parseArgs()
  const generatedAt = new Date().toISOString()
  const endpointResults = []
  const routeResults = []
  const failures = []
  const warnings = []

  for (const path of criticalEndpoints) {
    try {
      const result = await fetchText(options.baseUrl, path)
      endpointResults.push(result)
      if (!result.ok) failures.push(`${path}: HTTP ${result.status}`)
    } catch (error) {
      failures.push(`${path}: ${error.message}`)
      endpointResults.push({ path, status: 0, contentType: '', durationMs: 0, text: '', ok: false })
    }
  }

  const jsonResults = endpointResults.filter((item) => item.path.endsWith('.json')).map(validateJsonEndpoint)
  for (const item of jsonResults) failures.push(...item.failures.map((failure) => `${item.path}: ${failure}`))

  const robots = endpointResults.find((item) => item.path === '/robots.txt')
  if (robots?.ok && !robots.text.includes(`${options.baseUrl}/sitemap.xml`)) {
    failures.push(`robots.txt does not reference ${options.baseUrl}/sitemap.xml`)
  }

  const sitemap = endpointResults.find((item) => item.path === '/sitemap.xml')
  const sitemapUrls = sitemap?.ok ? parseSitemapUrls(sitemap.text) : []
  const manifestUrls = seoConfig.map((route) => absoluteFromBase(options.baseUrl, route.path))
  const sitemapUrlsMissingFromManifest = sitemapUrls.filter((url) => !manifestUrls.includes(url))
  const manifestRoutesMissingFromSitemap = manifestUrls.filter((url) => !sitemapUrls.includes(url))

  if (sitemap?.ok && sitemapUrls.length === 0) failures.push('Sitemap contains no <loc> URLs')
  if (sitemapUrlsMissingFromManifest.length) failures.push(`Sitemap contains URLs missing from manifest: ${sitemapUrlsMissingFromManifest.join(', ')}`)
  if (manifestRoutesMissingFromSitemap.length) failures.push(`Manifest routes missing from sitemap: ${manifestRoutesMissingFromSitemap.join(', ')}`)

  const routesToCheck = options.allRoutes
    ? seoConfig.map((route) => route.path)
    : unique(['/', ...representativeRoutes, ...sitemapUrls.map((url) => normalizePathname(new URL(url).pathname)).filter((path) => representativeRoutes.includes(path))])

  for (const path of routesToCheck) {
    const route = seoConfig.find((candidate) => candidate.path === path)
    if (!route) {
      failures.push(`No manifest route found for ${path}`)
      continue
    }

    try {
      const result = await fetchText(options.baseUrl, path)
      const routeResult = validateRouteMetadata(route, result, options.baseUrl)
      routeResult.metadataValid = routeResult.failures.length === 0
      routeResults.push(routeResult)
      failures.push(...routeResult.failures.map((failure) => `${path}: ${failure}`))
      warnings.push(...routeResult.warnings.map((warning) => `${path}: ${warning}`))
    } catch (error) {
      failures.push(`${path}: ${error.message}`)
    }
  }

  const responseSummary = responseStats([...endpointResults, ...routeResults])
  const summary = {
    generatedAt,
    baseUrl: options.baseUrl,
    allRoutes: options.allRoutes,
    result: failures.length === 0 ? 'pass' : 'fail',
    manifestRouteCount: seoConfig.length,
    sitemapUrlCount: sitemapUrls.length,
    endpointsChecked: endpointResults.length,
    routesChecked: routeResults.length,
    averageResponseMs: responseSummary.averageMs,
    slowestResponses: responseSummary.slowest,
    metadata: {
      validRoutes: routeResults.filter((item) => item.metadataValid).length,
      invalidRoutes: routeResults.filter((item) => !item.metadataValid).length,
    },
    endpointResults: endpointResults.map((item) => ({
      path: item.path,
      status: item.status,
      contentType: item.contentType,
      durationMs: item.durationMs,
      ...(item.path.endsWith('.json') ? validateJsonEndpoint(item) : {}),
    })),
    jsonResults,
    routeResults,
    sitemapUrlsMissingFromManifest,
    manifestRoutesMissingFromSitemap,
    failures: unique(failures),
    warnings: unique(warnings),
  }

  const { markdownPath, jsonPath } = reportPathsFor(options, generatedAt)
  await mkdir(dirname(markdownPath), { recursive: true })
  await mkdir(dirname(jsonPath), { recursive: true })
  await writeFile(markdownPath, buildMarkdownReport(summary), 'utf8')
  await writeFile(jsonPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8')

  console.log(`Production SEO verification ${summary.failures.length ? 'failed' : 'passed'} for ${options.baseUrl}`)
  console.log(`Endpoints checked: ${endpointResults.length}`)
  console.log(`Routes checked: ${routeResults.length}`)
  console.log(`Average response time: ${summary.averageResponseMs}ms`)
  console.log(`Markdown report: ${markdownPath}`)
  console.log(`JSON report: ${jsonPath}`)

  if (summary.failures.length) {
    console.error(summary.failures.map((failure) => `- ${failure}`).join('\n'))
    process.exitCode = 1
  }
}

await run()
