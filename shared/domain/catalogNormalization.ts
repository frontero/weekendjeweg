export interface RawParkIdentity {
  name: string
  sourceUrl: string
  landalParkCode?: string | null
}

export interface NormalizedParkIdentity {
  slug: string
  sourceUrl: string
  landalParkCode: string | null
}

export const normaliseSlug = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const normaliseLandalParkCode = (landalParkCode: string | null | undefined, fallbackSlug: string): string | null => {
  if (landalParkCode === undefined || landalParkCode === null) {
    return fallbackSlug
  }

  if (landalParkCode.trim().length === 0) {
    return fallbackSlug
  }

  return normaliseSlug(landalParkCode)
}

const normaliseSourceUrl = (sourceUrl: string): string => {
  const url: URL = new URL(sourceUrl)

  if (url.protocol !== 'https:') {
    url.protocol = 'https:'
  }

  return url.toString()
}

export const normaliseParkIdentity = (rawPark: RawParkIdentity): NormalizedParkIdentity => {
  const slug: string = normaliseSlug(rawPark.name)

  return {
    slug,
    sourceUrl: normaliseSourceUrl(rawPark.sourceUrl),
    landalParkCode: normaliseLandalParkCode(rawPark.landalParkCode, slug),
  }
}
