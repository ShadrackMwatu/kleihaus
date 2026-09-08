import { test, expect } from '@playwright/test'
import { writeFile } from 'node:fs/promises'
import { seoConfig, normalizePathname } from '../src/seoManifest.js'

test('rendered routes expose usable SEO content', async ({ page }, testInfo) => {
  test.setTimeout(240000)
  const report = []
  const paths = new Set(seoConfig.map((route) => route.path))
  for (const route of seoConfig) {
    await page.goto(route.path, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical)
    const findings = await page.evaluate(() => {
      const visible = (node) => node.getClientRects().length > 0
      const headings = [...document.querySelectorAll('main h1, main h2, main h3')].filter(visible).map((node) => Number(node.tagName.slice(1)))
      return {
        headingSkips: headings.filter((level, index) => index > 0 && level > headings[index - 1] + 1).length,
        missingAlt: [...document.images].filter((image) => !image.hasAttribute('alt')).length,
        loadedBrokenImages: [...document.images].filter((image) => image.complete && !image.naturalWidth).length,
        mainWordCount: (document.querySelector('main')?.innerText || '').trim().split(/\s+/).filter(Boolean).length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        localPaths: [...document.querySelectorAll('a[href]')].map((anchor) => new URL(anchor.href)).filter((url) => url.origin === location.origin && !/\.[a-z0-9]+$/i.test(url.pathname)).map((url) => url.pathname),
      }
    })
    report.push({ path: route.path, ...findings, unmappedDestinations: [...new Set(findings.localPaths.filter((path) => !paths.has(normalizePathname(path))))] })
    expect.soft(findings.missingAlt, route.path).toBe(0)
    expect.soft(findings.loadedBrokenImages, route.path).toBe(0)
    expect.soft(findings.overflow, route.path).toBe(false)
    expect.soft(report[report.length - 1].unmappedDestinations, route.path).toEqual([])
  }
  const reportPath = testInfo.outputPath('rendered-seo-audit.json')
  await writeFile(reportPath, JSON.stringify({ note: 'Heading skips, word counts and unmapped destinations require review; word count is not a quality score. No forms submitted or external links followed.', routes: report }, null, 2))
  await testInfo.attach('rendered-seo-audit', { path: reportPath, contentType: 'application/json' })
  console.log(`Rendered SEO audit: ${report.length} routes; heading skips ${report.reduce((sum, row) => sum + row.headingSkips, 0)}; unmapped destinations ${new Set(report.flatMap((row) => row.unmappedDestinations)).size}.`)
})
