import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174', reducedMotion: 'reduce' })

for (const width of [390, 768, 1440]) {
  test(`block layouts remain usable at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(180_000)
    await page.setViewportSize({ width, height: 960 })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const path of ['/', '/products', '/sanitaryware', '/paints', '/projects', '/trade-projects', '/tile-buying-guide', '/locations/nairobi']) {
      await page.goto(path)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      for (const mosaic of await page.locator('.image-mosaic').all()) {
        const images = mosaic.locator('img')
        await expect(images).toHaveCount(3)
        const boxes = await images.evaluateAll((items) => items.map((image) => {
          const { x, y, width, height } = image.getBoundingClientRect()
          return { x, y, width, height }
        }))
        expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2)
        expect(boxes[1].x).toBeGreaterThan(boxes[0].x)
        expect(boxes[2].y).toBeGreaterThan(boxes[1].y)
        expect(Math.abs(boxes[0].y + boxes[0].height - boxes[2].y - boxes[2].height)).toBeLessThan(2)
      }
      const broken = await page.locator('img').evaluateAll((images) => images.filter((image) => image.complete && !image.naturalWidth).length)
      expect(broken).toBe(0)
      await page.screenshot({ path: testInfo.outputPath(`${path.replaceAll('/', '-') || 'home'}-${width}.png`), fullPage: true })
    }
    await page.goto('/')
    expect((await page.locator('footer h3').allTextContents()).slice(0, 4)).toEqual(['Products', 'Services', 'Projects', 'Contact'])
    await expect(page.locator('footer a[href="/floor-tiles"]')).toHaveCount(1)
    await expect(page.locator('footer a[href="/projects"]')).toHaveCount(1)
    const slides = page.getByRole('button', { name: /^Show .* hero image$/ })
    await slides.nth(1).click()
    await expect(slides.nth(1)).toHaveAttribute('aria-current', 'true')
    await page.goto('/projects')
    await page.getByRole('button', { name: /^Open project image:/ }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    expect(errors).toEqual([])
  })
}
