import { analyticsService } from './analyticsService'

// Keep server-provided fallback messages from exposing the business phone.
const safeMessage = (message) => typeof message === 'string' ? message.replace(/\+?254[\s()-]*748[\s()-]*827[\s()-]*166/g, 'the Call control') : ''

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
      channel: clean(form.channel || 'email'),
      intent: clean(form.intent || 'quote'),
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
      const journeyContext = analyticsService.getJourneyContext()

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
          channel: payload.channel || 'email',
          intent: payload.intent || 'quote',
          ...journeyContext,
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
          message: safeMessage(data.message) || 'We could not submit your request. Please try again, use the Call control, or use WhatsApp for immediate help.',
          data,
        }
      }

      if ((payload.channel || 'email') === 'email' && !data.email?.sent) {
        debugLog('QUOTE_FRONTEND_EMAIL_NOT_SENT', {
          emailSent: data.email?.sent,
          emailError: data.email?.error,
        })

        return {
          ok: false,
          message: 'Your request was saved, but email delivery was not confirmed. Please use the Call control or use WhatsApp so the Kleihaus team can respond quickly.',
          data,
        }
      }

      if (payload.channel === 'whatsapp' && !data.whatsapp?.sent) {
        return {
          ok: true,
          message: safeMessage(data.message) || 'Support request received. The Kleihaus team will follow up using the contact details you shared.',
          data,
        }
      }

      return {
        ok: true,
        message:
          safeMessage(data.message) ||
          (payload.channel === 'whatsapp'
            ? 'Support request received. The Kleihaus team will follow up using the contact details you shared.'
            : 'Request sent successfully. The Kleihaus team will review your details and respond by phone or email.'),
        data,
      }
    } catch (error) {
      return {
        ok: false,
        message: 'We could not submit your request. Please try again, use the Call control, or use WhatsApp for immediate help.',
      }
    }
  },
}
