export const llmInsightService = {
  classifyIntent(searchText = '') {
    const query = searchText.toLowerCase()
    if (['price', 'quotation', 'quote', 'delivery', 'installation'].some((term) => query.includes(term))) {
      return 'quotation_intent'
    }
    if (['tile', 'paint', 'adhesive', 'grout', 'sanitaryware', 'basin', 'toilet'].some((term) => query.includes(term))) {
      return 'product_discovery'
    }
    return 'general_browsing'
  },

  prepareBusinessActions(summary) {
    const topSearchCount = Object.keys(summary.top_searches || {}).length
    const categoryCount = Object.keys(summary.most_viewed_categories || {}).length

    return [
      topSearchCount ? 'Review top search terms and promote matching product ranges.' : 'Collect more search data before merchandising changes.',
      categoryCount ? 'Compare category interest with available stock and supplier priorities.' : 'Encourage category exploration through catalogue cards.',
      'Follow up on WhatsApp and quotation intent signals with faster response templates.',
    ]
  },

  prepareInventoryRecommendations(summary) {
    const productInterestCount = Object.keys(summary.product_interest || {}).length
    return [
      productInterestCount
        ? 'Prioritize stock checks for product types receiving repeated interest.'
        : 'Wait for more product-interest events before changing inventory priorities.',
      'Compare category interest against current supplier lead times and fast-moving finishes.',
    ]
  },

  prepareMarketingRecommendations(summary) {
    const searchCount = Object.keys(summary.top_searches || {}).length
    return [
      searchCount
        ? 'Turn recurring search themes into catalogue highlights, WhatsApp scripts, and social content.'
        : 'Encourage more on-site search usage through clearer catalogue prompts.',
      'Use high-intent quotation terms to refine landing-page and WhatsApp copy.',
    ]
  },

  prepareSupplierRecommendations(summary) {
    const categoryCount = Object.keys(summary.most_viewed_categories || {}).length
    return [
      categoryCount
        ? 'Share category interest summaries with suppliers during range planning.'
        : 'Collect more category-click data before supplier negotiations.',
      'Use weak signals to test small-batch sourcing before committing to broad stock.',
    ]
  },

  futureIntegrations: {
    llmProvider: 'placeholder: call a backend LLM service for summarization and procurement insights',
    promptLibrary: 'placeholder: keep operational prompts on the backend, never in the public bundle',
  },
}
