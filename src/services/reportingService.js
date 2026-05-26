import { analyticsService } from './analyticsService'
import { recommendationService } from './recommendationService'
import { llmInsightService } from './llmInsightService'

export const weeklyReportTemplate = {
  title: 'Kleihaus Weekly Intelligence Report',
  sections: [
    'Top searches',
    'Emerging searches',
    'Most viewed categories',
    'WhatsApp inquiry trends',
    'Quotation intent signals',
    'Location/county interest',
    'Weak signals',
    'Recommended business actions',
  ],
}

export const reportingService = {
  buildWeeklyReport(events = analyticsService.getEvents()) {
    const summary = analyticsService.buildWeeklySummary(events)
    const adminSignals = recommendationService.getAdminSignals(events)

    return {
      generatedAt: new Date().toISOString(),
      recipients: {
        configuredByEnv: true,
        envPlaceholder: 'VITE_WEEKLY_REPORT_RECIPIENTS',
      },
      template: weeklyReportTemplate,
      data: {
        topSearches: summary.top_searches,
        emergingSearches: summary.emerging_searches,
        mostViewedCategories: summary.most_viewed_categories,
        whatsappInquiryTrends: summary.whatsapp_inquiry_trends,
        quotationIntentSignals: summary.high_value_whatsapp_alerts,
        locationCountyInterest: summary.county_location_interest,
        weakSignals: adminSignals.weakSignalDetection,
        recommendedBusinessActions: llmInsightService.prepareBusinessActions(summary),
      },
    }
  },

  futureDelivery: {
    cloudflareCron: 'placeholder: schedule weekly report generation from Cloudflare Workers Cron Triggers',
    persistentStore: 'placeholder: read aggregated events from Cloudflare D1, Supabase, or another database',
    emailDelivery: 'placeholder: pass report output to notificationService when email provider credentials exist',
  },
}
