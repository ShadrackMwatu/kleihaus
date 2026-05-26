import {
  categoryRelationships,
  popularCategories,
  projectTypeSignals,
  trendingProducts,
  trendingSearches,
} from '../data/intelligenceData'

const dedupe = (items) => [...new Set(items.filter(Boolean))]

export const recommendationService = {
  getSearchSuggestions(query = '', projectType = 'Homeowner') {
    const normalizedQuery = query.trim().toLowerCase()
    const projectSignals = projectTypeSignals[projectType] || []
    const candidates = dedupe([...projectSignals, ...trendingSearches, ...popularCategories])

    if (!normalizedQuery) return candidates.slice(0, 6)

    return candidates
      .filter((item) => item.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(item.toLowerCase()))
      .slice(0, 6)
  },

  getRecommendations({ selectedCategory = 'Floor Tiles', projectType = 'Homeowner' } = {}) {
    const relationship = categoryRelationships[selectedCategory] || categoryRelationships['Floor Tiles']
    const projectSignals = projectTypeSignals[projectType] || projectTypeSignals.Homeowner

    return {
      relatedCategories: dedupe([...relationship.related, ...projectSignals]).slice(0, 4),
      customersAlsoViewed: relationship.alsoViewed,
      complementaryProducts: relationship.complementary,
      trendingProducts: trendingProducts.filter((product) =>
        [selectedCategory, ...relationship.related, ...projectSignals].includes(product.category),
      ),
    }
  },

  getAdminSignals(events = []) {
    const count = (eventType, field) =>
      events
        .filter((event) => event.eventType === eventType && event.payload?.[field])
        .reduce((acc, event) => {
          const key = event.payload[field]
          acc[key] = (acc[key] || 0) + 1
          return acc
        }, {})

    const topSearches = count('search', 'query')
    const categoryPopularity = count('category_click', 'category')

    return {
      topSearches,
      searchTrends: count('autocomplete_select', 'query'),
      categoryPopularity,
      weakSignalDetection: Object.keys(topSearches).filter((query) => topSearches[query] === 1),
      whatsappInquiryTrends: count('whatsapp_click', 'source'),
    }
  },
}
