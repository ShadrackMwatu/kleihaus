import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174' })

test('homepage presents named service areas only in Contact', async ({ page }) => {
  await page.goto('/')
  for (const name of ['Nairobi', 'Machakos', 'Makueni']) {
    await expect(page.getByText(name, { exact: true })).toHaveCount(1)
    await expect(page.locator('#contact').getByRole('link', { name, exact: true })).toHaveAttribute('href', `/locations/${name.toLowerCase()}`)
  }
  await expect(page.locator('#contact')).toContainText('Service areas')
})

test('general pages avoid repeated service-area lists while local pages remain available', async ({ page }) => {
  for (const path of ['/tiles', '/sanitaryware', '/tile-buying-guide']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: 'Plan delivery for your project.' })).toBeVisible()
    for (const name of ['Nairobi', 'Machakos', 'Makueni']) {
      await expect(page.getByRole('link', { name, exact: true })).toHaveCount(0)
    }
  }
  await page.goto('/locations/nairobi')
  await expect(page.locator('h1')).toContainText('Nairobi')
})
