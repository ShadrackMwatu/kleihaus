import React, { useState } from 'react'
import {
  ArrowRight,
  Brush,
  Calculator,
  ClipboardList,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
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
  inspirationSpaces,
  suggestedSearches,
} from './data/intelligenceData'
import { contentTopics } from './data/contentTopics'
import { analyticsService } from './services/analyticsService'
import { recommendationService } from './services/recommendationService'
import { quoteRequestService } from './services/quoteRequestService'

const whatsappUrl =
  'https://wa.me/254748827166?text=Hello%20Kleihaus%2C%20I%27d%20like%20to%20share%20my%20room%20size%2C%20tile%20type%2C%20location%20and%20budget%20for%20a%20quote.'

const whatsappInquiryUrl = (subject) =>
  `https://wa.me/254748827166?text=${encodeURIComponent(`Hello Kleihaus, I would like a quote for ${subject}. Please share availability, price guidance and delivery options.`)}`

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Product Catalogue', href: '#catalogue' },
  { label: 'Contact', href: '#contact' },
]

const categoryNav = ['Floor Tiles', 'Wall Tiles', 'Bathroom Tiles', 'Sanitaryware', 'Paints', 'Adhesives & Grout', 'Installation']

const categories = [
  {
    name: 'Floor Tiles',
    blurb: 'Hard-wearing finishes for living rooms, kitchens, shops and project floors.',
    use: 'Homes, shops, offices and rental units',
    img: '/images/tiles-floor.jpg',
    icon: Store,
  },
  {
    name: 'Wall Tiles',
    blurb: 'Clean ceramic, decor and feature wall surfaces for kitchens and interiors.',
    use: 'Kitchens, bathrooms and feature walls',
    img: '/images/tiles-wall.jpg',
    icon: ClipboardList,
  },
  {
    name: 'Outdoor Tiles',
    blurb: 'Textured tile options for balconies, patios, walkways and wet areas.',
    use: 'Balconies, patios, entries and wet zones',
    img: '/images/tiles-floor-2.jpg',
    icon: Sparkles,
  },
  {
    name: 'Bathroom Tiles',
    blurb: 'Coordinated wall and floor finishes for calm, modern bathrooms.',
    use: 'Bathrooms, showers and cloakrooms',
    img: '/images/bathroom-blue-1.jpg',
    icon: ShowerHead,
  },
  {
    name: 'Sanitaryware',
    blurb: 'Basins, toilets, baths, showers, taps and bathroom accessories.',
    use: 'Complete bathroom fittings and upgrades',
    img: '/images/sanitary-set-1.jpg',
    icon: ShowerHead,
  },
  {
    name: 'Paints',
    blurb: 'Interior, exterior, roof and floor paints for complete finishing.',
    use: 'Interior walls, exterior walls, floors and roofs',
    img: '/images/paint-interior.jpg',
    icon: PaintBucket,
  },
  {
    name: 'Adhesives & Grout',
    blurb: 'Tile adhesives, grout, trims, spacers and finishing essentials.',
    use: 'Tile fixing, joints and installation finishes',
    img: '/images/adhesive.jpg',
    icon: Brush,
  },
  {
    name: 'Installation Support',
    blurb: 'Product guidance, site advice and practical tile laying support.',
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
      { name: 'Basins', detail: 'Countertop and wall options', img: '/images/sanitary-basins.jpg' },
      { name: 'Toilets', detail: 'Modern bathroom suites', img: '/images/sanitary-toilets.jpg' },
      { name: 'Taps & mixers', detail: 'Coordinated metal finishes', img: '/images/taps-display-1.jpg' },
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

const serviceBadges = [
  { title: 'Quality products', text: 'Curated finishes selected for practical Kenyan projects.', icon: ShieldCheck },
  { title: 'Site delivery available', text: 'Support for deliveries to homes, sites and developments.', icon: Truck },
  { title: 'Installation support', text: 'Guidance on adhesives, grout, tile laying and finishing.', icon: Wrench },
  { title: 'Project quotations', text: 'Helpful estimates for room, home and bulk project needs.', icon: ClipboardList },
]

const Button = ({ className = '', children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md border border-neutral-950 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const ButtonSecondary = ({ className = '', children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-neutral-600 ${className}`}
    {...props}
  >
    {children}
  </button>
)

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

function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/images/kleihaus-logo.jpg"
        alt="Kleihaus Ceramics"
        className={`${compact ? 'h-9 w-9' : 'h-11 w-11'} rounded-md border border-neutral-200 object-contain`}
      />
      <div className={compact ? 'leading-tight' : ''}>
        <div className="text-sm font-semibold text-neutral-950 sm:text-base">Kleihaus Ceramics</div>
        <div className="text-xs text-neutral-500">Inspiring living</div>
      </div>
    </div>
  )
}

function TopStrip() {
  return (
    <div className="hidden bg-[#A65F1E] text-white sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
        <div className="flex items-center gap-5">
          <a href="tel:+254748827166" className="inline-flex items-center gap-1.5 hover:text-emerald-200">
            <Phone className="h-3.5 w-3.5" />
            +254 748 827 166
          </a>
          <a href="mailto:sales@kleihaus.com" className="inline-flex items-center gap-1.5 hover:text-emerald-200">
            <Mail className="h-3.5 w-3.5" />
            sales@kleihaus.com
          </a>
        </div>
        <div className="inline-flex items-center gap-1.5 text-neutral-200">
          <MapPin className="h-3.5 w-3.5" />
          Nairobi | Machakos | Makueni
        </div>
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
      <label className="flex min-w-0 items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2.5">
        <Search className="h-4 w-4 text-neutral-500" />
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
          placeholder="Search tiles, sanitaryware, paints, adhesives..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
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

function Header({ projectType, searchQuery, setSearchQuery, onSearch, onCategoryClick, onWhatsAppClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <TopStrip />
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3 lg:grid-cols-[auto_minmax(220px,1fr)_auto_auto] lg:gap-5">
        <a href="#top" aria-label="Kleihaus Ceramics home" className="min-w-0" onClick={() => setMenuOpen(false)}>
          <Logo compact />
        </a>

        <div className="hidden lg:block">
          <SearchAutocomplete value={searchQuery} onChange={setSearchQuery} projectType={projectType} onSearch={onSearch} />
        </div>

        <nav className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-neutral-700 hover:text-neutral-950">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+254748827166" className="whitespace-nowrap text-sm font-semibold text-neutral-800 hover:text-emerald-800">
            +254 748 827 166
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => onWhatsAppClick('header')}>
            <Button className="gap-2 bg-emerald-700 px-3.5 hover:bg-emerald-800">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
        </div>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="lg:hidden" onClick={() => onWhatsAppClick('mobile_header')}>
          <Button className="gap-1.5 bg-emerald-700 px-3 py-2 text-xs hover:bg-emerald-800">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </a>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5">
          {categoryNav.map((item) => (
            <a
              key={item}
              href="#catalogue"
              onClick={() => onCategoryClick(item)}
              className="shrink-0 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700 hover:border-emerald-700 hover:text-emerald-800"
            >
              {item}
            </a>
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
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="tel:+254748827166" className="mt-4 flex items-center gap-2 text-sm font-semibold text-neutral-800">
            <Phone className="h-4 w-4 text-emerald-700" />
            +254 748 827 166
          </a>
        </div>
      )}
    </header>
  )
}

function Hero({ onWhatsAppClick }) {
  return (
    <section id="top" className="bg-stone-100">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
        <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-neutral-950 text-white shadow-xl">
          <img src="/images/kleihaus-structure.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-neutral-900/10" />
          <div className="relative flex min-h-[520px] max-w-3xl flex-col justify-center px-5 py-12 sm:px-10 lg:px-12">
            <p className="text-xs font-semibold uppercase text-emerald-200">Kleihaus Ceramics</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Premium tiles and finishing materials for Kenyan homes and projects.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-100 sm:text-lg">
              Browse tiles, sanitaryware, paints, adhesives and grout, then request a clear quote from the Kleihaus team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalogue">
                <Button className="gap-2 bg-white text-neutral-950 hover:bg-neutral-100">
                  Browse catalogue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#contact" onClick={() => onWhatsAppClick('hero_quote_intent')}>
                <ButtonSecondary className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20">
                  Request quote
                </ButtonSecondary>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShopByCategory({ selectedCategory, onCategoryClick, onWhatsAppClick }) {
  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 max-w-3xl">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">Product catalogue</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Shop by category</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Choose the finish you need and send a quick WhatsApp inquiry for availability and quotation.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <article
              key={category.name}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-700 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => onCategoryClick(category.name)}
                className="block w-full text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = '/images/placeholder.jpg'
                    }}
                  />
                  <div className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/95 text-emerald-800 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </button>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-neutral-950">{category.name}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:text-emerald-700" />
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{category.blurb}</p>
                {selectedCategory === category.name && (
                  <span className="mt-3 inline-flex rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">
                    Recommended for you
                  </span>
                )}
                <a
                  href={whatsappInquiryUrl(category.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    onCategoryClick(category.name)
                    onWhatsAppClick(`category_card_${category.name}`)
                  }}
                  className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  Request quote
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ProductCatalogue({ onProductInterest, onWhatsAppClick }) {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">Featured highlights</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Popular finishes to quote</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            A concise look at tile, sanitaryware, paint and installation essentials Kleihaus can help source for retail or project needs.
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
                    <img src={item.img} alt={item.name} className="aspect-[5/4] w-full object-cover transition duration-300 group-hover:scale-105" />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-neutral-950">{item.name}</h4>
                        <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-700" />
                      </div>
                      <p className="mt-1 text-sm text-neutral-600">{item.detail}</p>
                      <a
                        href={whatsappInquiryUrl(item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          onProductInterest(item.name, group.title)
                          onWhatsAppClick(`product_card_${item.name}`)
                        }}
                        className="mt-auto inline-flex items-center justify-center rounded-md border border-neutral-300 px-3 py-2.5 text-sm font-semibold text-neutral-900 hover:border-emerald-700 hover:text-emerald-800"
                      >
                        Request quote
                      </a>
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
            Enter your area and tile size for a quick planning estimate. Final quantities can be confirmed when you share your project details.
          </p>
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

function InspirationGallery({ onCategoryClick }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-emerald-700">Inspiration gallery</p>
        <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Explore spaces before you request a quote</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {inspirationSpaces.map((space) => {
          const Icon = space.icon
          return (
            <button
              key={space.name}
              type="button"
              onClick={() => onCategoryClick(space.name)}
              className="group overflow-hidden rounded-md border border-neutral-200 bg-white text-left shadow-sm hover:border-emerald-700"
            >
              <div className="relative">
                <img src={space.img} alt={space.name} className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" />
                <span className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/95 text-emerald-800">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-950">{space.name}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{space.text}</p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-7 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">Why choose Kleihaus?</p>
        <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Support for better finishing decisions</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Kleihaus focuses on curated finishing materials, project quotation support, delivery coordination and installation guidance across Nairobi, Machakos and Makueni.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {serviceBadges.map((service) => {
          const Icon = service.icon
          return (
            <div key={service.title} className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-800">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-neutral-950">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{service.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function HelpfulGuides({ onGuideClick }) {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-7 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-emerald-700">Helpful guides</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Coming-soon buying guides</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Educational topics being prepared to help customers plan quantities, finishes and product combinations before requesting a quote.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contentTopics.map((topic) => (
            <a
              key={topic.title}
              href="#contact"
              onClick={() => onGuideClick(topic.title)}
              className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-emerald-700"
            >
              <p className="text-xs font-semibold uppercase text-neutral-500">Coming soon</p>
              <h3 className="mt-2 text-base font-semibold text-neutral-950">{topic.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{topic.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ onWhatsAppClick }) {
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  })
  const [quoteErrors, setQuoteErrors] = useState([])
  const [quoteStatus, setQuoteStatus] = useState('')

  const updateQuoteField = (field) => (event) => {
    setQuoteForm((current) => ({ ...current, [field]: event.target.value }))
    if (quoteErrors.length > 0) setQuoteErrors([])
    if (quoteStatus) setQuoteStatus('')
  }

  const submitQuoteRequest = async (event) => {
    event.preventDefault()

    const preparedRequest = quoteRequestService.prepare(quoteForm)
    if (!preparedRequest.ok) {
      setQuoteErrors(preparedRequest.errors)
      setQuoteStatus('')
      return
    }

    analyticsService.track('quote_form_submitted', {
      source: 'contact_form',
      location: preparedRequest.payload.location || 'not_provided',
      hasEmail: Boolean(preparedRequest.payload.email),
      hasPhone: Boolean(preparedRequest.payload.phone),
    })
    analyticsService.track('product_interest', { product: 'contact_form_quote_request', category: 'Project quotation' })
    analyticsService.track('contact_form_submit', { source: 'contact_form', category: 'Project quotation' })

    window.open(preparedRequest.whatsappUrl, '_blank', 'noopener,noreferrer')

    const backendResult = await quoteRequestService.submitBackend(preparedRequest.payload)
    setQuoteStatus(backendResult.message)
    setQuoteErrors([])
  }

  return (
    <section id="contact" className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">Contact Kleihaus</p>
          <h2 className="mt-2 text-3xl font-semibold">Request a product or project quote.</h2>
          <p className="mt-4 leading-7 text-neutral-300">
            Share your room size, preferred finish, delivery location and budget. Kleihaus will respond with product guidance and quote support.
          </p>

          <div className="mt-7 space-y-3 text-sm text-neutral-200">
            <a href="tel:+254748827166" className="flex items-center gap-3 hover:text-white">
              <Phone className="h-4 w-4 text-emerald-300" />
              +254 748 827 166
            </a>
            <a href="mailto:sales@kleihaus.com" className="flex items-center gap-3 hover:text-white">
              <Mail className="h-4 w-4 text-emerald-300" />
              sales@kleihaus.com
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-emerald-300" />
              Nairobi | Machakos | Makueni
            </div>
          </div>
        </div>

        <form
          onSubmit={submitQuoteRequest}
          className="rounded-lg bg-white p-5 text-neutral-950 shadow-xl sm:p-6"
        >
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Tell us what you need</h3>
            <p className="mt-1 text-sm leading-6 text-neutral-600">Include room size, tile type, location and budget so the quote can be more useful.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Name
              <Input name="name" placeholder="Your name" value={quoteForm.name} onChange={updateQuoteField('name')} required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Email
              <Input name="email" type="email" placeholder="Email address" value={quoteForm.email} onChange={updateQuoteField('email')} />
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Phone
              <Input name="phone" placeholder="Phone number" value={quoteForm.phone} onChange={updateQuoteField('phone')} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Location
              <Input name="location" placeholder="Project location" value={quoteForm.location} onChange={updateQuoteField('location')} />
            </label>
          </div>
          <label className="mt-4 grid gap-2 text-sm font-medium text-neutral-700">
            Request details
            <Textarea
              name="message"
              placeholder="Example: 32m² floor tiles, matte finish, delivery to Machakos, budget range..."
              rows={5}
              value={quoteForm.message}
              onChange={updateQuoteField('message')}
            />
          </label>
          {quoteErrors.length > 0 && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {quoteErrors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          {quoteStatus && <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{quoteStatus}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>Send request</Button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => onWhatsAppClick('contact_form')}>
              <ButtonSecondary className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </ButtonSecondary>
            </a>
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-8 text-center">
        <p className="text-xs text-neutral-500">© {new Date().getFullYear()} Kleihaus Ceramics. All Rights Reserved</p>
        <p className="text-xs font-medium text-neutral-400">Inspiring living</p>
      </div>
    </footer>
  )
}

function MobileStickyWhatsApp({ onWhatsAppClick }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onWhatsAppClick('mobile_sticky')}
      className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 md:hidden"
    >
      <MessageCircle className="h-4 w-4" />
      Request quote on WhatsApp
    </a>
  )
}

export default function App() {
  const [projectType] = useState('Homeowner')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Floor Tiles')
  const [eventRevision, setEventRevision] = useState(0)

  const refreshSignals = () => setEventRevision((revision) => revision + 1)

  const handleSearch = (query) => {
    analyticsService.track('search_submitted', { query: query.toLowerCase(), projectType })
    analyticsService.track('search', { query: query.toLowerCase(), projectType })
    setSearchQuery(query)
    refreshSignals()
  }

  const handleCategoryClick = (category) => {
    analyticsService.track('category_clicked', { category, projectType })
    analyticsService.track('category_click', { category, projectType })
    setSelectedCategory(category)
    refreshSignals()
  }

  const handleProductInterest = (product, category) => {
    analyticsService.track('product_interest_clicked', { product, category, projectType })
    analyticsService.track('product_interest', { product, category, projectType })
    setSelectedCategory(category)
    refreshSignals()
  }

  const handleWhatsAppClick = (source) => {
    analyticsService.track('whatsapp_cta_clicked', { source, projectType, selectedCategory })
    analyticsService.track('whatsapp_click', { source, projectType, selectedCategory })
    refreshSignals()
  }

  const handleGuideClick = (topic) => {
    analyticsService.track('guide_topic_clicked', { topic, projectType })
    refreshSignals()
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-900">
      <Header
        projectType={projectType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onCategoryClick={handleCategoryClick}
        onWhatsAppClick={handleWhatsAppClick}
      />
      <Hero onWhatsAppClick={handleWhatsAppClick} />
      <ShopByCategory selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} onWhatsAppClick={handleWhatsAppClick} />
      <ProductCatalogue onProductInterest={handleProductInterest} onWhatsAppClick={handleWhatsAppClick} />
      <Services />
      <QuantityEstimator />
      <InspirationGallery onCategoryClick={handleCategoryClick} />
      <HelpfulGuides onGuideClick={handleGuideClick} />
      <Contact onWhatsAppClick={handleWhatsAppClick} />
      <MobileStickyWhatsApp onWhatsAppClick={handleWhatsAppClick} />
      <Footer />
    </div>
  )
}
