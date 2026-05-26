import { analyticsService } from './analyticsService'
import { recommendationService } from './recommendationService'
import { llmInsightService } from './llmInsightService'

export const monthlyReportTemplate = {
  title: 'Kleihaus Monthly Management Intelligence Report',
  sections: [
    'Top Searches',
    'Emerging Demand Signals',
    'Most Requested Product Types',
    'County/Location Interest',
    'Most Clicked Categories',
    'High-Intent Customer Signals',
    'Weak Signals',
    'Inventory Recommendations',
    'Marketing Recommendations',
    'Supplier Recommendations',
  ],
}

export const reportingService = {
  buildMonthlyReport(events = analyticsService.getEvents()) {
    const summary = analyticsService.buildMonthlySummary(events)
    const adminSignals = recommendationService.getAdminSignals(events)

    return {
      generatedAt: new Date().toISOString(),
      reportPeriod: 'monthly',
      recipients: {
        configuredByEnv: true,
        envPlaceholder: 'VITE_MONTHLY_REPORT_RECIPIENTS',
      },
      template: monthlyReportTemplate,
      data: {
        topSearches: summary.top_searches,
        emergingSearches: summary.emerging_searches,
        mostRequestedProductTypes: summary.product_interest || {},
        quotationIntentSignals: summary.high_value_whatsapp_alerts,
        locationCountyInterest: summary.county_location_interest,
        mostClickedCategories: summary.most_viewed_categories,
        whatsappInquiryTrends: summary.whatsapp_inquiry_trends,
        weakSignals: adminSignals.weakSignalDetection,
        inventoryRecommendations: llmInsightService.prepareInventoryRecommendations(summary),
        marketingRecommendations: llmInsightService.prepareMarketingRecommendations(summary),
        supplierRecommendations: llmInsightService.prepareSupplierRecommendations(summary),
        recommendedBusinessActions: llmInsightService.prepareBusinessActions(summary),
      },
    }
  },

  futureDelivery: {
    cloudflareCron: 'placeholder: schedule monthly report generation from Cloudflare Workers Cron Triggers',
    persistentStore: 'placeholder: read aggregated events from Cloudflare D1, Supabase, or another database',
    emailDelivery: 'placeholder: pass report output to notificationService when email provider credentials exist',
  },
}
