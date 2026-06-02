import {
  onRequestGet as onQuoteRequestGet,
  onRequestOptions as onQuoteRequestOptions,
  onRequestPost as onQuoteRequestPost,
} from '../functions/api/quote-request.js'
import {
  onRequestOptions as onTrackEventOptions,
  onRequestPost as onTrackEventPost,
} from '../functions/api/track-event.js'

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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const context = { request, env, ctx }

    if (url.pathname === '/api/quote-request') return handleQuoteRequest(context)
    if (url.pathname === '/api/track-event') return handleTrackEvent(context)
    if (url.pathname.startsWith('/api/')) return json({ success: false, message: 'API route not found.' }, 404)

    return env.ASSETS.fetch(request)
  },
}
