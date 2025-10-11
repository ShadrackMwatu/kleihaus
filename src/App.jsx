import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ChevronRight, ChevronLeft, Store, Palette, Shield, Sparkles, BrickWall } from 'lucide-react'

const Button = ({ className = '', children, ...props }) => (
  <button className={`inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-neutral-800 ${className}`} {...props}>{children}</button>
)
const ButtonSecondary = ({ className = '', children, ...props }) => (
  <button className={`inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 ${className}`} {...props}>{children}</button>
)
const Card = ({ className = '', children }) => (
  <div className={`rounded-3xl border border-neutral-200 bg-white ${className}`}>{children}</div>
)
const CardHeader = ({ children }) => <div className="px-5 pt-5">{children}</div>
const CardContent = ({ children, className = '' }) => <div className={`px-5 pb-5 ${className}`}>{children}</div>
const CardTitle = ({ className = '', children }) => <div className={`text-lg font-semibold ${className}`}>{children}</div>
const Input = (props) => <input {...props} className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400" />
const Textarea = (props) => <textarea {...props} className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400" />

const features = [
  { title: 'Quality Guaranteed', desc: 'We curate brands you can trust.', icon: Shield },
  { title: 'Design Support', desc: 'Quick help choosing colours & finishes.', icon: Sparkles },
  { title: 'Nationwide Sourcing', desc: 'We source to spec and deliver to site.', icon: MapPin },
]

const heroImages = ['/images/tiles-wall.jpg','/images/tiles-decor.jpg','/images/tiles-floor.jpg']

const categories = [
  { name: 'Tiles', blurb: 'Floor, wall & decor tiles.', icon: BrickWall },
  { name: 'Adhesives & finishing', blurb: 'Adhesives, grout, fittings, tools.', icon: Shield },
  { name: 'Sanitaryware', blurb: 'Baths, toilets, showers, taps & more.', icon: Store },
  { name: 'Paints', blurb: 'Interior, exterior, roof & floor paints.', icon: Palette },
  { name: 'Installation services', blurb: 'Professional tile laying & finishing.', icon: Sparkles },
]

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src="/images/kleihaus-logo.jpg" alt="Kleihaus Ceramics" className="h-8 w-8 rounded-xl object-contain" />
      <span className="font-semibold tracking-tight">Kleihaus Ceramics</span>
    </div>
  )
}

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center"><Logo /></a>
        <nav className="hidden gap-6 md:flex">
          <a href="#about" className="text-sm hover:text-neutral-900 text-neutral-600">About</a>
          <a href="#catalogue" className="text-sm hover:text-neutral-900 text-neutral-600">Product catalogue</a>
          <a href="#contact" className="text-sm hover:text-neutral-900 text-neutral-600">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+254 748 827 166" className="hidden text-sm text-neutral-600 md:block">+254 748 827 166</a>
          <a href="https://wa.me/254748827166?text=Hello%20Kleihaus%2C%20I%27d%20like%20to%20enquire%20about%20tiles%2Fsanitaryware%2Fpaints" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-2xl">WhatsApp</Button>
          </a>
        </div>
      </div>
    </header>
  )
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
      <path d="M3 7h11v8H3z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 10h4l3 3v2h-7V10z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const next = () => setIndex((i) => (i + 1) % heroImages.length)
  const prev = () => setIndex((i) => (i - 1 + heroImages.length) % heroImages.length)

  useEffect(() => {
    if (heroImages.length <= 1) return
    if (paused) return
    timerRef.current = setInterval(next, 4500)
    return () => clearInterval(timerRef.current)
  }, [paused, index])

  return (
    <section className="relative overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50 to-white" />
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Inspiring living with Tiles, Sanitaryware & Paints
            </h1>
            <p className="mt-4 max-w-xl text-neutral-600">
              From concept to finish, we help homeowners, builders, and designers pick the right materials—on budget and on time.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="rounded-2xl">
                Browse Products <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <a href="#contact" className="text-sm font-medium underline underline-offset-4">Talk to Sales</a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-xs text-neutral-500">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> 2‑year product support</div>
              <div className="flex items-center gap-2"><TruckIcon /> Reliable fulfilment</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border shadow-sm">
              {heroImages.map((src, i) => (
                <motion.img
                  key={src + i}
                  src={src}
                  alt="Kleihaus tile inspiration"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.jpg' }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              {heroImages.length > 1 && (
                <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
                  <button aria-label="Previous image" onClick={prev} className="rounded-full border bg-white/90 p-2 shadow hover:bg-white">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    {heroImages.map((_, i) => (
                      <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => setIndex(i)} className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'}`} />
                    ))}
                  </div>
                  <button aria-label="Next image" onClick={next} className="rounded-full border bg-white/90 p-2 shadow hover:bg-white">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 text-xs shadow">
                Kleihaus Ceramics
    {/* Added: expanded service areas */}
    </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CatalogueSection({ title, items }) {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((it) => (
          <Card key={it.name} className="overflow-hidden">
            <div className="relative aspect-[4/3] w-full">
              <img src={it.img} alt={it.name} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.jpg' }} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="text-sm font-medium">{it.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Categories() {
  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-semibold">Product catalogue</h2>
        <a href="#contact" className="text-sm text-neutral-600 hover:text-neutral-900">Request full price list →</a>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((c) => (
          <Card key={c.name}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <c.icon className="h-6 w-6" />
                <CardTitle>{c.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600">{c.blurb}</p>
              <ButtonSecondary className="mt-4 rounded-xl">Explore</ButtonSecondary>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 space-y-12">
        <CatalogueSection
          title="Tiles"
          items={[
            { name: 'Floor tiles', img: '/images/tiles-floor.jpg' },
            { name: 'Wall tiles', img: '/images/tiles-wall.jpg' },
            { name: 'Decor tiles', img: '/images/tiles-decor.jpg' },
          ]}
        />
        <CatalogueSection
          title="Adhesives & finishing"
          items={[
            { name: 'Tile adhesives', img: '/images/adhesive.jpg' },
            { name: 'Tile grout', img: '/images/grout.jpg' },
            { name: 'Tile fittings (trims, spacers)', img: '/images/tile-fittings.jpg' },
            { name: 'Tile tools', img: '/images/tile-tools.jpg' },
          ]}
        />
        <CatalogueSection
          title="Sanitaryware"
          items={[
            { name: 'Baths', img: '/images/sanitary-baths.jpg' },
            { name: 'Toilets', img: '/images/sanitary-toilets.jpg' },
            { name: 'Showers', img: '/images/sanitary-showers.jpg' },
            { name: 'Taps & mixers', img: '/images/sanitary-taps.jpg' },
            { name: 'Basins', img: '/images/sanitary-basins.jpg' },
            { name: 'Bathroom accessories', img: '/images/sanitary-accessories.jpg' },
            { name: 'Kitchens', img: '/images/kitchen.jpg' },
            { name: 'Sinks', img: '/images/sinks.jpg' },
            { name: 'Sink accessories', img: '/images/sink-accessories.jpg' },
          ]}
        />
        <CatalogueSection
          title="Paints"
          items={[
            { name: 'Interior paints', img: '/images/paint-interior.jpg' },
            { name: 'Exterior paints', img: '/images/paint-exterior.jpg' },
            { name: 'Roof paints', img: '/images/paint-roof.jpg' },
            { name: 'Floor paints', img: '/images/paint-floor.jpg' },
          ]}
        />
        <CatalogueSection
          title="Tile installation services"
          items={[{ name: 'Professional tile laying', img: '/images/tiler-service.jpg' }]}
        />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">About Kleihaus</h2>
          <p className="mt-4 text-neutral-700">
            Kleihaus Ceramics was founded to make it simple for Kenyan homeowners, builders, and designers to create beautiful, durable spaces.
            Serving Nairobi, Machakos and Makueni, we curate reliable brands in <strong>tiles</strong>, <strong>sanitaryware</strong>, and <strong>paints</strong>—and back them with practical advice and after‑sales support.
          </p>
          <p className="mt-3 text-neutral-700">
            Our brand stands for <em>inspiring living</em>: honest pricing, clear specifications, and a smooth path from concept to completion.
            Whether you’re finishing a single room or a full development, we help you match performance, design, and budget.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-neutral-700">
            <li>• Project‑based sourcing & technical guidance</li>
            <li>• Samples on request</li>
            <li>• Flexible delivery across Kenya</li>
            <li>• 2‑year product support on curated lines</li>
          </ul>
        </div>
        <div className="rounded-3xl border p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-xs text-neutral-500">Product lines</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15</div>
              <div className="text-xs text-neutral-500">Partner brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold">2yr</div>
              <div className="text-xs text-neutral-500">Support cover</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="border-t bg-neutral-50/60">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Contact us</h2>
          <p className="mt-2 text-neutral-600">We’re ready to help with quotes, samples, and technical questions.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Input placeholder="Your name" required />
                <Input type="email" placeholder="Email address" required />
              </div>
              <Input placeholder="Phone number" />
              <Textarea placeholder="Tell us about your project (area in m², timeline, budget)" rows={5} />
              <div className="flex items-center gap-3">
                <Button className="rounded-2xl">Send request</Button>
                <a className="rounded-2xl border px-4 py-2 text-sm hover:bg-white" href="https://wa.me/254748827166?text=Hello%20Kleihaus%2C%20I%27d%20like%20to%20enquire%20about%20tiles%2Fsanitaryware%2Fpaints" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </div>
            </form>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-neutral-700"><Mail className="h-4 w-4" /> <a href="mailto:sales@kleihaus.com">sales@kleihaus.com</a></div>
            <div className="flex items-center gap-2 text-neutral-700"><Phone className="h-4 w-4" /> <a href="tel:+254 748 827 166">+254 748 827 166</a></div>
            <div className="flex items-center gap-2 text-neutral-700"><MapPin className="h-4 w-4" /> Nairobi | Machakos | Makueni</div>
            <div>Kenya, Africa</div>
            <div className="flex items-center gap-2 text-neutral-700"><span className="inline-block h-4 w-4">🌐</span>
        <div className="flex items-center gap-2 text-neutral-700"><div>Kenya, Africa</div></div>
        <a href="https://www.kleihaus.com" target="_blank" rel="noopener noreferrer">www.kleihaus.com</a></div>
            <div className="mt-4 flex items-center gap-4 text-neutral-700">
              <div><a aria-label="Instagram" href="https://www.instagram.com/kleihausceramics/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">Instagram</a> <a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61579324481913" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">Facebook</a> <a aria-label="LinkedIn" href="https://www.linkedin.com/company/kleihaus-ceramics/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">LinkedIn</a></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <Logo />
        <p className="text-xs text-neutral-500">© {new Date().getFullYear()} Kleihaus Ceramics • Inspiring living</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white text-neutral-900">
      <NavBar />
      <Hero />
      <About />
      <Categories />
      <Contact />
      <Footer />
    </div>
  )
}
