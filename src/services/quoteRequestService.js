const QUOTE_WHATSAPP_NUMBER = '254748827166'
const QUOTE_RECIPIENT_EMAIL = 'sales@kleihaus.com'

const trimValue = (value) => String(value || '').trim()

const getQuoteEndpoint = () => trimValue(import.meta.env.VITE_QUOTE_ENDPOINT)

const normalizeQuoteRequest = (request = {}) => ({
  type: 'quote_request',
  to: QUOTE_RECIPIENT_EMAIL,
  name: trimValue(request.name),
  email: trimValue(request.email),
  phone: trimValue(request.phone),
  location: trimValue(request.location),
  message: trimValue(request.message),
  source: 'kleihaus_website',
  timestamp: request.timestamp || new Date().toISOString(),
})

const validateQuoteRequest = (payload) => {
  const errors = []

  if (!payload.name) errors.push('Please enter your name.')
  if (!payload.email && !payload.phone) errors.push('Please enter a phone number or email address.')
  if (!payload.message) errors.push('Please describe what you need quoted.')

  return errors
}

const buildWhatsAppMessage = (payload) =>
  [
    'Kleihaus Ceramics quote request',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Location: ${payload.location || 'Not provided'}`,
    '',
    'Project/request details:',
    payload.message,
  ].join('\n')

const buildWhatsAppUrl = (payload) =>
  `https://wa.me/${QUOTE_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(payload))}`

const submitToBackend = async (payload) => {
  const endpoint = getQuoteEndpoint()

  if (!endpoint) {
    console.info('Kleihaus quote email backend endpoint is not configured yet.')
    return {
      configured: false,
      status: 'not_configured',
      message: 'WhatsApp request has been prepared/opened. Email backend endpoint is not configured yet.',
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
        configured: true,
        status: 'failed',
        message: `Email backend returned ${response.status}. WhatsApp request was still prepared.`,
      }
    }

    return {
      configured: true,
      status: 'submitted',
      message: 'WhatsApp request has been prepared and the email backend received the request.',
    }
  } catch (error) {
    console.warn('Kleihaus quote email backend request failed.', error)
    return {
      configured: true,
      status: 'failed',
      message: 'WhatsApp request was prepared, but the email backend could not be reached.',
    }
  }
}

export const quoteRequestService = {
  prepare(request) {
    const payload = normalizeQuoteRequest(request)
    const errors = validateQuoteRequest(payload)

    if (errors.length > 0) {
      return {
        ok: false,
        errors,
        payload,
        whatsappUrl: '',
      }
    }

    return {
      ok: true,
      errors: [],
      payload,
      whatsappUrl: buildWhatsAppUrl(payload),
    }
  },

  async submitBackend(payload) {
    return submitToBackend(payload)
  },

  buildWhatsAppMessage,
  buildWhatsAppUrl,
  validateQuoteRequest,
}
