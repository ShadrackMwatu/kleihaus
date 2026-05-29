import { analyticsService } from './analyticsService'
import { recommendationService } from './recommendationService'
import { llmInsightService } from './llmInsightService'

export const monthlyReportTemplate = {
  title: 'Kleihaus Monthly Management Intelligence Report',
  sections: [
    'Top Searches',
    'Top Search Queries',
    'Emerging Demand Signals',
    'Most Requested Product Types',
    'County/Location Interest',
    'Most Clicked Categories',
    'Top Clicked Categories',
    'Top Clicked Products',
    'Highest-Converting Sources',
    'Lead Sources by UTM',
    'Search-to-Lead Patterns',
    'WhatsApp Engagement',
    'Opportunity Signals',
    'WhatsApp Inquiry Trends',
    'Quote Request Trends',
    'Guide Topics Clicked',
    'Emerging Product Interests',
    'Recommended SEO Topics',
    'Recommended Inventory Focus',
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
        defaultManagementRecipients: ['muthamimwatu@gmail.com', 'sales@kleihaus.com'],
        deliveryEndpointPlaceholder: 'VITE_MONTHLY_REPORT_ENDPOINT',
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
        quoteRequestTrends: summary.quote_request_trends,
        guideTopicsClicked: summary.guide_topics_clicked,
        emergingProductInterests: summary.product_interest,
        recommendedSeoTopics: llmInsightService.prepareMarketingRecommendations(summary),
        recommendedInventoryFocus: llmInsightService.prepareInventoryRecommendations(summary),
        weakSignals: adminSignals.weakSignalDetection,
        inventoryRecommendations: llmInsightService.prepareInventoryRecommendations(summary),
        marketingRecommendations: llmInsightService.prepareMarketingRecommendations(summary),
        supplierRecommendations: llmInsightService.prepareSupplierRecommendations(summary),
        recommendedBusinessActions: llmInsightService.prepareBusinessActions(summary),
        topSearchQueries: summary.top_searches,
        topClickedProducts: summary.clicked_products,
        topClickedCategories: summary.clicked_categories,
        topTrafficSources: summary.top_traffic_sources,
        leadSourcesByUtm: summary.lead_sources_by_utm,
        searchToLeadInsights: summary.search_to_lead_patterns,
        whatsappEngagement: summary.whatsapp_inquiry_trends,
        journeyOpportunityAreas: summary.journey_opportunity_areas,
      },
    }
  },

  futureDelivery: {
    cloudflareCron: 'placeholder: schedule monthly report generation from Cloudflare Workers Cron Triggers',
    persistentStore: 'placeholder: read aggregated events from Cloudflare D1, Supabase, or another database',
    emailDelivery: 'placeholder: pass report output to notificationService when email provider credentials exist',
    accessControl: 'placeholder: protect any backend monthly report endpoint with ADMIN_REPORT_TOKEN',
  },
}
