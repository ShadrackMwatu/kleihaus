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
const routePaths = new Set(pageRoutes.map((route) => route.path))
const hasChildRoute = (path) => [...routePaths].some((routePath) => routePath.startsWith(`${path}/`))

await Promise.all(
  pageRoutes.map(async (route) => {
    const relativeRoutePath = route.path.replace(/^\/+/, '')
    const routeAssetPath = resolve(distPath, hasChildRoute(route.path) ? `${relativeRoutePath}/index.html` : relativeRoutePath)
    await mkdir(dirname(routeAssetPath), { recursive: true })
    await writeFile(routeAssetPath, injectRouteMetadata(baseHtml, route), 'utf8')
  }),
)

console.log(`Generated ${pageRoutes.length} route-specific HTML files in ${distPath}`)
