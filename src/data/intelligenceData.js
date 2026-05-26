import {
  Brush,
  Home,
  PaintBucket,
  ShowerHead,
  Sparkles,
  Store,
  Wrench,
} from 'lucide-react'

export const intelligenceCollections = {
  search_logs: [],
  category_interest: [],
  product_interest: [],
  recommendation_signals: [],
  monthly_summary_data: {
    top_searches: [],
    emerging_searches: [],
    most_viewed_categories: [],
    whatsapp_inquiry_trends: [],
    county_location_interest: [],
    weak_signals: [],
  },
}

export const projectTypes = ['Homeowner', 'Contractor', 'Developer', 'Architect', 'Institution']

export const suggestedSearches = [
  'bathroom tiles',
  'floor tiles for living room',
  'wall tiles for kitchen',
  'tile adhesive and grout',
  'sanitaryware set',
  'exterior paint',
]

export const trendingSearches = [
  'matte floor tiles',
  'bathroom renovation',
  'outdoor tiles',
  'basins and mixers',
  'tile grout colours',
]

export const popularCategories = [
  'Floor Tiles',
  'Bathroom Tiles',
  'Sanitaryware',
  'Adhesives & Grout',
]

export const trendingProducts = [
  {
    name: 'Matte floor tile finishes',
    category: 'Floor Tiles',
    signal: 'High fit for homes and retail floors',
    img: '/images/tiles-floor.jpg',
  },
  {
    name: 'Bathroom wall and floor sets',
    category: 'Bathroom Tiles',
    signal: 'Strong interest for renovation projects',
    img: '/images/bathroom-blue-1.jpg',
  },
  {
    name: 'Basins with mixer options',
    category: 'Sanitaryware',
    signal: 'Commonly paired with bathroom tile enquiries',
    img: '/images/sanitary-basins.jpg',
  },
  {
    name: 'Tile adhesive and grout kits',
    category: 'Adhesives & Grout',
    signal: 'Complementary to tile orders',
    img: '/images/adhesive.jpg',
  },
]

export const inspirationSpaces = [
  {
    name: 'Bathrooms',
    text: 'Calm tiles, sanitaryware and accessories for compact or premium suites.',
    img: '/images/bathroom-blue-1.jpg',
    icon: ShowerHead,
  },
  {
    name: 'Kitchens',
    text: 'Wall tiles, sinks, mixers and practical paint finishes for busy rooms.',
    img: '/images/kitchen.jpg',
    icon: Home,
  },
  {
    name: 'Living rooms',
    text: 'Floor tile ideas and paint combinations for warm, durable interiors.',
    img: '/images/tiles-gallery-1.jpg',
    icon: Sparkles,
  },
  {
    name: 'Outdoor spaces',
    text: 'Textured tiles and exterior paints for patios, balconies and walkways.',
    img: '/images/tiles-floor-2.jpg',
    icon: Store,
  },
]

export const categoryRelationships = {
  'Floor Tiles': {
    related: ['Wall Tiles', 'Outdoor Tiles', 'Adhesives & Grout'],
    alsoViewed: ['Matte floor tile finishes', 'Textured floor tiles', 'Tile grout'],
    complementary: ['Tile adhesive', 'Tile spacers', 'Floor paints'],
  },
  'Wall Tiles': {
    related: ['Bathroom Tiles', 'Floor Tiles', 'Paints'],
    alsoViewed: ['Kitchen wall tiles', 'Feature wall tiles', 'Neutral wall tiles'],
    complementary: ['Tile trims', 'Tile grout', 'Interior paints'],
  },
  'Bathroom Tiles': {
    related: ['Sanitaryware', 'Wall Tiles', 'Adhesives & Grout'],
    alsoViewed: ['Bathroom wall and floor sets', 'Shower wall finishes', 'Bathroom accessories'],
    complementary: ['Basins', 'Taps & mixers', 'Tile grout'],
  },
  Sanitaryware: {
    related: ['Bathroom Tiles', 'Adhesives & Grout', 'Paints'],
    alsoViewed: ['Basins with mixer options', 'Toilets', 'Showers'],
    complementary: ['Bathroom tiles', 'Bathroom accessories', 'Waterproof grout'],
  },
  Paints: {
    related: ['Wall Tiles', 'Outdoor Tiles', 'Floor Tiles'],
    alsoViewed: ['Interior paints', 'Exterior paints', 'Floor paints'],
    complementary: ['Wall tiles', 'Floor tiles', 'Tile trims'],
  },
  'Adhesives & Grout': {
    related: ['Floor Tiles', 'Wall Tiles', 'Bathroom Tiles'],
    alsoViewed: ['Tile adhesive and grout kits', 'Tile tools', 'Tile fittings'],
    complementary: ['Floor tiles', 'Wall tiles', 'Installation support'],
  },
  'Installation Support': {
    related: ['Adhesives & Grout', 'Floor Tiles', 'Bathroom Tiles'],
    alsoViewed: ['Tile tools', 'Tile fittings', 'Professional tile laying'],
    complementary: ['Tile adhesive', 'Tile grout', 'Project quotation'],
  },
}

export const projectTypeSignals = {
  Homeowner: ['Bathroom Tiles', 'Floor Tiles', 'Paints'],
  Contractor: ['Adhesives & Grout', 'Floor Tiles', 'Installation Support'],
  Developer: ['Floor Tiles', 'Sanitaryware', 'Project quotations'],
  Architect: ['Wall Tiles', 'Bathroom Tiles', 'Paints'],
  Institution: ['Floor Tiles', 'Sanitaryware', 'Site delivery available'],
}

export const categoryIcons = {
  Paints: PaintBucket,
  'Adhesives & Grout': Brush,
  'Installation Support': Wrench,
}
