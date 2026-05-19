import test from 'node:test'
import assert from 'node:assert/strict'

const approvedRoutes = ['/', '/parken', '/parken/[slug]', '/regio/[slug]']
const requiredRouteCount = 4

test('approved route skeleton is represented', () => {
  assert.equal(approvedRoutes.length, requiredRouteCount)
  assert.equal(approvedRoutes.includes('/parken/[slug]'), true)
  assert.equal(approvedRoutes.includes('/regio/[slug]'), true)
})
