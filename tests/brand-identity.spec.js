import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174', reducedMotion: 'reduce' })

for (const width of [390, 768, 1440]) {
  test(`brand identity remains usable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 })
    await page.goto('/')
    await expect(page.getByText('Tiles. Sanitaryware. Paints. Tiling.', { exact: true })).toBeVisible()
    await expect(page.locator('footer')).toHaveCSS('background-color', 'rgb(6, 78, 59)')
    const logo = page.locator('header img[alt="Kleihaus Ceramics"]').first()
    await expect(logo).toHaveCSS('object-fit', 'contain')
    await expect(logo).toBeVisible()
    const current = page.locator('[aria-current="true"][aria-label^="Show "]')
    const before = await current.getAttribute('aria-label')
    await page.getByRole('button', { name: /Show .* hero image/ }).nth(1).click()
    expect(await current.getAttribute('aria-label')).not.toBe(before)
    await page.keyboard.press('Tab')
    await page.getByRole('button', { name: 'Explore Products', exact: true }).focus()
    expect(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle)).not.toBe('none')
    for (const path of ['/', '/sanitaryware', '/projects', '/#contact']) {
      await page.goto(path)
      await page.waitForFunction(() => [...document.images].filter((img) => img.getBoundingClientRect().top < innerHeight && img.getBoundingClientRect().bottom > 0).every((img) => img.complete && img.naturalWidth > 0))
      await page.screenshot({ path: testInfo.outputPath(`${path.replaceAll('/', '-')}-${width}.png`), fullPage: true })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
  })
}
