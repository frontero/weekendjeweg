import assert from 'node:assert/strict'
import test from 'node:test'

import { resolveSiteOrigin } from '../shared/domain/siteOrigin'

test('uses fallback origin when configured site url is empty', () => {
  const origin: string = resolveSiteOrigin('', 'http://localhost:3000')

  assert.equal(origin, 'http://localhost:3000')
})

test('normalises configured production site url without trailing slash', () => {
  const origin: string = resolveSiteOrigin('https://frontero.github.io/weekendjeweg/', 'http://localhost:3000')

  assert.equal(origin, 'https://frontero.github.io/weekendjeweg')
})
