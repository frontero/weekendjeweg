export const resolveSiteOrigin = (configuredSiteUrl: unknown, fallbackOrigin: string): string => {
  if (typeof configuredSiteUrl !== 'string') {
    return fallbackOrigin
  }

  const trimmedSiteUrl: string = configuredSiteUrl.trim()

  if (trimmedSiteUrl.length === 0) {
    return fallbackOrigin
  }

  if (trimmedSiteUrl.endsWith('/') === true) {
    return trimmedSiteUrl.slice(0, -1)
  }

  return trimmedSiteUrl
}
