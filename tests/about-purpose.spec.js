import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174' })

test('About explains purpose and exposes all values accessibly', async ({ page }) => {
  await page.goto('/')
  const about = page.locator('#about')
  await expect(about.getByRole('heading', { name: 'Why Kleihaus', exact: true })).toBeVisible()
  const details = about.getByRole('link', { name: 'About Kleihaus', exact: true })
  await expect(details).toHaveAttribute('href', '/about')
  await details.focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/about$/)
  const content = page.locator('main')
  for (const name of ['Why Kleihaus exists', 'Our value proposition', 'Vision', 'Mission']) {
    await expect(content.getByRole('heading', { name, exact: true })).toBeVisible()
  }
  await expect(content.locator('dt')).toHaveText(['Availability', 'Reliability', 'Convenience', 'Value and efficiency', 'Trust', 'Design with purpose', 'Complete solutions'])
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
