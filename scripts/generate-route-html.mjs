import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { seoRoutes } from '../src/seoManifest.js'
import { injectRouteMetadata } from '../src/seoHtml.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = resolve(__dirname, '../dist')
const indexPath = resolve(distPath, 'index.html')
const baseHtml = await readFile(indexPath, 'utf8')

const pageRoutes = seoRoutes.filter((route) => route.path !== '/')

await Promise.all(
  pageRoutes.map(async (route) => {
    const routeAssetPath = resolve(distPath, route.path.replace(/^\/+/, ''))
    await mkdir(dirname(routeAssetPath), { recursive: true })
    await writeFile(routeAssetPath, injectRouteMetadata(baseHtml, route), 'utf8')
  }),
)

console.log(`Generated ${pageRoutes.length} route-specific extensionless HTML files in ${distPath}`)
