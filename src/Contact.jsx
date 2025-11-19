import React from 'react'

export default function Contact({ locations }) {
  return (
    <section id="contact" className="rounded-2xl border p-6">
      <h3 className="text-xl font-semibold mb-2">Contact</h3>
      <p className="text-slate-700">Locations: <span className="font-medium">{locations}</span></p>
      <div className="mt-3 text-sm text-slate-600 space-y-1">
        <p>Email: info@kleihaus.com</p>
        <p>WhatsApp: +254 700 000 000</p>
      </div>
    </section>
  )
}
