import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { test, expect } from '@playwright/test'

let server
let buttons
test.beforeAll(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  buttons = await server.ssrLoadModule('/src/components/Buttons.jsx')
})
test.afterAll(async () => { await server?.close() })

for (const [name, visuals] of [
  ['Button', 'border-brand-forest bg-brand-forest text-white hover:bg-emerald-900'],
  ['ButtonSecondary', 'border-brand-forest bg-white text-brand-forest hover:border-brand-copper'],
]) {
  test(`${name} preserves native attributes and legacy class output`, () => {
    for (const className of ['', 'w-full', 'bg-brand-whatsapp text-white', 'hover:bg-white']) {
      const props = { className, type: 'submit', disabled: true, 'aria-label': 'Send enquiry' }
      const actual = renderToStaticMarkup(React.createElement(buttons[name], props, 'Send'))
      const expected = renderToStaticMarkup(React.createElement('button', {
        ...props,
        className: `inline-flex items-center justify-center rounded-md border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${/\bbg-/.test(className) ? '' : visuals} ${className}`,
      }, 'Send'))
      expect(actual).toBe(expected)
    }
  })
}
