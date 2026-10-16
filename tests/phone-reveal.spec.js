import { test, expect } from '@playwright/test'

const number = /\+?254\s*748\s*827\s*166/
const phoneEvents = (page) => page.evaluate(() => (window.__kleihausIntelligenceEvents || []).filter((event) => event.eventType === 'phone_click'))

for (const mobile of [false, true]) {
  test.describe(mobile ? 'mobile phone controls' : 'desktop phone controls', () => {
    test.use({ viewport: { width: mobile ? 390 : 1440, height: 900 }, hasTouch: mobile })
    test.beforeEach(async ({ page }) => {
      // Observe analytics without sending test leads or launching the dialler.
      await page.route('**/api/track-event', (route) => route.fulfill({ json: { success: true } }))
      await page.addInitScript(() => document.addEventListener('click', (event) => {
        if (event.target.closest('a[href^="tel:"]')) event.preventDefault()
      }, true))
    })

    for (const path of ['/', '/contact', '/floor-tiles', '/locations/nairobi', '/installation-support']) {
      test(`reveal and call separately on ${path}`, async ({ page }) => {
        await page.goto(path)
        expect(await page.locator('body').innerText()).not.toMatch(number)
        await expect(page.locator('a[href^="tel:"]')).toHaveCount(0)
        const buttons = page.locator('button.phone-control:visible')
        expect(await buttons.count()).toBeGreaterThan(0)
        while (await buttons.count()) {
          const button = buttons.first()
          await expect(button).toHaveText('Call')
          await expect(button.locator('svg')).toHaveAttribute('aria-hidden', 'true')
          const before = (await phoneEvents(page)).length
          if (mobile) await button.tap()
          else {
            await button.focus()
            await page.keyboard.press(before % 2 ? 'Space' : 'Enter')
          }
          const link = page.locator('a.phone-control:focus')
          await expect(link).toHaveText('+254 748 827 166')
          await expect(link).toHaveAttribute('href', 'tel:+254748827166')
          await expect(link).toHaveAccessibleName(/Call Kleihaus Ceramics.*\+254 748 827 166/)
          expect((await phoneEvents(page)).length).toBe(before)
          if (mobile) await link.tap()
          else await page.keyboard.press('Enter')
          await expect.poll(async () => (await phoneEvents(page)).length).toBe(before + 1)
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
        const whatsapp = page.locator('a.floating-whatsapp')
        await expect(whatsapp).toHaveAttribute('href', /wa\.me\/254748827166/)
        await expect(whatsapp).toHaveAccessibleName(/Chat.*WhatsApp/i)
      })
    }

    test('quotation email failure keeps the number hidden', async ({ page }) => {
      await page.goto('/contact')
      await page.route('**/api/quote-request', (route) => route.fulfill({ json: { success: true, email: { sent: false } } }))
      const contact = page.locator('#contact')
      await contact.getByLabel('Name', { exact: true }).fill('Browser verification')
      await contact.getByLabel('Email', { exact: true }).fill('verification@example.com')
      await contact.getByLabel('Request details', { exact: true }).fill('Intercepted browser verification.')
      await contact.getByRole('button', { name: 'Send quotation request' }).click()
      await expect(contact.getByRole('status')).toContainText('Call control')
      expect(await page.locator('body').innerText()).not.toMatch(number)
    })

    test('support form and failure responses keep the number hidden', async ({ page }) => {
      await page.goto('/contact')
      // This legacy support entry is intentionally hidden by the existing site design.
      await page.locator('#contact button.whatsapp-secondary-entry').evaluate((button) => button.click())
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      expect(await dialog.innerText()).not.toMatch(number)
      await expect(dialog.getByRole('button', { name: /reveal phone number/ })).toBeVisible()
      await dialog.getByLabel('Name', { exact: true }).fill('Browser verification')
      await dialog.getByLabel('Email', { exact: true }).fill('verification@example.com')
      await dialog.getByLabel('Message', { exact: true }).fill('Intercepted browser test; do not submit a real request.')
      for (const response of [
        { status: 500, body: { success: false, message: 'Please call +254748827166 for help.' } },
        { status: 500, body: {} },
      ]) {
        await page.route('**/api/quote-request', (route) => route.fulfill({ status: response.status, json: response.body }))
        await dialog.getByRole('button', { name: 'Send support request' }).click()
        await expect(dialog).toContainText('Call control')
        expect(await dialog.innerText()).not.toMatch(number)
        await page.unroute('**/api/quote-request')
      }
      await page.route('**/api/quote-request', (route) => route.abort())
      await dialog.getByRole('button', { name: 'Send support request' }).click()
      await expect(dialog).toContainText('Call control')
      expect(await dialog.innerText()).not.toMatch(number)
      await dialog.getByRole('button', { name: /reveal phone number/ }).click()
      await expect(dialog.getByRole('link', { name: /Call Kleihaus/ })).toHaveText('+254 748 827 166')
    })
  })
}
