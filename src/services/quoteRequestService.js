const API_ENDPOINT = '/api/quote-request'

const clean = (value) => String(value || '').trim()
const isDevelopment = () =>
  typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV)

const debugLog = (event, details) => {
  if (isDevelopment()) console.log(event, details)
}

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
      debugLog('QUOTE_FRONTEND_SUBMIT_ATTEMPT', {
        hasName: Boolean(payload.name),
        hasEmail: Boolean(payload.email),
        hasPhone: Boolean(payload.phone),
        hasLocation: Boolean(payload.location),
        hasRequestDetails: Boolean(payload.requestDetails),
      })

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
          message: payload.requestDetails,
          details: payload.requestDetails,
          source: payload.source || 'kleihaus_website',
        }),
      })

      const data = await response.json().catch(() => ({}))
      debugLog('QUOTE_FRONTEND_API_RESPONSE', {
        status: response.status,
        success: data.success,
        storageStored: data.storage?.stored,
        emailSent: data.email?.sent,
        emailProvider: data.email?.provider,
        emailId: data.email?.id,
        emailError: data.email?.error,
      })

      if (!response.ok || !data.success) {
        return {
          ok: false,
          message: data.message || 'We could not submit your request. Please try WhatsApp.',
          data,
        }
      }

      if (!data.email?.sent) {
        debugLog('QUOTE_FRONTEND_EMAIL_NOT_SENT', {
          emailSent: data.email?.sent,
          emailError: data.email?.error,
        })

        return {
          ok: false,
          message: 'Your request was saved, but email delivery was not confirmed. Please use WhatsApp so our team can respond quickly.',
          data,
        }
      }

      return {
        ok: true,
        message: data.message || 'Request submitted successfully. Our team will respond shortly.',
        data,
      }
    } catch (error) {
      return {
        ok: false,
        message: 'We could not submit your request. Please try WhatsApp.',
      }
    }
  },
}
