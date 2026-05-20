import type { AffiliateLinkTemplateRecord, ParkRecord } from '../types/database'
import type { AffiliateTrackingParameters, AffiliateUrlResult, BuildAffiliateUrlInput } from '../types/affiliate'

const fallbackLandalUrl = 'https://www.landal.nl/'

const defaultTrackingParameters: Required<AffiliateTrackingParameters> = {
  source: 'weekendjeweg',
  medium: 'affiliate',
  campaign: 'landal-tradetracker',
  content: 'landal',
}

const createUrl = (rawUrl: string): URL => {
  if (rawUrl.length === 0) {
    return new URL(fallbackLandalUrl)
  }

  return new URL(rawUrl)
}

const isLandalHost = (hostname: string): boolean => {
  if (hostname === 'www.landal.nl') {
    return true
  }

  return hostname.endsWith('.landal.nl') === true
}

const resolveDestinationPath = (park: ParkRecord, destinationUrl: string | undefined): string => {
  const rawDestinationUrl: string = destinationUrl ?? park.sourceUrl
  const sourceUrl: URL = createUrl(rawDestinationUrl)

  if (isLandalHost(sourceUrl.hostname) === false) {
    return rawDestinationUrl
  }

  return `${sourceUrl.pathname}${sourceUrl.search}${sourceUrl.hash}`
}

const resolveBaseUrl = (park: ParkRecord, template: AffiliateLinkTemplateRecord | null): string => {
  if (template === null) {
    return park.sourceUrl
  }

  if (template.status === 'disabled') {
    return park.sourceUrl
  }

  return template.baseUrl
}

const createDestinationUrlKey = (
  park: ParkRecord,
  template: AffiliateLinkTemplateRecord | null,
  destinationPath: string,
): string => {
  if (template === null) {
    return `${park.slug}:source-fallback:${destinationPath}`
  }

  return `${park.slug}:${template.status}:${template.id}:${destinationPath}`
}

const addQueryParameter = (url: URL, key: string, value: string | undefined): void => {
  if (value === undefined) {
    return
  }

  if (value.length === 0) {
    return
  }

  url.searchParams.set(key, value)
}

const normaliseTrackingTemplate = (trackingTemplate: string): string => {
  if (trackingTemplate.startsWith('?') === true) {
    return trackingTemplate.slice(1)
  }

  return trackingTemplate
}

const replaceTemplateVariables = (template: string, variables: Record<string, string>): string => {
  return Object.entries(variables).reduce((result: string, entry: [string, string]): string => {
    const [key, value]: [string, string] = entry

    return result.replaceAll(`{${key}}`, encodeURIComponent(value))
  }, template)
}

const addTemplateParameters = (url: URL, template: AffiliateLinkTemplateRecord | null, variables: Record<string, string>): void => {
  if (template === null || template.trackingTemplate === null) {
    return
  }

  const expandedTemplate: string = replaceTemplateVariables(normaliseTrackingTemplate(template.trackingTemplate), variables)
  const templateParameters: URLSearchParams = new URLSearchParams(expandedTemplate)

  templateParameters.forEach((value: string, key: string): void => {
    addQueryParameter(url, key, value)
  })
}

const addWeekendjewegParameters = (url: URL, park: ParkRecord, pagePath: string, trackingParameters: AffiliateTrackingParameters | undefined): void => {
  addQueryParameter(url, 'wjw_source', trackingParameters?.source ?? defaultTrackingParameters.source)
  addQueryParameter(url, 'wjw_medium', trackingParameters?.medium ?? defaultTrackingParameters.medium)
  addQueryParameter(url, 'wjw_campaign', trackingParameters?.campaign ?? defaultTrackingParameters.campaign)
  addQueryParameter(url, 'wjw_content', trackingParameters?.content ?? park.slug)
  addQueryParameter(url, 'wjw_page', pagePath)
}

export const buildAffiliateUrl = (input: BuildAffiliateUrlInput): AffiliateUrlResult => {
  const baseUrl: string = resolveBaseUrl(input.park, input.template)
  const url: URL = createUrl(baseUrl)
  const destinationPath: string = resolveDestinationPath(input.park, input.destinationUrl)
  const variables: Record<string, string> = {
    campaign: input.trackingParameters?.campaign ?? defaultTrackingParameters.campaign,
    landalPath: destinationPath,
    parkCode: input.park.landalParkCode ?? input.park.slug,
    parkSlug: input.park.slug,
    source: input.trackingParameters?.source ?? defaultTrackingParameters.source,
  }

  addWeekendjewegParameters(url, input.park, input.pagePath, input.trackingParameters)
  addTemplateParameters(url, input.template, variables)

  return {
    url: url.toString(),
    destinationUrlKey: createDestinationUrlKey(input.park, input.template, destinationPath),
    status: input.template?.status ?? 'source_fallback',
  }
}
