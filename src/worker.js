import {
  onRequestGet as onQuoteRequestGet,
  onRequestOptions as onQuoteRequestOptions,
  onRequestPost as onQuoteRequestPost,
} from '../functions/api/quote-request.js'
import {
  onRequestOptions as onTrackEventOptions,
  onRequestPost as onTrackEventPost,
} from '../functions/api/track-event.js'
import {
  buildRouteJsonLd,
  buildSitemapXml,
  getSeoRouteByPath,
  toAbsoluteUrl,
} from './seoManifest.js'

const json = (body, status = 404) =>
  Response.json(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })

const methodNotAllowed = () => json({ success: false, message: 'Method not allowed' }, 405)

const handleQuoteRequest = (context) => {
  if (context.request.method === 'OPTIONS') return onQuoteRequestOptions(context)
  if (context.request.method === 'POST') return onQuoteRequestPost(context)
  if (context.request.method === 'GET') return onQuoteRequestGet(context)

  return methodNotAllowed()
}

const handleTrackEvent = (context) => {
  if (context.request.method === 'OPTIONS') return onTrackEventOptions(context)
  if (context.request.method === 'POST') return onTrackEventPost(context)

  return methodNotAllowed()
}

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const replaceOrInsertHeadTag = (html, selector, tag) => {
  const nextHtml = html.replace(selector, tag)
  if (nextHtml !== html) return nextHtml
  return html.replace('</head>', `  ${tag}\n</head>`)
}

export const injectRouteMetadata = (html, route) => {
  if (!route) return html

  const canonical = toAbsoluteUrl(route.path)
  const image = toAbsoluteUrl(route.image)
  const imageAlt = route.imageAlt || 'Kleihaus Ceramics tiles, sanitaryware, paints and finishing materials'
  const schema = buildRouteJsonLd(route)

  let nextHtml = html
  nextHtml = nextHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:image:alt["'][^>]*>/i,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']twitter:image:alt["'][^>]*>/i,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
  )

  if (schema) {
    const schemaTag = `<script id="kleihaus-route-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
    nextHtml = nextHtml.replace(/<script\s+id=["']kleihaus-route-schema["'][\s\S]*?<\/script>\s*/i, '')
    nextHtml = nextHtml.replace('</head>', `  ${schemaTag}\n</head>`)
  }

  return nextHtml
}

const maybeInjectHtmlMetadata = async (request, response, route) => {
  if (!route || request.method !== 'GET') return response
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) return response

  const headers = new Headers(response.headers)
  headers.delete('content-length')
  return new Response(injectRouteMetadata(await response.text(), route), {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const context = { request, env, ctx }

    if (url.pathname === '/sitemap.xml') {
      return new Response(buildSitemapXml(), {
        headers: {
          'Content-Type': 'application/xml; charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }

    if (url.pathname === '/api/quote-request') return handleQuoteRequest(context)
    if (url.pathname === '/api/track-event') return handleTrackEvent(context)
    if (url.pathname.startsWith('/api/')) return json({ success: false, message: 'API route not found.' }, 404)

    const response = await env.ASSETS.fetch(request)
    return maybeInjectHtmlMetadata(request, response, getSeoRouteByPath(url.pathname))
  },
}
