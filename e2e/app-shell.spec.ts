import { expect, test } from '@playwright/test'

test('shows the Weekendjeweg Nuxt shell and core navigation', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: 'Weekendjeweg' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Parken' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Vind je volgende weekendje weg' })).toBeVisible()
})

test('opens the park search route', async ({ page }) => {
  await page.goto('/parken')

  await expect(page.getByRole('heading', { name: 'Vergelijk Landal-parken' })).toBeVisible()
  await expect(page.getByLabel('Regio')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bekijk park' })).toBeVisible()
})
