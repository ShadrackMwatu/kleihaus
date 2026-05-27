const trimValue = (value) => String(value || '').trim()
const customerWhatsAppMessage = 'Your WhatsApp quote request is ready. Please send it in WhatsApp so our team can respond.'

const getQuoteEndpoint = () => trimValue(import.meta.env.VITE_QUOTE_ENDPOINT)

const prepareEmailPayload = (request = {}) => ({
  type: 'quote_request',
  name: trimValue(request.name),
  email: trimValue(request.email),
  phone: trimValue(request.phone),
  location: trimValue(request.location),
  message: trimValue(request.message),
  timestamp: request.timestamp || new Date().toISOString(),
  source: 'kleihaus_website',
})

export const emailSubmissionService = {
  preparePayload(request) {
    return prepareEmailPayload(request)
  },

  async submitQuoteRequest(request) {
    const endpoint = getQuoteEndpoint()
    const payload = prepareEmailPayload(request)

    if (!endpoint) {
      return {
        ok: true,
        configured: false,
        status: 'prepared',
        payload,
        message: customerWhatsAppMessage,
      }
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        return {
          ok: false,
          configured: true,
          status: 'failed',
          payload,
          message: customerWhatsAppMessage,
        }
      }

      return {
        ok: true,
        configured: true,
        status: 'submitted',
        payload,
        message: 'WhatsApp request opened successfully. Your quote details have also been sent to Kleihaus.',
      }
    } catch {
      return {
        ok: false,
        configured: true,
        status: 'failed',
        payload,
        message: customerWhatsAppMessage,
      }
    }
  },
}
