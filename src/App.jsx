import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Brush,
  Calculator,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Mail,
  MapPin,
  Menu,
  PaintBucket,
  Phone,
  Search,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Store,
  Ruler,
  Truck,
  Wrench,
  X,
} from 'lucide-react'
import {
  suggestedSearches,
} from './data/intelligenceData'
import { analyticsService } from './services/analyticsService'
import { recommendationService } from './services/recommendationService'
import { quoteRequestService } from './services/quoteRequestService'
import { primaryNavigation } from './seoManifest'

const heroSlides = [
  {
    image: '/images/kleihaus-structure.jpg',
    alt: 'Kleihaus Ceramics showroom structure for tiles and finishing materials',
    label: 'Showroom supply',
  },
  {
    image: '/images/tiles-floor.jpg',
    alt: 'Premium floor tiles supplied by Kleihaus Ceramics',
    label: 'Tile finishes',
  },
  {
    image: '/images/bathroom-blue-1.jpg',
    alt: 'Blue bathroom and sanitaryware display supplied by Kleihaus Ceramics',
    label: 'Bathroom sets',
  },
  {
    image: '/images/sanitaryware/sanitaryware-shower-display-02.jpg',
    alt: 'Sanitaryware shower and tap display at Kleihaus Ceramics',
    label: 'Sanitaryware displays',
  },
  {
    image: '/images/sanitaryware/sanitaryware-gold-shower-display-01.jpg',
    alt: 'Gold shower and bathroom accessory display at Kleihaus Ceramics',
    label: 'Shower fittings',
  },
  {
    image: '/images/paint-interior.jpg',
    alt: 'Interior paint options for Kleihaus finishing projects',
    label: 'Paint finishes',
  },
  {
    image: '/images/adhesive.jpg',
    alt: 'Tile adhesive and installation materials supplied by Kleihaus Ceramics',
    label: 'Installation essentials',
  },
]

const sanitarywareShowroomImages = [
  {
    src: '/images/sanitaryware/sanitaryware-shower-display-01.jpg',
    alt: 'Chrome shower systems and bathroom accessory display at Kleihaus Ceramics',
    label: 'Chrome shower systems',
  },
  {
    src: '/images/sanitaryware/sanitaryware-tap-rail-display-01.jpg',
    alt: 'Tap mixers rails and shower fittings displayed at Kleihaus Ceramics',
    label: 'Taps, rails and fittings',
  },
  {
    src: '/images/sanitaryware/sanitaryware-shower-mixer-01.jpg',
    alt: 'Shower mixer and bathroom fixture display for Kleihaus quote planning',
    label: 'Shower mixers',
  },
  {
    src: '/images/sanitaryware/sanitaryware-shower-display-02.jpg',
    alt: 'Bathroom shower system and tap display at Kleihaus Ceramics',
    label: 'Shower and tap display',
  },
  {
    src: '/images/sanitaryware/sanitaryware-shower-display-03.jpg',
    alt: 'Sanitaryware shower fixtures and bathroom fittings display',
    label: 'Bathroom fittings',
  },
  {
    src: '/images/sanitaryware/sanitaryware-gold-shower-display-01.jpg',
    alt: 'Gold shower set and coordinated bathroom accessories display',
    label: 'Gold shower fittings',
  },
  {
    src: '/images/sanitaryware/sanitaryware-black-shower-display-01.jpg',
    alt: 'Black shower systems and tap fittings displayed by Kleihaus Ceramics',
    label: 'Black shower systems',
  },
  {
    src: '/images/sanitaryware/sanitaryware-black-shower-display-02.jpg',
    alt: 'Matte black shower fixtures and bathroom accessory display',
    label: 'Matte black fixtures',
  },
  {
    src: '/images/sanitaryware/sanitaryware-black-tap-display-01.jpg',
    alt: 'Black tap mixers and shower rail display for bathroom projects',
    label: 'Black taps and mixers',
  },
  {
    src: '/images/sanitaryware/sanitaryware-glass-shower-display-01.jpg',
    alt: 'Glass shower display with chrome fittings and towel rails',
    label: 'Glass shower display',
  },
  {
    src: '/images/sanitaryware/sanitaryware-shower-accessories-01.jpg',
    alt: 'Shower accessories taps and towel rail display at Kleihaus Ceramics',
    label: 'Shower accessories',
  },
]

const sanitarywareKitchenImages = [
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-sink-window-01.jpg',
    alt: 'Inset kitchen sink and mixer beside a window with a dark countertop',
    label: 'Window-side sink set',
    story: 'A polished sink zone framed by natural light, made for customers who want daily utility to feel calm, clean and considered.',
  },
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-mixer-display-01.jpg',
    alt: 'Bright kitchen with coordinated cabinets countertop sink and mixer',
    label: 'Coordinated kitchen mixer',
    story: 'Soft cabinetry, clean lines and a practical mixer show how sanitaryware details can quietly complete a premium kitchen finish.',
  },
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-black-sink-01.jpg',
    alt: 'Black kitchen sink and mixer set into a dark countertop',
    label: 'Black sink and mixer',
    story: 'A dark sink and mixer combination gives the worktop a confident modern edge while keeping the preparation area simple to maintain.',
  },
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-overview-01.jpg',
    alt: 'Open kitchen view with countertop sink mixer cabinets and tile backsplash',
    label: 'Kitchen finishing view',
    story: 'This full kitchen view shows why sinks, mixers, tiles and surfaces should be selected together for a balanced finishing palette.',
  },
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-sink-backsplash-01.jpg',
    alt: 'Kitchen sink with black mixer and textured white backsplash tile',
    label: 'Sink with feature backsplash',
    story: 'A sculpted white backsplash turns the sink wall into a focal point, pairing practical washing space with a boutique visual accent.',
  },
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-overview-02.jpg',
    alt: 'Kitchen with sink mixer countertop tile backsplash and white cabinets',
    label: 'Countertop and sink pairing',
    story: 'The sink, mixer and worktop sit inside a restrained kitchen palette, useful for clients planning a neat, premium everyday space.',
  },
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-double-sink-01.jpg',
    alt: 'Double-bowl kitchen sink with black mixer and marble-look countertop',
    label: 'Double-bowl sink',
    story: 'A double-bowl sink supports busy food preparation and cleanup while the dark mixer adds definition against the marble-look counter.',
  },
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-drainer-sink-01.jpg',
    alt: 'Kitchen sink with integrated drainer black mixer and textured backsplash',
    label: 'Sink and drainer set',
    story: 'The integrated drainer keeps the wet area orderly, a practical sanitaryware choice for compact kitchens and daily family use.',
  },
  {
    src: '/images/sanitaryware/sanitaryware-kitchen-black-sink-02.jpg',
    alt: 'Black kitchen sink with mixer and textured white backsplash',
    label: 'Black sink feature',
    story: 'A black sink anchors the counter with a crisp designer note, especially effective against light textured wall finishes.',
  },
]

const isDevelopment = () => typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV)

const debugLog = (event, details) => {
  if (isDevelopment()) console.log(event, details)
}

const emptyQuoteForm = {
  name: '',
  email: '',
  phone: '',
  location: '',
  message: '',
  requestDetails: '',
  details: '',
}

const getEmptyQuoteForm = () => ({
  name: '',
  email: '',
  phone: '',
  location: '',
  message: '',
  requestDetails: '',
  details: '',
})

const seoTitle = 'Kleihaus Ceramics Kenya | Tiles, Sanitaryware, Paints & Project Support'
const seoDescription =
  'Discover tiles, sanitaryware, kitchen sinks, paints, adhesives, grout, tools and project support from Kleihaus Ceramics in Nairobi, Machakos and Makueni.'
const canonicalUrl = 'https://www.kleihaus.com/'
const defaultSeoImage = 'https://www.kleihaus.com/images/kleihaus-structure.jpg'

const navItems = primaryNavigation

const categoryNav = ['Floor Tiles', 'Wall Tiles', 'Bathroom Tiles', 'Sanitaryware', 'Kitchen Sinks & Mixers', 'Paints', 'Adhesives & Grout', 'Installation Support']

const categories = [
  {
    name: 'Floor Tiles',
    blurb: 'Durable finishes for homes, shops and projects.',
    use: 'Homes, shops, offices and rental units',
    img: '/images/tiles-floor.jpg',
    icon: Store,
  },
  {
    name: 'Wall Tiles',
    blurb: 'Clean ceramic and decor wall finishes.',
    use: 'Kitchens, bathrooms and feature walls',
    img: '/images/tiles-wall.jpg',
    icon: ClipboardList,
  },
  {
    name: 'Outdoor Tiles',
    blurb: 'Textured options for patios and wet areas.',
    use: 'Balconies, patios, entries and wet zones',
    img: '/images/tiles-floor-2.jpg',
    icon: Sparkles,
  },
  {
    name: 'Bathroom Tiles',
    blurb: 'Coordinated wall and floor bathroom finishes.',
    use: 'Bathrooms, showers and cloakrooms',
    img: '/images/bathroom-blue-1.jpg',
    icon: ShowerHead,
  },
  {
    name: 'Sanitaryware',
    blurb: 'Basins, toilets, taps, showers and accessories.',
    use: 'Complete bathroom fittings and upgrades',
    img: '/images/sanitaryware/sanitaryware-shower-display-02.jpg',
    icon: ShowerHead,
  },
  {
    name: 'Kitchen Sinks & Mixers',
    blurb: 'Sink and mixer options for coordinated kitchen finishing.',
    use: 'Kitchen sink zones, mixers and countertops',
    img: '/images/sanitaryware/sanitaryware-kitchen-sink-backsplash-01.jpg',
    icon: Droplets,
  },
  {
    name: 'Paints',
    blurb: 'Interior, exterior, roof and floor paints.',
    use: 'Interior walls, exterior walls, floors and roofs',
    img: '/images/paint-interior.jpg',
    icon: PaintBucket,
  },
  {
    name: 'Adhesives & Grout',
    blurb: 'Adhesive, grout, trims and fixing essentials.',
    use: 'Tile fixing, joints and installation finishes',
    img: '/images/adhesive.jpg',
    icon: Brush,
  },
  {
    name: 'Installation Support',
    blurb: 'Tile planning, matching and site guidance.',
    use: 'Quantity planning, product matching and site guidance',
    img: '/images/tiler-service.jpg',
    icon: Wrench,
  },
]

const productGroups = [
  {
    title: 'Floor Tiles',
    note: 'Strong, easy-to-maintain tile finishes for homes, retail spaces and developments.',
    items: [
      { name: 'Polished floor tiles', detail: 'Elegant indoor spaces', img: '/images/tiles-floor.jpg' },
      { name: 'Textured floor tiles', detail: 'Wet areas and entries', img: '/images/tiles-floor-2.jpg' },
      { name: 'Decor floor finishes', detail: 'Feature rooms and accents', img: '/images/tiles-gallery-1.jpg' },
    ],
  },
  {
    title: 'Wall Tiles',
    note: 'Wall surfaces for kitchens, bathrooms and feature areas.',
    items: [
      { name: 'Kitchen wall tiles', detail: 'Clean splashback finishes', img: '/images/tiles-wall.jpg' },
      { name: 'Feature wall tiles', detail: 'Decor and texture', img: '/images/tiles-decor.jpg' },
      { name: 'Neutral wall tiles', detail: 'Timeless interiors', img: '/images/tiles-wall-2.jpg' },
    ],
  },
  {
    title: 'Bathroom Tiles',
    note: 'Coordinated floor and wall finishes for compact bathrooms and full suites.',
    items: [
      { name: 'Blue bathroom set', detail: 'Modern coordinated look', img: '/images/bathroom-blue-1.jpg' },
      { name: 'Shower wall finishes', detail: 'Clean wet-room surfaces', img: '/images/shower-rail-1.jpg' },
      { name: 'Bathroom accessories', detail: 'Complete the room', img: '/images/sanitary-accessories.jpg' },
    ],
  },
  {
    title: 'Sanitaryware',
    note: 'Bathroom fixtures and fittings for retail and project orders.',
    items: [
      { name: 'Shower systems', detail: 'Chrome, black and gold finishes', img: '/images/sanitaryware/sanitaryware-shower-display-01.jpg' },
      { name: 'Taps & mixers', detail: 'Coordinated bathroom fittings', img: '/images/sanitaryware/sanitaryware-black-tap-display-01.jpg' },
      { name: 'Rails & accessories', detail: 'Complete the bathroom setup', img: '/images/sanitaryware/sanitaryware-shower-accessories-01.jpg' },
      { name: 'Kitchen sinks & mixers', detail: 'Premium sink zones for coordinated kitchen finishes', img: '/images/sanitaryware/sanitaryware-kitchen-sink-backsplash-01.jpg' },
    ],
  },
  {
    title: 'Paints',
    note: 'Finishing coats for interior, exterior, roof and floor applications.',
    items: [
      { name: 'Interior paints', detail: 'Smooth room finishes', img: '/images/paint-interior.jpg' },
      { name: 'Exterior paints', detail: 'Weather-ready surfaces', img: '/images/paint-exterior.jpg' },
      { name: 'Floor paints', detail: 'Durable utility finishes', img: '/images/paint-floor.jpg' },
    ],
  },
  {
    title: 'Adhesives & Grout',
    note: 'The setting materials and accessories that help tiles perform properly.',
    items: [
      { name: 'Tile adhesive', detail: 'Reliable tile fixing', img: '/images/adhesive.jpg' },
      { name: 'Tile grout', detail: 'Clean joint finishes', img: '/images/grout.jpg' },
      { name: 'Tile tools', detail: 'Support for installers', img: '/images/tile-tools.jpg' },
    ],
  },
]

const categoryLandingPages = [
  {
    path: '/tiles',
    category: 'Tiles',
    title: 'Tiles Kenya | Floor, Wall & Bathroom Tiles | Kleihaus Ceramics',
    description: 'Explore tile quote guidance for floor tiles, wall tiles, bathroom tiles and outdoor finishes from Kleihaus Ceramics in Nairobi, Machakos, Makueni and Kenya.',
    eyebrow: 'Tile quote support',
    h1: 'Tiles for homes, commercial spaces and projects in Kenya',
    intro:
      'Kleihaus helps customers compare floor tiles, wall tiles, bathroom tiles and outdoor tile finishes for homes, shops, rentals and project sites. Share measurements, finish preference, quantity and delivery location for focused quote support.',
    notes: ['Floor, wall, bathroom and outdoor tile planning', 'Quantity estimates and finish matching', 'Adhesives, grout, trims and installation support'],
    images: [
      { src: '/images/tiles-floor.jpg', alt: 'Floor tile finishes for homes and project quote planning in Kenya', label: 'Floor tiles' },
      { src: '/images/tiles-wall.jpg', alt: 'Wall tile options for kitchens bathrooms and feature interiors', label: 'Wall tiles' },
      { src: '/images/bathroom-blue-1.jpg', alt: 'Bathroom tile and sanitaryware coordination by Kleihaus Ceramics', label: 'Bathroom tiles' },
      { src: '/images/tiles-floor-2.jpg', alt: 'Textured outdoor tile finishes for patios entries and wet zones', label: 'Outdoor tiles' },
      { src: '/images/tile-tools.jpg', alt: 'Tile tools and installation essentials for professional finishing support', label: 'Tile tools' },
      { src: '/images/grout.jpg', alt: 'Tile grout and finishing materials for clean joint finishes', label: 'Grout finishes' },
    ],
  },
  {
    path: '/floor-tiles',
    category: 'Floor Tiles',
    title: 'Floor Tiles Kenya | Kleihaus Ceramics',
    description: 'Browse floor tile ideas for homes, shops and projects in Kenya. Request a Kleihaus quote based on quantity, location and project details.',
    eyebrow: 'Floor tile quotes',
    h1: 'Floor tiles for homes, shops and projects in Kenya',
    intro:
      'Kleihaus is helping customers compare floor tile finishes for living rooms, kitchens, shops, offices and rental projects. Share room size, preferred finish, quantity estimate and delivery location for practical quote support.',
    notes: ['Living rooms and kitchens', 'Retail and office floors', 'Rental units and project sites'],
    images: [
      { src: '/images/tiles-floor.jpg', alt: 'Polished floor tiles for Kenyan home and project interiors', label: 'Polished indoor floors' },
      { src: '/images/tiles-floor-2.jpg', alt: 'Textured floor tiles suitable for entries and busy areas', label: 'Textured floor finishes' },
      { src: '/images/tiles-gallery-1.jpg', alt: 'Floor tile display options for coordinated room finishes', label: 'Coordinated tile options' },
      { src: '/images/kitchen.jpg', alt: 'Kitchen floor tile inspiration for Kleihaus quote planning', label: 'Kitchen floor ideas' },
    ],
  },
  {
    path: '/wall-tiles',
    category: 'Wall Tiles',
    title: 'Wall Tiles Kenya | Kitchen & Interior Wall Tiles | Kleihaus',
    description: 'Explore wall tile options for kitchens, bathrooms and feature walls. Request Kleihaus quote guidance for availability, quantity and delivery details.',
    eyebrow: 'Wall tile quotes',
    h1: 'Wall tiles for kitchens, bathrooms and feature interiors',
    intro:
      'Wall tiles lift kitchens, bathrooms and feature areas while keeping surfaces easy to clean. Kleihaus is helping customers match colors, textures and quantities for retail or project quotations.',
    notes: ['Kitchen splashbacks', 'Bathroom walls', 'Decor and feature surfaces'],
    images: [
      { src: '/images/tiles-wall.jpg', alt: 'Kitchen wall tiles and splashback finishes supplied by Kleihaus', label: 'Kitchen wall tiles' },
      { src: '/images/tiles-wall-2.jpg', alt: 'Neutral wall tile finish for clean interior surfaces', label: 'Neutral wall finishes' },
      { src: '/images/tiles-decor.jpg', alt: 'Decorative wall tiles for feature surfaces and accents', label: 'Decor wall tiles' },
      { src: '/images/tile-fittings.jpg', alt: 'Tile fittings and trims for wall tile finishing', label: 'Wall tile fittings' },
    ],
  },
  {
    path: '/bathroom-tiles',
    category: 'Bathroom Tiles',
    title: 'Bathroom Tiles Kenya | Shower & Wet Area Tiles | Kleihaus',
    description: 'Plan bathroom tile combinations for showers, walls and floors. Request a Kleihaus quote based on room size, tile type and location.',
    eyebrow: 'Bathroom tile quotes',
    h1: 'Bathroom tiles for modern wet areas and coordinated suites',
    intro:
      'Bathroom tile choices should balance slip resistance, cleaning, moisture exposure and visual comfort. Kleihaus supports wall and floor combinations for compact bathrooms, shower areas and full suites.',
    notes: ['Bathroom walls and floors', 'Shower and wet areas', 'Coordinated sanitaryware support'],
    images: [
      { src: '/images/bathroom-blue-1.jpg', alt: 'Blue bathroom tile and sanitaryware display for quote planning', label: 'Coordinated bathroom look' },
      { src: '/images/shower-rail-1.jpg', alt: 'Shower area tile and rail inspiration for wet rooms', label: 'Shower area finishes' },
      { src: '/images/sanitary-accessories.jpg', alt: 'Bathroom accessories for complete tile and sanitaryware planning', label: 'Bathroom accessories' },
      { src: '/images/sanitary-showers.jpg', alt: 'Shower fixtures paired with bathroom tile finishes', label: 'Shower fixtures' },
    ],
  },
  {
    path: '/sanitaryware',
    category: 'Sanitaryware',
    title: 'Sanitaryware Kenya | Basins, Toilets, Taps & Showers | Kleihaus',
    description: 'Browse sanitaryware quote support for basins, toilets, taps, mixers, showers and bathroom accessories from Kleihaus Ceramics.',
    eyebrow: 'Sanitaryware quotes',
    h1: 'Sanitaryware for bathrooms, renovations and project orders',
    intro:
      'Kleihaus supports sanitaryware inquiries for basins, toilets, baths, showers, taps, mixers and bathroom accessories. Share the room style, quantity and location for useful quote guidance.',
    notes: ['Basins and toilets', 'Taps, mixers and showers', 'Bathroom accessories'],
    images: [
      ...sanitarywareShowroomImages,
      ...sanitarywareKitchenImages,
      { src: '/images/sanitary-set-1.jpg', alt: 'Sanitaryware set for bathroom quote planning in Kenya', label: 'Bathroom sets' },
      { src: '/images/sanitary-basins.jpg', alt: 'Bathroom basins available for sanitaryware quote inquiries', label: 'Basins' },
      { src: '/images/sanitary-toilets.jpg', alt: 'Modern toilet options for bathroom projects and renovations', label: 'Toilets' },
      { src: '/images/taps-display-1.jpg', alt: 'Tap and mixer display for coordinated sanitaryware finishes', label: 'Taps and mixers' },
      { src: '/images/sink-mixer-1.png', alt: 'Sink mixer fitting for bathroom and kitchen finishing', label: 'Mixers' },
    ],
  },
  {
    path: '/paints',
    category: 'Paints',
    title: 'Paints Kenya | Interior, Exterior, Roof & Floor Paints | Kleihaus',
    description: 'Request Kleihaus paint quote guidance for interior, exterior, roof and floor finishes based on surface area, location and project needs.',
    eyebrow: 'Paint quote support',
    h1: 'Paints for interior, exterior, roof and floor finishing',
    intro:
      'Paint choices depend on the surface, weather exposure, cleaning needs and finish preference. Kleihaus helps customers plan paint inquiries for rooms, exterior walls, floors and roofs.',
    notes: ['Interior wall finishes', 'Exterior and roof paint', 'Floor and utility coatings'],
    images: [
      { src: '/images/paint-interior.jpg', alt: 'Interior paint finish options for Kleihaus quote planning', label: 'Interior paints' },
      { src: '/images/paint-exterior.jpg', alt: 'Exterior paint options for weather-exposed walls', label: 'Exterior paints' },
      { src: '/images/paint-roof.jpg', alt: 'Roof paint finish for Kenyan homes and buildings', label: 'Roof paints' },
      { src: '/images/paint-floor.jpg', alt: 'Floor paint option for durable utility surfaces', label: 'Floor paints' },
    ],
  },
  {
    path: '/adhesives-grout',
    category: 'Adhesives & Grout',
    title: 'Tile Adhesives & Grout Kenya | Kleihaus Ceramics',
    description: 'Plan tile adhesive, grout, trims, spacers and installation essentials with Kleihaus quote support for tile projects in Kenya.',
    eyebrow: 'Installation material quotes',
    h1: 'Tile adhesives, grout and installation essentials',
    intro:
      'Good tile performance depends on the right adhesive, grout and finishing accessories for the tile type, surface and wet or dry area. Kleihaus is helping customers plan installation material requests.',
    notes: ['Tile adhesive and grout', 'Trims, spacers and fittings', 'Installer support materials'],
    images: [
      { src: '/images/adhesive.jpg', alt: 'Tile adhesive for floor and wall tile installation', label: 'Tile adhesive' },
      { src: '/images/grout.jpg', alt: 'Tile grout for clean joint finishing', label: 'Tile grout' },
      { src: '/images/tile-tools.jpg', alt: 'Tile tools and accessories for installation support', label: 'Tile tools' },
      { src: '/images/tiler-service.jpg', alt: 'Tile installation support and site guidance', label: 'Installation support' },
    ],
  },
  {
    path: '/installation-support',
    category: 'Installation Support',
    title: 'Installation Support Kenya | Kleihaus Ceramics',
    description: 'Plan tile and finishing installation support with Kleihaus, including site measurements, product matching, surface preparation, fixing, grouting, cleaning and training guidance.',
    eyebrow: 'Installation support',
    h1: 'Installation support from site planning to final finish',
    intro:
      'Kleihaus helps homeowners, fundis, contractors and project teams plan the full finishing workflow: measurements, quantity guidance, product matching, surface preparation, cutting and drilling needs, fixing, grouting, cleaning and handover.',
    notes: [
      'Site measurement and quantity planning',
      'Product matching for tiles, adhesives, grout, trims, sanitaryware and paints',
      'Preparation, cutting, drilling, fixing, grouting, cleaning and handover guidance',
      'Optional logistics, delivery coordination, tailored training and technical support',
    ],
    images: [
      { src: '/images/tiler-service.jpg', alt: 'Tile installer preparing installation support for Kleihaus customers', label: 'Site installation support' },
      { src: '/images/tile-tools.jpg', alt: 'Tile tools for cutting drilling fixing and installation workflow planning', label: 'Right tools for the job' },
      { src: '/images/adhesive.jpg', alt: 'Tile adhesive matched to surface preparation and fixing needs', label: 'Adhesive matching' },
      { src: '/images/grout.jpg', alt: 'Tile grout for clean finishing and handover support', label: 'Grouting and finishing' },
      { src: '/images/tile-fittings.jpg', alt: 'Tile trims spacers and fittings for installation support', label: 'Trims and fittings' },
      { src: '/images/tiles-gallery-1.jpg', alt: 'Finished tile installation inspiration for customer handover planning', label: 'Final finish' },
    ],
  },
]

const locationSeoTargets = [
  {
    slug: 'nairobi',
    label: 'Nairobi',
    phrase: 'homes, apartments, retail spaces and project sites in Nairobi',
    logistics: 'delivery coordination within Nairobi depends on order size, site access and timing',
    projectTypes: 'apartment renovations, retail fit-outs, offices, rental units and compact residential upgrades',
    customerNeeds: 'quick stock guidance, tight delivery windows, building access planning and coordinated material choices',
    siteConsiderations: 'lift access, parking, traffic windows and secure offloading can affect delivery timing',
  },
  {
    slug: 'machakos',
    label: 'Machakos',
    phrase: 'homes, rentals, commercial spaces and construction projects in Machakos',
    logistics: 'delivery support to Machakos is planned around quantity, supplier availability and site requirements',
    projectTypes: 'new homes, rental units, shop spaces, institutional projects and phased construction sites',
    customerNeeds: 'clear quantities, dependable finishing materials and delivery planning that suits project stages',
    siteConsiderations: 'site distance, road access, storage space and installation readiness shape the support plan',
  },
  {
    slug: 'makueni',
    label: 'Makueni',
    phrase: 'home builds, renovations and project sites in Makueni',
    logistics: 'Makueni delivery coordination is available where practical based on order details and route planning',
    projectTypes: 'home builds, upgrades, rural project sites, rental finishing and community facility improvements',
    customerNeeds: 'durable finishes, practical substitutions, transport-aware quantities and installer guidance',
    siteConsiderations: 'route planning, material consolidation and site readiness matter more where trips are longer',
  },
  {
    slug: 'kenya',
    label: 'Kenya',
    phrase: 'retail customers, contractors, fundis, developers and project teams across Kenya',
    logistics: 'wider Kenya logistics support is reviewed case by case based on product mix, quantity and destination',
    projectTypes: 'residential, commercial, contractor, retail and multi-location finishing projects',
    customerNeeds: 'remote quote preparation, clear product references, quantity estimates and practical delivery review',
    siteConsiderations: 'destination, carrier options, order volume and material fragility guide wider Kenya support',
  },
]

const localSeoServiceTargets = [
  {
    slug: 'tiles',
    label: 'Tiles',
    titleLabel: 'Tiles',
    basePath: '/tiles',
    guidePath: '/tile-buying-guide',
    imageSet: ['/images/tiles-floor.jpg', '/images/tiles-wall.jpg', '/images/bathroom-blue-1.jpg', '/images/tile-tools.jpg'],
    focus:
      'floor tiles, wall tiles, bathroom tiles and outdoor tile finishes with adhesive, grout and trim guidance',
    planning:
      'Share room measurements, tile size preference, finish, quantity estimate and delivery location so Kleihaus can guide suitable options.',
    selectionGuidance:
      'Tile advice should balance room use, slip risk, cleaning needs, grout color, cuts, wastage allowance and the surface receiving the tile.',
    installationRelevance:
      'Confirm adhesive, grout, trims and installer workflow early so selected tiles perform well after handover.',
  },
  {
    slug: 'sanitaryware',
    label: 'Sanitaryware',
    titleLabel: 'Sanitaryware',
    basePath: '/sanitaryware',
    guidePath: '/bathroom-renovation-guide',
    imageSet: [
      '/images/sanitaryware/sanitaryware-shower-display-02.jpg',
      '/images/sanitaryware/sanitaryware-black-tap-display-01.jpg',
      '/images/sanitaryware/sanitaryware-gold-shower-display-01.jpg',
      '/images/sanitaryware/sanitaryware-shower-accessories-01.jpg',
    ],
    focus:
      'basins, toilets, taps, mixers, showers and bathroom accessories matched with bathroom tile plans',
    planning:
      'Share bathroom layout, preferred finish, fixture list, quantity and location so Kleihaus can support coordinated sanitaryware planning.',
    selectionGuidance:
      'Sanitaryware planning works best when fixture finish, plumbing points, wall tile color, cleaning needs and accessory placement are reviewed together.',
    installationRelevance:
      'Confirm mixer type, mounting points, drainage, accessories and tile drilling requirements before materials reach site.',
  },
  {
    slug: 'paints',
    label: 'Paints',
    titleLabel: 'Paints',
    basePath: '/paints',
    guidePath: '/paint-selection-guide',
    imageSet: ['/images/paint-interior.jpg', '/images/paint-exterior.jpg', '/images/paint-roof.jpg', '/images/paint-floor.jpg'],
    focus:
      'interior paints, exterior paints, roof paints and floor coatings selected around surface condition and finish goals',
    planning:
      'Share room or surface area, interior or exterior use, preferred finish, location and project timing for practical paint guidance.',
    selectionGuidance:
      'Paint guidance should consider surface condition, weather exposure, washability, sheen, color consistency and preparation requirements.',
    installationRelevance:
      'Plan filling, sanding, priming, drying time and application tools before buying paint for larger surfaces.',
  },
  {
    slug: 'installation-support',
    label: 'Installation Support',
    titleLabel: 'Installation Support',
    basePath: '/installation-support',
    guidePath: '/installation-best-practices',
    imageSet: ['/images/tiler-service.jpg', '/images/tile-tools.jpg', '/images/adhesive.jpg', '/images/grout.jpg'],
    focus:
      'site measurement, product matching, surface preparation, cutting, drilling, fixing, grouting, cleaning and handover support',
    planning:
      'Share site photos, measurements, tile or finish type, substrate condition and location so Kleihaus can advise on the installation workflow.',
    selectionGuidance:
      'Installation support should connect measurements, substrate condition, material choice, cutting needs, tools and the skill level available on site.',
    installationRelevance:
      'Discuss the sequence from preparation to handover before installation starts so materials, tools and expectations are aligned.',
  },
]

const buildLocalSeoLandingPage = (service, location) => ({
  path: `/${service.slug}-${location.slug}`,
  category: `${service.label} ${location.label}`,
  schemaType: 'CollectionPage',
  serviceType: service.titleLabel,
  areaServed: location.label,
  title: `${service.titleLabel} ${location.label} | Kleihaus Ceramics Kenya`,
  description: `${service.titleLabel} support for ${location.label}: ${service.focus}. Kleihaus helps with advisory, quantity guidance, delivery coordination and installation support.`,
  eyebrow: `${service.titleLabel} in ${location.label}`,
  h1: `${service.titleLabel} support for ${location.label} projects`,
  intro: `Kleihaus supports ${location.phrase} with ${service.focus}. The team helps customers move from product choice to quantity planning, logistics, delivery coordination and installation support without claiming a separate branch in every service area.`,
  notes: [
    service.planning,
    `${location.label} requests often involve ${location.customerNeeds}.`,
    `${service.installationRelevance} For logistics, ${location.logistics}.`,
  ],
  sections: [
    {
      title: `${location.label} project context`,
      text: `Common ${location.label} needs include ${location.projectTypes}. ${location.customerNeeds} help shape the first quote conversation and reduce back-and-forth before purchase decisions.`,
    },
    {
      title: `${service.titleLabel} selection guidance`,
      text: `${service.selectionGuidance} Kleihaus can help compare product fit, complementary materials, budget expectations and technical considerations for homeowners, contractors, fundis and project teams.`,
    },
    {
      title: 'Delivery and installation coordination',
      text: `${location.logistics}. ${location.siteConsiderations}. Installation support, tailored training and application guidance can be discussed where the project needs more than material supply.`,
    },
  ],
  localFaqs: [
    {
      question: `Can Kleihaus help with ${service.titleLabel.toLowerCase()} planning in ${location.label}?`,
      answer: `Yes. Share the project type, measurements, preferred finish, quantity and location. Kleihaus can help compare ${service.focus} for ${location.phrase}.`,
    },
    {
      question: `What affects delivery support for ${service.titleLabel.toLowerCase()} in ${location.label}?`,
      answer: `${location.logistics}. Order size, product fragility, access, timing and site readiness can all affect the practical delivery plan.`,
    },
    {
      question: `What should I send before requesting a ${service.titleLabel.toLowerCase()} quote?`,
      answer: `${service.planning} Photos, inspiration references and a budget range also help the team recommend more relevant next steps.`,
    },
  ],
  images: service.imageSet.map((src, index) => ({
    src,
    alt: `${service.titleLabel} planning and quote support for ${location.label} by Kleihaus Ceramics`,
    label: index === 0 ? `${service.titleLabel} planning` : ['Product matching', 'Project support', 'Finishing guidance'][index - 1],
  })),
  relatedLinks: [
    { label: service.label, href: service.basePath },
    { label: `${service.label} guide`, href: service.guidePath },
    { label: `${location.label} hub`, href: `/locations/${location.slug}` },
    { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
    { label: 'Request quote', href: '/#contact' },
  ],
})

const localSeoLandingPages = localSeoServiceTargets.flatMap((service) =>
  locationSeoTargets.map((location) => buildLocalSeoLandingPage(service, location)),
)

const guideSeoPages = [
  {
    path: '/tile-buying-guide',
    category: 'Tile Buying Guide',
    schemaType: 'WebPage',
    title: 'Tile Buying Guide Kenya | Kleihaus Ceramics',
    description: 'A practical tile buying guide for Kenya covering room use, tile finishes, quantities, adhesives, grout, delivery and installation support.',
    eyebrow: 'Project guide',
    h1: 'Tile buying guide for better finishing decisions',
    intro:
      'Choosing tiles is easier when the room use, surface condition, quantity, finish, fixing materials and delivery plan are considered together. Kleihaus helps customers compare options before requesting a quote.',
    notes: ['Match tile finish to the room and cleaning needs', 'Estimate area and allowance for cuts', 'Plan adhesive, grout, trims and installation support'],
    sections: [
      { title: 'Start with the room use', text: 'Wet areas, busy floors, kitchens and feature walls each need different tile characteristics. Share where the tile will be installed so advice is practical.' },
      { title: 'Plan quantities before price', text: 'Room measurements, tile size and cutting allowance affect quantity. Kleihaus can help turn measurements into a clearer quote request.' },
      { title: 'Do not ignore fixing materials', text: 'Adhesive, grout, trims and tools affect the final finish. Matching them early helps reduce site delays and poor installation outcomes.' },
    ],
    images: [
      { src: '/images/tiles-floor.jpg', alt: 'Floor tile options for Kleihaus tile buying guidance', label: 'Floor tiles' },
      { src: '/images/tiles-wall.jpg', alt: 'Wall tile options for kitchen and bathroom planning', label: 'Wall tiles' },
      { src: '/images/tile-tools.jpg', alt: 'Tile tools and installation essentials for buying guide planning', label: 'Tools and installation' },
    ],
    relatedLinks: [
      { label: 'Tiles', href: '/tiles' },
      { label: 'Adhesives & grout', href: '/adhesives-grout' },
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Tiles Nairobi', href: '/tiles-nairobi' },
      { label: 'Tiles Machakos', href: '/tiles-machakos' },
      { label: 'Tiles Makueni', href: '/tiles-makueni' },
    ],
  },
  {
    path: '/bathroom-renovation-guide',
    category: 'Bathroom Renovation Guide',
    schemaType: 'WebPage',
    title: 'Bathroom Renovation Guide Kenya | Kleihaus Ceramics',
    description: 'Plan bathroom tiles, sanitaryware, taps, showers, accessories, delivery and installation support with Kleihaus Ceramics.',
    eyebrow: 'Project guide',
    h1: 'Bathroom renovation guide for tiles and sanitaryware',
    intro:
      'A strong bathroom plan connects tile choices, sanitaryware, fittings, waterproofing expectations, delivery timing and installation workflow. Kleihaus supports practical quote planning before materials are selected.',
    notes: ['Coordinate bathroom tiles and sanitaryware', 'Confirm measurements and fixture list', 'Plan delivery, fixing and finishing needs'],
    sections: [
      { title: 'Coordinate the full room', text: 'Tiles, basins, toilets, taps, mixers, showers and accessories should be considered together so the final bathroom feels intentional.' },
      { title: 'Share measurements and photos', text: 'Room size, wall height, plumbing points and photos help the team identify suitable quantities and product matching questions.' },
      { title: 'Plan installation support early', text: 'Surface preparation, cutting, drilling, fixing, grouting and cleaning should be discussed before materials arrive on site.' },
    ],
    images: [
      { src: '/images/bathroom-blue-1.jpg', alt: 'Bathroom tile and sanitaryware planning by Kleihaus Ceramics', label: 'Bathroom planning' },
      { src: '/images/sanitary-set-1.jpg', alt: 'Sanitaryware set for renovation quote guidance', label: 'Sanitaryware' },
      { src: '/images/sanitary-showers.jpg', alt: 'Shower fixtures for bathroom renovation planning', label: 'Shower fixtures' },
    ],
    relatedLinks: [
      { label: 'Bathroom tiles', href: '/bathroom-tiles' },
      { label: 'Sanitaryware', href: '/sanitaryware' },
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Sanitaryware Nairobi', href: '/sanitaryware-nairobi' },
      { label: 'Sanitaryware Machakos', href: '/sanitaryware-machakos' },
      { label: 'Sanitaryware Makueni', href: '/sanitaryware-makueni' },
    ],
  },
  {
    path: '/paint-selection-guide',
    category: 'Paint Selection Guide',
    schemaType: 'WebPage',
    title: 'Paint Selection Guide Kenya | Interior, Exterior & Roof Paints',
    description: 'Choose interior, exterior, roof and floor paints with practical Kleihaus guidance on surface condition, finish, quantity and delivery.',
    eyebrow: 'Project guide',
    h1: 'Paint selection guide for durable finishes',
    intro:
      'Paint performance depends on the surface, weather exposure, cleaning needs, preparation and finish preference. Kleihaus helps customers structure paint quote requests around these details.',
    notes: ['Match paint to interior, exterior, roof or floor use', 'Estimate surface area before requesting a quote', 'Consider preparation and application guidance'],
    sections: [
      { title: 'Choose by surface and exposure', text: 'Interior walls, exterior walls, roofs and floors face different wear. The right paint conversation starts with the surface.' },
      { title: 'Prepare before application', text: 'Cleaning, filling, priming and drying conditions affect finish quality. Ask about preparation needs when requesting paint support.' },
      { title: 'Plan quantity and delivery', text: 'Area, coats, color choice and location all shape the quote. Delivery can be coordinated where practical based on order details.' },
    ],
    images: [
      { src: '/images/paint-interior.jpg', alt: 'Interior paint finish selection guide by Kleihaus', label: 'Interior paints' },
      { src: '/images/paint-exterior.jpg', alt: 'Exterior paint guidance for weather-exposed walls', label: 'Exterior paints' },
      { src: '/images/paint-roof.jpg', alt: 'Roof paint selection support for Kenya projects', label: 'Roof paints' },
    ],
    relatedLinks: [
      { label: 'Paints', href: '/paints' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Request quote', href: '/#contact' },
      { label: 'Paints Nairobi', href: '/paints-nairobi' },
      { label: 'Paints Machakos', href: '/paints-machakos' },
      { label: 'Paints Makueni', href: '/paints-makueni' },
    ],
  },
  {
    path: '/adhesive-grout-guide',
    category: 'Adhesive & Grout Guide',
    schemaType: 'WebPage',
    title: 'Tile Adhesive & Grout Guide Kenya | Kleihaus Ceramics',
    description: 'Understand tile adhesive, grout, trims, spacers and installation essentials before requesting a Kleihaus project quote.',
    eyebrow: 'Project guide',
    h1: 'Adhesive and grout guide for cleaner tile installation',
    intro:
      'Tile quality alone does not guarantee a good finish. Adhesive, grout, surface preparation, spacing, trims and installer workflow all influence durability and appearance.',
    notes: ['Match adhesive to tile type and surface', 'Choose grout around joint width and finish', 'Plan trims, tools and cleaning requirements'],
    sections: [
      { title: 'Match adhesive to the job', text: 'Tile size, tile type, surface condition and wet-area exposure affect adhesive choice. Share these details before buying.' },
      { title: 'Use grout as a finishing decision', text: 'Grout color, joint width and cleaning expectations influence the final look as much as the tile itself.' },
      { title: 'Support installers with the right tools', text: 'Trims, spacers, cutting tools and cleaning materials help fundis and project teams produce a neater handover.' },
    ],
    images: [
      { src: '/images/adhesive.jpg', alt: 'Tile adhesive guide for floor and wall installation', label: 'Tile adhesive' },
      { src: '/images/grout.jpg', alt: 'Tile grout guide for clean joint finishing', label: 'Grout' },
      { src: '/images/tile-fittings.jpg', alt: 'Tile trims and fittings for installation planning', label: 'Trims and fittings' },
    ],
    relatedLinks: [
      { label: 'Adhesives & grout', href: '/adhesives-grout' },
      { label: 'Installation best practices', href: '/installation-best-practices' },
      { label: 'Tiles', href: '/tiles' },
      { label: 'Installation support Nairobi', href: '/installation-support-nairobi' },
      { label: 'Installation support Machakos', href: '/installation-support-machakos' },
      { label: 'Installation support Makueni', href: '/installation-support-makueni' },
    ],
  },
  {
    path: '/installation-best-practices',
    category: 'Installation Best Practices',
    schemaType: 'WebPage',
    title: 'Tile Installation Best Practices Kenya | Kleihaus Support',
    description: 'Practical installation guidance for preparation, cutting, drilling, fixing, grouting, cleaning, handover and tailored training support.',
    eyebrow: 'Project guide',
    h1: 'Installation best practices from planning to handover',
    intro:
      'Professional finishing depends on preparation, the right tools, product matching and disciplined site workflow. Kleihaus supports customers and installers with practical guidance across the process.',
    notes: ['Check surface preparation and measurements', 'Plan cutting, drilling, fixing and grouting', 'Clean, inspect and hand over the final finish'],
    sections: [
      { title: 'Prepare the site first', text: 'Confirm measurements, substrate condition, levels, moisture exposure and product requirements before installation starts.' },
      { title: 'Use the right tools and materials', text: 'Cutting, drilling, adhesive selection, spacers and grout should match the tile and site conditions.' },
      { title: 'Finish with inspection and cleaning', text: 'A clean handover includes grout checks, surface cleaning, edge finishing and guidance for care after installation.' },
    ],
    images: [
      { src: '/images/tiler-service.jpg', alt: 'Tile installer best practices and site support', label: 'Installation support' },
      { src: '/images/tile-tools.jpg', alt: 'Right tools for tile cutting drilling and fixing', label: 'Right tools' },
      { src: '/images/grout.jpg', alt: 'Grouting and finishing stage for tile installation', label: 'Grouting' },
    ],
    relatedLinks: [
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Adhesive & grout guide', href: '/adhesive-grout-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Nairobi support', href: '/locations/nairobi' },
      { label: 'Machakos support', href: '/locations/machakos' },
      { label: 'Makueni support', href: '/locations/makueni' },
    ],
  },
  {
    path: '/cost-estimation-guide',
    category: 'Cost Estimation Guide',
    schemaType: 'WebPage',
    title: 'Tile, Paint & Sanitaryware Cost Estimation Guide Kenya | Kleihaus',
    description: 'Plan quote requests with general cost factors for tiles, sanitaryware, paints, delivery and installation support without unsupported price claims.',
    eyebrow: 'Project guide',
    h1: 'Cost estimation guide for finishing materials',
    intro:
      'Kleihaus does not publish unsupported fixed prices on the site because costs depend on product choice, quantity, availability, delivery and site needs. This guide helps customers prepare a better quote request.',
    notes: ['Prices vary by size, finish, brand and quantity', 'Delivery and installation needs affect total planning', 'Share measurements and budget range for focused quote support'],
    sections: [
      { title: 'What affects material cost', text: 'Tile size, finish, sanitaryware brand, paint type, adhesive, grout, trims and accessories all influence the final quote.' },
      { title: 'What affects delivery and installation', text: 'Location, access, order volume, site readiness and installation complexity can affect planning and coordination.' },
      { title: 'How to request a useful quote', text: 'Share room measurements, product type, quantity, preferred finish, location, timing and budget range so the team can respond with better guidance.' },
    ],
    images: [
      { src: '/images/kleihaus-structure.jpg', alt: 'Kleihaus Ceramics quote planning support for finishing materials', label: 'Quote planning' },
      { src: '/images/tiles-floor.jpg', alt: 'Tiles as a cost estimation factor for finishing projects', label: 'Tiles' },
      { src: '/images/paint-interior.jpg', alt: 'Paint selection as a cost estimation factor', label: 'Paints' },
    ],
    relatedLinks: [
      { label: 'Tiles', href: '/tiles' },
      { label: 'Sanitaryware', href: '/sanitaryware' },
      { label: 'Paints', href: '/paints' },
      { label: 'Nairobi support', href: '/locations/nairobi' },
      { label: 'Machakos support', href: '/locations/machakos' },
      { label: 'Makueni support', href: '/locations/makueni' },
    ],
  },
]

const locationHubPages = [
  {
    path: '/locations/nairobi',
    category: 'Nairobi',
    schemaType: 'WebPage',
    title: 'Kleihaus Nairobi | Tiles, Sanitaryware, Paints & Installation Support',
    description: 'Kleihaus supports Nairobi homes, apartments, retail spaces and project sites with tiles, sanitaryware, paints, delivery coordination and installation guidance.',
    eyebrow: 'Location hub',
    h1: 'Kleihaus support for Nairobi projects',
    intro:
      'Nairobi projects often need fast product comparison, clear quantity planning and practical delivery coordination around apartments, retail spaces, offices and busy construction sites. Kleihaus helps customers plan tiles, sanitaryware, paints, adhesives, grout and installation support without claiming a separate Nairobi branch.',
    notes: [
      'Useful for apartments, shops, offices, rentals and residential renovations',
      'Delivery timing depends on traffic, access, order size and supplier availability',
      'Advisory can cover product matching, quantities, installation workflow and tailored training needs',
    ],
    sections: [
      {
        title: 'Urban project planning',
        text: 'Nairobi customers often need compact delivery windows, product substitutions where stock moves quickly and coordinated finishing decisions for small or busy sites.',
      },
      {
        title: 'What to share',
        text: 'Send room measurements, building access details, preferred delivery timing, product type and any site photos so quote support can be more specific.',
      },
      {
        title: 'Useful internal guides',
        text: 'Use the buying and cost guides to prepare measurements, budget range, installation requirements and delivery expectations before requesting a quote.',
      },
    ],
    localFaqs: [
      {
        question: 'Does Kleihaus support Nairobi apartment and retail projects?',
        answer: 'Yes. Kleihaus supports Nairobi homes, apartments, shops, offices and renovation requests with tiles, sanitaryware, paints, adhesives, tools, delivery coordination and installation guidance.',
      },
      {
        question: 'What should Nairobi customers share before requesting a quote?',
        answer: 'Share measurements, photos, floor level or access notes, preferred delivery timing, product type and budget range so quote guidance can account for urban logistics.',
      },
      {
        question: 'Can Kleihaus help with installation planning in Nairobi?',
        answer: 'Yes. Kleihaus can advise on surface preparation, cutting, drilling, fixing materials, grouting, cleaning and technical support for fundis or project teams.',
      },
    ],
    ctaLabel: 'Request Nairobi support',
    images: [
      { src: '/images/kleihaus-structure.jpg', alt: 'Kleihaus Ceramics support for Nairobi finishing material projects', label: 'Nairobi support' },
      { src: '/images/tiles-floor.jpg', alt: 'Tile planning for Nairobi homes apartments and retail spaces', label: 'Tiles' },
      { src: '/images/bathroom-blue-1.jpg', alt: 'Bathroom tile and sanitaryware planning for Nairobi projects', label: 'Bathrooms' },
    ],
    relatedLinks: [
      { label: 'Tiles Nairobi', href: '/tiles-nairobi' },
      { label: 'Sanitaryware Nairobi', href: '/sanitaryware-nairobi' },
      { label: 'Paints Nairobi', href: '/paints-nairobi' },
      { label: 'Installation Support Nairobi', href: '/installation-support-nairobi' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
      { label: 'Paint selection guide', href: '/paint-selection-guide' },
      { label: 'Adhesive & grout guide', href: '/adhesive-grout-guide' },
    ],
  },
  {
    path: '/locations/machakos',
    category: 'Machakos',
    schemaType: 'WebPage',
    title: 'Kleihaus Machakos | Tiles, Sanitaryware, Paints & Delivery Support',
    description: 'Kleihaus supports Machakos homes, rentals, commercial projects and construction sites with finishing material guidance, delivery planning and installation support.',
    eyebrow: 'Location hub',
    h1: 'Kleihaus support for Machakos projects',
    intro:
      'Machakos finishing projects may need stronger delivery planning, quantity checks and product matching before materials move to site. Kleihaus supports homes, rentals, shops and construction teams with tiles, sanitaryware, paints, adhesives, grout, tools and installation guidance.',
    notes: [
      'Useful for homes, rentals, retail spaces and active building sites',
      'Delivery support is planned around quantity, route, site access and supplier stock',
      'Installation guidance can help fundis and project teams prepare surfaces, fixing materials and handover expectations',
    ],
    sections: [
      {
        title: 'Delivery-aware planning',
        text: 'For Machakos, it is especially useful to confirm quantity, supplier availability, offloading needs and delivery timing before the quote is finalized.',
      },
      {
        title: 'Product matching',
        text: 'Tiles, sanitaryware and paints can be matched with adhesives, grout, trims, tools and application guidance to reduce last-minute site gaps.',
      },
      {
        title: 'Useful internal guides',
        text: 'The cost, tile, bathroom, paint and adhesive guides help customers prepare a clearer request before asking for support.',
      },
    ],
    localFaqs: [
      {
        question: 'Does Kleihaus coordinate delivery support for Machakos?',
        answer: 'Yes. Delivery support is planned around quantity, route, site access, supplier stock and project timing so materials can be coordinated more reliably.',
      },
      {
        question: 'What Machakos project details help the quote team respond faster?',
        answer: 'Share the site area, product category, approximate quantity, access notes, delivery timing and whether installation guidance or product matching is needed.',
      },
      {
        question: 'Can Kleihaus support fundis and contractors in Machakos?',
        answer: 'Yes. Kleihaus can guide product matching, adhesives, grout, tools, trims, surface preparation and tailored technical guidance where practical.',
      },
    ],
    ctaLabel: 'Request Machakos support',
    images: [
      { src: '/images/tiles-floor-2.jpg', alt: 'Tile and finishing material support for Machakos projects', label: 'Machakos support' },
      { src: '/images/sanitary-set-1.jpg', alt: 'Sanitaryware planning for Machakos homes and rentals', label: 'Sanitaryware' },
      { src: '/images/tiler-service.jpg', alt: 'Installation support guidance for Machakos project sites', label: 'Installation' },
    ],
    relatedLinks: [
      { label: 'Tiles Machakos', href: '/tiles-machakos' },
      { label: 'Sanitaryware Machakos', href: '/sanitaryware-machakos' },
      { label: 'Paints Machakos', href: '/paints-machakos' },
      { label: 'Installation Support Machakos', href: '/installation-support-machakos' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
      { label: 'Paint selection guide', href: '/paint-selection-guide' },
      { label: 'Adhesive & grout guide', href: '/adhesive-grout-guide' },
    ],
  },
  {
    path: '/locations/makueni',
    category: 'Makueni',
    schemaType: 'WebPage',
    title: 'Kleihaus Makueni | Tiles, Paints, Sanitaryware & Installation Guidance',
    description: 'Kleihaus supports Makueni home builds, renovations and project sites with finishing material advisory, logistics planning and installation support.',
    eyebrow: 'Location hub',
    h1: 'Kleihaus support for Makueni projects',
    intro:
      'Makueni projects benefit from careful product choice, quantity planning and logistics coordination before materials are dispatched. Kleihaus supports home builds, renovations and project sites with tiles, sanitaryware, paints, adhesives, grout, tools and finishing guidance.',
    notes: [
      'Useful for home builds, renovations and project sites where materials need careful planning',
      'Logistics support is reviewed by order details, route planning, quantity and destination',
      'Advisory can include durable finish selection, installation preparation and product/application training where needed',
    ],
    sections: [
      {
        title: 'Durability and logistics',
        text: 'For Makueni requests, customers should share site location, storage conditions, expected use and delivery needs so the team can guide practical material planning.',
      },
      {
        title: 'Project readiness',
        text: 'Measurements, surface condition, budget range and product preference help reduce delays when materials, adhesives, grout and tools are being coordinated.',
      },
      {
        title: 'Useful internal guides',
        text: 'The buying and installation guides are better for broad advice, while this hub keeps location-specific logistics and planning context together.',
      },
    ],
    localFaqs: [
      {
        question: 'Does Kleihaus support Makueni home builds and renovations?',
        answer: 'Yes. Kleihaus supports Makueni projects with tiles, paints, sanitaryware, adhesives, grout, tools, finishing advisory and logistics planning where practical.',
      },
      {
        question: 'What should Makueni customers consider before ordering finishing materials?',
        answer: 'Confirm measurements, expected use, storage conditions, delivery route, site readiness, quantity and whether installation or application guidance is needed.',
      },
      {
        question: 'Can Kleihaus advise on durable finishes for Makueni projects?',
        answer: 'Yes. Kleihaus can help customers think through surface exposure, product matching, adhesives, grout, paint preparation and technical support for the final finish.',
      },
    ],
    ctaLabel: 'Request Makueni support',
    images: [
      { src: '/images/paint-exterior.jpg', alt: 'Paint and exterior finish support for Makueni projects', label: 'Makueni support' },
      { src: '/images/tiles-gallery-1.jpg', alt: 'Tile planning for Makueni homes and project sites', label: 'Tiles' },
      { src: '/images/adhesive.jpg', alt: 'Adhesive and grout planning for Makueni installation support', label: 'Adhesives' },
    ],
    relatedLinks: [
      { label: 'Tiles Makueni', href: '/tiles-makueni' },
      { label: 'Sanitaryware Makueni', href: '/sanitaryware-makueni' },
      { label: 'Paints Makueni', href: '/paints-makueni' },
      { label: 'Installation Support Makueni', href: '/installation-support-makueni' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
      { label: 'Paint selection guide', href: '/paint-selection-guide' },
      { label: 'Adhesive & grout guide', href: '/adhesive-grout-guide' },
    ],
  },
]

const projectImageItems = [
  {
    src: '/images/projects/project-kitchen-sink-window-01.jpg',
    alt: 'Kitchen sink and countertop beside a wide window',
    label: 'Kitchen sink and countertop',
    group: 'Kitchen finishing',
    width: 1400,
    height: 990,
  },
  {
    src: '/images/projects/project-kitchen-cabinet-finish-01.jpg',
    alt: 'Kitchen cabinet, countertop and backsplash finishing view',
    label: 'Kitchen cabinet finish',
    group: 'Kitchen finishing',
    width: 1200,
    height: 1200,
  },
  {
    src: '/images/projects/project-kitchen-black-sink-01.jpg',
    alt: 'Black kitchen sink and countertop below a wide window',
    label: 'Black kitchen sink',
    group: 'Kitchen finishing',
    width: 1400,
    height: 990,
  },
  {
    src: '/images/projects/project-kitchen-overview-01.jpg',
    alt: 'Kitchen cabinets, countertop and appliance layout',
    label: 'Kitchen overview',
    group: 'Kitchen finishing',
    width: 1200,
    height: 1200,
  },
  {
    src: '/images/projects/project-kitchen-tile-backsplash-01.jpg',
    alt: 'Kitchen counter with textured white backsplash tiles and black sink',
    label: 'Textured backsplash',
    group: 'Kitchen finishing',
    width: 1400,
    height: 990,
  },
  {
    src: '/images/projects/project-kitchen-overview-02.jpg',
    alt: 'Kitchen cabinet and countertop layout beside a balcony door',
    label: 'Kitchen layout',
    group: 'Kitchen finishing',
    width: 1200,
    height: 1200,
  },
  {
    src: '/images/projects/project-kitchen-grey-sink-01.jpg',
    alt: 'Grey double kitchen sink with marble-look countertop and textured backsplash',
    label: 'Grey double sink',
    group: 'Kitchen finishing',
    width: 1400,
    height: 990,
  },
  {
    src: '/images/projects/project-kitchen-grey-sink-02.jpg',
    alt: 'Grey kitchen sink and countertop with decorative backsplash tiles',
    label: 'Grey kitchen sink',
    group: 'Kitchen finishing',
    width: 1400,
    height: 990,
  },
  {
    src: '/images/projects/project-kitchen-black-sink-02.jpg',
    alt: 'Black kitchen sink with marble-look countertop and white backsplash tiles',
    label: 'Black sink detail',
    group: 'Kitchen finishing',
    width: 1400,
    height: 990,
  },
]

const seoLandingPages = [...categoryLandingPages, ...localSeoLandingPages, ...guideSeoPages, ...locationHubPages]

const projectsPage = {
  path: '/projects',
  title: 'Kleihaus Projects | Kitchen Finishing Gallery',
  description: 'Explore selected kitchen finishing project images featuring tiles, sinks, countertops and finishing solutions supplied or supported by Kleihaus.',
  eyebrow: 'Projects',
  h1: 'Selected kitchen finishing project gallery',
  intro:
    'Explore selected projects featuring tiles, sanitaryware, paints and finishing solutions supplied or supported by Kleihaus. The gallery is based only on the supplied project photographs and avoids unsupported claims about installation, dates, locations or customers.',
  category: 'Projects',
  schemaType: 'CollectionPage',
  ctaLabel: 'Request a similar quote',
  images: projectImageItems,
  relatedLinks: [
    { label: 'Tiles', href: '/tiles' },
    { label: 'Sanitaryware', href: '/sanitaryware' },
    { label: 'Paints', href: '/paints' },
    { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
  ],
  pageType: 'projects',
}

const audienceSegments = [
  {
    slug: 'homeowners',
    name: 'Homeowners',
    need: 'Simple guidance for renovations, replacements, apartment upgrades, rental units, first homes and diaspora-supported projects.',
    help: 'Kleihaus helps homeowners clarify room use, measurements, preferred finishes, quantities, location and support needs before a quote request is prepared.',
    products: ['Bathroom, kitchen, floor and wall tiles', 'Sanitaryware, sinks, mixers and accessories', 'Paints and finishing support'],
    ctaLabel: 'Request homeowner quote',
    links: [
      { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
      { label: 'Sanitaryware', href: '/sanitaryware' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
    ],
    intent: 'homeowner_product_enquiry',
  },
  {
    slug: 'home-builders',
    name: 'Home Builders',
    need: 'Coordinated material planning for new homes, rental units, retirement homes, self-builds, gated-community homes and housing-cooperative projects.',
    help: 'Kleihaus supports new-home planning across tiles, sanitaryware, kitchen sinks, mixers, paints, adhesives, grout, tools and delivery coordination before quoting.',
    products: ['New-home tile and finish planning', 'Sanitaryware, sinks and mixers', 'Adhesives, grout, tools and delivery coordination'],
    ctaLabel: 'Request new-home materials quote',
    links: [
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Projects', href: '/projects' },
    ],
    intent: 'new_home_materials',
  },
  {
    slug: 'contractors',
    name: 'Contractors',
    need: 'Practical quote support for builders, renovation contractors, tilers, plumbers, painters, installers, fundis, foremen, supervisors and maintenance teams.',
    help: 'Kleihaus helps contractors prepare product lists, measurements, accessories, site context and client-facing finish options for renovation, fit-out and maintenance enquiries.',
    products: ['Tiles, sanitaryware, sinks and mixers', 'Adhesives, grout, trims and tools', 'Paints, installation support and product-use guidance'],
    ctaLabel: 'Request contractor support',
    links: [
      { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
      { label: 'Adhesive and grout guide', href: '/adhesive-grout-guide' },
      { label: 'Installation support', href: '/installation-support' },
    ],
    intent: 'contractor_trade_enquiry',
  },
  {
    slug: 'property-developers',
    name: 'Property Developers',
    need: 'Multi-unit and commercial quotation planning for residential, mixed-use, rental, student housing, build-to-rent, industrial and institutional premises.',
    help: 'Kleihaus supports developer enquiries with category coordination, repeatable finish selections, quantity planning and phased quote conversations without unsupported stock, price or delivery promises.',
    products: ['Bulk tile and finish planning', 'Sanitaryware coordination for multi-unit needs', 'Project quotation and logistics discussion'],
    ctaLabel: 'Request developer quote',
    links: [
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Projects', href: '/projects' },
      { label: 'Tiles Kenya', href: '/tiles-kenya' },
    ],
    intent: 'developer_multi_unit_quote',
  },
  {
    slug: 'design-professionals',
    name: 'Design Professionals',
    need: 'Specification-friendly conversations for architects, interior designers, decorators, kitchen and bathroom designers, quantity surveyors, project managers and consultants.',
    help: 'Kleihaus helps design teams connect tiles, sinks, mixers, sanitaryware, paints and finishing accessories into clear options for client review and quote preparation.',
    products: ['Wall, feature, floor and bathroom tiles', 'Kitchen and bathroom finish coordination', 'Paint selection and specification support'],
    ctaLabel: 'Discuss specifications',
    links: [
      { label: 'Projects', href: '/projects' },
      { label: 'Paint selection guide', href: '/paint-selection-guide' },
      { label: 'Wall tiles', href: '/wall-tiles' },
    ],
    intent: 'design_specification_enquiry',
  },
  {
    slug: 'dealers-institutional-buyers',
    name: 'Dealers & Institutional Buyers',
    need: 'Trade, resale, institutional and facilities enquiries for hardware dealers, retailers, hotels, offices, schools, hospitals, NGOs, public-sector suppliers and recurring maintenance teams.',
    help: 'Kleihaus can receive dealer, reseller, bulk, facilities and institutional enquiries for tiles, sanitaryware, paints, adhesives, grout, tools and coordinated finishing categories.',
    products: ['Dealer or resale discussions', 'Bulk and institutional quote planning', 'Repair, refurbishment and recurring maintenance needs'],
    ctaLabel: 'Start trade or institutional enquiry',
    links: [
      { label: 'Adhesives and grout', href: '/adhesives-grout' },
      { label: 'Tiles', href: '/tiles' },
      { label: 'Contact', href: '/#contact' },
    ],
    intent: 'dealer_institutional_enquiry',
  },
]

const tradeProjectsPage = {
  path: '/trade-projects',
  title: 'Trade & Project Supply Kenya | Kleihaus Ceramics',
  description:
    'Trade and project quote support for homeowners, home builders, contractors, property developers, design professionals, dealers and institutional buyers in Kenya.',
  eyebrow: 'Trade and project support',
  h1: 'Trade and project support',
  intro:
    'Kleihaus supports quote-led enquiries for tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout, tools, delivery coordination, installation support and tailored product training. The six pathways below help homeowners, home builders, contractors, property developers, design professionals, dealers and institutional buyers share the right details without relying on unsupported claims about stock, prices, brands or delivery timelines.',
  category: 'Trade & Projects',
  schemaType: 'WebPage',
  pageType: 'trade',
  ctaLabel: 'Request trade or project quote',
  audiences: audienceSegments,
  images: projectImageItems.slice(0, 3),
}

const productsHubPage = {
  path: '/products',
  title: 'Kleihaus Products | Tiles, Sanitaryware, Paints & Finishing Materials',
  description:
    'Explore Kleihaus product categories: tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout, tools and finishing support.',
  eyebrow: 'Products',
  h1: 'Explore Kleihaus products by category',
  intro:
    'Start with the finishing category that matches your project, then move into product pages, guides, projects and quotation support when the requirements are clearer.',
  category: 'Products',
  schemaType: 'CollectionPage',
  pageType: 'products',
  ctaLabel: 'Request product guidance',
  images: [
    { src: '/images/tiles-floor.jpg', alt: 'Floor tile products supplied by Kleihaus Ceramics', label: 'Tiles' },
    { src: '/images/sanitaryware/sanitaryware-shower-display-02.jpg', alt: 'Sanitaryware products supplied by Kleihaus Ceramics', label: 'Sanitaryware' },
    { src: '/images/sanitaryware/sanitaryware-kitchen-sink-backsplash-01.jpg', alt: 'Kitchen sink and mixer finishing options from Kleihaus Ceramics', label: 'Sinks and mixers' },
  ],
  hubGroups: [
    {
      title: 'Product categories',
      text: 'Compare the core commercial categories before requesting a quote.',
      links: [
        { label: 'Tiles', href: '/tiles', detail: 'Floor, wall, bathroom and outdoor tile options' },
        { label: 'Sanitaryware', href: '/sanitaryware', detail: 'Basins, toilets, showers, taps and bathroom accessories' },
        { label: 'Kitchen sinks and mixers', href: '/sanitaryware', detail: 'Sink zones, kitchen mixers and coordinated finishing references' },
        { label: 'Paints', href: '/paints', detail: 'Interior, exterior, roof and floor paint planning' },
        { label: 'Adhesives and grout', href: '/adhesives-grout', detail: 'Tile fixing materials, grout, trims and spacers' },
        { label: 'Finishing tools and support', href: '/installation-support', detail: 'Tools, workflow guidance, training and installation support' },
      ],
    },
    {
      title: 'Plan by next step',
      text: 'Use projects, guides and local hubs to refine product choices before enquiry.',
      links: [
        { label: 'View projects', href: '/projects', detail: 'Genuine project inspiration and finishing references' },
        { label: 'Get selection guidance', href: '/guides', detail: 'Buying, planning, installation and estimation guides' },
        { label: 'Find your location', href: '/locations', detail: 'Nairobi, Machakos and Makueni support hubs' },
      ],
    },
  ],
}

const guidesHubPage = {
  path: '/guides',
  title: 'Kleihaus Guides | Buying, Planning & Installation Help',
  description:
    'Use Kleihaus guides for tile buying, bathroom renovation, paint selection, adhesive and grout planning, installation practices and cost estimation.',
  eyebrow: 'Guides',
  h1: 'Buying and planning guides',
  intro:
    'Use the resource centre to choose products, plan quantities, prepare for installation and structure a clearer quote request without relying on unsupported prices or claims.',
  category: 'Guides',
  schemaType: 'CollectionPage',
  pageType: 'guides',
  ctaLabel: 'Request guide-based support',
  images: [
    { src: '/images/tiles-floor.jpg', alt: 'Tile buying guide support from Kleihaus Ceramics', label: 'Tile buying' },
    { src: '/images/bathroom-blue-1.jpg', alt: 'Bathroom renovation planning guidance from Kleihaus Ceramics', label: 'Bathroom planning' },
    { src: '/images/adhesive.jpg', alt: 'Adhesive and grout guide support from Kleihaus Ceramics', label: 'Installation materials' },
  ],
  hubGroups: [
    {
      title: 'Resource centre',
      text: 'Pick the guide that matches the practical decision in front of you.',
      links: guideSeoPages.map((guide) => ({
        label: guide.category,
        href: guide.path,
        detail: guide.description,
      })),
    },
  ],
}

const locationsIndexPage = {
  path: '/locations',
  title: 'Kleihaus Locations | Nairobi, Machakos & Makueni Support',
  description:
    'Find Kleihaus location hubs for Nairobi, Machakos and Makueni, with links to relevant product-location pages and quotation support.',
  eyebrow: 'Locations',
  h1: 'Kleihaus support by location',
  intro:
    'Use the main location hub to move into Nairobi, Machakos or Makueni support pages, then review relevant product-location pages for local planning context.',
  category: 'Locations',
  schemaType: 'CollectionPage',
  pageType: 'locations',
  ctaLabel: 'Request local support',
  images: [
    { src: '/images/kleihaus-structure.jpg', alt: 'Kleihaus Ceramics local finishing material support', label: 'Location support' },
    { src: '/images/tiles-gallery-1.jpg', alt: 'Tile planning for local Kleihaus projects', label: 'Tile planning' },
    { src: '/images/paint-exterior.jpg', alt: 'Paint and exterior finish planning for local projects', label: 'Paint planning' },
  ],
  hubGroups: [
    {
      title: 'Principal location hubs',
      text: 'Start with the county or service-area hub, then move to product-specific pages where useful.',
      links: [
        { label: 'Nairobi', href: '/locations/nairobi', detail: 'Support for apartments, retail spaces, offices, renovations and project sites' },
        { label: 'Machakos', href: '/locations/machakos', detail: 'Support for new homes, rentals, shops, institutions and construction sites' },
        { label: 'Makueni', href: '/locations/makueni', detail: 'Support for home builds, renovations and route-aware material planning' },
      ],
    },
    {
      title: 'Product-location pages',
      text: 'Use these only when the product and location are both relevant to your enquiry.',
      links: [
        { label: 'Tiles Nairobi', href: '/tiles-nairobi', detail: 'Tile planning and quote context for Nairobi' },
        { label: 'Sanitaryware Machakos', href: '/sanitaryware-machakos', detail: 'Bathroom fixture planning and support for Machakos' },
        { label: 'Paints Makueni', href: '/paints-makueni', detail: 'Paint and finishing guidance for Makueni projects' },
        { label: 'Installation support Nairobi', href: '/installation-support-nairobi', detail: 'Installation workflow support for Nairobi sites' },
      ],
    },
  ],
}

const hubPages = [productsHubPage, guidesHubPage, locationsIndexPage]

const categoryLandingByPath = Object.fromEntries([...hubPages, ...seoLandingPages, projectsPage, tradeProjectsPage].map((page) => [page.path, page]))

const categoryGuideTargets = {
  Tiles: '/tiles',
  'Floor Tiles': '/floor-tiles',
  'Wall Tiles': '/wall-tiles',
  'Outdoor Tiles': '/floor-tiles',
  'Bathroom Tiles': '/bathroom-tiles',
  Sanitaryware: '/sanitaryware',
  'Kitchen Sinks & Mixers': '/sanitaryware',
  Paints: '/paints',
  'Adhesives & Grout': '/adhesives-grout',
  'Installation Support': '/installation-support',
}

const heroTrustBadges = [
  { label: 'Wholesale & Retail', icon: Store },
  { label: 'Sourcing Support', icon: ShieldCheck },
  { label: 'Delivery Support', icon: Truck },
  { label: 'Professional Guidance', icon: Wrench },
]

const serviceAreaLinks = [
  { label: 'Nairobi', href: '/locations/nairobi' },
  { label: 'Machakos', href: '/locations/machakos' },
  { label: 'Makueni', href: '/locations/makueni' },
]

const aboutSupportPoints = [
  {
    title: 'Finishing advisory',
    text: 'Product selection, quantity guidance and budget-fit options for homes, contractors, developers and project teams.',
    icon: ClipboardList,
  },
  {
    title: 'Logistics and delivery',
    text: 'Practical coordination for material movement, site access, timing and wider Kenya service requests.',
    icon: Truck,
  },
  {
    title: 'Installation support',
    text: 'Support across preparation, cutting, fixing, grouting and cleaning so the final finish is durable and neat.',
    icon: Wrench,
  },
  {
    title: 'Training and tools',
    text: 'Tailored product-use guidance, right-tool recommendations and technical support for fundis and installation teams.',
    icon: ShieldCheck,
  },
]

const companyValues = ['Integrity', 'Quality', 'Excellence', 'Innovation', 'Reliability', 'Customer Success', 'Sustainability']

function VisionMissionValues({ compact = false }) {
  return (
    <div className={`${compact ? 'mt-5' : 'mt-7'} rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 shadow-sm sm:p-5`}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Vision</p>
          <p className={`${compact ? 'mt-1 text-sm leading-6' : 'mt-2 text-sm leading-6'} text-emerald-950`}>
            To be the leading provider of inspiring finishing solutions in Africa.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Mission</p>
          <p className={`${compact ? 'mt-1 text-sm leading-6' : 'mt-2 text-sm leading-6'} text-emerald-950`}>
            To inspire living by delivering quality tiles, sanitaryware, paints, and finishing solutions backed by expert guidance, reliable service, and lasting customer relationships.
          </p>
        </div>
      </div>
      <div className="mt-4 border-t border-emerald-200 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Core Values</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {companyValues.map((value) => (
            <span key={value} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const faqItems = [
  {
    question: 'How much do tiles cost?',
    answer: 'Prices vary by size, finish and quantity. Request a quote for current pricing.',
  },
  {
    question: 'How much does sanitaryware cost?',
    answer: 'Prices depend on brand, finish and product type.',
  },
  {
    question: 'Do you support delivery?',
    answer: 'Yes. Delivery support is available subject to location and order requirements.',
  },
  {
    question: 'Do you offer installation guidance?',
    answer: 'Yes. We provide product matching and installation advice.',
  },
]

const buyingGuideCards = [
  {
    title: 'Selection Guidance',
    text: 'Choose tiles, sanitaryware and paints by room use, finish and budget.',
    icon: Ruler,
    href: '/tile-buying-guide',
  },
  {
    title: 'Quantity Planning',
    text: 'Estimate product quantities before finalizing sizes, finishes and delivery needs.',
    icon: Store,
    href: '/cost-estimation-guide',
  },
  {
    title: 'Project Locations',
    text: 'Review Nairobi, Machakos and Makueni support for home and project planning.',
    icon: Truck,
    href: '/locations/nairobi',
  },
  {
    title: 'Installation Support',
    text: 'Explore adhesives, grout, tools, surface preparation and installer guidance.',
    icon: Wrench,
    href: '/installation-support',
  },
]

const projectGalleryItems = [
  {
    title: 'Tile finish planning',
    text: 'Floor and wall tile combinations for homes, shops and project inspiration.',
    image: '/images/tiles-gallery-1.jpg',
    alt: 'Tile finish planning and product matching by Kleihaus Ceramics',
    label: 'Tiles',
  },
  {
    title: 'Bathroom coordination',
    text: 'Sanitaryware, bathroom tiles and accessories matched for a cleaner finish.',
    image: '/images/bathroom-blue-1.jpg',
    alt: 'Bathroom tiles and sanitaryware coordination by Kleihaus Ceramics',
    label: 'Bathrooms',
  },
  {
    title: 'Paint and finishing support',
    text: 'Paints, adhesives, grout and finishing materials selected around project needs.',
    image: '/images/paint-interior.jpg',
    alt: 'Interior paint and finishing materials support by Kleihaus Ceramics',
    label: 'Paints',
  },
]

const hasCustomBackground = (className = '') => /\bbg-/.test(className)

const Button = ({ className = '', children, ...props }) => {
  const defaultVisuals = hasCustomBackground(className)
    ? ''
    : 'border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800'

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${defaultVisuals} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const ButtonSecondary = ({ className = '', children, ...props }) => {
  const defaultVisuals = hasCustomBackground(className)
    ? ''
    : 'border-neutral-300 bg-white text-neutral-950 hover:border-neutral-600'

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${defaultVisuals} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const WhatsAppLogo = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M16.04 3.2A12.75 12.75 0 0 0 5.16 22.6L3.6 28.8l6.34-1.48A12.76 12.76 0 1 0 16.04 3.2Zm0 2.35a10.4 10.4 0 1 1-5.3 19.36l-.38-.22-3.55.83.86-3.42-.25-.4a10.4 10.4 0 0 1 8.62-16.15Zm-4.3 5.54c-.22-.5-.45-.52-.66-.53h-.56c-.2 0-.52.07-.8.36-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.36 5.2 4.57 2.58 1.02 3.1.82 3.66.77.56-.05 1.8-.74 2.06-1.45.26-.72.26-1.33.18-1.45-.08-.13-.28-.2-.59-.35-.3-.15-1.8-.9-2.08-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.96 1.2-.18.2-.35.22-.66.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.47.13-.62.14-.13.3-.35.46-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.67-.98-2.27Z" />
  </svg>
)

const FacebookLogo = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
)

const LinkedInLogo = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
  </svg>
)

const InstagramLogo = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  </svg>
)

const socialLinks = [
  {
    platform: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61579324481913',
    label: 'Follow Kleihaus Ceramics on Facebook',
    Icon: FacebookLogo,
    colorClass: 'text-[#1877F2]',
    hoverClass: 'hover:border-[#1877F2]/70 hover:bg-[#1877F2]/10',
  },
  {
    platform: 'LinkedIn',
    href: 'https://www.linkedin.com/company/108657250/',
    label: 'Follow Kleihaus Ceramics on LinkedIn',
    Icon: LinkedInLogo,
    colorClass: 'text-[#0A66C2]',
    hoverClass: 'hover:border-[#0A66C2]/70 hover:bg-[#0A66C2]/10',
  },
  {
    platform: 'Instagram',
    href: 'https://www.instagram.com/kleihausceramics',
    label: 'Follow Kleihaus Ceramics on Instagram',
    Icon: InstagramLogo,
    colorClass: 'text-[#E4405F]',
    hoverClass: 'hover:border-[#E4405F]/70 hover:bg-[#E4405F]/10',
  },
]

function SocialLinks({ placement = 'footer', showText = true, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} aria-label="Kleihaus Ceramics social media links">
      {socialLinks.map(({ platform, href, label, Icon, colorClass, hoverClass }) => (
        <a
          key={platform}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onClick={() =>
            analyticsService.track('social_click', {
              clickedElement: `${placement}_${platform.toLowerCase()}_social`,
              ctaLabel: platform,
              ctaPosition: placement,
              contactMethod: 'social',
              enquiryIntent: 'social_follow',
              socialPlatform: platform,
            })
          }
          className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition ${hoverClass} hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40`}
        >
          <Icon className={`h-4 w-4 shrink-0 ${colorClass}`} />
          {showText ? <span>{platform}</span> : <span className="sr-only">{label}</span>}
        </a>
      ))}
    </div>
  )
}

const WhatsAppBrandText = ({ children = 'Chat on WhatsApp', iconClassName = 'h-4 w-4' }) => (
  <>
    <WhatsAppLogo className={`${iconClassName} shrink-0 text-white transition group-hover:text-white`} />
    <span className="text-white transition group-hover:text-white">{children}</span>
  </>
)

const whatsappCtaClass =
  'group gap-1.5 border-[#128C7E] bg-[#128C7E] text-white shadow-sm shadow-emerald-900/10 hover:border-[#075E54] hover:bg-[#075E54] focus:outline-none focus:ring-2 focus:ring-[#25D366]/40'

const KLEIHAUS_WHATSAPP_PHONE = '254748827166'
const DEFAULT_WHATSAPP_MESSAGE =
  'Hello Kleihaus, I would like help with tiles, sanitaryware, paints, pricing, delivery or installation support.'

const buildWhatsAppUrl = (message = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${KLEIHAUS_WHATSAPP_PHONE}?text=${encodeURIComponent(message || DEFAULT_WHATSAPP_MESSAGE)}`

const openWhatsAppChat = (message) => {
  if (typeof window !== 'undefined') {
    window.location.href = buildWhatsAppUrl(message)
  }
}

const setMetaContent = (selector, content) => {
  const tag = document.querySelector(selector)
  if (tag) tag.setAttribute('content', content)
}

const pageUrlForPath = (path = '/') => `https://www.kleihaus.com${path === '/' ? '/' : path}`

const getServiceRoute = (page) =>
  page?.serviceType ? localSeoServiceTargets.find((service) => service.titleLabel === page.serviceType) : null

const getLocationHubPath = (areaServed) => {
  const location = locationSeoTargets.find((item) => item.label === areaServed)
  if (!location || location.slug === 'kenya') return '/#contact'
  return `/locations/${location.slug}`
}

const getPageBreadcrumbs = (page) => {
  if (!page) return [{ name: 'Home', href: '/' }]

  const serviceRoute = getServiceRoute(page)
  if (serviceRoute) {
    return [
      { name: 'Home', href: '/' },
      { name: serviceRoute.label, href: serviceRoute.basePath },
      { name: page.areaServed || 'Kenya', href: getLocationHubPath(page.areaServed) },
      { name: page.category, href: page.path },
    ]
  }

  if (page.path?.startsWith('/locations/')) {
    return [
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
      { name: page.category, href: page.path },
    ]
  }

  if (page.eyebrow === 'Project guide') {
    return [
      { name: 'Home', href: '/' },
      { name: 'Guides', href: '/guides' },
      { name: page.category, href: page.path },
    ]
  }

  return [
    { name: 'Home', href: '/' },
    { name: page.category, href: page.path },
  ]
}

const getRouteSchema = (page) => {
  if (!page) return null

  const pageUrl = pageUrlForPath(page.path)
  const primaryImage = page.images?.[0]
  const primaryImageUrl = primaryImage ? `https://www.kleihaus.com${primaryImage.src}` : defaultSeoImage
  const breadcrumbs = getPageBreadcrumbs(page)
  const graph = [
    {
      '@type': page.schemaType || 'CollectionPage',
      '@id': `${pageUrl}#collection`,
      url: pageUrl,
      name: page.h1,
      description: page.description,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: primaryImageUrl,
        caption: primaryImage?.alt || page.h1,
      },
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.kleihaus.com/#website',
        name: 'Kleihaus Ceramics',
        url: 'https://www.kleihaus.com/',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: pageUrlForPath(item.href || page.path),
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#gallery`,
      name: `${page.category} quote planning gallery`,
      itemListElement: page.images.map((image, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: image.label,
        url: `${pageUrl}#gallery`,
      })),
    },
  ]

  if (page.serviceType) {
    graph.push({
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: `${page.serviceType} support in ${page.areaServed || 'Kenya'}`,
      serviceType: page.serviceType,
      provider: {
        '@type': 'LocalBusiness',
        '@id': 'https://www.kleihaus.com/#store',
        name: 'Kleihaus Ceramics',
      },
      areaServed: {
        '@type': page.areaServed === 'Kenya' ? 'Country' : 'AdministrativeArea',
        name: page.areaServed || 'Kenya',
      },
      description: page.description,
    })
  }

  if (page.localFaqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: page.localFaqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

function SeoManager({ page }) {
  useEffect(() => {
    const title = page?.title || seoTitle
    const description = page?.description || seoDescription
    const routeCanonicalUrl = page ? `https://www.kleihaus.com${page.path}` : canonicalUrl
    const routeImage = page?.images?.[0]?.src ? `https://www.kleihaus.com${page.images[0].src}` : defaultSeoImage
    const routeImageAlt = page?.images?.[0]?.alt || 'Kleihaus Ceramics tiles, sanitaryware, paints and finishing materials'

    document.title = title
    setMetaContent('meta[name="description"]', description)
    setMetaContent('meta[name="robots"]', 'index, follow, max-image-preview:large')
    setMetaContent('meta[property="og:title"]', title)
    setMetaContent('meta[property="og:description"]', description)
    setMetaContent('meta[property="og:url"]', routeCanonicalUrl)
    setMetaContent('meta[property="og:image"]', routeImage)
    setMetaContent('meta[property="og:image:alt"]', routeImageAlt)
    setMetaContent('meta[name="twitter:title"]', title)
    setMetaContent('meta[name="twitter:description"]', description)
    setMetaContent('meta[name="twitter:image"]', routeImage)
    setMetaContent('meta[name="twitter:image:alt"]', routeImageAlt)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', routeCanonicalUrl)

    const existingRouteSchema = document.getElementById('kleihaus-route-schema')
    if (existingRouteSchema) existingRouteSchema.remove()

    const routeSchema = getRouteSchema(page)
    if (routeSchema) {
      const script = document.createElement('script')
      script.id = 'kleihaus-route-schema'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(routeSchema)
      document.head.appendChild(script)
    }
  }, [page])

  return null
}

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
  />
)

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
  />
)

const responsiveImageWidths = {
  '/images/adhesive.jpg': [480, 768],
  '/images/bathroom-blue-1.jpg': [480, 768, 1024],
  '/images/grout.jpg': [480, 768],
  '/images/kitchen.jpg': [480, 768],
  '/images/kleihaus-logo.jpg': [96, 192],
  '/images/kleihaus-structure.jpg': [480, 768, 1024, 1440],
  '/images/paint-exterior.jpg': [480, 768],
  '/images/paint-floor.jpg': [480, 768],
  '/images/paint-interior.jpg': [480, 768],
  '/images/paint-roof.jpg': [480, 768],
  '/images/placeholder.jpg': [480],
  '/images/projects/project-kitchen-black-sink-01.jpg': [480, 768],
  '/images/projects/project-kitchen-black-sink-02.jpg': [480, 768],
  '/images/projects/project-kitchen-cabinet-finish-01.jpg': [480, 768],
  '/images/projects/project-kitchen-grey-sink-01.jpg': [480, 768],
  '/images/projects/project-kitchen-grey-sink-02.jpg': [480, 768],
  '/images/projects/project-kitchen-overview-01.jpg': [480, 768],
  '/images/projects/project-kitchen-overview-02.jpg': [480, 768],
  '/images/projects/project-kitchen-sink-window-01.jpg': [480, 768],
  '/images/projects/project-kitchen-tile-backsplash-01.jpg': [480, 768],
  '/images/sanitary-accessories.jpg': [480, 768],
  '/images/sanitary-basins.jpg': [480],
  '/images/sanitary-baths.jpg': [480, 768],
  '/images/sanitary-showers.jpg': [480, 768],
  '/images/sanitary-taps.jpg': [480],
  '/images/sanitary-toilets.jpg': [480],
  '/images/sanitaryware/sanitaryware-black-shower-display-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-black-shower-display-02.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-black-tap-display-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-glass-shower-display-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-gold-shower-display-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-black-sink-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-black-sink-02.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-double-sink-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-drainer-sink-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-mixer-display-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-overview-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-overview-02.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-sink-backsplash-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-kitchen-sink-window-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-shower-accessories-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-shower-display-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-shower-display-02.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-shower-display-03.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-shower-mixer-01.jpg': [480, 768],
  '/images/sanitaryware/sanitaryware-tap-rail-display-01.jpg': [480, 768],
  '/images/shower-rail-1.jpg': [480, 768, 1024, 1440],
  '/images/sink-accessories.jpg': [480, 768, 1024, 1440],
  '/images/sink-gold-1.png': [480, 768, 1024],
  '/images/sinks.jpg': [480],
  '/images/taps-display-1.jpg': [480, 768],
  '/images/tile-fittings.jpg': [480, 768],
  '/images/tile-tools.jpg': [480, 768],
  '/images/tiler-service.jpg': [480, 768],
  '/images/tiles-floor-2.jpg': [480],
  '/images/tiles-floor.jpg': [480],
  '/images/tiles-gallery-1.jpg': [480],
  '/images/tiles-wall-2.jpg': [480],
  '/images/tiles-wall.jpg': [480],
}

const imageVariant = (src, extension, width) =>
  src.replace(/\.(jpe?g|png)$/i, width ? `-${width}.${extension}` : `.${extension}`)

const imageSrcSet = (src, extension) => {
  const widths = responsiveImageWidths[src]
  if (!widths) return imageVariant(src, extension)
  return widths.map((width) => `${imageVariant(src, extension, width)} ${width}w`).join(', ')
}

function OptimizedImage({ src, alt, className = '', pictureClassName = 'contents', sizes = '100vw', ...props }) {
  const imageProps = {
    loading: 'lazy',
    decoding: 'async',
    ...props,
  }

  return (
    <picture className={pictureClassName}>
      <source srcSet={imageSrcSet(src, 'avif')} sizes={sizes} type="image/avif" />
      <source srcSet={imageSrcSet(src, 'webp')} sizes={sizes} type="image/webp" />
      <img src={src} alt={alt} className={className} {...imageProps} />
    </picture>
  )
}

function Logo({ compact = false }) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <OptimizedImage
        src="/images/kleihaus-logo.jpg"
        alt="Kleihaus Ceramics"
        sizes={compact ? '36px' : '44px'}
        loading="eager"
        decoding="async"
        className={`${compact ? 'h-9 w-9' : 'h-11 w-11'} rounded-md border border-neutral-200 object-contain`}
      />
      <div className={`${compact ? 'leading-tight' : ''} min-w-0`}>
        <div className="truncate text-sm font-semibold text-neutral-950 sm:text-base">Kleihaus Ceramics</div>
        <div className="truncate text-xs text-neutral-500">Inspiring living</div>
      </div>
    </div>
  )
}

function SearchAutocomplete({ value, onChange, projectType, onSearch }) {
  const [active, setActive] = useState(false)
  const suggestions = recommendationService.getSearchSuggestions(value, projectType)

  const submitSearch = (query) => {
    const cleaned = query.trim()
    if (!cleaned) return
    onSearch(cleaned)
    setActive(false)
  }

  return (
    <div className="relative min-w-0 flex-1">
      <label className="flex min-w-0 items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 shadow-sm transition focus-within:border-emerald-600/50 focus-within:shadow-md">
        <Search className="h-4 w-4 text-neutral-400" />
        <input
          type="search"
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
            setActive(true)
          }}
          onFocus={() => setActive(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') submitSearch(value)
          }}
          placeholder="Search tiles, sanitaryware, paints..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
      </label>

      {active && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-md border border-neutral-200 bg-white p-3 shadow-xl">
          <div className="grid gap-1.5">
            {[...(value ? suggestions : suggestedSearches)]
              .filter((item, index, list) => list.indexOf(item) === index)
              .slice(0, 6)
              .map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-md px-2 py-1.5 text-left text-sm text-neutral-700 hover:bg-emerald-50 hover:text-emerald-800"
                  onMouseDown={(event) => {
                    event.preventDefault()
                    analyticsService.track('autocomplete_select', { query: item, source: 'search_autocomplete' })
                    submitSearch(item)
                  }}
                >
                  {item}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Header({ projectType, searchQuery, setSearchQuery, onSearch, activeSection, selectedCategory, onSectionChange, onCategoryClick, onRouteNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (section) => {
    onSectionChange(section)
    setMenuOpen(false)
  }

  const handlePrimaryNavClick = (event, item) => {
    setMenuOpen(false)
    if (item.type === 'section') {
      event.preventDefault()
      handleNavClick(item.section)
      return
    }

    analyticsService.track('navigation_click', {
      clickedElement: `primary_nav_${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
      ctaLabel: item.label,
      ctaPosition: 'header_primary_nav',
      pageType: 'navigation',
      enquiryIntent: item.label === 'Products' ? 'product_discovery' : item.label === 'Guides' ? 'research' : item.label === 'Locations' ? 'local_support' : 'site_navigation',
    })
    onRouteNavigate(event, item.href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-2.5 px-4 py-2.5 lg:grid-cols-[auto_minmax(240px,420px)_1fr] lg:gap-5">
        <button type="button" aria-label="Kleihaus Ceramics home" className="min-w-0 text-left" onClick={() => handleNavClick('home')}>
          <Logo compact />
        </button>

        <div className="hidden min-w-0 lg:block">
          <SearchAutocomplete value={searchQuery} onChange={setSearchQuery} projectType={projectType} onSearch={onSearch} />
        </div>

        <nav className="hidden items-center justify-end gap-2 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={activeSection === item.section ? 'page' : undefined}
              onClick={(event) => handlePrimaryNavClick(event, item)}
              className={`rounded-md px-2 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-200 ${
                activeSection === item.section
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="border-t border-neutral-100 bg-white">
        <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-1.5">
          {categoryNav.map((item) => (
            <button
              key={item}
              type="button"
              aria-current={selectedCategory === item ? 'true' : undefined}
              onClick={() => {
                onCategoryClick(item)
                onSectionChange('catalogue')
              }}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-200 ${
                selectedCategory === item
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-600/40 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="mb-4">
            <SearchAutocomplete value={searchQuery} onChange={setSearchQuery} projectType={projectType} onSearch={onSearch} />
          </div>
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={activeSection === item.section ? 'page' : undefined}
                className={`rounded-md px-2 py-2 text-left text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 ${
                  activeSection === item.section ? 'bg-emerald-50 text-emerald-800' : 'text-neutral-800 hover:bg-neutral-50'
                }`}
                onClick={(event) => handlePrimaryNavClick(event, item)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener?.('change', updatePreference)

    return () => mediaQuery.removeEventListener?.('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

function Hero({ onSectionChange }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || hasInteracted) return undefined

    const rotation = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(rotation)
  }, [hasInteracted, prefersReducedMotion])

  const goToSlide = (index) => {
    setHasInteracted(true)
    setActiveSlide((index + heroSlides.length) % heroSlides.length)
  }

  const currentSlide = heroSlides[activeSlide]

  return (
    <section id="top" className="bg-stone-100">
      <div className="mx-auto max-w-7xl px-4 py-3 lg:py-4">
        <div className="hero-carousel relative h-[50vh] max-h-[460px] min-h-[280px] overflow-hidden rounded-lg bg-neutral-950 text-white shadow-xl sm:h-[min(62vh,560px)] sm:min-h-[360px] lg:h-[min(64vh,600px)]">
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => {
              const isActive = index === activeSlide
              const motionClass = prefersReducedMotion ? '' : isActive ? 'translate-x-0 scale-100' : 'translate-x-8 scale-105'

              return (
                <OptimizedImage
                  key={slide.image}
                  src={slide.image}
                  alt={slide.alt}
                  sizes="100vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  aria-hidden={!isActive}
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-out ${isActive ? 'opacity-100' : 'opacity-0'} ${motionClass}`}
                />
              )
            })}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/75 via-neutral-950/35 to-white/5" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-white/10" />
          <div className="relative flex h-full w-full min-w-0 max-w-3xl flex-col justify-center px-5 py-6 pb-12 sm:px-9 sm:py-10 lg:px-10">
            <p className="max-w-[18rem] text-xs font-semibold uppercase tracking-wide text-emerald-200 sm:max-w-none">Tiles. Sanitaryware. Paints.</p>
            <h1 className="mt-2 max-w-[calc(100vw-4rem)] break-words text-[clamp(1.55rem,7.6vw,2.5rem)] font-semibold leading-[1.08] text-white sm:mt-3 sm:max-w-2xl sm:text-5xl sm:leading-tight lg:text-5xl">
              Tiles, sanitaryware and paints for every stage of your project
            </h1>
            <p className="mt-3 max-w-[18.5rem] break-words text-sm leading-5 text-neutral-100 sm:mt-4 sm:max-w-xl sm:text-base sm:leading-7">
              Explore practical finishing solutions for homes, renovations and commercial developments, with guidance on product selection, quantities, delivery and installation support.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 max-sm:[&>*]:w-full max-sm:[&>*]:justify-center sm:mt-6 sm:gap-3">
              <Button
                type="button"
                onClick={() => {
                  analyticsService.track('category_click', { clickedElement: 'hero_explore_products', ctaLabel: 'Explore Products', ctaPosition: 'hero', productCategory: 'All products', enquiryIntent: 'product_discovery' })
                  onSectionChange('catalogue')
                }}
                className="gap-1.5 border-emerald-600 bg-[#16A34A] px-3 py-2 text-xs text-white hover:bg-emerald-700 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between gap-4 sm:bottom-4 sm:left-10 sm:right-10 lg:left-10 lg:right-10">
            <div className="flex items-center gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  aria-label={`Show ${slide.label} hero image`}
                  aria-current={index === activeSlide ? 'true' : undefined}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">{currentSlide.label}</span>
              <button
                type="button"
                aria-label="Previous hero image"
                onClick={() => goToSlide(activeSlide - 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next hero image"
                onClick={() => goToSlide(activeSlide + 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-1 gap-2 sm:mt-3 sm:grid-cols-2 sm:gap-2.5 md:grid-cols-3 lg:grid-cols-5">
          {heroTrustBadges.map((badge) => {
            const Icon = badge.icon
            return (
              <div key={badge.label} className="flex min-h-0 items-center gap-2 rounded-lg border border-emerald-100 bg-white px-2.5 py-1.5 text-[11px] font-semibold leading-snug text-neutral-800 shadow-sm sm:px-3 sm:py-2 sm:text-sm">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 sm:h-9 sm:w-9">
                  <Icon className="h-4 w-4" />
                </span>
                {badge.label}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">About Kleihaus</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Why choose Kleihaus</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Kleihaus Ceramics is positioned as a practical finishing partner for homes, renovations, contractors and project teams.
          </p>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            This section keeps the business identity, mission, values and service philosophy in one place. Product range, customer pathways, projects, guides and locations are handled in their dedicated sections.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-emerald-800">
            {['Finishing advisory', 'Reliable guidance', 'Professional workflow', 'Customer success'].map((item) => (
              <span key={item} className="rounded-full bg-emerald-50 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <VisionMissionValues />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {aboutSupportPoints.map((point) => {
            const Icon = point.icon
            return (
              <article key={point.title} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-800">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-neutral-950">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{point.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ShopByCategory({ selectedCategory, onCategoryClick, onGuideClick, onSupportClick, compact = false }) {
  return (
    <section id="catalogue" className={compact ? '' : 'mx-auto max-w-7xl px-4 py-10'}>
      <div className={compact ? 'mb-3 max-w-3xl sm:mb-4' : 'mb-6 max-w-3xl'}>
        <div>
          <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Product catalogue</p>
          <h2 className="mt-1.5 text-xl font-semibold text-neutral-950 sm:mt-2 sm:text-3xl">Explore products by category</h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-6">
            Start with tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout and finishing tools, then ask for support when your project direction is clearer.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon
          const landingPage = categoryLandingPages.find((page) => page.category === category.name)
          const guideTarget = landingPage?.path || categoryGuideTargets[category.name] || '/#catalogue'
          const destinationLabel = guideTarget.includes('guide')
            ? 'Read the Guide'
            : category.name === 'Sanitaryware'
              ? 'Explore Sanitaryware'
              : category.name === 'Kitchen Sinks & Mixers'
                ? 'View Sinks and Mixers'
                : category.name === 'Paints'
                  ? 'Discover Paints'
                  : category.name === 'Adhesives & Grout' || category.name === 'Installation Support'
                    ? 'View Finishing Materials'
                    : `View ${category.name}`
          return (
            <article
              key={category.name}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-700 hover:shadow-md"
            >
              <button
                type="button"
                aria-label={`View ${category.name} category`}
                onClick={() => onCategoryClick(category.name)}
                className="block w-full text-left"
              >
                <div className="relative aspect-[2/1] overflow-hidden bg-neutral-100 sm:aspect-[4/3]">
                  <OptimizedImage
                    src={category.img}
                    alt={`${category.name} supplied by Kleihaus Ceramics in Kenya`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = '/images/placeholder.jpg'
                    }}
                  />
                  <div className="absolute left-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/95 text-emerald-800 shadow-sm sm:left-3 sm:top-3 sm:h-9 sm:w-9">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
              </button>
              <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <h3 className="text-sm font-semibold leading-snug text-neutral-950 sm:text-base">{category.name}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:text-emerald-700" />
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-neutral-600 sm:text-sm sm:leading-5">{category.blurb}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-800 sm:text-xs">{category.use}</span>
                </div>
                <a
                  href={guideTarget}
                  aria-label={`${destinationLabel} for ${category.name}`}
                  className="group/link mt-1.5 inline-flex w-fit items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 underline decoration-emerald-200 underline-offset-4 transition hover:text-emerald-900 hover:decoration-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-xs"
                  onClick={(event) => {
                    analyticsService.track('category_click', {
                      productCategory: category.name,
                      clickedElement: `category_guide_${guideTarget}`,
                    })
                    onGuideClick(event, guideTarget, category.name)
                  }}
                >
                  {destinationLabel}
                  <ArrowRight className="h-3 w-3 transition group-hover/link:translate-x-0.5" />
                </a>
                {selectedCategory === category.name && (
                  <span className="mt-1.5 inline-flex rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800 sm:text-xs">
                    Recommended for you
                  </span>
                )}
                <a
                  href={guideTarget}
                  onClick={(event) => {
                    analyticsService.track('category_click', {
                      productCategory: category.name,
                      clickedElement: `category_cta_${guideTarget}`,
                      ctaLabel: destinationLabel,
                      ctaPosition: 'category_card',
                      enquiryIntent: guideTarget.includes('guide') ? 'research' : 'product_discovery',
                    })
                    onGuideClick(event, guideTarget, category.name)
                  }}
                  className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald-700 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:px-3 sm:py-2 sm:text-sm"
                >
                  {destinationLabel}
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ProductCatalogue({ onProductInterest, onSupportClick }) {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">Featured highlights</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Popular finishes to explore</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            A concise look at tile, sanitaryware, paint and installation essentials customers can compare for homes, renovations and project needs.
          </p>
        </div>
        <div className="space-y-12">
          {productGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-950">{group.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{group.note}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {group.items.map((item) => (
                  <article
                    key={item.name}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:border-emerald-700 hover:shadow-md"
                  >
                    <OptimizedImage
                      src={item.img}
                      alt={`${item.name} from Kleihaus Ceramics catalogue`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      decoding="async"
                      className="aspect-[5/4] w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-neutral-950">{item.name}</h4>
                        <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-700" />
                      </div>
                      <p className="mt-1 text-sm text-neutral-600">{item.detail}</p>
                      <button
                        type="button"
                        onClick={() => {
                          onProductInterest(item.name, group.title)
                          onSupportClick(`product_card_${item.name}`, `Hello Kleihaus, I am exploring ${item.name}. Please help me understand suitable options, quantities, availability and next steps.`)
                        }}
                        className="mt-auto inline-flex items-center justify-center rounded-md border border-emerald-700 bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition hover:border-emerald-800 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      >
                        Discuss this product
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuantityEstimator() {
  const [area, setArea] = useState('')
  const [tileSize, setTileSize] = useState('60x60')
  const [waste, setWaste] = useState('10')

  const tileAreas = {
    '30x30': 0.09,
    '40x40': 0.16,
    '60x60': 0.36,
    '60x120': 0.72,
  }

  const numericArea = Number(area)
  const numericWaste = Number(waste)
  const estimatedTiles =
    numericArea > 0 ? Math.ceil((numericArea * (1 + numericWaste / 100)) / tileAreas[tileSize]) : 0
  const estimatedBoxes = estimatedTiles ? Math.ceil(estimatedTiles / 4) : 0

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">Quote helper</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Estimate tiles before you request a quote</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Enter your area and tile size for a quick planning estimate. Final quantities are confirmed when you share project details.
          </p>
          <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">For a faster quote, include:</p>
            <ul className="mt-3 grid gap-2 text-sm text-emerald-900 sm:grid-cols-2">
              {['Room size', 'Product type', 'Quantity', 'Location', 'Budget range'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Area in m2
              <Input
                type="number"
                min="0"
                value={area}
                onChange={(event) => setArea(event.target.value)}
                placeholder="32"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Tile size
              <select
                value={tileSize}
                onChange={(event) => setTileSize(event.target.value)}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="30x30">30 x 30 cm</option>
                <option value="40x40">40 x 40 cm</option>
                <option value="60x60">60 x 60 cm</option>
                <option value="60x120">60 x 120 cm</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Waste allowance
              <select
                value={waste}
                onChange={(event) => setWaste(event.target.value)}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-neutral-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                <Ruler className="h-4 w-4 text-emerald-700" />
                Estimated tiles
              </div>
              <p className="mt-2 text-3xl font-semibold text-neutral-950">{estimatedTiles || '-'}</p>
            </div>
            <div className="rounded-md bg-neutral-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                <Calculator className="h-4 w-4 text-emerald-700" />
                Approx. boxes
              </div>
              <p className="mt-2 text-3xl font-semibold text-neutral-950">{estimatedBoxes || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CustomerProjectGallery() {
  return (
    <section className="border-y border-neutral-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="mb-4 flex flex-col gap-2 sm:mb-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Applications and inspiration</p>
            <h2 className="mt-1.5 text-xl font-semibold text-neutral-950 sm:text-2xl">Choose finishes by room, surface and use.</h2>
            <p className="mt-1.5 text-sm leading-6 text-neutral-600">
              Use this block to think through where each finish will live before comparing the detailed product categories.
            </p>
          </div>
          <a
            href="/products"
            onClick={() => analyticsService.track('hub_click', { clickedElement: 'homepage_applications_products', ctaLabel: 'Explore Products', ctaPosition: 'homepage_applications', pageType: 'products', enquiryIntent: 'product_discovery' })}
            className="inline-flex w-fit items-center gap-1.5 rounded-md border border-emerald-700 px-3 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
          {projectGalleryItems.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
              <OptimizedImage
                src={item.image}
                alt={item.alt}
                sizes="(max-width: 640px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = '/images/placeholder.jpg'
                }}
              />
              <div className="p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">{item.label}</p>
                <h3 className="mt-1 text-sm font-semibold text-neutral-950 sm:text-base">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-5">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsEvidence() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="mb-4 flex flex-col gap-2 sm:mb-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Projects</p>
            <h2 className="mt-1.5 text-xl font-semibold text-neutral-950 sm:text-2xl">Genuine project images for practical reference.</h2>
            <p className="mt-1.5 text-sm leading-6 text-neutral-600">
              View selected supplied project photographs as inspiration for kitchen finishes, sinks, counters and tile details without unsupported installation or customer claims.
            </p>
          </div>
          <a
            href="/projects"
            onClick={() => analyticsService.track('project_click', { clickedElement: 'homepage_projects_gallery', ctaLabel: 'Browse Projects', ctaPosition: 'homepage_projects', enquiryIntent: 'project_gallery' })}
            className="inline-flex w-fit items-center gap-1.5 rounded-md border border-emerald-700 px-3 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
          >
            Browse Projects
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
          {projectImageItems.slice(0, 3).map((item) => (
            <article key={item.src} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
              <OptimizedImage
                src={item.src}
                alt={item.alt}
                sizes="(max-width: 640px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                width={item.width}
                height={item.height}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">{item.group}</p>
                <h3 className="mt-1 text-sm font-semibold text-neutral-950 sm:text-base">{item.label}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AudiencePathways() {
  return (
    <section className="border-y border-emerald-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Who Kleihaus supports</p>
            <h2 className="mt-1.5 text-xl font-semibold text-neutral-950 sm:text-2xl">Product and project pathways for every customer</h2>
            <p className="mt-1.5 text-sm leading-6 text-neutral-600">
              Choose the path closest to your work to see relevant products, project needs and selection guidance.
            </p>
          </div>
          <a
            href="/trade-projects"
            onClick={() => analyticsService.track('audience_pathway_click', { clickedElement: 'homepage_trade_projects_all', ctaLabel: 'View trade and project support', ctaPosition: 'homepage_audience_pathways', enquiryIntent: 'trade_project' })}
            className="inline-flex w-fit items-center gap-1.5 rounded-md border border-emerald-700 px-3 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
          >
            View Solutions
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {audienceSegments.map((segment) => (
            <article key={segment.slug} className="flex h-full flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-950">{segment.name}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{segment.need}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {segment.products.slice(0, 3).map((item) => (
                  <span key={item} className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-100">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`/trade-projects#${segment.slug}`}
                  onClick={() => analyticsService.track('audience_pathway_click', { clickedElement: `homepage_audience_${segment.slug}`, ctaLabel: segment.name, ctaPosition: 'homepage_audience_card', enquiryIntent: segment.intent, audienceSegment: segment.name })}
                  className="inline-flex min-h-10 items-center rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 transition hover:border-emerald-700 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  View Solutions
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TradeProjectsPage({ page, onSectionChange, onSupportClick, onQuoteClick }) {
  return (
    <main className="bg-white">
      <Breadcrumbs page={page} />
      <section className="border-b border-emerald-100 bg-stone-50">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-5 px-4 py-6 sm:py-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="min-w-0" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">{page.eyebrow}</p>
            <h1 className="mt-2 w-full max-w-[calc(100vw-2rem)] break-words text-[clamp(1.75rem,6vw,2.5rem)] font-semibold leading-tight text-neutral-950 sm:max-w-3xl sm:text-4xl" style={{ textWrap: 'wrap' }}>
              {page.h1}
            </h1>
            <p className="mt-3 w-full max-w-[calc(100vw-2rem)] break-words text-sm leading-6 text-neutral-700 sm:max-w-2xl sm:text-base sm:leading-6">{page.intro}</p>
            <div className="mt-4 flex w-full max-w-[calc(100vw-2rem)] flex-wrap gap-2 max-sm:[&>*]:w-full max-sm:[&>*]:justify-center sm:max-w-2xl">
              <Button
                type="button"
                className="gap-1.5 px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm"
                onClick={() => {
                  analyticsService.track('audience_pathway_click', { clickedElement: 'trade_projects_hero_quote', ctaLabel: page.ctaLabel, ctaPosition: 'trade_projects_hero', enquiryIntent: 'trade_project' })
                  onQuoteClick('trade_projects_hero_quote')
                  onSectionChange('contact')
                }}
              >
                {page.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <ButtonSecondary
                type="button"
                onClick={() => onSupportClick('trade_projects_hero_whatsapp', 'Hello Kleihaus, I need trade or project support for tiles, sanitaryware, sinks, mixers, paints, adhesives, grout, tools, delivery or installation planning.')}
                className={`${whatsappCtaClass} px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm`}
              >
                <WhatsAppBrandText>Ask on WhatsApp</WhatsAppBrandText>
              </ButtonSecondary>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3">
            {page.images.map((image, index) => (
              <OptimizedImage
                key={image.src}
                src={image.src}
                alt={image.alt}
                sizes={index === 0 ? '(max-width: 640px) 66vw, 42vw' : '(max-width: 640px) 33vw, 20vw'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`h-full min-h-28 w-full rounded-lg object-cover shadow-sm ${index === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="mb-4 max-w-3xl">
          <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Audience pathways</p>
          <h2 className="mt-2 text-xl font-semibold text-neutral-950 sm:text-2xl">What each customer group should share</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            These pathways reduce back-and-forth by matching each enquiry to product categories, planning details and the most useful next action.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {page.audiences.map((segment) => (
            <article id={segment.slug} key={segment.slug} className="scroll-mt-28 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-950">{segment.name}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{segment.help}</p>
              <ul className="mt-3 grid gap-1.5 text-sm text-neutral-700">
                {segment.products.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {segment.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => analyticsService.track('audience_pathway_click', { clickedElement: `trade_projects_link_${segment.slug}_${link.label.toLowerCase().replace(/\s+/g, '_')}`, ctaLabel: link.label, ctaPosition: 'trade_projects_audience_links', enquiryIntent: segment.intent, audienceSegment: segment.name })}
                    className="inline-flex min-h-9 items-center rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-900 transition hover:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    analyticsService.track('audience_pathway_click', { clickedElement: `trade_projects_quote_${segment.slug}`, ctaLabel: segment.ctaLabel, ctaPosition: 'trade_projects_audience_card', enquiryIntent: segment.intent, audienceSegment: segment.name })
                    onQuoteClick(`trade_projects_quote_${segment.slug}`)
                    onSectionChange('contact')
                  }}
                  className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  {segment.ctaLabel}
                </button>
                <button
                  type="button"
                  onClick={() => onSupportClick(`trade_projects_whatsapp_${segment.slug}`, `Hello Kleihaus, I am enquiring as a ${segment.name.toLowerCase()}. Please help me plan products, quantities, quote details and next steps.`)}
                  className={`${whatsappCtaClass} inline-flex min-h-10 items-center rounded-md px-3 py-2 text-xs font-semibold`}
                >
                  <WhatsAppBrandText>WhatsApp support</WhatsAppBrandText>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:py-8 lg:grid-cols-3">
          {[
            ['Products to mention', 'Tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout, tools and any finish inspiration images.'],
            ['Project details to share', 'Room measurements, quantities, preferred finishes, location, timing, site access and whether installation support or product training is needed.'],
            ['What remains owner-confirmed', 'Current stock, brands, prices, delivery timing, warranties, returns and trade terms should be confirmed by the Kleihaus team before quoting.'],
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
              <h2 className="text-base font-semibold text-neutral-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function HelpfulGuides({ onGuideClick }) {
  const [openFaq, setOpenFaq] = useState(faqItems[0]?.question || '')

  return (
    <section id="faq" className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:py-6">
        <div className="mb-3 max-w-3xl">
          <h2 className="text-xl font-semibold text-neutral-950 sm:text-2xl">Buying Guide & FAQs</h2>
          <p className="mt-1 text-sm leading-5 text-neutral-600">
            Quick answers on tiles, sanitaryware, paints, delivery and installation.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {buyingGuideCards.map((card) => {
            const Icon = card.icon
            return (
              <a
                key={card.title}
                href={card.href}
                onClick={() => {
                  onGuideClick(card.title)
                }}
                className="rounded-md border border-neutral-200 bg-white p-3 text-left shadow-sm transition hover:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <div className="flex items-start gap-2.5">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-800">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-neutral-950">{card.title}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-neutral-600">{card.text}</span>
                  </span>
                </div>
              </a>
            )
          })}
        </div>
        <div className="mt-3 rounded-md border border-neutral-200 bg-white shadow-sm">
          {faqItems.map((item, index) => (
            <div key={item.question} className={index > 0 ? 'border-t border-neutral-200' : ''}>
              <button
                type="button"
                onClick={() => setOpenFaq((current) => (current === item.question ? '' : item.question))}
                className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-200"
                aria-expanded={openFaq === item.question}
              >
                <span>{item.question}</span>
                <span className="text-lg leading-none text-emerald-700">{openFaq === item.question ? '-' : '+'}</span>
              </button>
              {openFaq === item.question && (
                <p className="px-3 pb-3 text-xs leading-5 text-neutral-600 sm:text-sm">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ onSupportFormClick, compact = false }) {
  const quoteFormRef = useRef(null)
  const quoteStatusRef = useRef(null)
  const quoteStatusTimeoutRef = useRef(null)
  const hasTrackedQuoteFormStartRef = useRef(false)
  const hasTrackedQuoteFormViewRef = useRef(false)
  const [quoteForm, setQuoteForm] = useState(emptyQuoteForm)
  const [quoteFormResetKey, setQuoteFormResetKey] = useState(0)
  const [quoteErrors, setQuoteErrors] = useState([])
  const [quoteStatus, setQuoteStatus] = useState('')
  const [quoteStatusType, setQuoteStatusType] = useState('success')
  const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false)

  useEffect(() => {
    const form = quoteFormRef.current
    if (!form || typeof IntersectionObserver === 'undefined') {
      if (!hasTrackedQuoteFormViewRef.current) {
        hasTrackedQuoteFormViewRef.current = true
        analyticsService.track('quote_form_view', { clickedElement: 'contact_form' })
      }

      return () => {
        if (quoteStatusTimeoutRef.current) window.clearTimeout(quoteStatusTimeoutRef.current)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedQuoteFormViewRef.current) {
          hasTrackedQuoteFormViewRef.current = true
          analyticsService.track('quote_form_view', { clickedElement: 'contact_form' })
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(form)

    return () => {
      observer.disconnect()
      if (quoteStatusTimeoutRef.current) window.clearTimeout(quoteStatusTimeoutRef.current)
    }
  }, [])

  const updateQuoteField = (field) => (event) => {
    setQuoteForm((current) => ({ ...current, [field]: event.target.value }))
    if (!hasTrackedQuoteFormStartRef.current) {
      hasTrackedQuoteFormStartRef.current = true
      analyticsService.track('quote_form_start', { clickedElement: field })
    }
    if (quoteErrors.length > 0) setQuoteErrors([])
    if (quoteStatus) {
      setQuoteStatus('')
      if (quoteStatusTimeoutRef.current) window.clearTimeout(quoteStatusTimeoutRef.current)
    }
  }

  const submitQuoteRequest = async (event) => {
    event.preventDefault()

    if (isQuoteSubmitting) return

    const preparedRequest = quoteRequestService.prepare({
      ...quoteForm,
      channel: 'email',
      intent: 'quote',
    })
    if (!preparedRequest.ok) {
      setQuoteErrors(preparedRequest.errors)
      setQuoteStatus('')
      return
    }

    setIsQuoteSubmitting(true)
    setQuoteErrors([])
    setQuoteStatus('')

    analyticsService.track('quote_form_submit_attempt', {
      clickedElement: 'contact_form',
      productCategory: 'Project quotation',
      location: preparedRequest.payload.location || 'not_provided',
      hasEmail: Boolean(preparedRequest.payload.email),
      hasPhone: Boolean(preparedRequest.payload.phone),
      pageType: compact ? 'homepage_panel' : 'contact_section',
      ctaLabel: 'Send request',
      ctaPosition: 'quote_form_submit',
      contactMethod: 'quote_form',
      enquiryIntent: 'quote',
      formName: 'quote_request',
      formStep: 'submit',
      formStatus: 'attempt',
    })

    const backendResult = await quoteRequestService.submitBackend(preparedRequest.payload)
    setQuoteStatusType(backendResult.ok ? 'success' : 'error')
    setQuoteStatus(backendResult.message)
    if (backendResult.ok) {
      analyticsService.track('quote_form_submit_success', {
        clickedElement: 'contact_form',
        leadReference: backendResult.data?.leadReference,
        requestId: backendResult.data?.requestId,
        pageType: compact ? 'homepage_panel' : 'contact_section',
        ctaLabel: 'Send request',
        ctaPosition: 'quote_form_submit',
        contactMethod: 'quote_form',
        enquiryIntent: 'quote',
        formName: 'quote_request',
        formStep: 'submit',
        formStatus: 'success',
      })
      if (quoteStatusTimeoutRef.current) window.clearTimeout(quoteStatusTimeoutRef.current)
      debugLog('QUOTE_FRONTEND_SUCCESS_CLEARING_FORM', {
        requestId: backendResult.data?.requestId,
        emailSent: backendResult.data?.email?.sent,
      })
      setQuoteForm(getEmptyQuoteForm())
      quoteFormRef.current?.reset()
      setQuoteFormResetKey((current) => current + 1)
      window.setTimeout(() => {
        const quoteStatusTop = quoteStatusRef.current
          ? quoteStatusRef.current.getBoundingClientRect().top + window.scrollY - 96
          : 0

        window.scrollTo({
          top: Math.max(quoteStatusTop, 0),
          behavior: 'smooth',
        })
      }, 0)
      quoteStatusTimeoutRef.current = window.setTimeout(() => {
        setQuoteStatus('')
      }, 8000)
      window.setTimeout(() => setIsQuoteSubmitting(false), 800)
      return
    }
    analyticsService.track('quote_form_submit_error', {
      clickedElement: 'contact_form',
      status: backendResult.data?.status,
      reason: backendResult.data?.error || backendResult.message,
      pageType: compact ? 'homepage_panel' : 'contact_section',
      ctaLabel: 'Send request',
      ctaPosition: 'quote_form_submit',
      contactMethod: 'quote_form',
      enquiryIntent: 'quote',
      formName: 'quote_request',
      formStep: 'submit',
      formStatus: 'error',
    })
    if (backendResult.data?.success && !backendResult.data?.email?.sent) {
      debugLog('QUOTE_FRONTEND_EMAIL_NOT_SENT', {
        requestId: backendResult.data?.requestId,
        emailError: backendResult.data?.email?.error,
      })
    }
    setIsQuoteSubmitting(false)
  }

  const scrollToQuoteForm = () => {
    quoteFormRef.current?.scrollIntoView({
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const handleTrackedWhatsAppClick = (event, href, trackClick) => {
    event.preventDefault()
    trackClick()
    window.setTimeout(() => {
      window.location.href = href
    }, 350)
  }

  const contactActions = [
    {
      label: 'Chat on WhatsApp',
      ariaLabel: 'Chat with Kleihaus Ceramics on WhatsApp',
      href: buildWhatsAppUrl('Hello Kleihaus, I would like help with a quote, products, delivery or installation support.'),
      icon: WhatsAppLogo,
      className: 'border-[#128C7E] bg-[#128C7E] text-white hover:border-[#075E54] hover:bg-[#075E54]',
      onClick: (event, href) =>
        handleTrackedWhatsAppClick(event, href, () =>
          analyticsService.track('whatsapp_click', {
            clickedElement: 'contact_action_whatsapp',
            ctaLabel: 'Chat on WhatsApp',
            ctaPosition: 'contact_actions',
            contactMethod: 'whatsapp',
            enquiryIntent: 'quote_support',
          }),
        ),
    },
    {
      label: 'Call Kleihaus',
      ariaLabel: 'Call Kleihaus Ceramics',
      href: 'tel:+254748827166',
      icon: Phone,
      className: 'border-white/15 bg-white/10 text-white hover:bg-white/15',
      onClick: () => analyticsService.track('phone_click', { clickedElement: 'contact_action_phone', ctaLabel: 'Call Kleihaus', ctaPosition: 'contact_actions', contactMethod: 'phone', enquiryIntent: 'contact' }),
    },
    {
      label: 'Email Kleihaus',
      ariaLabel: 'Email Kleihaus Ceramics',
      href: 'mailto:sales@kleihaus.com',
      icon: Mail,
      className: 'border-white/15 bg-white/10 text-white hover:bg-white/15',
      onClick: () => analyticsService.track('email_click', { clickedElement: 'contact_action_email', ctaLabel: 'Email Kleihaus', ctaPosition: 'contact_actions', contactMethod: 'email', enquiryIntent: 'contact' }),
    },
  ]

  return (
    <section id="contact" className={compact ? 'rounded-xl bg-neutral-950 text-white' : 'bg-neutral-950 text-white'}>
      <div className={`${compact ? 'grid gap-4 p-4 sm:p-5' : 'mx-auto grid max-w-7xl gap-8 px-4 py-10'} lg:grid-cols-[0.9fr_1.1fr]`}>
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">Contact Kleihaus</p>
          <h2 className="mt-1.5 text-2xl font-semibold sm:text-3xl">Request a quotation or talk to Kleihaus now.</h2>
          <p className="mt-3 leading-6 text-neutral-300">
            Share product type, measurements, quantity, location and budget range. Kleihaus uses those details to confirm availability, delivery options and the right next step.
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {contactActions.map((action) => {
              const Icon = action.icon
              return (
                <a
                  key={action.label}
                  href={action.href}
                  aria-label={action.ariaLabel}
                  className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/30 ${action.className}`}
                  onClick={(event) => action.onClick(event, action.href)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {action.label}
                </a>
              )
            })}
            <button
              type="button"
              onClick={() => {
                analyticsService.track('contact_click', { clickedElement: 'contact_action_quote', ctaLabel: 'Request a Quotation', ctaPosition: 'contact_actions', contactMethod: 'quote_form', enquiryIntent: 'quote' })
                scrollToQuoteForm()
              }}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-500 bg-[#16A34A] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <ArrowRight className="h-4 w-4 shrink-0" />
              Request a Quotation
            </button>
          </div>

          <div className="mt-5 space-y-2 text-sm text-neutral-200">
            <a href="tel:+254748827166" className="flex items-center gap-3 hover:text-white" onClick={() => analyticsService.track('phone_click', { clickedElement: 'contact_phone' })}>
              <Phone className="h-4 w-4 text-emerald-300" />
              +254 748 827 166
            </a>
            <a href="mailto:sales@kleihaus.com" className="flex items-center gap-3 hover:text-white" onClick={() => analyticsService.track('email_click', { clickedElement: 'contact_email' })}>
              <Mail className="h-4 w-4 text-emerald-300" />
              sales@kleihaus.com
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-emerald-300" />
              <div className="flex flex-wrap gap-2">
                {serviceAreaLinks.map((location) => (
                  <a
                    key={location.href}
                    href={location.href}
                    onClick={() => analyticsService.track('location_view', { clickedElement: `contact_location_${location.label.toLowerCase()}`, ctaLabel: location.label, ctaPosition: 'contact_locations', location: location.label, pageType: 'home' })}
                    className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-neutral-100 transition hover:border-emerald-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    {location.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-xs font-semibold uppercase text-neutral-300">Follow Kleihaus</p>
            <SocialLinks placement="contact" className="mt-2" />
          </div>
        </div>

        <form
          key={quoteFormResetKey}
          ref={quoteFormRef}
          onSubmit={submitQuoteRequest}
          noValidate
          autoComplete="off"
          className="rounded-lg bg-white p-4 text-neutral-950 shadow-xl sm:p-5"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Tell us what you need</h3>
            <p className="mt-1 text-sm leading-5 text-neutral-600">Send your measurements, location and product needs. Kleihaus will review the request and respond by phone or email.</p>
          </div>
          <div className="mb-4 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-950 sm:text-sm">
            For a faster quotation, include room size or bill of quantities, preferred finish, delivery location, timing and whether you need installation guidance.
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Name
              <Input name="name" autoComplete="off" placeholder="Your name" value={quoteForm.name} onChange={updateQuoteField('name')} required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Email
              <Input name="email" type="email" autoComplete="off" placeholder="Email address" value={quoteForm.email} onChange={updateQuoteField('email')} />
            </label>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Phone
              <Input name="phone" autoComplete="off" placeholder="Phone number" value={quoteForm.phone} onChange={updateQuoteField('phone')} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Location
              <Input name="location" autoComplete="off" placeholder="Project location" value={quoteForm.location} onChange={updateQuoteField('location')} />
            </label>
          </div>
          <label className="mt-3 grid gap-2 text-sm font-medium text-neutral-700">
            Request details
            <Textarea
              name="message"
              autoComplete="off"
              placeholder="Example: 32 m2 floor tiles, matte finish, 85 pieces, delivery to Machakos, budget range..."
              rows={4}
              value={quoteForm.message}
              onChange={updateQuoteField('message')}
            />
          </label>
          {quoteErrors.length > 0 && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {quoteErrors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          {quoteStatus && (
            <p
              ref={quoteStatusRef}
              className={`mt-3 rounded-md border px-4 py-3 text-sm ${
                quoteStatusType === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-amber-200 bg-amber-50 text-amber-900'
              }`}
            >
              {quoteStatus}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Button disabled={isQuoteSubmitting} className="border-emerald-700 bg-[#16A34A] px-4 py-2.5 text-sm shadow-md shadow-emerald-900/10 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70">
              {isQuoteSubmitting ? 'Sending...' : 'Send quotation request'}
            </Button>
            <ButtonSecondary type="button" onClick={() => onSupportFormClick('contact_form')} className={`${whatsappCtaClass} px-4 py-2.5 text-sm`}>
              <WhatsAppBrandText>WhatsApp support</WhatsAppBrandText>
            </ButtonSecondary>
          </div>
        </form>
      </div>
    </section>
  )
}

function SupportModal({ open, source, initialMessage = '', onClose }) {
  const [form, setForm] = useState(() => ({
    name: '',
    phone: '',
    email: '',
    message: initialMessage,
  }))
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('success')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return

    setForm({
      name: '',
      phone: '',
      email: '',
      message: initialMessage,
    })
    setErrors([])
    setStatus('')
    setStatusType('success')
  }, [open, initialMessage])

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    if (errors.length > 0) setErrors([])
    if (status) setStatus('')
  }

  const submitSupportRequest = async (event) => {
    event.preventDefault()
    if (submitting) return

    const preparedRequest = quoteRequestService.prepare({
      ...form,
      location: '',
      requestDetails: form.message,
      channel: 'whatsapp',
      intent: 'support',
    })

    if (!preparedRequest.ok) {
      setErrors(preparedRequest.errors)
      setStatus('')
      return
    }

    setSubmitting(true)
    setErrors([])
    setStatus('')
    analyticsService.track('quote_form_submit_attempt', {
      clickedElement: source || 'support_modal',
      productCategory: 'Support request',
      hasEmail: Boolean(preparedRequest.payload.email),
      hasPhone: Boolean(preparedRequest.payload.phone),
      pageType: 'support_modal',
      ctaLabel: 'Send request',
      ctaPosition: source || 'support_modal',
      contactMethod: 'support_form',
      enquiryIntent: 'support',
      formName: 'support_request',
      formStep: 'submit',
      formStatus: 'attempt',
    })

    const backendResult = await quoteRequestService.submitBackend({
      ...preparedRequest.payload,
      source: 'support_modal',
      channel: 'whatsapp',
      intent: 'support',
    })

    setStatusType(backendResult.ok ? 'success' : 'error')
    setStatus(backendResult.message)

    if (backendResult.ok) {
      analyticsService.track('quote_form_submit_success', {
        clickedElement: source || 'support_modal',
        leadReference: backendResult.data?.leadReference,
        requestId: backendResult.data?.requestId,
        pageType: 'support_modal',
        ctaLabel: 'Send request',
        ctaPosition: source || 'support_modal',
        contactMethod: 'support_form',
        enquiryIntent: 'support',
        formName: 'support_request',
        formStep: 'submit',
        formStatus: 'success',
      })
      setForm({ name: '', phone: '', email: '', message: '' })
      setSubmitting(false)
      return
    }

    analyticsService.track('quote_form_submit_error', {
      clickedElement: source || 'support_modal',
      reason: backendResult.data?.error || backendResult.message,
      pageType: 'support_modal',
      ctaLabel: 'Send request',
      ctaPosition: source || 'support_modal',
      contactMethod: 'support_form',
      enquiryIntent: 'support',
      formName: 'support_request',
      formStep: 'submit',
      formStatus: 'error',
    })
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-neutral-950/60 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4 sm:py-4" role="dialog" aria-modal="true" aria-labelledby="support-modal-title">
      <div className="max-h-[calc(100vh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-xl bg-white text-neutral-950 shadow-2xl sm:max-h-[calc(100vh-2rem)]">
        <div className="flex items-start justify-between gap-3 border-b border-neutral-200 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Kleihaus support</p>
            <h2 id="support-modal-title" className="mt-1 text-lg font-semibold sm:text-xl">Get product or quote help</h2>
            <p className="mt-1 text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-6">
              Share measurements, product category, location and timing, or open WhatsApp for a direct conversation.
            </p>
            <p className="mt-1 text-xs leading-5 text-neutral-500">
              Prefer calling?{' '}
              <a href="tel:+254748827166" className="font-semibold text-emerald-700 hover:text-emerald-900">
                +254 748 827 166
              </a>
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950" aria-label="Close support form">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submitSupportRequest} noValidate autoComplete="off" className="grid gap-3 px-4 py-4 sm:px-5 sm:py-5">
          <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
            Name
            <Input name="support-name" autoComplete="off" placeholder="Your name" value={form.name} onChange={updateField('name')} required />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
              Phone
              <Input name="support-phone" autoComplete="off" placeholder="Phone number" value={form.phone} onChange={updateField('phone')} />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
              Email
              <Input name="support-email" type="email" autoComplete="off" placeholder="Email address" value={form.email} onChange={updateField('email')} />
            </label>
          </div>
          <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
            Message
            <Textarea
              name="support-message"
              autoComplete="off"
              placeholder="Example: Need bathroom tiles and shower fittings for a Nairobi apartment. I can share photos and measurements..."
              rows={3}
              value={form.message}
              onChange={updateField('message')}
              required
            />
          </label>

          {errors.length > 0 && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          {status && (
            <p className={`rounded-md border px-3 py-2 text-sm ${statusType === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
              {status}
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-2.5">
            <ButtonSecondary type="button" onClick={onClose} className="px-4 py-2 text-sm">Close</ButtonSecondary>
            <button
              type="button"
              onClick={() => {
                analyticsService.track('whatsapp_click', {
                  clickedElement: source || 'support_modal_chat',
                  ctaLabel: 'Chat on WhatsApp',
                  ctaPosition: 'support_modal',
                  contactMethod: 'whatsapp',
                  enquiryIntent: 'support',
                })
                openWhatsAppChat(form.message || initialMessage || DEFAULT_WHATSAPP_MESSAGE)
              }}
              className={`${whatsappCtaClass} inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold`}
            >
              <WhatsAppBrandText>Chat on WhatsApp</WhatsAppBrandText>
            </button>
            <Button type="submit" disabled={submitting} className="border-emerald-700 bg-[#16A34A] px-4 py-2 text-sm shadow-sm shadow-emerald-900/10 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70">
              {submitting ? 'Sending...' : 'Send support request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Breadcrumbs({ page }) {
  const breadcrumbs = getPageBreadcrumbs(page)

  return (
    <nav aria-label="Breadcrumb" className="border-b border-neutral-100 bg-white">
      <ol className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2.5 text-xs font-medium text-neutral-500">
        {breadcrumbs.map((item, index) => {
          const isCurrent = index === breadcrumbs.length - 1
          return (
            <li key={`${item.href}-${item.name}`} className="flex shrink-0 items-center gap-1">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-neutral-300" aria-hidden="true" />}
              {isCurrent ? (
                <span aria-current="page" className="max-w-[14rem] truncate text-neutral-800 sm:max-w-none">
                  {item.name}
                </span>
              ) : (
                <a href={item.href} className="rounded-sm transition hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                  {item.name}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function HubPage({ page, onSectionChange, onSupportClick, onQuoteClick }) {
  return (
    <main className="bg-white">
      <Breadcrumbs page={page} />
      <section className="border-b border-emerald-100 bg-stone-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:py-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">{page.eyebrow}</p>
            <h1 className="mt-2 max-w-3xl text-[clamp(1.75rem,6vw,2.5rem)] font-semibold leading-tight text-neutral-950 sm:text-4xl">
              {page.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 sm:text-base sm:leading-6">{page.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2 max-sm:[&>*]:w-full max-sm:[&>*]:justify-center">
              <Button
                type="button"
                className="gap-1.5 px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm"
                onClick={() => {
                  analyticsService.track('hub_click', { clickedElement: `${page.pageType}_hero_quote`, ctaLabel: page.ctaLabel, ctaPosition: `${page.pageType}_hero`, pageType: page.pageType, enquiryIntent: 'quote' })
                  onQuoteClick(`${page.pageType}_hero_quote`)
                  onSectionChange('contact')
                }}
              >
                {page.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <ButtonSecondary
                type="button"
                onClick={() => onSupportClick(`${page.pageType}_hero_whatsapp`, `Hello Kleihaus, I am exploring ${page.category.toLowerCase()} and would like help choosing the right next step.`)}
                className={`${whatsappCtaClass} px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm`}
              >
                <WhatsAppBrandText>Ask on WhatsApp</WhatsAppBrandText>
              </ButtonSecondary>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {page.images.slice(0, 3).map((image, index) => (
              <OptimizedImage
                key={image.src}
                src={image.src}
                alt={image.alt}
                sizes={index === 0 ? '(max-width: 640px) 66vw, 45vw' : '(max-width: 640px) 33vw, 22vw'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`h-full min-h-28 w-full rounded-lg object-cover shadow-sm ${index === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {page.hubGroups.map((group) => (
            <article key={group.title} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">{group.title}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{group.text}</p>
              <div className="mt-4 grid gap-2">
                {group.links.map((link) => (
                  <a
                    key={`${group.title}-${link.href}-${link.label}`}
                    href={link.href}
                    onClick={() =>
                      analyticsService.track('hub_click', {
                        clickedElement: `${page.pageType}_hub_${link.label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
                        ctaLabel: link.label,
                        ctaPosition: `${page.pageType}_hub`,
                        pageType: page.pageType,
                        enquiryIntent: page.pageType === 'products' ? 'product_discovery' : page.pageType === 'guides' ? 'research' : 'local_support',
                      })
                    }
                    className="group rounded-lg border border-neutral-200 bg-neutral-50 p-3 transition hover:border-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-neutral-950">{link.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:text-emerald-700" />
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-neutral-600 sm:text-sm">{link.detail}</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:pb-10">
        <div className="grid gap-3 rounded-xl bg-neutral-950 p-4 text-white sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-300 sm:text-sm">Next step</p>
            <h2 className="mt-1.5 text-xl font-semibold sm:text-2xl">Ready to turn this into a clearer Kleihaus enquiry?</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              Share product category, measurements, location, quantity and timing so the team can guide the most relevant support path.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <ButtonSecondary type="button" onClick={() => onSupportClick(`${page.pageType}_bottom_whatsapp`)} className={`${whatsappCtaClass} px-3 py-2 text-xs sm:text-sm`}>
              <WhatsAppBrandText>WhatsApp help</WhatsAppBrandText>
            </ButtonSecondary>
            <button
              type="button"
              onClick={() => {
                analyticsService.track('hub_click', { clickedElement: `${page.pageType}_bottom_quote`, ctaLabel: 'Request a quotation', ctaPosition: `${page.pageType}_bottom`, pageType: page.pageType, enquiryIntent: 'quote' })
                onQuoteClick(`${page.pageType}_bottom_quote`)
                onSectionChange('contact')
              }}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-700 bg-[#16A34A] px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            >
              Request a Quotation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function CategoryLandingPage({ page, onSectionChange, onSupportClick, onQuoteClick }) {
  return (
    <main className="bg-white">
      <Breadcrumbs page={page} />
      <section className="border-b border-emerald-100 bg-stone-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:py-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">{page.eyebrow}</p>
            <h1 className="mt-2 max-w-3xl text-[clamp(1.75rem,6vw,2.5rem)] font-semibold leading-tight text-neutral-950 sm:text-4xl">
              {page.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 sm:text-base sm:leading-6">
              {page.intro}
            </p>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-5">
              Quotes depend on current availability, quantity, delivery location and project details. Share measurements, finish preference and budget range so the Kleihaus team responds with useful guidance.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 max-sm:[&>*]:w-full max-sm:[&>*]:justify-center">
              <Button
                type="button"
                className="gap-1.5 px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm"
                onClick={() => {
                  onQuoteClick(`category_quote_${page.path}`)
                  onSectionChange('contact')
              }}
            >
                {page.ctaLabel || 'Request quotation'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <ButtonSecondary type="button" onClick={() => onSupportClick(`category_page_${page.path}`, `I would like a quote for ${page.category}. Please share availability, price guidance and delivery details.`)} className={`${whatsappCtaClass} px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm`}>
                <WhatsAppBrandText>Ask on WhatsApp</WhatsAppBrandText>
              </ButtonSecondary>
              <a
                href="tel:+254748827166"
                aria-label={`Call Kleihaus Ceramics about ${page.category}`}
                onClick={() => analyticsService.track('phone_click', { clickedElement: `category_call_${page.path}`, productCategory: page.category })}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 shadow-sm transition hover:border-emerald-700 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <Phone className="h-4 w-4" />
                Call adviser
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {page.images.slice(0, 3).map((image, index) => (
              <OptimizedImage
                key={image.src}
                src={image.src}
                alt={image.alt}
                sizes={index === 0 ? '(max-width: 640px) 66vw, 45vw' : '(max-width: 640px) 33vw, 22vw'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`h-full min-h-28 w-full rounded-lg object-cover shadow-sm ${index === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'}`}
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = '/images/placeholder.jpg'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Quote planning</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950 sm:text-2xl">What to share</h2>
            <ul className="mt-3 grid gap-1.5 text-sm text-neutral-700">
              {page.notes.map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm leading-5 text-emerald-950">
              Include room size, product type, quantity, location and budget range. Photos or inspiration references help the team match finishes more quickly.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {page.images.map((image) => (
              <figure key={image.src} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = '/images/placeholder.jpg'
                  }}
                />
                <figcaption className="px-3 py-2">
                  <span className="block text-xs font-semibold text-neutral-800">{image.label}</span>
                  {image.story && <span className="mt-1 block text-xs font-medium leading-5 text-neutral-600">{image.story}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {page.sections?.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
          <div className="grid gap-3 md:grid-cols-3">
            {page.sections.map((section) => (
              <article key={section.title} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-semibold text-neutral-950">{section.title}</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{section.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {page.eyebrow === 'Project guide' && (
        <section className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
          <div className="grid gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Plan your finishing project</p>
              <h2 className="mt-1.5 text-lg font-semibold text-neutral-950 sm:text-xl">Turn this guide into a clearer Kleihaus quote request.</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-700">
                Share measurements, photos, product category, delivery location and timing so the team can connect guidance with availability, matching materials and practical next steps.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {serviceAreaLinks.map((location) => (
                  <a
                    key={`guide-${location.href}`}
                    href={location.href}
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-900 transition hover:border-emerald-700 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {location.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <ButtonSecondary type="button" onClick={() => onSupportClick(`guide_project_support_${page.path}`, `Hello Kleihaus, I read the ${page.category}. Please help me plan products, quantities, delivery and quote details.`)} className={`${whatsappCtaClass} px-3 py-2 text-xs sm:text-sm`}>
                <WhatsAppBrandText>Ask guide question</WhatsAppBrandText>
              </ButtonSecondary>
              <button
                type="button"
                onClick={() => {
                  onQuoteClick(`guide_project_quote_${page.path}`)
                  onSectionChange('contact')
                }}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-700 bg-[#16A34A] px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
              >
                Request guide-based quote
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {page.localFaqs?.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Local FAQs</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950 sm:text-2xl">Planning support for {page.category}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {page.localFaqs.map((item) => (
                <article key={item.question} className="rounded-lg border border-emerald-100 bg-white p-3 shadow-sm">
                  <h3 className="text-sm font-semibold leading-5 text-neutral-950">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
        <div className="grid gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Local support</p>
            <h2 className="mt-1.5 text-lg font-semibold text-neutral-950 sm:text-xl">Plan with Kleihaus in Nairobi, Machakos or Makueni.</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Choose a location hub for delivery context, project guidance and related tiles, sanitaryware, paints and installation support pages.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {serviceAreaLinks.map((location) => (
                <a
                  key={location.href}
                  href={location.href}
                  className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {location.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <a
              href="tel:+254748827166"
              aria-label="Call Kleihaus Ceramics"
              onClick={() => analyticsService.track('phone_click', { clickedElement: `local_support_call_${page.path}`, productCategory: page.category })}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 transition hover:border-emerald-700 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            >
              <Phone className="h-4 w-4" />
              Call adviser
            </a>
            <ButtonSecondary type="button" onClick={() => onSupportClick(`local_support_whatsapp_${page.path}`, `Hello Kleihaus, I need local support for ${page.category}. Please help with product guidance, delivery and quote details.`)} className={`${whatsappCtaClass} px-3 py-2 text-xs sm:text-sm`}>
              <WhatsAppBrandText>Ask local question</WhatsAppBrandText>
            </ButtonSecondary>
            <button
              type="button"
              onClick={() => {
                onQuoteClick(`local_support_quote_${page.path}`)
                onSectionChange('contact')
              }}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-700 bg-[#16A34A] px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            >
              Request local quote
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="mb-4 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
          <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Explore related pages</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(page.relatedLinks || seoLandingPages.filter((relatedPage) => relatedPage.path !== page.path).slice(0, 6))
              .map((relatedPage) => (
                <a
                  key={relatedPage.href || relatedPage.path}
                  href={relatedPage.href || relatedPage.path}
                  className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  {relatedPage.label || relatedPage.category}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl bg-neutral-950 p-4 text-white sm:p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Ready to plan a {page.category.toLowerCase()} quotation?</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              Send measurements, quantity, location and timing so the Kleihaus team can guide availability, matching options and next steps.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <a href="/" className="inline-flex items-center justify-center rounded-md border border-white/30 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 sm:text-sm">
              Back home
            </a>
            <a href="/#catalogue" className="inline-flex items-center justify-center rounded-md border border-white/30 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 sm:text-sm">
              Browse catalogue
            </a>
            <ButtonSecondary type="button" onClick={() => onSupportClick(`category_page_bottom_${page.path}`, `I would like a quote for ${page.category}. Please share availability, price guidance and delivery details.`)} className={`${whatsappCtaClass} px-3 py-2 text-xs sm:text-sm`}>
              <WhatsAppBrandText>WhatsApp quotation help</WhatsAppBrandText>
            </ButtonSecondary>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProjectsPage({ page, onSectionChange, onSupportClick, onQuoteClick }) {
  const [activeImageIndex, setActiveImageIndex] = useState(null)
  const activeImage = activeImageIndex === null ? null : page.images[activeImageIndex]

  useEffect(() => {
    if (!activeImage) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImageIndex(null)
        analyticsService.track('project_gallery_close', { clickedElement: 'projects_lightbox_escape', ctaPosition: 'projects_lightbox' })
      }
      if (event.key === 'ArrowRight') {
        setActiveImageIndex((current) => {
          const next = current === null ? 0 : (current + 1) % page.images.length
          analyticsService.track('project_gallery_next', { clickedElement: 'projects_lightbox_next_keyboard', ctaPosition: 'projects_lightbox', galleryIndex: next + 1 })
          return next
        })
      }
      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((current) => {
          const next = current === null ? 0 : (current - 1 + page.images.length) % page.images.length
          analyticsService.track('project_gallery_previous', { clickedElement: 'projects_lightbox_previous_keyboard', ctaPosition: 'projects_lightbox', galleryIndex: next + 1 })
          return next
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage, page.images.length])

  const openImage = (index) => {
    setActiveImageIndex(index)
    analyticsService.track('project_gallery_open', {
      clickedElement: 'projects_gallery_image',
      ctaPosition: 'projects_gallery',
      galleryIndex: index + 1,
      projectCategory: page.images[index].group,
    })
  }

  const showImage = (direction) => {
    setActiveImageIndex((current) => {
      const next = current === null ? 0 : (current + direction + page.images.length) % page.images.length
      analyticsService.track(direction > 0 ? 'project_gallery_next' : 'project_gallery_previous', {
        clickedElement: direction > 0 ? 'projects_lightbox_next' : 'projects_lightbox_previous',
        ctaPosition: 'projects_lightbox',
        galleryIndex: next + 1,
      })
      return next
    })
  }

  const closeImage = () => {
    setActiveImageIndex(null)
    analyticsService.track('project_gallery_close', { clickedElement: 'projects_lightbox_close', ctaPosition: 'projects_lightbox' })
  }

  return (
    <main className="bg-white">
      <Breadcrumbs page={page} />
      <section className="border-b border-emerald-100 bg-stone-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">{page.eyebrow}</p>
            <h1 className="mt-2 max-w-3xl text-[clamp(1.875rem,7vw,2.75rem)] font-semibold leading-tight text-neutral-950">
              {page.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 sm:text-base">
              {page.intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  analyticsService.track('project_click', { clickedElement: 'projects_hero_quote', ctaLabel: 'Request a similar quote', ctaPosition: 'projects_hero', enquiryIntent: 'quote' })
                  onQuoteClick('projects_hero_quote')
                  onSectionChange('contact')
                }}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-700 bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                Request a Similar Quote
                <ArrowRight className="h-4 w-4" />
              </button>
              <ButtonSecondary
                type="button"
                onClick={() => onSupportClick('projects_whatsapp_support', 'Hello Kleihaus, I viewed the projects gallery. Please help me plan a similar kitchen finishing quote.')}
                className={`${whatsappCtaClass} px-4 py-2.5 text-sm`}
              >
                <WhatsAppBrandText>Ask on WhatsApp</WhatsAppBrandText>
              </ButtonSecondary>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Featured project images">
            {page.images.slice(0, 3).map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => openImage(index)}
                className={`group overflow-hidden rounded-lg border border-white bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300 ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                aria-label={`Open project image: ${image.label}`}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  sizes={index === 0 ? '(max-width: 640px) 66vw, 45vw' : '(max-width: 640px) 33vw, 22vw'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  width={image.width}
                  height={image.height}
                  className={`w-full object-cover transition duration-300 group-hover:scale-[1.03] ${index === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="kitchen-projects" className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700 sm:text-sm">Kitchen projects</p>
            <h2 className="mt-1 text-2xl font-semibold text-neutral-950 sm:text-3xl">Kitchen finishing details from supplied project photos.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-neutral-600">
            Photos show kitchen cabinets, worktops, sinks, textured backsplashes and finishing materials. They are presented as visual project references only.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {page.images.map((image, index) => (
            <figure key={image.src} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => openImage(index)}
                className="group block w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-300"
                aria-label={`Open larger view of ${image.label}`}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  width={image.width}
                  height={image.height}
                  className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </button>
              <figcaption className="flex items-center justify-between gap-3 px-3 py-2 text-xs font-semibold text-neutral-700">
                <span>{image.label}</span>
                <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[0.68rem] uppercase text-emerald-800">{image.group}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-4 rounded-xl bg-neutral-950 p-4 text-white sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-300 sm:text-sm">Plan a similar finish</p>
            <h2 className="mt-1.5 text-xl font-semibold sm:text-2xl">Send measurements, photos and finish preferences for quote support.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              Kleihaus can help compare tiles, sanitaryware, paints, adhesives, grout and finishing materials around your room, quantity, location and timing.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <ButtonSecondary
              type="button"
              onClick={() => onSupportClick('projects_bottom_whatsapp', 'Hello Kleihaus, I would like help planning a similar kitchen finishing project.')}
              className={`${whatsappCtaClass} px-3 py-2 text-xs sm:text-sm`}
            >
              <WhatsAppBrandText>WhatsApp project help</WhatsAppBrandText>
            </ButtonSecondary>
            <button
              type="button"
              onClick={() => {
                analyticsService.track('project_click', { clickedElement: 'projects_bottom_quote', ctaLabel: 'Request a similar quote', ctaPosition: 'projects_bottom', enquiryIntent: 'quote' })
                onQuoteClick('projects_bottom_quote')
                onSectionChange('contact')
              }}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-700 bg-[#16A34A] px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            >
              Request a Similar Quote
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {activeImage && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-neutral-950/85 px-3 py-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="project-lightbox-title">
          <div className="relative w-full max-w-5xl rounded-lg bg-white p-2 shadow-2xl">
            <div className="flex items-center justify-between gap-3 px-2 py-2">
              <div>
                <h2 id="project-lightbox-title" className="text-sm font-semibold text-neutral-950">{activeImage.label}</h2>
                <p className="text-xs text-neutral-500">{activeImage.group}</p>
              </div>
              <button type="button" onClick={closeImage} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-300" aria-label="Close project image viewer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <OptimizedImage
                src={activeImage.src}
                alt={activeImage.alt}
                sizes="(max-width: 1024px) 94vw, 960px"
                loading="eager"
                decoding="async"
                width={activeImage.width}
                height={activeImage.height}
                className="max-h-[75vh] w-full rounded-md object-contain"
              />
              <button type="button" onClick={() => showImage(-1)} className="absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300" aria-label="Show previous project image">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => showImage(1)} className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300" aria-label="Show next project image">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function Footer() {
  const footerProductLinks = [
    { label: 'All products', href: '/products' },
    { label: 'Tiles', href: '/tiles' },
    { label: 'Floor tiles', href: '/floor-tiles' },
    { label: 'Wall tiles', href: '/wall-tiles' },
    { label: 'Bathroom tiles', href: '/bathroom-tiles' },
    { label: 'Sanitaryware', href: '/sanitaryware' },
    { label: 'Kitchen sinks & mixers', href: '/sanitaryware' },
    { label: 'Paints', href: '/paints' },
    { label: 'Adhesives & grout', href: '/adhesives-grout' },
  ]
  const popularSearchLinks = [
    { label: 'Floor tiles', href: '/floor-tiles' },
    { label: 'Bathroom tiles', href: '/bathroom-tiles' },
    { label: 'Sanitaryware', href: '/sanitaryware' },
    { label: 'Paints', href: '/paints' },
  ]
  const projectGuideLinks = [
    { label: 'Guides hub', href: '/guides' },
    { label: 'Tile buying guide', href: '/tile-buying-guide' },
    { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
    { label: 'Paint selection guide', href: '/paint-selection-guide' },
    { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
  ]
  const footerProjectLinks = [
    { label: 'View All Projects', href: '/projects' },
    { label: 'Kitchen Projects', href: '/projects#kitchen-projects' },
  ]
  return (
    <footer data-site-footer className="border-t border-white/30 bg-[linear-gradient(180deg,#8B4E1C_0%,#A65F1E_100%)] text-orange-50">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 sm:grid-cols-2 sm:gap-6 sm:py-6 lg:grid-cols-4 lg:gap-10 lg:py-7">
        <div className="w-full md:justify-self-start">
          <h3 className="text-sm font-semibold uppercase text-white">Products</h3>
          <ul className="mt-2 grid gap-0.5 text-xs text-orange-50/90 sm:gap-1.5 sm:text-sm">
            {footerProductLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-100/70">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:max-w-max lg:justify-self-center">
          <h3 className="text-sm font-semibold uppercase text-white">Services</h3>
          <ul className="mt-2 grid gap-0.5 text-xs text-orange-50/90 sm:gap-1.5 sm:text-sm">
            {['Finishing Advisory', 'Delivery', 'Installation'].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:max-w-max lg:justify-self-center">
          <h3 className="text-sm font-semibold uppercase text-white">Projects</h3>
          <ul className="mt-2 grid gap-1 text-xs text-orange-50/90 sm:gap-1.5 sm:text-sm">
            {footerProjectLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => analyticsService.track('project_click', { clickedElement: `footer_project_${item.label.toLowerCase().replace(/\s+/g, '_')}`, ctaLabel: item.label, ctaPosition: 'footer_projects', enquiryIntent: 'project_gallery' })}
                  className="inline-flex min-h-8 items-center transition hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-100/70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:max-w-max lg:justify-self-end">
          <h3 className="text-sm font-semibold uppercase text-white">Contact</h3>
          <div className="mt-2 grid gap-1.5 text-xs text-orange-50/90 sm:gap-2 sm:text-sm">
            <a href="mailto:sales@kleihaus.com" className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4 text-orange-100" />
              sales@kleihaus.com
            </a>
            <a href="tel:+254748827166" className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 text-orange-100" />
              +254 748 827 166
            </a>
            <div className="pt-1">
              <p className="text-xs font-semibold uppercase text-white">Follow Kleihaus</p>
              <SocialLinks placement="footer" className="mt-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 px-4 py-4">
        <div className="mx-auto grid max-w-6xl gap-4 text-xs text-orange-50/90 sm:grid-cols-3 sm:text-sm">
          {[
            ['Popular products', popularSearchLinks],
            ['Guides', projectGuideLinks],
            ['Project evidence', footerProjectLinks],
          ].map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase text-white">{title}</h3>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                {links.map((link) => (
                  <a key={link.href} href={link.href} className="transition hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-100/70">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/20 bg-[#16A34A]">
        <div className="footer-brand-strip mx-auto flex max-w-7xl items-center justify-center px-4 py-2.5 text-center text-white sm:py-5">
          <p className="text-xs font-medium">
            © {new Date().getFullYear()} Kleihaus Ceramics. All Rights Reserved.{' '}
            <span className="font-semibold tracking-wide text-white">Inspiring Living</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

const normalizePath = (path) => {
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '')
}

export default function App() {
  const [projectType] = useState('Homeowner')
  const [currentPath, setCurrentPath] = useState(() => (typeof window === 'undefined' ? '/' : normalizePath(window.location.pathname)))
  const [activeSection, setActiveSection] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Floor Tiles')
  const [eventRevision, setEventRevision] = useState(0)
  const [supportModal, setSupportModal] = useState({
    open: false,
    source: 'support_button',
    message: '',
  })
  const activeCategoryPage = categoryLandingByPath[currentPath]

  const refreshSignals = () => setEventRevision((revision) => revision + 1)

  useEffect(() => {
    const pageType = currentPath.startsWith('/locations/')
      ? 'location'
      : activeCategoryPage?.pageType === 'projects'
        ? 'projects'
        : activeCategoryPage?.pageType === 'trade'
          ? 'trade_projects'
      : activeCategoryPage?.hubGroups
        ? activeCategoryPage.pageType || 'hub'
      : activeCategoryPage?.category?.toLowerCase().includes('guide')
        ? 'guide'
        : activeCategoryPage
          ? 'seo_route'
          : 'home'

    analyticsService.track('page_view', {
      clickedElement: `route_${currentPath}`,
      pagePath: currentPath,
      pageType,
      productCategory: activeCategoryPage?.category || 'Homepage',
    })

    if (pageType === 'location') {
      analyticsService.track('location_view', {
        clickedElement: `location_${activeCategoryPage?.category || currentPath}`,
        pagePath: currentPath,
        location: activeCategoryPage?.category || '',
        pageType: 'location',
      })
    }

    if (pageType === 'guide') {
      analyticsService.track('guide_view', {
        clickedElement: `guide_${activeCategoryPage?.category || currentPath}`,
        pagePath: currentPath,
        guide: activeCategoryPage?.category || '',
        guideName: activeCategoryPage?.category || '',
        pageType: 'guide',
      })
    }
  }, [activeCategoryPage, currentPath])

  useEffect(() => {
    const syncPath = () => setCurrentPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  const navigateHome = () => {
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/')
      setCurrentPath('/')
    }
  }

  const handleSearch = (query) => {
    analyticsService.track('search_query', { searchQuery: query.toLowerCase(), projectType })
    setSearchQuery(query)
    setActiveSection('catalogue')
    refreshSignals()
  }

  const handleSectionChange = (section) => {
    navigateHome()
    setActiveSection(section)
    analyticsService.track('navigation_click', { clickedElement: `nav_${section}`, projectType, productCategory: selectedCategory })
    refreshSignals()
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const targetElement = section === 'home' ? null : document.getElementById(section)
        const targetTop = section === 'home'
          ? 0
          : Math.max((targetElement?.getBoundingClientRect().top || 0) + window.scrollY - 96, 0)

        window.scrollTo({
          top: targetTop,
          behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        })
      })
    })
  }

  const handleRouteNavigate = (event, href) => {
    if (!href || !href.startsWith('/')) return
    if (event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey || event?.button !== 0) return

    event.preventDefault()
    const target = normalizePath(href)
    if (target !== currentPath) {
      window.history.pushState({}, '', target)
      setCurrentPath(target)
    }
    setActiveSection('home')
    analyticsService.track('navigation_click', {
      clickedElement: `route_nav_${target}`,
      pagePath: target,
      ctaPosition: 'route_navigation',
    })
    refreshSignals()
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  const handleCategoryClick = (category) => {
    navigateHome()
    analyticsService.track('category_click', { productCategory: category, clickedElement: 'category_navigation', projectType })
    setSelectedCategory(category)
    setActiveSection('catalogue')
    refreshSignals()
  }

  const handleCategoryGuideClick = (event, guideTarget, category) => {
    if (!guideTarget) return

    event.preventDefault()
    setSelectedCategory(category)

    if (guideTarget.startsWith('/#')) {
      handleSectionChange(guideTarget.slice(2))
      return
    }

    window.history.pushState({}, '', guideTarget)
    setCurrentPath(normalizePath(guideTarget))
    setActiveSection('catalogue')
    refreshSignals()
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  const handleProductInterest = (product, category) => {
    analyticsService.track('product_click', { productName: product, productCategory: category, clickedElement: 'product_card', projectType })
    setSelectedCategory(category)
    refreshSignals()
  }

  const handleSupportClick = (source, message = '') => {
    const isProjectDiscussion = source.includes('discuss_project')
    const isProductGuidance = source.includes('product_card')
    analyticsService.track('whatsapp_click', {
      clickedElement: source,
      projectType,
      productCategory: selectedCategory,
      ctaLabel: isProjectDiscussion ? 'Discuss Your Project' : isProductGuidance ? 'Discuss this product' : 'WhatsApp',
      ctaPosition: source,
      contactMethod: 'whatsapp',
      enquiryIntent: isProjectDiscussion ? 'project_support' : isProductGuidance ? 'product_guidance' : 'quote_support',
    })
    openWhatsAppChat(message || DEFAULT_WHATSAPP_MESSAGE)
    refreshSignals()
  }

  const handleSupportFormClick = (source, message = '') => {
    analyticsService.track('whatsapp_click', {
      clickedElement: source,
      projectType,
      productCategory: selectedCategory,
      ctaLabel: 'WhatsApp support form',
      ctaPosition: source,
      contactMethod: 'support_form',
      enquiryIntent: 'quote_support',
    })
    setSupportModal({
      open: true,
      source,
      message,
    })
    refreshSignals()
  }

  const handleQuoteClick = (source) => {
    analyticsService.track('contact_click', {
      clickedElement: source,
      projectType,
      productCategory: selectedCategory,
      ctaLabel: 'Request quotation',
      ctaPosition: source,
      contactMethod: 'quote_form',
      enquiryIntent: 'quote',
    })
    refreshSignals()
  }

  const handleGuideClick = (topic) => {
    analyticsService.track('guide_topic_clicked', {
      topic,
      guideName: topic,
      projectType,
      ctaLabel: topic,
      ctaPosition: 'helpful_guides',
      enquiryIntent: 'research',
    })
    refreshSignals()
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-900">
      <SeoManager page={activeCategoryPage} />
      <Header
        projectType={projectType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        activeSection={activeSection}
        selectedCategory={selectedCategory}
        onSectionChange={handleSectionChange}
        onCategoryClick={handleCategoryClick}
        onRouteNavigate={handleRouteNavigate}
      />
      {activeCategoryPage ? (
        activeCategoryPage.pageType === 'projects' ? (
          <ProjectsPage
            page={activeCategoryPage}
            onSectionChange={handleSectionChange}
            onSupportClick={handleSupportClick}
            onQuoteClick={handleQuoteClick}
          />
        ) : activeCategoryPage.pageType === 'trade' ? (
          <TradeProjectsPage
            page={activeCategoryPage}
            onSectionChange={handleSectionChange}
            onSupportClick={handleSupportClick}
            onQuoteClick={handleQuoteClick}
          />
        ) : activeCategoryPage.hubGroups ? (
          <HubPage
            page={activeCategoryPage}
            onSectionChange={handleSectionChange}
            onSupportClick={handleSupportClick}
            onQuoteClick={handleQuoteClick}
          />
        ) : (
          <CategoryLandingPage
            page={activeCategoryPage}
            onSectionChange={handleSectionChange}
            onSupportClick={handleSupportClick}
            onQuoteClick={handleQuoteClick}
          />
        )
      ) : (
        <>
          <Hero onSectionChange={handleSectionChange} />
          <ShopByCategory
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            onGuideClick={handleCategoryGuideClick}
            onSupportClick={handleSupportClick}
          />
          <CustomerProjectGallery />
          <ProjectsEvidence />
          <AudiencePathways />
          <AboutSection />
          <HelpfulGuides onGuideClick={handleGuideClick} />
          <Contact onSupportFormClick={handleSupportFormClick} />
        </>
      )}
      <Footer />
      <SupportModal
        open={supportModal.open}
        source={supportModal.source}
        initialMessage={supportModal.message}
        onClose={() => setSupportModal((current) => ({ ...current, open: false }))}
      />
    </div>
  )
}
