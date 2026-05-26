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

  futureIntegrations: {
    llmProvider: 'placeholder: call a backend LLM service for summarization and procurement insights',
    promptLibrary: 'placeholder: keep operational prompts on the backend, never in the public bundle',
  },
}
