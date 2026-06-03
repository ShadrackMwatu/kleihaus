import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Brush,
  Calculator,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
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

const seoTitle = 'Kleihaus Ceramics | Tiles, Sanitaryware, Paints & Building Materials Kenya'
const seoDescription =
  'Kleihaus Ceramics supplies tiles, sanitaryware, paints, adhesives and finishing materials for homes, projects and developments across Kenya.'
const canonicalUrl = 'https://www.kleihaus.com/'

const navItems = [
  { label: 'Home', section: 'home' },
  { label: 'About', section: 'about' },
  { label: 'Catalogue', section: 'catalogue' },
  { label: 'Contact', section: 'contact' },
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
  { title: 'Reliable supply support', text: 'Curated finishing materials from tile, sanitaryware, paint and installation categories.', icon: ShieldCheck },
  { title: 'Delivery coordination', text: 'Support for deliveries to homes, sites and developments across key Kenyan service areas.', icon: Truck },
  { title: 'Installation guidance', text: 'Practical help with adhesives, grout, tile laying choices and finishing details.', icon: Wrench },
  { title: 'WhatsApp quote support', text: 'Fast response support for retail requests, project quotations and material matching.', icon: ClipboardList },
]

const heroTrustBadges = [
  { label: 'Retail & Project Quotes', icon: ClipboardList },
  { label: 'Delivery Coordination', icon: Truck },
  { label: 'Installation Guidance', icon: Wrench },
  { label: 'Nairobi | Machakos | Makueni', icon: MapPin },
]

const aboutSupportPoints = [
  {
    title: 'Retail and project quotations',
    text: 'Quote support for homeowners, contractors, shops and project teams planning material orders.',
    icon: ClipboardList,
  },
  {
    title: 'Delivery coordination',
    text: 'Practical delivery guidance for Nairobi, Machakos, Makueni and wider Kenya where practical.',
    icon: Truck,
  },
  {
    title: 'Installation guidance',
    text: 'Help matching tiles with adhesives, grout, trims and site-ready installation essentials.',
    icon: Wrench,
  },
  {
    title: 'Product matching support',
    text: 'Guidance across tiles, sanitaryware, paints and finishing materials so rooms feel coordinated.',
    icon: ShieldCheck,
  },
]

const faqItems = [
  {
    question: 'How do I choose the right tiles for my project?',
    answer:
      'Consider the room, surface finish, slip resistance, cleaning needs and budget. Kleihaus can help match floor tiles, wall tiles, bathroom tiles and outdoor tiles to the way the space will be used.',
  },
  {
    question: 'Can Kleihaus help me choose tile adhesive and grout?',
    answer:
      'Yes. Adhesive and grout should match the tile type, area of use and expected moisture or foot traffic. Kleihaus can guide practical combinations for stronger installations.',
  },
  {
    question: 'Does Kleihaus support delivery and project quotations?',
    answer:
      'Kleihaus supports retail and project quotation requests. Share your room size, product type, delivery location and budget so the team can respond with useful guidance.',
  },
  {
    question: 'Can I request sanitaryware guidance?',
    answer:
      'Yes. Kleihaus can help customers compare basins, toilets, taps, mixers, showers and accessories for modern bathroom finishes.',
  },
  {
    question: 'What information should I send on WhatsApp?',
    answer:
      'Send the room size, preferred tile or finish, delivery location, quantity estimate and budget range. Photos or inspiration references can also help.',
  },
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

const WhatsAppBrandText = ({ children = 'WhatsApp', iconClassName = 'h-4 w-4' }) => (
  <>
    <MessageCircle className={`${iconClassName} text-[#25D366] drop-shadow-[0_0_6px_rgba(37,211,102,0.35)] transition group-hover:text-[#3ee77b]`} />
    <span className="text-[#25D366] transition group-hover:text-[#3ee77b]">{children}</span>
  </>
)

const setMetaContent = (selector, content) => {
  const tag = document.querySelector(selector)
  if (tag) tag.setAttribute('content', content)
}

function SeoManager() {
  useEffect(() => {
    document.title = seoTitle
    setMetaContent('meta[name="description"]', seoDescription)
    setMetaContent('meta[name="robots"]', 'index, follow, max-image-preview:large')
    setMetaContent('meta[property="og:title"]', seoTitle)
    setMetaContent('meta[property="og:description"]', seoDescription)
    setMetaContent('meta[name="twitter:title"]', seoTitle)
    setMetaContent('meta[name="twitter:description"]', seoDescription)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', canonicalUrl)
  }, [])

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

function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/images/kleihaus-logo.jpg"
        alt="Kleihaus Ceramics"
        loading="eager"
        decoding="async"
        className={`${compact ? 'h-9 w-9' : 'h-11 w-11'} rounded-md border border-neutral-200 object-contain`}
      />
      <div className={compact ? 'leading-tight' : ''}>
        <div className="text-sm font-semibold text-neutral-950 sm:text-base">Kleihaus Ceramics</div>
        <div className="text-xs text-neutral-500">Inspiring living</div>
      </div>
    </div>
  )
}

function TopStrip({ onContactClick }) {
  return (
    <div className="hidden bg-[#16A34A] text-white sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px]">
        <div className="inline-flex items-center gap-1.5 text-white/90">
          <MapPin className="h-3.5 w-3.5" />
          Nairobi | Machakos | Makueni
        </div>
        <div className="flex items-center gap-5 text-white/90">
          <a href="mailto:sales@kleihaus.com" className="inline-flex items-center gap-1.5 transition hover:text-white" onClick={() => onContactClick('email_click', 'top_strip_email')}>
            <Mail className="h-3.5 w-3.5" />
            sales@kleihaus.com
          </a>
          <a href="tel:+254748827166" className="inline-flex items-center gap-1.5 transition hover:text-white" onClick={() => onContactClick('phone_click', 'top_strip_phone')}>
            <Phone className="h-3.5 w-3.5" />
            +254 748 827 166
          </a>
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

function Header({ projectType, searchQuery, setSearchQuery, onSearch, activeSection, onSectionChange, onCategoryClick, onWhatsAppClick, onContactClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (section) => {
    onSectionChange(section)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <TopStrip onContactClick={onContactClick} />
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3 lg:grid-cols-[auto_minmax(240px,420px)_1fr_auto] lg:gap-6">
        <button type="button" aria-label="Kleihaus Ceramics home" className="min-w-0 text-left" onClick={() => handleNavClick('home')}>
          <Logo compact />
        </button>

        <div className="hidden min-w-0 lg:block">
          <SearchAutocomplete value={searchQuery} onChange={setSearchQuery} projectType={projectType} onSearch={onSearch} />
        </div>

        <nav className="hidden items-center justify-end gap-5 xl:flex">
          {navItems.map((item) => (
            <button
              key={item.section}
              type="button"
              aria-current={activeSection === item.section ? 'page' : undefined}
              onClick={() => handleNavClick(item.section)}
              className={`rounded-md px-2 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-200 ${
                activeSection === item.section
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center justify-end lg:flex">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => onWhatsAppClick('header')}>
            <Button className="group gap-2 bg-neutral-950 px-3.5 hover:border-[#25D366]/60 hover:bg-neutral-900 hover:shadow-[0_0_18px_rgba(37,211,102,0.22)]">
              <WhatsAppBrandText />
            </Button>
          </a>
        </div>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="lg:hidden" onClick={() => onWhatsAppClick('mobile_header')}>
          <Button className="group gap-1.5 bg-neutral-950 px-3 py-2 text-xs hover:border-[#25D366]/60 hover:bg-neutral-900 hover:shadow-[0_0_16px_rgba(37,211,102,0.22)]">
            <WhatsAppBrandText />
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

      <div className="border-t border-neutral-100 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2">
          {categoryNav.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onCategoryClick(item)
                onSectionChange('catalogue')
              }}
              className="shrink-0 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-600 transition hover:border-emerald-600/40 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
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
              <button
                key={item.section}
                type="button"
                aria-current={activeSection === item.section ? 'page' : undefined}
                className={`rounded-md px-2 py-2 text-left text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 ${
                  activeSection === item.section ? 'bg-emerald-50 text-emerald-800' : 'text-neutral-800 hover:bg-neutral-50'
                }`}
                onClick={() => handleNavClick(item.section)}
              >
                {item.label}
              </button>
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

function Hero({ onWhatsAppClick, onQuoteClick, onSectionChange }) {
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
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
        <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-neutral-950 text-white shadow-xl">
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => {
              const isActive = index === activeSlide
              const motionClass = prefersReducedMotion ? '' : isActive ? 'translate-x-0 scale-100' : 'translate-x-8 scale-105'

              return (
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.alt}
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
          <div className="relative flex min-h-[520px] max-w-3xl flex-col justify-center px-5 py-12 sm:px-10 lg:px-12">
            <p className="text-xs font-semibold uppercase text-emerald-200">Kleihaus Ceramics</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Premium tiles and finishing materials for Kenyan homes and projects.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-100 sm:text-lg">
              Browse tiles, sanitaryware, paints, adhesives and grout, then request a clear quote from the Kleihaus team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button type="button" onClick={() => onSectionChange('catalogue')} className="gap-2 bg-white text-neutral-950 hover:bg-neutral-100">
                Browse catalogue
                <ArrowRight className="h-4 w-4" />
              </Button>
              <ButtonSecondary
                type="button"
                onClick={() => {
                  onQuoteClick('hero_quote_intent')
                  onSectionChange('contact')
                }}
                className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                Request quote
              </ButtonSecondary>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => onWhatsAppClick('hero_whatsapp')}>
                <ButtonSecondary className="group gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20">
                  <WhatsAppBrandText>WhatsApp inquiry</WhatsAppBrandText>
                </ButtonSecondary>
              </a>
            </div>
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 sm:left-10 sm:right-10 lg:left-12 lg:right-12">
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
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {heroTrustBadges.map((badge) => {
            const Icon = badge.icon
            return (
              <div key={badge.label} className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
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
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">A practical finishing materials partner for homes, shops and projects.</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Kleihaus Ceramics supplies tiles, sanitaryware, paints, adhesives, grout and finishing materials for customers planning durable, well-matched spaces across Kenya.
          </p>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            The team supports retail requests and project quotations in Nairobi, Machakos, Makueni and wider Kenya where practical, helping customers compare product types, quantities, delivery needs and installation choices before they buy.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-emerald-800">
            {['Tiles', 'Sanitaryware', 'Paints', 'Adhesives', 'Grout', 'Finishing materials'].map((item) => (
              <span key={item} className="rounded-full bg-emerald-50 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
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
                    alt={`${category.name} supplied by Kleihaus Ceramics in Kenya`}
                    loading="lazy"
                    decoding="async"
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
                    <img
                      src={item.img}
                      alt={`${item.name} from Kleihaus Ceramics catalogue`}
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
          <p className="text-sm font-semibold uppercase text-emerald-700">Helpful buying guidance</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Planning guides for better material choices</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Use these planning topics to frame your quote request. If you need help now, tap a topic and send the team your room size, product type, quantity, location and budget range.
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
              <p className="text-xs font-semibold uppercase text-emerald-700">Planning support</p>
              <h3 className="mt-2 text-base font-semibold text-neutral-950">{topic.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{topic.summary}</p>
            </a>
          ))}
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-950">{item.question}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ onWhatsAppClick }) {
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

    const preparedRequest = quoteRequestService.prepare(quoteForm)
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
    })

    const backendResult = await quoteRequestService.submitBackend(preparedRequest.payload)
    setQuoteStatusType(backendResult.ok ? 'success' : 'error')
    setQuoteStatus(backendResult.message)
    if (backendResult.ok) {
      analyticsService.track('quote_form_submit_success', {
        clickedElement: 'contact_form',
        leadReference: backendResult.data?.leadReference,
        requestId: backendResult.data?.requestId,
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
    })
    if (backendResult.data?.success && !backendResult.data?.email?.sent) {
      debugLog('QUOTE_FRONTEND_EMAIL_NOT_SENT', {
        requestId: backendResult.data?.requestId,
        emailError: backendResult.data?.email?.error,
      })
    }
    setIsQuoteSubmitting(false)
  }

  return (
    <section id="contact" className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">Contact Kleihaus</p>
          <h2 className="mt-2 text-3xl font-semibold">Request a product or project quote.</h2>
          <p className="mt-4 leading-7 text-neutral-300">
            Share your room size, product type, quantity, location and budget range. Kleihaus will respond with product guidance and quote support.
          </p>

          <div className="mt-7 space-y-3 text-sm text-neutral-200">
            <a href="tel:+254748827166" className="flex items-center gap-3 hover:text-white" onClick={() => analyticsService.track('phone_click', { clickedElement: 'contact_phone' })}>
              <Phone className="h-4 w-4 text-emerald-300" />
              +254 748 827 166
            </a>
            <a href="mailto:sales@kleihaus.com" className="flex items-center gap-3 hover:text-white" onClick={() => analyticsService.track('email_click', { clickedElement: 'contact_email' })}>
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
          key={quoteFormResetKey}
          ref={quoteFormRef}
          onSubmit={submitQuoteRequest}
          noValidate
          autoComplete="off"
          className="rounded-lg bg-white p-5 text-neutral-950 shadow-xl sm:p-6"
        >
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Tell us what you need</h3>
            <p className="mt-1 text-sm leading-6 text-neutral-600">Include room size, product type, quantity, location and budget range so the quote can be more useful.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Name
              <Input name="name" autoComplete="off" placeholder="Your name" value={quoteForm.name} onChange={updateQuoteField('name')} required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Email
              <Input name="email" type="email" autoComplete="off" placeholder="Email address" value={quoteForm.email} onChange={updateQuoteField('email')} />
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Phone
              <Input name="phone" autoComplete="off" placeholder="Phone number" value={quoteForm.phone} onChange={updateQuoteField('phone')} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-700">
              Location
              <Input name="location" autoComplete="off" placeholder="Project location" value={quoteForm.location} onChange={updateQuoteField('location')} />
            </label>
          </div>
          <label className="mt-4 grid gap-2 text-sm font-medium text-neutral-700">
            Request details
            <Textarea
              name="message"
              autoComplete="off"
              placeholder="Example: 32 m2 floor tiles, matte finish, 85 pieces, delivery to Machakos, budget range..."
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
          {quoteStatus && (
            <p
              ref={quoteStatusRef}
              className={`mt-4 rounded-md border px-4 py-3 text-sm ${
                quoteStatusType === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-amber-200 bg-amber-50 text-amber-900'
              }`}
            >
              {quoteStatus}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button disabled={isQuoteSubmitting} className="disabled:cursor-not-allowed disabled:opacity-70">
              {isQuoteSubmitting ? 'Sending...' : 'Send request'}
            </Button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => onWhatsAppClick('contact_form')}>
              <ButtonSecondary type="button" className="group gap-2 hover:border-[#25D366]/70 hover:shadow-[0_0_16px_rgba(37,211,102,0.16)]">
                <WhatsAppBrandText>Chat on WhatsApp</WhatsAppBrandText>
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
    <footer className="border-t border-white/30 bg-[linear-gradient(180deg,#8B4E1C_0%,#A65F1E_100%)] text-orange-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/kleihaus-logo.jpg"
              alt="Kleihaus Ceramics"
              loading="lazy"
              decoding="async"
              className="h-10 w-10 rounded-md border border-white/20 bg-white object-contain"
            />
            <div className="leading-tight">
              <div className="text-base font-semibold text-white">Kleihaus Ceramics</div>
              <div className="text-xs text-orange-100">Inspiring living</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-orange-50/90">
            Tiles, sanitaryware, paints, adhesives, grout and finishing materials for homes, retail orders and project quotations in Kenya.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-white">Products</h3>
          <ul className="mt-3 grid gap-2 text-sm text-orange-50/90">
            {['Floor tiles', 'Wall tiles', 'Bathroom tiles', 'Sanitaryware', 'Paints', 'Adhesives & grout'].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-white">Services</h3>
          <ul className="mt-3 grid gap-2 text-sm text-orange-50/90">
            {['Retail quotes', 'Project quotations', 'Delivery coordination', 'Installation guidance', 'Product matching'].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-white">Contact</h3>
          <div className="mt-3 grid gap-3 text-sm text-orange-50/90">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-white hover:text-orange-50">
              <WhatsAppBrandText>WhatsApp</WhatsAppBrandText>
            </a>
            <a href="mailto:sales@kleihaus.com" className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4 text-orange-100" />
              sales@kleihaus.com
            </a>
            <a href="tel:+254748827166" className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 text-orange-100" />
              +254 748 827 166
            </a>
            <div className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-orange-100" />
              <span>Nairobi | Machakos | Makueni</span>
            </div>
            <p className="text-orange-50/80">Typical response: shortly after quote submission during business hours.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-5 text-center text-orange-50">
          <p className="text-xs">
            © {new Date().getFullYear()} Kleihaus Ceramics. All Rights Reserved.{' '}
            <span className="font-semibold tracking-wide text-orange-50">Inspiring Living</span>
          </p>
        </div>
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
      className="group fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-md border border-[#25D366]/40 bg-neutral-950 px-4 py-3 text-sm font-semibold shadow-lg shadow-neutral-900/20 transition hover:shadow-[0_0_20px_rgba(37,211,102,0.28)] md:hidden"
    >
      <WhatsAppBrandText>Request quote on WhatsApp</WhatsAppBrandText>
    </a>
  )
}

export default function App() {
  const [projectType] = useState('Homeowner')
  const [activeSection, setActiveSection] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Floor Tiles')
  const [eventRevision, setEventRevision] = useState(0)

  const refreshSignals = () => setEventRevision((revision) => revision + 1)

  useEffect(() => {
    analyticsService.track('page_view', { clickedElement: 'app_mount' })
  }, [])

  const handleSearch = (query) => {
    analyticsService.track('search_query', { searchQuery: query.toLowerCase(), projectType })
    setSearchQuery(query)
    refreshSignals()
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    analyticsService.track('navigation_click', { clickedElement: `nav_${section}`, projectType, productCategory: selectedCategory })
    refreshSignals()
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
    })
  }

  const handleCategoryClick = (category) => {
    analyticsService.track('category_click', { productCategory: category, clickedElement: 'category_navigation', projectType })
    setSelectedCategory(category)
    refreshSignals()
  }

  const handleProductInterest = (product, category) => {
    analyticsService.track('product_click', { productName: product, productCategory: category, clickedElement: 'product_card', projectType })
    setSelectedCategory(category)
    refreshSignals()
  }

  const handleWhatsAppClick = (source) => {
    analyticsService.track('whatsapp_click', { clickedElement: source, projectType, productCategory: selectedCategory })
    refreshSignals()
  }

  const handleQuoteClick = (source) => {
    analyticsService.track('contact_click', { clickedElement: source, projectType, productCategory: selectedCategory })
    refreshSignals()
  }

  const handleContactClick = (eventType, source) => {
    analyticsService.track(eventType, { clickedElement: source, projectType, productCategory: selectedCategory })
    refreshSignals()
  }

  const handleGuideClick = (topic) => {
    analyticsService.track('guide_topic_clicked', { topic, projectType })
    refreshSignals()
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-900">
      <SeoManager />
      <Header
        projectType={projectType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onCategoryClick={handleCategoryClick}
        onWhatsAppClick={handleWhatsAppClick}
        onContactClick={handleContactClick}
      />
      {activeSection === 'home' && (
        <Hero onWhatsAppClick={handleWhatsAppClick} onQuoteClick={handleQuoteClick} onSectionChange={handleSectionChange} />
      )}
      {activeSection === 'about' && <AboutSection />}
      {activeSection === 'catalogue' && (
        <ShopByCategory selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} onWhatsAppClick={handleWhatsAppClick} />
      )}
      {activeSection === 'contact' && <Contact onWhatsAppClick={handleWhatsAppClick} />}
      <MobileStickyWhatsApp onWhatsAppClick={handleWhatsAppClick} />
      <Footer />
    </div>
  )
}
