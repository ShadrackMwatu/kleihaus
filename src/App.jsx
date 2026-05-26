import React, { useState } from 'react'
import {
  ArrowRight,
  Brush,
  Calculator,
  CheckCircle2,
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
  Users,
  Wrench,
  X,
} from 'lucide-react'
import {
  inspirationSpaces,
  popularCategories,
  suggestedSearches,
  trendingSearches,
} from './data/intelligenceData'
import { analyticsService } from './services/analyticsService'
import { recommendationService } from './services/recommendationService'

const whatsappUrl =
  'https://wa.me/254748827166?text=Hello%20Kleihaus%2C%20I%27d%20like%20to%20share%20my%20room%20size%2C%20tile%20type%2C%20location%20and%20budget%20for%20a%20quote.'

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
    img: '/images/tiles-floor.jpg',
    icon: Store,
  },
  {
    name: 'Wall Tiles',
    blurb: 'Clean ceramic, decor and feature wall surfaces for kitchens and interiors.',
    img: '/images/tiles-wall.jpg',
    icon: ClipboardList,
  },
  {
    name: 'Outdoor Tiles',
    blurb: 'Textured tile options for balconies, patios, walkways and wet areas.',
    img: '/images/tiles-floor-2.jpg',
    icon: Sparkles,
  },
  {
    name: 'Bathroom Tiles',
    blurb: 'Coordinated wall and floor finishes for calm, modern bathrooms.',
    img: '/images/bathroom-blue-1.jpg',
    icon: ShowerHead,
  },
  {
    name: 'Sanitaryware',
    blurb: 'Basins, toilets, baths, showers, taps and bathroom accessories.',
    img: '/images/sanitary-set-1.jpg',
    icon: ShowerHead,
  },
  {
    name: 'Paints',
    blurb: 'Interior, exterior, roof and floor paints for complete finishing.',
    img: '/images/paint-interior.jpg',
    icon: PaintBucket,
  },
  {
    name: 'Adhesives & Grout',
    blurb: 'Tile adhesives, grout, trims, spacers and finishing essentials.',
    img: '/images/adhesive.jpg',
    icon: Brush,
  },
  {
    name: 'Installation Support',
    blurb: 'Product guidance, site advice and practical tile laying support.',
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

const customerTypes = ['Homeowners', 'Contractors', 'Developers', 'Fundis / installers', 'Institutions']

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
            {[...(value ? suggestions : suggestedSearches), ...trendingSearches, ...popularCategories]
              .filter((item, index, list) => list.indexOf(item) === index)
              .slice(0, 8)
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
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-10">
        <div className="relative min-h-[460px] overflow-hidden rounded-md bg-neutral-950 text-white">
          <img src="/images/kleihaus-structure.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-900/20" />
          <div className="relative flex min-h-[460px] max-w-3xl flex-col justify-center px-5 py-10 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">Retail and project supply</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Tiles, sanitaryware, paints and finishing materials for homes and projects.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-100 sm:text-lg">
              A premium Kleihaus catalogue for Kenyan homeowners, contractors and developers looking for reliable product guidance, practical finishing materials and clear quotations.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#catalogue">
                <Button className="gap-2 bg-white text-neutral-950 hover:bg-neutral-100">
                  Browse catalogue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => onWhatsAppClick('hero')}>
                <ButtonSecondary className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                  Request quote on WhatsApp
                </ButtonSecondary>
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <FeatureTile image="/images/tiles-gallery-1.jpg" title="Catalogue-ready tile looks" text="Browse floor, wall, bathroom and outdoor tile directions for complete rooms." />
          <FeatureTile image="/images/sanitary-set-1.jpg" title="Project finishing support" text="Combine sanitaryware, paints, adhesives and grout into one practical quote." />
        </div>
      </div>
    </section>
  )
}

function FeatureTile({ image, title, text }) {
  return (
    <div className="grid overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[0.95fr_1.05fr]">
      <img src={image} alt="" className="h-44 w-full object-cover sm:h-full" />
      <div className="flex flex-col justify-center p-5">
        <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
      </div>
    </div>
  )
}

function ShopByCategory({ selectedCategory, onCategoryClick }) {
  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">Product catalogue</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Shop by category</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Choose a category, then send measurements or project details for guidance and quotation.
          </p>
        </div>
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-emerald-800">
          Request a project quote
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <a
              key={category.name}
              href="#contact"
              onClick={() => onCategoryClick(category.name)}
              className="group overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-700 hover:shadow-md"
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
              <div className="p-4">
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
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

function ProductCatalogue({ onProductInterest }) {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">Product-style ranges</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Sample catalogue cards</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            These sample cards show the type of finishes Kleihaus can help source and quote for retail or bulk project needs.
          </p>
        </div>
        <div className="space-y-10">
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
                  <a
                    key={item.name}
                    href="#contact"
                    onClick={() => onProductInterest(item.name, group.title)}
                    className="group overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm transition hover:border-emerald-700"
                  >
                    <img src={item.img} alt={item.name} className="aspect-[5/4] w-full object-cover transition duration-300 group-hover:scale-105" />
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-neutral-950">{item.name}</h4>
                        <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-700" />
                      </div>
                      <p className="mt-1 text-sm text-neutral-600">{item.detail}</p>
                    </div>
                  </a>
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
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">Quantity estimator</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Estimate tiles before requesting a quote</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Use this quick guide to estimate tile quantities. Final quantities should be confirmed after room measurements, tile layout and site conditions are reviewed.
          </p>
        </div>

        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
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
    <section className="mx-auto max-w-7xl px-4 py-14">
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
    <section className="mx-auto max-w-7xl px-4 py-14">
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

function ProjectCustomers() {
  return (
    <section id="about" className="bg-stone-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">Retail and wholesale support</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">For single rooms, full homes and project-based orders.</h2>
          <p className="mt-4 leading-7 text-neutral-700">
            Kleihaus Ceramics supports homeowners buying for one room, contractors quoting several spaces, developers working across units, fundis choosing installation materials, and institutions planning durable finishes.
          </p>
          <p className="mt-3 leading-7 text-neutral-700">
            Share your quantities, location, finish preference and budget. The team can help align tiles, sanitaryware, paints, adhesives and grout into a practical retail or project quotation.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {customerTypes.map((type) => (
            <div key={type} className="flex items-center gap-3 rounded-md border border-neutral-200 bg-white p-4 shadow-sm">
              <Users className="h-5 w-5 text-emerald-700" />
              <span className="text-sm font-semibold text-neutral-900">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ onWhatsAppClick }) {
  return (
    <section id="contact" className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">Contact Kleihaus</p>
          <h2 className="mt-2 text-3xl font-semibold">Request product guidance or a project quote.</h2>
          <p className="mt-4 leading-7 text-neutral-300">
            For faster assistance, send your room size, tile type, delivery location and budget range. Kleihaus can help match the right tile, sanitaryware, paint, adhesive or grout to your project.
          </p>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex" onClick={() => onWhatsAppClick('contact_primary')}>
            <Button className="gap-2 bg-emerald-700 hover:bg-emerald-800">
              <MessageCircle className="h-4 w-4" />
              Request quote on WhatsApp
            </Button>
          </a>

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
          onSubmit={(event) => {
            event.preventDefault()
            analyticsService.track('product_interest', { product: 'contact_form_quote_request', category: 'Project quotation' })
            analyticsService.track('contact_form_submit', { source: 'contact_form', category: 'Project quotation' })
          }}
          className="rounded-md bg-white p-5 text-neutral-950 shadow-xl sm:p-6"
        >
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Tell us what you need</h3>
            <p className="mt-1 text-sm leading-6 text-neutral-600">Include room size, tile type, location and budget so the quote can be more useful.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Your name" required />
            <Input type="email" placeholder="Email address" required />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input placeholder="Phone number" />
            <Input placeholder="Project location" />
          </div>
          <div className="mt-4">
            <Textarea placeholder="Example: 32m² floor tiles, matte finish, delivery to Machakos, budget range..." rows={5} />
          </div>
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

export default function App() {
  const [projectType] = useState('Homeowner')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Floor Tiles')
  const [eventRevision, setEventRevision] = useState(0)

  const refreshSignals = () => setEventRevision((revision) => revision + 1)

  const handleSearch = (query) => {
    analyticsService.track('search', { query: query.toLowerCase(), projectType })
    setSearchQuery(query)
    refreshSignals()
  }

  const handleCategoryClick = (category) => {
    analyticsService.track('category_click', { category, projectType })
    setSelectedCategory(category)
    refreshSignals()
  }

  const handleProductInterest = (product, category) => {
    analyticsService.track('product_interest', { product, category, projectType })
    setSelectedCategory(category)
    refreshSignals()
  }

  const handleWhatsAppClick = (source) => {
    analyticsService.track('whatsapp_click', { source, projectType, selectedCategory })
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
      <ShopByCategory selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
      <ProductCatalogue onProductInterest={handleProductInterest} />
      <QuantityEstimator />
      <InspirationGallery onCategoryClick={handleCategoryClick} />
      <Services />
      <ProjectCustomers />
      <Contact onWhatsAppClick={handleWhatsAppClick} />
      <Footer />
    </div>
  )
}
