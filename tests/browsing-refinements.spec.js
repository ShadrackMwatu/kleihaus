import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174' })

test('category navigation and sink section are direct destinations', async ({ page }) => {
  await page.goto('/sanitaryware')
  const nav = page.getByRole('navigation', { name: 'Product categories' })
  await expect(nav.getByRole('link', { name: 'Sanitaryware', exact: true })).toHaveAttribute('aria-current', 'true')
  await expect(nav.getByRole('link', { name: 'Floor Tiles', exact: true })).not.toHaveAttribute('aria-current', 'true')
  await nav.getByRole('link', { name: 'Kitchen Sinks & Mixers', exact: true }).click()
  await expect(page).toHaveURL(/sanitaryware#kitchen-sinks$/)
  await expect(page.locator('#kitchen-sinks')).toBeInViewport()
  const hero = await page.locator('.image-mosaic img').evaluateAll((images) => images.map((image) => image.getAttribute('alt')))
  const gallery = await page.locator('#gallery img').evaluateAll((images) => images.map((image) => image.getAttribute('alt')))
  expect(gallery.some((alt) => hero.includes(alt))).toBe(false)
})

test('homepage offers direct category links and a compact mobile service row', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('#catalogue a[aria-label="View Kitchen Sinks & Mixers category"]')).toHaveAttribute('href', '/sanitaryware#kitchen-sinks')
  const wholesale = page.getByText('Wholesale & Retail', { exact: true })
  const sourcing = page.getByText('Sourcing Support', { exact: true })
  const first = await wholesale.boundingBox()
  const second = await sourcing.boundingBox()
  expect(Math.abs(first.y - second.y)).toBeLessThan(3)
  await expect(page.locator('input[name="name"]').first()).toHaveAttribute('autocomplete', 'name')
  await expect(page.locator('input[name="phone"]').first()).toHaveAttribute('autocomplete', 'tel')
  await expect(page.getByRole('link', { name: 'Explore bathrooms', exact: true })).toHaveAttribute('href', '/bathroom-tiles')
  await expect(page.locator('body')).not.toContainText('Estimate tiles before you request a quote')
})
