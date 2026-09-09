import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174' })

test('commercial blocks share a consistent type hierarchy', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 960 })
    for (const path of ['/', '/tiles', '/sanitaryware', '/paints', '/adhesives-grout', '/installation-support', '/trade-projects']) {
      await page.goto(path)
      const styles = await page.locator('section h2, section h3').evaluateAll((nodes) => nodes.map((node) => {
        const style = getComputedStyle(node)
        return { tag: node.tagName, size: style.fontSize, spacing: style.letterSpacing, family: style.fontFamily }
      }))
      expect(new Set(styles.map((style) => style.family)).size).toBe(1)
      for (const style of styles) {
        expect(style.size).toBe(style.tag === 'H3' ? '16px' : width === 390 ? '20px' : '24px')
        expect(['normal', '0px']).toContain(style.spacing)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
  }
})
