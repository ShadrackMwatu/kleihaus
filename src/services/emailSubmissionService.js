const trimValue = (value) => String(value || '').trim()
const quoteEndpoint = '/api/quote-request'

const successMessage = 'Request submitted successfully. Our team will respond shortly.'
const failureMessage = 'We could not submit your request. Please try WhatsApp.'

const prepareEmailPayload = (request = {}) => ({
  name: trimValue(request.name),
  email: trimValue(request.email),
  phone: trimValue(request.phone),
  location: trimValue(request.location),
  message: trimValue(request.message),
  requestDetails: trimValue(request.requestDetails || request.message),
  source: 'kleihaus_website',
})

export const emailSubmissionService = {
  preparePayload(request) {
    return prepareEmailPayload(request)
  },

  async submitQuoteRequest(request) {
    const payload = prepareEmailPayload(request)

    try {
      const response = await fetch(quoteEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok || result.ok === false || result.success === false) {
        return {
          ok: false,
          status: 'failed',
          payload,
          message: failureMessage,
        }
      }

      return {
        ok: true,
        status: result.mode || 'submitted',
        payload,
        message: result.message || successMessage,
      }
    } catch {
      return {
        ok: false,
        status: 'failed',
        payload,
        message: failureMessage,
      }
    }
  },
}
