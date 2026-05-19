import { listParks } from './catalogRepository'
import { createParkDetailPath } from './parkPresentation'
import type { CatalogDataSet, ParkRecord } from '../types/database'

export type SitemapChangeFrequency = 'weekly' | 'monthly'
export type StructuredDataNode = Record<string, unknown>

export interface SitemapEntry {
  loc: string
  lastmod: string
  changefreq: SitemapChangeFrequency
  priority: string
}

const defaultLastModifiedDate = '2026-05-19'

const stripTrailingSlash = (value: string): string => {
  if (value.endsWith('/') === true) {
    return value.slice(0, -1)
  }

  return value
}

const escapeXml = (value: string): string => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const createCanonicalUrl = (origin: string, path: string): string => {
  const normalizedOrigin: string = stripTrailingSlash(origin)

  if (path === '/') {
    return `${normalizedOrigin}/`
  }

  return `${normalizedOrigin}${path}`
}

const createSitemapEntry = (
  origin: string,
  path: string,
  changefreq: SitemapChangeFrequency,
  priority: string,
): SitemapEntry => {
  return {
    loc: createCanonicalUrl(origin, path),
    lastmod: defaultLastModifiedDate,
    changefreq,
    priority,
  }
}

export const createSitemapEntries = (catalog: CatalogDataSet, origin: string): SitemapEntry[] => {
  const parkEntries: SitemapEntry[] = listParks(catalog).map((park: ParkRecord): SitemapEntry => {
    return createSitemapEntry(origin, createParkDetailPath(park), 'monthly', '0.7')
  })

  return [
    createSitemapEntry(origin, '/', 'weekly', '1.0'),
    createSitemapEntry(origin, '/parken', 'weekly', '0.9'),
    ...parkEntries,
  ]
}

const renderSitemapEntry = (entry: SitemapEntry): string => {
  return [
    '  <url>',
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>',
  ].join('\n')
}

export const renderSitemapXml = (entries: SitemapEntry[]): string => {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry: SitemapEntry): string => renderSitemapEntry(entry)),
    '</urlset>',
  ].join('\n')
}

export const renderRobotsTxt = (origin: string): string => {
  return [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${createCanonicalUrl(origin, '/sitemap.xml')}`,
    '',
  ].join('\n')
}

export const createWebsiteStructuredData = (origin: string): StructuredDataNode => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Weekendjeweg',
    url: createCanonicalUrl(origin, '/'),
    inLanguage: 'nl-NL',
  }
}

export const createParkItemListStructuredData = (origin: string, parks: ParkRecord[]): StructuredDataNode => {
  const itemListElement: StructuredDataNode[] = parks.map((park: ParkRecord, index: number): StructuredDataNode => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: park.name,
      url: createCanonicalUrl(origin, createParkDetailPath(park)),
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Landal-parken in Nederland vergelijken',
    itemListElement,
  }
}

export const createParkBreadcrumbStructuredData = (origin: string, park: ParkRecord): StructuredDataNode => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Weekendjeweg',
        item: createCanonicalUrl(origin, '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Parken',
        item: createCanonicalUrl(origin, '/parken'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: park.name,
        item: createCanonicalUrl(origin, createParkDetailPath(park)),
      },
    ],
  }
}

export const serialiseStructuredData = (structuredData: StructuredDataNode): string => {
  return JSON.stringify(structuredData)
}
