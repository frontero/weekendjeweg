import { defineEventHandler, getRequestURL, setHeader, type H3Event } from 'h3'
import { renderRobotsTxt } from '~~/shared/domain/seo'

const getOrigin = (event: H3Event): string => {
  return getRequestURL(event).origin
}

export default defineEventHandler((event): string => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

  return renderRobotsTxt(getOrigin(event))
})
