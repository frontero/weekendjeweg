import { defineEventHandler, getRequestURL, setHeader, type H3Event } from 'h3'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { createSitemapEntries, renderSitemapXml } from '~~/shared/domain/seo'

const getOrigin = (event: H3Event): string => {
  return getRequestURL(event).origin
}

export default defineEventHandler((event): string => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  return renderSitemapXml(createSitemapEntries(mockCatalog, getOrigin(event)))
})
