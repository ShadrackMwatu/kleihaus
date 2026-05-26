import { emailSubmissionService } from './emailSubmissionService'

const QUOTE_WHATSAPP_NUMBER = '254748827166'

const trimValue = (value) => String(value || '').trim()

const normalizeQuoteRequest = (request = {}) => ({
  type: 'quote_request',
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
    return emailSubmissionService.submitQuoteRequest(payload)
  },

  buildWhatsAppMessage,
  buildWhatsAppUrl,
  validateQuoteRequest,
}
