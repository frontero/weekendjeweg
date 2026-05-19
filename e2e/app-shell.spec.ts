import { expect, test } from '@playwright/test'

test('shows the weekendjeweg app shell', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: 'Weekendjeweg' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Hoofdnavigatie' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Vind je volgende weekend weg' })).toBeVisible()
})
