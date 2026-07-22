import { buildRouteJsonLd, toAbsoluteUrl } from './seoManifest.js'

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const replaceOrInsertHeadTag = (html, selector, tag) => {
  const nextHtml = html.replace(selector, tag)
  if (nextHtml !== html) return nextHtml
  return html.replace('</head>', `  ${tag}\n</head>`)
}

export const injectRouteMetadata = (html, route) => {
  if (!route) return html

  const canonical = toAbsoluteUrl(route.path)
  const image = toAbsoluteUrl(route.image)
  const imageAlt = route.imageAlt || 'Kleihaus Ceramics tiles, sanitaryware, paints and finishing materials'
  const schema = buildRouteJsonLd(route)

  let nextHtml = html
  nextHtml = nextHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+property=["']og:image:alt["'][^>]*>/i,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  )
  nextHtml = replaceOrInsertHeadTag(
    nextHtml,
    /<meta\s+name=["']twitter:image:alt["'][^>]*>/i,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
  )

  if (schema) {
    const schemaTag = `<script id="kleihaus-route-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
    nextHtml = nextHtml.replace(/<script\s+id=["']kleihaus-route-schema["'][\s\S]*?<\/script>\s*/i, '')
    nextHtml = nextHtml.replace('</head>', `  ${schemaTag}\n</head>`)
  }

  return nextHtml
}
