import { emailSubmissionService } from './emailSubmissionService'

const QUOTE_WHATSAPP_NUMBER = '254748827166'

const trimValue = (value) => String(value || '').trim()
const cleanMessageText = (value) => trimValue(value).replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n')
const displayValue = (value) => trimValue(value) || 'Not provided'

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
    'Hello Kleihaus Ceramics, I would like a quote.',
    '',
    `Name: ${displayValue(payload.name)}`,
    `Email: ${displayValue(payload.email)}`,
    `Phone: ${displayValue(payload.phone)}`,
    `Location: ${displayValue(payload.location)}`,
    '',
    'Request:',
    cleanMessageText(payload.message),
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
