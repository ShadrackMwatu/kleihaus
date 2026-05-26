import React from 'react'
import {
  ArrowRight,
  Brush,
  CheckCircle2,
  ClipboardList,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PaintBucket,
  Phone,
  Search,
  ShowerHead,
  Sparkles,
  Store,
  Wrench,
} from 'lucide-react'

const whatsappUrl =
  'https://wa.me/254748827166?text=Hello%20Kleihaus%2C%20I%27d%20like%20to%20enquire%20about%20tiles%2Fsanitaryware%2Fpaints'

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Product Catalogue', href: '#catalogue' },
  { label: 'Contact', href: '#contact' },
]

const categoryNav = [
  'Floor Tiles',
  'Wall Tiles',
  'Outdoor Tiles',
  'Bathroom Tiles',
  'Sanitaryware',
  'Paints',
  'Adhesives',
  'Installation',
]

const categories = [
  {
    name: 'Floor Tiles',
    blurb: 'Durable finishes for living rooms, kitchens, shops and project floors.',
    img: '/images/tiles-floor.jpg',
    icon: Store,
  },
  {
    name: 'Wall Tiles',
    blurb: 'Clean ceramic, decor and feature wall surfaces for refined interiors.',
    img: '/images/tiles-wall.jpg',
    icon: ClipboardList,
  },
  {
    name: 'Outdoor Tiles',
    blurb: 'Textured options for balconies, patios, walkways and wet areas.',
    img: '/images/tiles-floor-2.jpg',
    icon: Sparkles,
  },
  {
    name: 'Bathroom Tiles',
    blurb: 'Coordinated floor and wall finishes for modern bathrooms.',
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
    blurb: 'Practical site guidance, tile laying support and finishing advice.',
    img: '/images/tiler-service.jpg',
    icon: Wrench,
  },
]

const highlights = [
  'Curated finishes for Kenyan homes and developments',
  'Tiles, sanitaryware, paints, adhesives and grout',
  'Serving Nairobi, Machakos and Makueni',
]

const productRows = [
  {
    title: 'Tile ranges',
    items: [
      { name: 'Floor tiles', img: '/images/tiles-floor.jpg' },
      { name: 'Wall tiles', img: '/images/tiles-wall-2.jpg' },
      { name: 'Decor tiles', img: '/images/tiles-decor.jpg' },
      { name: 'Gallery finishes', img: '/images/tiles-gallery-1.jpg' },
    ],
  },
  {
    title: 'Bathroom & sanitaryware',
    items: [
      { name: 'Basins', img: '/images/sanitary-basins.jpg' },
      { name: 'Toilets', img: '/images/sanitary-toilets.jpg' },
      { name: 'Showers', img: '/images/sanitary-showers.jpg' },
      { name: 'Taps & mixers', img: '/images/taps-display-1.jpg' },
    ],
  },
  {
    title: 'Finishing essentials',
    items: [
      { name: 'Tile grout', img: '/images/grout.jpg' },
      { name: 'Tile fittings', img: '/images/tile-fittings.jpg' },
      { name: 'Tile tools', img: '/images/tile-tools.jpg' },
      { name: 'Exterior paints', img: '/images/paint-exterior.jpg' },
    ],
  },
]

const Button = ({ className = '', children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const ButtonSecondary = ({ className = '', children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-neutral-500 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-neutral-700 focus:ring-2 focus:ring-neutral-200"
  />
)

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-neutral-700 focus:ring-2 focus:ring-neutral-200"
  />
)

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/images/kleihaus-logo.jpg"
        alt="Kleihaus Ceramics"
        className="h-11 w-11 rounded-lg border border-neutral-200 object-contain"
      />
      <div>
        <div className="text-base font-semibold text-neutral-950">Kleihaus Ceramics</div>
        <div className="text-xs text-neutral-500">Inspiring living</div>
      </div>
    </div>
  )
}

function TopStrip() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            +254 748 827 166
          </span>
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

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <TopStrip />
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <a href="#top" aria-label="Kleihaus Ceramics home" className="shrink-0">
          <Logo />
        </a>

        <label className="hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 lg:flex">
          <Search className="h-4 w-4 text-neutral-500" />
          <input
            type="search"
            placeholder="Search tiles, sanitaryware, paints, adhesives..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
          />
        </label>

        <nav className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-neutral-700 hover:text-neutral-950">
              {item.label}
            </a>
          ))}
        </nav>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0 lg:ml-0">
          <Button className="gap-2 bg-emerald-700 hover:bg-emerald-800">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </a>

        <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 xl:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
          {categoryNav.map((item) => (
            <a
              key={item}
              href="#catalogue"
              className="shrink-0 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700 hover:border-emerald-700 hover:text-emerald-800"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="bg-stone-100">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-12">
        <div className="relative min-h-[440px] overflow-hidden rounded-lg bg-neutral-950 text-white">
          <img src="/images/kleihaus-structure.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-neutral-950/15" />
          <div className="relative flex min-h-[440px] max-w-2xl flex-col justify-center px-6 py-10 sm:px-10">
            <p className="text-xs font-semibold uppercase text-emerald-200">Tiles | Sanitaryware | Paints | Adhesives</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Premium finishes for modern Kenyan spaces.
            </h1>
            <p className="mt-5 text-base text-neutral-100 sm:text-lg">
              Kleihaus Ceramics helps homeowners, designers and contractors source beautiful, durable finishing materials with clear advice and project-ready support.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#catalogue">
                <Button className="gap-2 bg-white text-neutral-950 hover:bg-neutral-100">
                  Shop by category
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <ButtonSecondary className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                  Talk to sales
                </ButtonSecondary>
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <FeatureTile
            image="/images/tiles-gallery-1.jpg"
            title="Curated tile looks"
            text="Floor, wall, bathroom and outdoor finishes selected for style and durability."
          />
          <FeatureTile
            image="/images/sanitary-set-1.jpg"
            title="Complete bathroom sourcing"
            text="Sanitaryware, taps, showers and accessories for coordinated project finishes."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureTile({ image, title, text }) {
  return (
    <div className="grid overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[0.95fr_1.05fr]">
      <img src={image} alt="" className="h-44 w-full object-cover sm:h-full" />
      <div className="flex flex-col justify-center p-5">
        <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
      </div>
    </div>
  )
}

function ShopByCategory() {
  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">Product catalogue</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Shop by category</h2>
        </div>
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-emerald-800">
          Request a quote
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
              className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-700 hover:shadow-md"
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
                <div className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-emerald-800 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-neutral-950">{category.name}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:text-emerald-700" />
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{category.blurb}</p>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

function CatalogueRows() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">Browse ranges</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Catalogue highlights</h2>
        </div>
        <div className="space-y-10">
          {productRows.map((row) => (
            <div key={row.title}>
              <h3 className="mb-4 text-xl font-semibold text-neutral-950">{row.title}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {row.items.map((item) => (
                  <div key={item.name} className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
                    <img src={item.img} alt={item.name} className="aspect-[5/4] w-full object-cover" />
                    <div className="flex items-center justify-between gap-3 p-4">
                      <span className="text-sm font-semibold text-neutral-900">{item.name}</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">About Kleihaus</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">A cleaner way to source finishing materials.</h2>
          <p className="mt-4 leading-7 text-neutral-700">
            Kleihaus Ceramics brings together tiles, sanitaryware, paints, adhesives and installation support for homes, projects and developments across Nairobi, Machakos and Makueni.
          </p>
          <p className="mt-3 leading-7 text-neutral-700">
            The focus is simple: premium finishes, clear specifications, honest guidance and a smooth path from product selection to site delivery.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
              <p className="mt-4 text-sm font-medium leading-6 text-neutral-800">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold">Request product guidance or a project quote.</h2>
          <p className="mt-4 leading-7 text-neutral-300">
            Share the room, site, area or finish you have in mind. Kleihaus will help match the right tile, sanitaryware, paint or installation material to your project.
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

        <form onSubmit={(event) => event.preventDefault()} className="rounded-lg bg-white p-5 text-neutral-950 shadow-lg">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Your name" required />
            <Input type="email" placeholder="Email address" required />
          </div>
          <div className="mt-4">
            <Input placeholder="Phone number" />
          </div>
          <div className="mt-4">
            <Textarea placeholder="Tell us about your project, preferred finishes, area and timeline" rows={5} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>Send request</Button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
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
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-xs text-neutral-500 md:absolute md:left-1/2 md:-translate-x-1/2">© {new Date().getFullYear()} Kleihaus Ceramics • Inspiring living</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <Hero />
      <ShopByCategory />
      <CatalogueRows />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
