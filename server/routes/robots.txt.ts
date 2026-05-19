import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRequestURL, setHeader, type H3Event } from 'h3'
import { renderRobotsTxt } from '~~/shared/domain/seo'
import { resolveSiteOrigin } from '~~/shared/domain/siteOrigin'

const getOrigin = (event: H3Event): string => {
  const runtimeConfig = useRuntimeConfig(event)

  return resolveSiteOrigin(runtimeConfig.public.siteUrl, getRequestURL(event).origin)
}

export default defineEventHandler((event): string => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

  return renderRobotsTxt(getOrigin(event))
})
