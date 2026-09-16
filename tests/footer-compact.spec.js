import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174' })
const desktopDestinations = ['/products', '/tiles', '/floor-tiles', '/wall-tiles', '/bathroom-tiles', '/sanitaryware', '/sanitaryware', '/paints', '/adhesives-grout', '/projects', '/projects#kitchen-projects', '/guides', '/tile-buying-guide', '/bathroom-renovation-guide', '/paint-selection-guide', '/cost-estimation-guide', 'mailto:sales@kleihaus.com', 'tel:+254748827166', 'https://www.facebook.com/profile.php?id=61579324481913', 'https://www.linkedin.com/company/108657250/', 'https://www.instagram.com/kleihausceramics']
const mobileDestinations = ['/products', '/projects', '/guides', '/about', '/solutions', '/contact', '/installation-support', 'mailto:sales@kleihaus.com', 'tel:+254748827166', 'https://www.facebook.com/profile.php?id=61579324481913', 'https://www.linkedin.com/company/108657250/', 'https://www.instagram.com/kleihausceramics']

for (const width of [390, 768, 1440]) {
  test(`compact footer preserves destinations at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    const visibleNav = width === 1440 ? footer.locator('.footer-main') : footer.locator('.footer-mobile')
    const expectedDestinations = width === 1440 ? desktopDestinations : mobileDestinations
    expect((await visibleNav.locator('a').evaluateAll((links) => links.map((a) => a.getAttribute('href')))).sort()).toEqual([...expectedDestinations].sort())
    await expect(footer.locator('a[target="_blank"]')).toHaveCount(3)
    for (const link of await footer.locator('a[target="_blank"]').all()) {
      await expect(link).toHaveAttribute('aria-label', /Follow Kleihaus Ceramics on/)
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    const height = (await footer.boundingBox()).height
    console.log(`Footer ${width}px: ${height}px high`)
    if (width === 1440) expect(height).toBeLessThan(320)
    if (width < 1024) {
      expect(height).toBeLessThan(460)
      await expect(footer.locator('.footer-disclosure')).toHaveCount(2)
      await expect(footer.locator('.footer-disclosure[open]')).toHaveCount(0)
    }
    await page.keyboard.press('Tab')
    await visibleNav.getByRole('link', { name: width === 1440 ? 'All products' : 'Products', exact: true }).focus()
    expect(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle)).not.toBe('none')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await footer.screenshot({ path: testInfo.outputPath(`footer-${width}.png`) })
  })
}
