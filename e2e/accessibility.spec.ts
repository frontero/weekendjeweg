import { AxeBuilder } from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

interface AccessibilityAuditPage {
  name: string
  path: string
}

const consentStorageKey = 'weekendjeweg.analytics-consent'
const axeTags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
const auditPages: AccessibilityAuditPage[] = [
  { name: 'home', path: '/' },
  { name: 'parks overview', path: '/parken' },
  { name: 'park detail', path: '/parken/landal-de-vers' },
  { name: 'accommodation overview', path: '/parken/landal-de-vers/accommodaties' },
  { name: 'region overview', path: '/regio/nederland' },
  { name: 'accessibility statement', path: '/toegankelijkheid' },
]

const setConsentChoice = async (page: Page): Promise<void> => {
  await page.addInitScript((storageKey: string): void => {
    window.localStorage.setItem(storageKey, 'rejected')
  }, consentStorageKey)
}

const runAccessibilityAudit = async (page: Page): Promise<void> => {
  const results = await new AxeBuilder({ page })
    .withTags(axeTags)
    .analyze()

  expect(results.violations).toEqual([])
}

test.describe('EAA 2025 accessibility gate', () => {
  for (const auditPage of auditPages) {
    test(`${auditPage.name} has no automated WCAG A/AA violations`, async ({ page }) => {
      await setConsentChoice(page)
      await page.goto(auditPage.path)

      await expect(page.locator('main')).toBeVisible()
      await runAccessibilityAudit(page)
    })
  }

  test('custom travel datepicker remains accessible when open', async ({ page }) => {
    await setConsentChoice(page)
    await page.goto('/parken/landal-de-vers/accommodaties')

    await page.getByRole('button', { name: 'Aankomst Kies datum' }).click()
    await expect(page.getByRole('dialog', { name: 'Kalender' })).toBeVisible()
    await runAccessibilityAudit(page)

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Kalender' })).toBeHidden()
  })
})
