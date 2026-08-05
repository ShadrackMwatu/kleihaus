import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const requiredGaEvents = [
  'quote_submit',
  'whatsapp_click',
  'phone_click',
  'email_click',
  'guide_click',
  'guide_view',
  'location_view',
  'cta_click',
]

const forbiddenSensitiveKeys = ['name', 'email', 'phone', 'message', 'requestdetails', 'details']
const eventSources = [
  'src/App.jsx',
  'src/Contact.jsx',
  'src/services/analyticsService.js',
]

const read = (path) => readFile(resolve(root, path), 'utf8')

const countMatches = (text, pattern) => [...text.matchAll(pattern)].length

const run = async () => {
  const issues = []
  const analyticsSource = await read('src/services/analyticsService.js')
  const indexHtml = await read('index.html')
  const sourceText = (await Promise.all(eventSources.map(read))).join('\n')

  for (const eventName of requiredGaEvents) {
    if (!analyticsSource.includes(`'${eventName}'`) && !analyticsSource.includes(`"${eventName}"`)) {
      issues.push(`Missing required GA4 event mapping/reference: ${eventName}`)
    }
  }

  const requiredTrackSources = {
    quote_submit: 'quote_form_submit_success',
    whatsapp_click: 'whatsapp_click',
    phone_click: 'phone_click',
    email_click: 'email_click',
    guide_click: 'guide',
    guide_view: 'guide_view',
    location_view: 'location_view',
    cta_click: 'cta_click',
  }

  for (const [gaEvent, sourceNeedle] of Object.entries(requiredTrackSources)) {
    if (!sourceText.includes(sourceNeedle)) {
      issues.push(`Missing source wiring for ${gaEvent} via ${sourceNeedle}`)
    }
  }

  if (!analyticsSource.includes('import.meta.env?.VITE_GA_MEASUREMENT_ID')) {
    issues.push('GA4 Measurement ID is not read from import.meta.env?.VITE_GA_MEASUREMENT_ID')
  }

  if (indexHtml.includes('googletagmanager.com/gtag/js') || indexHtml.includes('function gtag(')) {
    issues.push('Manual GA4 tag snippet appears in index.html')
  }

  const loaderCount = countMatches(analyticsSource, /googletagmanager\.com\/gtag\/js/g)
  if (loaderCount !== 1) {
    issues.push(`Expected one GA4 loader reference in analytics service, found ${loaderCount}`)
  }

  const configCount = countMatches(analyticsSource, /gtag\('config'|gtag\("config"/g)
  if (configCount !== 1) {
    issues.push(`Expected one GA4 config call in analytics service, found ${configCount}`)
  }

  if (!analyticsSource.includes('send_page_view: false')) {
    issues.push('GA4 config should keep send_page_view: false to avoid duplicate automatic page views')
  }

  if (!analyticsSource.includes("page_view: 'page_view'")) {
    issues.push('page_view is not explicitly mapped to GA4 page_view')
  }

  if (!analyticsSource.includes('page_location') || !analyticsSource.includes('page_title')) {
    issues.push('GA4 page_view payload is missing page_location or page_title support')
  }

  for (const key of forbiddenSensitiveKeys) {
    const sanitizerPattern = new RegExp(`['"]${key}['"]`, 'i')
    if (!sanitizerPattern.test(analyticsSource)) {
      issues.push(`Sensitive key ${key} is not listed in sanitizePayload guard`)
    }
  }

  const gaPayloadBlock = analyticsSource.match(/window\.gtag\('event'[\s\S]*?\n\s*\}\)/)?.[0] || ''
  for (const key of forbiddenSensitiveKeys) {
    const payloadPattern = new RegExp(`\\b${key}\\b`, 'i')
    if (payloadPattern.test(gaPayloadBlock)) {
      issues.push(`Sensitive key ${key} appears in GA4 event payload block`)
    }
  }

  if (issues.length) {
    console.error('Analytics event verification failed:')
    for (const issue of issues) console.error(`- ${issue}`)
    process.exitCode = 1
    return
  }

  console.log(`Analytics event verification passed for ${requiredGaEvents.length} required GA4 custom events.`)
}

await run()
