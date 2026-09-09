import { test, expect } from '@playwright/test'

test.use({ baseURL: process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:5174' })

test('product interest reaches the existing endpoint without bypassing required details', async ({ page }) => {
  let payload
  await page.route('**/api/quote-request', async (route) => {
    payload = route.request().postDataJSON()
    await route.fulfill({ json: { success: true, email: { sent: true }, message: 'Test enquiry received.' } })
  })
  await page.goto('/sanitaryware')
  await page.getByRole('button', { name: /^Request quotation/ }).first().click()
  const form = page.locator('#contact form')
  await expect(form).toContainText('Enquiry about Sanitaryware')
  await form.locator('[name="name"]').fill('Verification only')
  await form.locator('[name="phone"]').fill('0700000000')
  await form.getByRole('button', { name: /Send quotation request/i }).click()
  await expect(form.getByRole('alert')).toContainText('Please describe what you need.')
  expect(payload).toBeUndefined()
  await form.locator('[name="message"]').fill('Please quote for two bathroom basins.')
  await form.getByRole('button', { name: /Send quotation request/i }).click()
  await expect(form.getByRole('status')).toContainText('Test enquiry received.')
  expect(payload.requestDetails).toBe('Interest: Sanitaryware\nPage: /sanitaryware\n\nPlease quote for two bathroom basins.')
  expect(payload.email).toBe('')
  await expect(form.locator('[name="message"]')).toHaveValue('')
  await expect(form.getByRole('button', { name: 'Clear selection' })).toHaveCount(0)
  await page.waitForTimeout(8500)
  await expect(form.getByRole('status')).toContainText('Test enquiry received.')
})

test('failed enquiries preserve details and permit an email-only retry', async ({ page }) => {
  let attempts = 0
  await page.route('**/api/quote-request', async (route) => {
    attempts += 1
    await route.fulfill(attempts === 1 ? { status: 503, json: { success: false, message: 'Test service unavailable.' } } : { json: { success: true, email: { sent: true }, message: 'Test retry received.' } })
  })
  await page.goto('/tiles')
  await page.getByRole('button', { name: /^Request quotation/ }).first().click()
  const form = page.locator('#contact form')
  await form.getByRole('button', { name: 'Clear selection' }).click()
  await form.locator('[name="name"]').fill('Verification only')
  await form.locator('[name="email"]').fill('verification@example.invalid')
  await form.locator('[name="message"]').fill('Please discuss floor tile options.')
  await form.getByRole('button', { name: /Send quotation request/i }).click()
  await expect(form.getByRole('status')).toContainText('Test service unavailable.')
  await expect(form.locator('[name="message"]')).toHaveValue('Please discuss floor tile options.')
  await form.getByRole('button', { name: /Send quotation request/i }).click()
  await expect(form.getByRole('status')).toContainText('Test retry received.')
  expect(attempts).toBe(2)
})
