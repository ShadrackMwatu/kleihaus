import React from 'react'

const WhatsAppIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M16.04 3.2A12.75 12.75 0 0 0 5.16 22.6L3.6 28.8l6.34-1.48A12.76 12.76 0 1 0 16.04 3.2Zm0 2.35a10.4 10.4 0 1 1-5.3 19.36l-.38-.22-3.55.83.86-3.42-.25-.4a10.4 10.4 0 0 1 8.62-16.15Zm-4.3 5.54c-.22-.5-.45-.52-.66-.53h-.56c-.2 0-.52.07-.8.36-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.36 5.2 4.57 2.58 1.02 3.1.82 3.66.77.56-.05 1.8-.74 2.06-1.45.26-.72.26-1.33.18-1.45-.08-.13-.28-.2-.59-.35-.3-.15-1.8-.9-2.08-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.96 1.2-.18.2-.35.22-.66.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.47.13-.62.14-.13.3-.35.46-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.67-.98-2.27Z" />
  </svg>
)

export default function Contact({ locations }) {
  return (
    <section id="contact" className="rounded-2xl border p-6">
      <h3 className="text-xl font-semibold mb-2">Contact</h3>
      <p className="text-slate-700">Locations: <span className="font-medium">{locations}</span></p>
      <div className="mt-3 text-sm text-slate-600 space-y-1">
        <p>
          Email:{' '}
          <a href="mailto:sales@kleihaus.com" className="font-medium text-emerald-700">
            sales@kleihaus.com
          </a>
        </p>
        <p>
          WhatsApp:{' '}
          <a href="https://wa.me/254748827166?text=Hello%20Kleihaus%2C%20I%20would%20like%20support." className="inline-flex items-center gap-1.5 font-medium text-[#128C7E]">
            <WhatsAppIcon />
            +254 748 827 166
          </a>
        </p>
        <p>
          Phone:{' '}
          <a href="tel:+254748827166" className="font-medium text-emerald-700">
            +254 748 827 166
          </a>
        </p>
      </div>
    </section>
  )
}
