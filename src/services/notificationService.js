export const notificationService = {
  prepareMonthlyEmail(report) {
    return {
      to: import.meta.env.VITE_MONTHLY_REPORT_RECIPIENTS || '',
      subject: 'Kleihaus Monthly Management Intelligence Report',
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
