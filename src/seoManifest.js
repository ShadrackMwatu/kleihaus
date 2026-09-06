export const SITE_ORIGIN = 'https://www.kleihaus.com'
export const SEO_LASTMOD = '2026-08-20'

const defaultImage = '/images/kleihaus-structure.jpg'

const coreRoutes = [
  {
    path: '/',
    title: 'Kleihaus Ceramics Kenya | Tiles, Sanitaryware & Paints',
    description:
      'Discover tiles, sanitaryware, kitchen sinks, paints, adhesives, grout, tools and project support from Kleihaus Ceramics in Nairobi, Machakos and Makueni.',
    image: defaultImage,
    imageAlt: 'Kleihaus Ceramics showroom structure for tiles and finishing materials',
    changefreq: 'weekly',
    priority: '1.0',
    schemaType: 'WebPage',
    breadcrumbs: [{ name: 'Home', href: '/' }],
    relatedLinks: [
      { label: 'Products', href: '/products' },
      { label: 'Projects', href: '/projects' },
      { label: 'Guides', href: '/guides' },
      { label: 'Locations', href: '/locations' },
      { label: 'Trade and project support', href: '/trade-projects' },
    ],
  },
  {
    path: '/products',
    title: 'Kleihaus Products | Tiles, Sanitaryware & Paints',
    description:
      'Explore Kleihaus product categories: tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout, tools and finishing support.',
    image: '/images/tiles-floor.jpg',
    imageAlt: 'Kleihaus Ceramics product categories for finishing projects',
    category: 'Products',
    schemaType: 'CollectionPage',
    changefreq: 'weekly',
    priority: '0.9',
    relatedLinks: [
      { label: 'Tiles', href: '/tiles' },
      { label: 'Sanitaryware', href: '/sanitaryware' },
      { label: 'Paints', href: '/paints' },
      { label: 'Adhesives and grout', href: '/adhesives-grout' },
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Projects', href: '/projects' },
    ],
  },
  {
    path: '/tiles',
    title: 'Tiles Kenya | Floor, Wall & Bathroom Tiles | Kleihaus Ceramics',
    description:
      'Explore tile quote guidance for floor tiles, wall tiles, bathroom tiles and outdoor finishes from Kleihaus Ceramics in Nairobi, Machakos, Makueni and Kenya.',
    image: '/images/tiles-floor.jpg',
    imageAlt: 'Floor tile finishes for homes and project quote planning in Kenya',
    category: 'Tiles',
    relatedLinks: [
      { label: 'Floor tiles', href: '/floor-tiles' },
      { label: 'Wall tiles', href: '/wall-tiles' },
      { label: 'Bathroom tiles', href: '/bathroom-tiles' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Tile adhesive and grout', href: '/adhesives-grout' },
      { label: 'Tiles Nairobi', href: '/tiles-nairobi' },
    ],
  },
  {
    path: '/floor-tiles',
    title: 'Floor Tiles Kenya | Kleihaus Ceramics',
    description:
      'Browse floor tile ideas for homes, shops and projects in Kenya. Request a Kleihaus quote based on quantity, location and project details.',
    image: '/images/tiles-floor.jpg',
    imageAlt: 'Polished floor tiles for Kenyan home and project interiors',
    category: 'Floor Tiles',
    relatedLinks: [
      { label: 'Tiles', href: '/tiles' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Adhesives and grout', href: '/adhesives-grout' },
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Floor tiles Nairobi', href: '/tiles-nairobi' },
    ],
  },
  {
    path: '/wall-tiles',
    title: 'Wall Tiles Kenya | Kitchen & Interior Wall Tiles | Kleihaus',
    description:
      'Explore wall tile options for kitchens, bathrooms and feature walls. Request Kleihaus quote guidance for availability, quantity and delivery details.',
    image: '/images/tiles-wall.jpg',
    imageAlt: 'Kitchen wall tiles and splashback finishes supplied by Kleihaus',
    category: 'Wall Tiles',
    relatedLinks: [
      { label: 'Tiles', href: '/tiles' },
      { label: 'Kitchen projects', href: '/projects' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Adhesives and grout', href: '/adhesives-grout' },
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Wall tiles Nairobi', href: '/tiles-nairobi' },
    ],
  },
  {
    path: '/bathroom-tiles',
    title: 'Bathroom Tiles Kenya | Shower & Wet Area Tiles | Kleihaus',
    description:
      'Plan bathroom tile combinations for showers, walls and floors. Request a Kleihaus quote based on room size, tile type and location.',
    image: '/images/bathroom-blue-1.jpg',
    imageAlt: 'Blue bathroom tile and sanitaryware display for quote planning',
    category: 'Bathroom Tiles',
    relatedLinks: [
      { label: 'Sanitaryware', href: '/sanitaryware' },
      { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Adhesives and grout', href: '/adhesives-grout' },
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Bathroom tiles Nairobi', href: '/tiles-nairobi' },
    ],
  },
  {
    path: '/sanitaryware',
    title: 'Sanitaryware Kenya | Basins, Toilets, Taps & Showers | Kleihaus',
    description:
      'Compare basins, toilets, kitchen sinks, mixers and showers. Ask Kleihaus about quantities, availability and delivery to Nairobi, Machakos or Makueni.',
    lastModified: '2026-09-06',
    image: '/images/sanitaryware/sanitaryware-shower-display-02.jpg',
    imageAlt: 'Bathroom shower system and tap display at Kleihaus Ceramics',
    category: 'Sanitaryware',
    relatedLinks: [
      { label: 'Bathroom tiles', href: '/bathroom-tiles' },
      { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Sanitaryware Nairobi', href: '/sanitaryware-nairobi' },
      { label: 'Projects', href: '/projects' },
      { label: 'Installation support', href: '/installation-support' },
    ],
  },
  {
    path: '/paints',
    title: 'Paints Kenya | Interior, Exterior, Roof & Floor Paints | Kleihaus',
    description:
      'Request Kleihaus paint quote guidance for interior, exterior, roof and floor finishes based on surface area, location and project needs.',
    image: '/images/paint-interior.jpg',
    imageAlt: 'Interior paint finish options for Kleihaus quote planning',
    category: 'Paints',
    relatedLinks: [
      { label: 'Paint selection guide', href: '/paint-selection-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Paints Nairobi', href: '/paints-nairobi' },
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Trade and project support', href: '/trade-projects' },
      { label: 'Products', href: '/products' },
    ],
  },
  {
    path: '/adhesives-grout',
    title: 'Tile Adhesives & Grout Kenya | Kleihaus Ceramics',
    description:
      'Plan tile adhesive, grout, trims, spacers and installation essentials with Kleihaus quote support for tile projects in Kenya.',
    image: '/images/adhesive.jpg',
    imageAlt: 'Tile adhesive for floor and wall tile installation',
    category: 'Adhesives & Grout',
    relatedLinks: [
      { label: 'Adhesive and grout guide', href: '/adhesive-grout-guide' },
      { label: 'Installation best practices', href: '/installation-best-practices' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Tiles', href: '/tiles' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Installation support', href: '/installation-support' },
    ],
  },
  {
    path: '/installation-support',
    title: 'Installation Support Kenya | Kleihaus Ceramics',
    description:
      'Plan tile and finishing installation support with Kleihaus, including measurement, product matching, fixing, grouting, cleaning and training.',
    image: '/images/tiler-service.jpg',
    imageAlt: 'Tile installer preparing installation support for Kleihaus customers',
    category: 'Installation Support',
    relatedLinks: [
      { label: 'Installation best practices', href: '/installation-best-practices' },
      { label: 'Adhesives and grout', href: '/adhesives-grout' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Installation support Nairobi', href: '/installation-support-nairobi' },
      { label: 'Trade and project support', href: '/trade-projects' },
    ],
  },
  {
    path: '/guides',
    title: 'Kleihaus Guides | Buying, Planning & Installation Help',
    description:
      'Use Kleihaus guides for tile buying, bathroom renovation, paint selection, adhesive and grout planning, installation practices and cost estimation.',
    image: '/images/tiles-floor.jpg',
    imageAlt: 'Kleihaus Ceramics buying and planning guides',
    category: 'Guides',
    schemaType: 'CollectionPage',
    changefreq: 'monthly',
    priority: '0.76',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Guides', href: '/guides' },
    ],
    relatedLinks: [
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Bathroom renovation guide', href: '/bathroom-renovation-guide' },
      { label: 'Paint selection guide', href: '/paint-selection-guide' },
      { label: 'Adhesive and grout guide', href: '/adhesive-grout-guide' },
      { label: 'Installation best practices', href: '/installation-best-practices' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
    ],
  },
  {
    path: '/locations',
    title: 'Kleihaus Locations | Nairobi, Machakos & Makueni Support',
    description:
      'Find Kleihaus location hubs for Nairobi, Machakos and Makueni, with links to relevant product-location pages and quotation support.',
    image: defaultImage,
    imageAlt: 'Kleihaus Ceramics local finishing material support',
    category: 'Locations',
    schemaType: 'CollectionPage',
    changefreq: 'monthly',
    priority: '0.76',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
    ],
    relatedLinks: [
      { label: 'Nairobi', href: '/locations/nairobi' },
      { label: 'Machakos', href: '/locations/machakos' },
      { label: 'Makueni', href: '/locations/makueni' },
      { label: 'Tiles Kenya', href: '/tiles-kenya' },
      { label: 'Sanitaryware Kenya', href: '/sanitaryware-kenya' },
      { label: 'Paints Kenya', href: '/paints-kenya' },
    ],
  },
  {
    path: '/projects',
    title: 'Kleihaus Projects | Kitchen Finishing Gallery',
    description:
      'Explore selected kitchen finishing project images featuring tiles, sinks, countertops and finishing solutions supplied or supported by Kleihaus.',
    image: '/images/projects/project-kitchen-sink-window-01.jpg',
    imageAlt: 'Kitchen sink and countertop beside a wide window',
    category: 'Projects',
    changefreq: 'monthly',
    priority: '0.75',
    relatedLinks: [
      { label: 'Sanitaryware', href: '/sanitaryware' },
      { label: 'Wall tiles', href: '/wall-tiles' },
      { label: 'Tile buying guide', href: '/tile-buying-guide' },
      { label: 'Trade and project support', href: '/trade-projects' },
      { label: 'Products', href: '/products' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
    ],
  },
  {
    path: '/trade-projects',
    title: 'Trade & Project Supply Kenya | Kleihaus Ceramics',
    description:
      'Trade and project quote support for homeowners, home builders, contractors, property developers, design professionals, dealers and institutional buyers in Kenya.',
    image: '/images/projects/project-kitchen-overview-01.jpg',
    imageAlt: 'Kitchen finishing project image for trade and project quote support',
    category: 'Trade & Projects',
    schemaType: 'WebPage',
    changefreq: 'monthly',
    priority: '0.78',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Solutions', href: '/trade-projects' },
    ],
    relatedLinks: [
      { label: 'Products', href: '/products' },
      { label: 'Projects', href: '/projects' },
      { label: 'Installation support', href: '/installation-support' },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
      { label: 'Tiles Kenya', href: '/tiles-kenya' },
      { label: 'Sanitaryware Kenya', href: '/sanitaryware-kenya' },
    ],
  },
]

const guideRoutes = [
  ['/tile-buying-guide', 'Tile Buying Guide Kenya | Kleihaus Ceramics', 'A practical tile buying guide for Kenya covering room use, tile finishes, quantities, adhesives, grout, delivery and installation support.', '/images/tiles-floor.jpg', 'Tile Buying Guide'],
  ['/bathroom-renovation-guide', 'Bathroom Renovation Guide Kenya | Kleihaus Ceramics', 'Plan bathroom tiles, sanitaryware, taps, showers, accessories, delivery and installation support with Kleihaus Ceramics.', '/images/bathroom-blue-1.jpg', 'Bathroom Renovation Guide'],
  ['/paint-selection-guide', 'Paint Selection Guide Kenya | Interior, Exterior & Roof Paints', 'Choose interior, exterior, roof and floor paints with practical Kleihaus guidance on surface condition, finish, quantity and delivery.', '/images/paint-interior.jpg', 'Paint Selection Guide'],
  ['/adhesive-grout-guide', 'Tile Adhesive & Grout Guide Kenya | Kleihaus Ceramics', 'Understand tile adhesive, grout, trims, spacers and installation essentials before requesting a Kleihaus project quote.', '/images/adhesive.jpg', 'Adhesive & Grout Guide'],
  ['/installation-best-practices', 'Tile Installation Best Practices Kenya | Kleihaus Support', 'Practical installation guidance for preparation, cutting, drilling, fixing, grouting, cleaning, handover and tailored training support.', '/images/tiler-service.jpg', 'Installation Best Practices'],
  ['/cost-estimation-guide', 'Tile, Paint & Sanitaryware Cost Estimation Guide Kenya | Kleihaus', 'Plan quote requests with general cost factors for tiles, sanitaryware, paints, delivery and installation support without unsupported price claims.', defaultImage, 'Cost Estimation Guide'],
].map(([path, title, description, image, category]) => ({
  path,
  title,
  description,
  image,
  imageAlt: `${category} page image for Kleihaus Ceramics`,
  category,
  schemaType: 'WebPage',
  changefreq: 'monthly',
  priority: '0.7',
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
    { name: category, href: path },
  ],
}))

const locations = [
  {
    slug: 'nairobi',
    label: 'Nairobi',
    phrase: 'homes, apartments, retail spaces and project sites in Nairobi',
    logistics: 'delivery timing depends on traffic, site access, order size and supplier availability',
  },
  {
    slug: 'machakos',
    label: 'Machakos',
    phrase: 'homes, rentals, commercial spaces and construction projects in Machakos',
    logistics: 'delivery support is planned around order quantity, product availability and site requirements',
  },
  {
    slug: 'makueni',
    label: 'Makueni',
    phrase: 'home builds, renovations and project sites in Makueni',
    logistics: 'delivery coordination is reviewed case by case based on order details and route planning',
  },
  {
    slug: 'kenya',
    label: 'Kenya',
    phrase: 'retail customers, contractors, fundis, developers and project teams across Kenya',
    logistics: 'wider Kenya logistics support is reviewed case by case based on product mix, quantity and destination',
  },
]

const services = [
  ['tiles', 'Tiles', '/tiles', '/tile-buying-guide', '/images/tiles-floor.jpg', 'floor, wall, bathroom and outdoor tiles'],
  ['sanitaryware', 'Sanitaryware', '/sanitaryware', '/bathroom-renovation-guide', '/images/sanitaryware/sanitaryware-shower-display-02.jpg', 'basins, toilets, taps, mixers and showers'],
  ['paints', 'Paints', '/paints', '/paint-selection-guide', '/images/paint-interior.jpg', 'interior, exterior, roof and floor paints for planned finishes'],
  ['installation-support', 'Installation Support', '/installation-support', '/installation-best-practices', '/images/tiler-service.jpg', 'measurement, matching, fixing and handover guidance'],
]

const locationHubRoutes = locations
  .filter((location) => location.slug !== 'kenya')
  .map((location) => ({
    path: `/locations/${location.slug}`,
    title: `Kleihaus ${location.label} | Tiles, Sanitaryware & Paints`,
    description: `Kleihaus ${location.label} support for tiles, sanitaryware, paints, delivery coordination and installation guidance.`,
    image: defaultImage,
    imageAlt: `Kleihaus Ceramics support for ${location.label} projects`,
    category: location.label,
    schemaType: 'WebPage',
    changefreq: 'monthly',
    priority: '0.75',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
      { name: location.label, href: `/locations/${location.slug}` },
    ],
  }))

const serviceLocationRoutes = services.flatMap(([slug, label, basePath, guidePath, image, focus]) =>
  locations.map((location) => ({
    path: `/${slug}-${location.slug}`,
    title: `${label} ${location.label} | Kleihaus Ceramics Kenya`,
    description: `${label} ${location.label}: ${focus}. Request quantity, availability, delivery and installation support.`,
    image,
    imageAlt: `${label} planning and quote support for ${location.label} by Kleihaus Ceramics`,
    category: `${label} ${location.label}`,
    schemaType: 'CollectionPage',
    serviceType: label,
    areaServed: location.label,
    focus,
    logistics: location.logistics,
    changefreq: 'monthly',
    priority: '0.7',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: label, href: basePath },
      { name: location.label, href: location.slug === 'kenya' ? '/#contact' : `/locations/${location.slug}` },
      { name: `${label} ${location.label}`, href: `/${slug}-${location.slug}` },
    ],
    faqs: [
      {
        question: `Can Kleihaus help with ${label.toLowerCase()} planning in ${location.label}?`,
        answer: `Yes. Kleihaus can help ${location.phrase} compare ${focus}, then prepare a clearer quote request around quantity, availability and installation needs.`,
      },
      {
        question: `How does delivery support work for ${label.toLowerCase()} in ${location.label}?`,
        answer: `${location.logistics}. Share the product mix, quantity, site access and preferred timing so the team can advise practical next steps.`,
      },
      {
        question: `What should I share before requesting a ${label.toLowerCase()} quote?`,
        answer: `Share measurements, photos where useful, preferred finishes, quantity, budget range and location. This helps Kleihaus respond with more relevant guidance instead of generic options.`,
      },
    ],
    relatedLinks: [
      { label, href: basePath },
      { label: `${label} guide`, href: guidePath },
      { label: 'Cost estimation guide', href: '/cost-estimation-guide' },
    ],
  })),
)

export const seoRoutes = [
  ...coreRoutes.map((route) => ({
    schemaType: 'CollectionPage',
    changefreq: 'weekly',
    priority: '0.8',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: route.category || 'Home', href: route.path },
    ],
    ...route,
  })),
  ...locationHubRoutes,
  ...serviceLocationRoutes,
  ...guideRoutes,
]

export const normalizePathname = (pathname = '/') => {
  const cleaned = pathname.split('?')[0].split('#')[0] || '/'
  if (cleaned === '/') return '/'
  return cleaned.replace(/\/+$/, '')
}

export const seoRoutesByPath = Object.fromEntries(seoRoutes.map((route) => [route.path, route]))

export const getSeoRouteByPath = (pathname) => seoRoutesByPath[normalizePathname(pathname)] || null

export const toAbsoluteUrl = (value = '/') => {
  if (/^https?:\/\//i.test(value)) return value
  return `${SITE_ORIGIN}${value.startsWith('/') ? value : `/${value}`}`
}

export const buildBreadcrumbSchema = (route) => ({
  '@type': 'BreadcrumbList',
  '@id': `${toAbsoluteUrl(route.path)}#breadcrumb`,
  itemListElement: (route.breadcrumbs || [{ name: 'Home', href: '/' }, { name: route.category, href: route.path }]).map(
    (item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.href || route.path),
    }),
  ),
})

export const buildRouteJsonLd = (route) => {
  if (!route) return null

  const pageUrl = toAbsoluteUrl(route.path)
  const graph = [
    {
      '@type': route.schemaType || 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: route.title,
      description: route.description,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(route.image || defaultImage),
        caption: route.imageAlt || route.title,
      },
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: 'Kleihaus Ceramics',
        url: `${SITE_ORIGIN}/`,
      },
    },
    buildBreadcrumbSchema(route),
  ]

  if (route.serviceType) {
    graph.push({
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: `${route.serviceType} support in ${route.areaServed || 'Kenya'}`,
      serviceType: route.serviceType,
      provider: {
        '@type': 'LocalBusiness',
        '@id': `${SITE_ORIGIN}/#store`,
        name: 'Kleihaus Ceramics',
      },
      areaServed: {
        '@type': route.areaServed === 'Kenya' ? 'Country' : 'AdministrativeArea',
        name: route.areaServed || 'Kenya',
      },
      description: route.description,
    })
  }

  if (route.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: route.faqs.map((item) => ({
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

const deriveKeywords = (route) => {
  const values = [
    route.category,
    route.serviceType,
    route.areaServed,
    ...(route.relatedLinks || []).map((link) => link.label),
    ...(route.breadcrumbs || []).map((item) => item.name),
  ]

  return [...new Set(values.filter(Boolean).map((value) => String(value).trim()).filter(Boolean))]
}

export const normalizeSeoRoute = (route) => {
  const breadcrumbs = route.breadcrumbs || [
    { name: 'Home', href: '/' },
    { name: route.category || 'Page', href: route.path },
  ]
  const lastModified = route.lastModified || route.lastmod || SEO_LASTMOD

  return {
    slug: route.path,
    path: route.path,
    title: route.title,
    description: route.description,
    keywords: route.keywords || deriveKeywords(route),
    image: route.image || defaultImage,
    imageAlt: route.imageAlt || route.title,
    schemaType: route.schemaType || 'WebPage',
    schema: buildRouteJsonLd(route),
    breadcrumb: breadcrumbs,
    breadcrumbs,
    canonical: toAbsoluteUrl(route.path),
    lastModified,
    lastmod: lastModified,
    changefreq: route.changefreq || 'monthly',
    priority: route.priority || '0.7',
    category: route.category || '',
    serviceType: route.serviceType || '',
    areaServed: route.areaServed || '',
    relatedLinks: route.relatedLinks || [],
    faqs: route.faqs || [],
  }
}

export const seoConfig = seoRoutes.map(normalizeSeoRoute)

export const seoConfigBySlug = Object.fromEntries(seoConfig.map((route) => [route.slug, route]))

export const primaryNavigation = [
  { label: 'About', section: 'about', href: '/#about', type: 'section' },
  { label: 'Products', href: '/products', type: 'route' },
  { label: 'Solutions', href: '/trade-projects', type: 'route' },
  { label: 'Projects', href: '/projects', type: 'route' },
  { label: 'Guides', href: '/guides', type: 'route' },
  { label: 'Locations', href: '/locations', type: 'route' },
  { label: 'Contact', section: 'contact', href: '/#contact', type: 'section' },
]

export const buildRobotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`

export const buildNavigationManifest = () => ({
  primary: primaryNavigation,
  generatedAt: SEO_LASTMOD,
  routeCount: seoRoutes.length,
})

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export const buildSitemapXml = (routes = seoRoutes) => {
  const urls = routes
    .map(normalizeSeoRoute)
    .map(
      (route) => `  <url>
    <loc>${escapeXml(toAbsoluteUrl(route.path))}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || '0.7'}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}
