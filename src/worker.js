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
  buildSitemapXml,
  getSeoRouteByPath,
} from './seoManifest.js'
import { injectRouteMetadata } from './seoHtml.js'

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
