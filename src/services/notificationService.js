export const notificationService = {
  prepareWeeklyEmail(report) {
    return {
      to: import.meta.env.VITE_WEEKLY_REPORT_RECIPIENTS || '',
      subject: 'Kleihaus Weekly Intelligence Report',
      body: report,
      status: 'prepared_not_sent',
    }
  },

  prepareHighValueWhatsAppAlert(alert) {
    return {
      destination: 'configured_whatsapp_business_number',
      message: alert.message,
      status: 'prepared_not_sent',
      provider: 'future_whatsapp_business_api',
    }
  },

  futureIntegrations: {
    emailProvider: 'placeholder: connect Resend, SendGrid, MailChannels, or another transactional email provider',
    whatsappBusinessApi: 'placeholder: connect WhatsApp Business Cloud API using backend-held tokens only',
  },
}
