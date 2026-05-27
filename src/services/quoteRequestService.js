const API_ENDPOINT = '/api/quote-request'
const developmentFallbackMessage = 'Request prepared. Please use WhatsApp if submission does not complete.'

const clean = (value) => String(value || '').trim()
const isDevelopmentMode = () => Boolean(import.meta.env?.DEV)

export const quoteRequestService = {
  prepare(form) {
    const payload = {
      name: clean(form.name),
      email: clean(form.email),
      phone: clean(form.phone),
      location: clean(form.location),
      message: clean(form.message || form.requestDetails),
      requestDetails: clean(form.message || form.requestDetails),
      source: 'kleihaus_website',
      service: 'Quote request',
    }

    const errors = []

    if (!payload.name) errors.push('Please enter your name.')
    if (!payload.phone && !payload.email) errors.push('Please enter your phone number or email address.')
    if (!payload.message) errors.push('Please describe what you need.')

    return {
      ok: errors.length === 0,
      errors,
      payload,
    }
  },

  async submitBackend(payload) {
    try {
      console.log('Submitting quote request...')
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          location: payload.location,
          requestDetails: payload.requestDetails,
          source: payload.source || 'kleihaus_website',
        }),
      })
      console.log('Response status:', response.status)

      const data = await response.json().catch(() => ({}))

      if (isDevelopmentMode() && [404, 405, 501].includes(response.status)) {
        return {
          ok: false,
          message: developmentFallbackMessage,
        }
      }

      if (!response.ok || !data.success) {
        return {
          ok: false,
          message: data.message || 'We could not submit your request. Please try WhatsApp.',
        }
      }

      return {
        ok: true,
        message: data.message || 'Request submitted successfully. Our team will respond shortly.',
      }
    } catch (error) {
      if (isDevelopmentMode()) {
        return {
          ok: false,
          message: developmentFallbackMessage,
        }
      }

      return {
        ok: false,
        message: 'We could not submit your request. Please try WhatsApp.',
      }
    }
  },
}
