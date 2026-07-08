import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildSitemapXml } from '../src/seoManifest.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sitemapPath = resolve(__dirname, '../public/sitemap.xml')

await mkdir(dirname(sitemapPath), { recursive: true })
await writeFile(sitemapPath, buildSitemapXml(), 'utf8')

console.log(`Generated ${sitemapPath}`)
