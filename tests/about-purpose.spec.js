import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174' })

test('About explains purpose and exposes all values accessibly', async ({ page }) => {
  await page.goto('/')
  const about = page.locator('#about')
  await expect(about.getByRole('heading', { name: 'Why Kleihaus exists' })).toBeVisible()
  await expect(about.getByRole('heading', { name: 'Our value proposition' })).toBeVisible()
  await expect(about.getByRole('link', { name: 'Discuss Your Project' })).toHaveAttribute('href', '/#contact')
  const summary = about.locator('summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(about.getByRole('heading', { name: 'Vision', exact: true })).toBeVisible()
  await expect(about.getByRole('heading', { name: 'Mission', exact: true })).toBeVisible()
  await expect(about.locator('dt')).toHaveText(['Availability', 'Reliability', 'Convenience', 'Value and efficiency', 'Trust', 'Design with purpose', 'Complete solutions'])
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
