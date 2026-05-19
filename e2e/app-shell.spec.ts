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
  await expect(page.getByText('3 parken gevonden')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bekijk Landal Miggelenberg' })).toBeVisible()
})

test('opens a park detail route from search', async ({ page }) => {
  await page.goto('/parken')
  await page.getByRole('link', { name: 'Bekijk Landal Miggelenberg' }).click()

  await expect(page.getByRole('heading', { name: 'Landal Miggelenberg' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bekijk bij Landal' })).toBeVisible()
})

test('keeps analytics behind an explicit consent choice', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('region', { name: 'Cookiekeuze' })).toBeVisible()
  await page.getByRole('button', { name: 'Alleen noodzakelijk' }).click()
  await expect(page.getByRole('region', { name: 'Cookiekeuze' })).toBeHidden()
})

test('exposes production SEO support routes', async ({ page }) => {
  const sitemapResponse = await page.goto('/sitemap.xml')
  const sitemapText: string = await page.textContent('body') ?? ''

  expect(sitemapResponse?.ok()).toBe(true)
  expect(sitemapText).toContain('/parken/landal-miggelenberg')

  const robotsResponse = await page.goto('/robots.txt')
  const robotsText: string = await page.textContent('body') ?? ''

  expect(robotsResponse?.ok()).toBe(true)
  expect(robotsText).toContain('Sitemap:')
})
