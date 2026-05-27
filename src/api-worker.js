import { onRequestGet, onRequestOptions, onRequestPost } from '../functions/api/quote-request.js'

export default {
  async fetch(request, env, ctx) {
    const context = { request, env, ctx }

    if (request.method === 'OPTIONS') return onRequestOptions(context)
    if (request.method === 'POST') return onRequestPost(context)
    if (request.method === 'GET') return onRequestGet(context)

    return Response.json(
      { success: false, message: 'Method not allowed' },
      {
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  },
}
