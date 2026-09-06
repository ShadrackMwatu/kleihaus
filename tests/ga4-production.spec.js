import { expect, test } from '@playwright/test'

const EXPECTED_EVENTS = [
  'page_view',
  'cta_click',
  'whatsapp_click',
  'phone_click',
  'email_click',
  'guide_click',
  'guide_view',
  'location_view',
  'quote_submit',
]

const isGa4CollectRequest = (request) => {
  const url = request.url()
  return url.includes('google-analytics.com/g/collect') || url.includes('analytics.google.com/g/collect')
}

const isGoogleTagLoader = (request) => request.url().includes('googletagmanager.com/gtag/js')

const extractEventName = (request) => {
  const url = request.url()
  const body = request.postData() || ''
  const combined = `${url}&${body}`
  return [...combined.matchAll(/[?&\n]en=([^&\n]+)/g)].map((match) => decodeURIComponent(match[1].replace(/\+/g, ' ')))
}

const extractBackendEventName = (request) => {
  try {
    const data = JSON.parse(request.postData() || '{}')
    return data.eventType || null
  } catch {
    return null
  }
}

const redactedTid = (request) => {
  try {
    const tid = new URL(request.url()).searchParams.get('tid')
    if (!tid) return null
    return `${tid.slice(0, 2)}...${tid.slice(-2)}`
  } catch {
    return null
  }
}

test('live production sends expected GA4 events for safe interactions', async ({ page }, testInfo) => {
  test.setTimeout(240_000)
  const googleTagRequests = []
  const collectRequests = []
  const backendTrackRequests = []
  const events = []
  const backendEvents = []
  let initialGoogleTagLoaderCount = 0

  page.on('request', (request) => {
    if (isGoogleTagLoader(request)) googleTagRequests.push({ url: request.url(), method: request.method() })

    if (isGa4CollectRequest(request)) {
      const eventNames = extractEventName(request)
      collectRequests.push({
        eventNames,
        method: request.method(),
        tid: redactedTid(request),
      })
      events.push(...eventNames)
    }

    if (request.url().includes('/api/track-event')) {
      const eventName = extractBackendEventName(request)
      backendTrackRequests.push({ eventName, method: request.method() })
      if (eventName) backendEvents.push(eventName)
    }
  })

  await page.addInitScript(() => {
    window.open = () => null
    document.addEventListener(
      'click',
      (event) => {
        const anchor = event.target?.closest?.('a[href]')
        if (!anchor) return

        const href = anchor.getAttribute('href') || ''
        const absoluteHref = anchor.href || href
        if (/^(tel:|mailto:)/i.test(href)) {
          event.preventDefault()
        }
      },
      true,
    )
  })

  await page.route('**/api/quote-request', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: 'GA4 verification test request intercepted by Playwright.',
        storage: { stored: false },
        email: { sent: true, provider: 'playwright-intercept' },
        reference: 'ga4-playwright-verification',
      }),
    })
  })

  await page.route('https://wa.me/**', async (route) => {
    await route.fulfill({ status: 204 })
  })

  await page.route('https://api.whatsapp.com/**', async (route) => {
    await route.fulfill({ status: 204 })
  })

  const waitForEvent = async (eventName, action) => {
    const before = events.filter((event) => event === eventName).length
    if (action) await action()
    await expect.soft
      .poll(() => events.filter((event) => event === eventName).length, {
        message: `GA4 event ${eventName} should be captured. Observed GA4 events: ${[...new Set(events)].join(', ') || 'none'}. Observed backend events: ${[...new Set(backendEvents)].join(', ') || 'none'}`,
        timeout: 30_000,
      })
      .toBeGreaterThan(before)
  }

  const homeUrl = '/?utm_source=playwright&utm_medium=e2e&utm_campaign=ga4_production_verification'
  const goHomeAndWaitForPageView = async () => {
    await waitForEvent('page_view', async () => {
      await page.goto(homeUrl, { waitUntil: 'domcontentloaded' })
    })
  }

  try {
    await goHomeAndWaitForPageView()
    await expect.poll(() => googleTagRequests.length, { timeout: 20_000 }).toBe(1)
    initialGoogleTagLoaderCount = googleTagRequests.length

    await waitForEvent('cta_click', async () => {
      await page.getByRole('button', { name: /explore products/i }).first().click()
    })

    await goHomeAndWaitForPageView()

    const contact = page.locator('#contact')
    await contact.scrollIntoViewIfNeeded()
    await waitForEvent('whatsapp_click', async () => {
      await contact.locator('a[href*="wa.me"]').first().click()
    })

    await waitForEvent('phone_click', async () => {
      await contact.locator('a[href^="tel:"]').first().click()
    })

    await waitForEvent('email_click', async () => {
      await contact.locator('a[href^="mailto:"]').first().click()
    })

    await waitForEvent('location_view', async () => {
      await page.goto('/locations/nairobi?utm_source=playwright&utm_medium=e2e&utm_campaign=ga4_production_verification', {
        waitUntil: 'domcontentloaded',
      })
    })

    await goHomeAndWaitForPageView()

    await waitForEvent('guide_click', async () => {
      await page.locator('#faq a[href="/tile-buying-guide"]').click()
    })
    await waitForEvent('guide_view', async () => {
      await page.goto('/tile-buying-guide', { waitUntil: 'domcontentloaded' })
    })

    await goHomeAndWaitForPageView()
    await contact.scrollIntoViewIfNeeded()

    await contact.locator('input[name="name"]').fill('GA4 Verification Test')
    await contact.locator('input[name="email"]').fill('ga4-verification@example.invalid')
    await contact.locator('input[name="phone"]').fill('0700000000')
    await contact.locator('input[name="location"]').fill('Playwright verification')
    await contact
      .locator('textarea[name="message"]')
      .fill('Playwright GA4 verification request. Intercepted before production backend.')

    await waitForEvent('quote_submit', async () => {
      await contact.getByRole('button', { name: /send quotation request/i }).click()
    })

    const confirmedEvents = [...new Set(events.filter((event) => EXPECTED_EVENTS.includes(event)))]
    const missingEvents = EXPECTED_EVENTS.filter((event) => !confirmedEvents.includes(event))

    expect(initialGoogleTagLoaderCount).toBe(1)
    expect(missingEvents, `Missing GA4 events: ${missingEvents.join(', ')}`).toEqual([])
    expect(collectRequests.some((request) => request.tid && !request.tid.includes('undefined'))).toBeTruthy()
  } finally {
    const confirmedEvents = [...new Set(events.filter((event) => EXPECTED_EVENTS.includes(event)))]
    const missingEvents = EXPECTED_EVENTS.filter((event) => !confirmedEvents.includes(event))
    await testInfo.attach('ga4-summary.json', {
      contentType: 'application/json',
      body: JSON.stringify(
        {
          initialGoogleTagLoaderCount,
          totalGoogleTagLoaderRequests: googleTagRequests.length,
          collectRequestCount: collectRequests.length,
          backendTrackRequestCount: backendTrackRequests.length,
          confirmedEvents,
          missingEvents,
          observedEventNames: [...new Set(events)],
          observedBackendEventNames: [...new Set(backendEvents)],
        },
        null,
        2,
      ),
    })
  }
})
