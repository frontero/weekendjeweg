import assert from 'node:assert/strict'
import test from 'node:test'

import { mockCatalog } from '../shared/data/mockCatalog'
import { listParks } from '../shared/domain/catalogRepository'
import {
  createParkBreadcrumbStructuredData,
  createParkItemListStructuredData,
  createSitemapEntries,
  createWebsiteStructuredData,
  renderRobotsTxt,
  renderSitemapXml,
  serialiseStructuredData,
} from '../shared/domain/seo'
import type { ParkRecord } from '../shared/types/database'

const origin = 'https://weekendjeweg.test'

test('creates sitemap entries for indexable MVP routes without rich region pages', () => {
  const entries = createSitemapEntries(mockCatalog, origin)
  const locations: string[] = entries.map((entry): string => entry.loc)

  assert.equal(locations.includes(`${origin}/`), true)
  assert.equal(locations.includes(`${origin}/parken`), true)
  assert.equal(locations.includes(`${origin}/regio/veluwe`), false)
  assert.equal(locations.includes(`${origin}/parken/landal-miggelenberg`), true)
})

test('renders robots text with sitemap reference', () => {
  const robotsText: string = renderRobotsTxt(origin)

  assert.equal(robotsText.includes('User-agent: *'), true)
  assert.equal(robotsText.includes(`Sitemap: ${origin}/sitemap.xml`), true)
})

test('renders valid sitemap xml shell', () => {
  const sitemapXml: string = renderSitemapXml(createSitemapEntries(mockCatalog, origin))

  assert.equal(sitemapXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), true)
  assert.equal(sitemapXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), true)
})

test('keeps structured data free from unsupported availability and offer claims', () => {
  const parks: ParkRecord[] = listParks(mockCatalog)
  const structuredDataJson: string = serialiseStructuredData(createParkItemListStructuredData(origin, parks))

  assert.equal(structuredDataJson.includes('availability'), false)
  assert.equal(structuredDataJson.includes('Offer'), false)
})

test('creates conservative website and breadcrumb structured data', () => {
  const park: ParkRecord = listParks(mockCatalog)[0] as ParkRecord
  const websiteJson: string = serialiseStructuredData(createWebsiteStructuredData(origin))
  const breadcrumbJson: string = serialiseStructuredData(createParkBreadcrumbStructuredData(origin, park))

  assert.equal(websiteJson.includes('Weekendjeweg'), true)
  assert.equal(breadcrumbJson.includes(park.name), true)
  assert.equal(breadcrumbJson.includes('BreadcrumbList'), true)
})
