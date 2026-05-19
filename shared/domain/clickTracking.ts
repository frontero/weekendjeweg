import type { ClickConsentState, ISODateTime, OutboundClickInsert, TrackingScope, UUID } from '../types/database'

export interface AnonymousClickInput {
  parkId: UUID
  destinationUrlKey: string
  pagePath: string
  consentState: ClickConsentState
  clickedAt: ISODateTime
  utmContext?: Record<string, string>
}

export interface ConsentAwareClickInput extends AnonymousClickInput {}

const blockedAnonymousContextKeys: string[] = ['cookieid', 'cookie_id', 'userid', 'user_id', 'sessionid', 'session_id']

const isBlockedAnonymousContextKey = (contextKey: string): boolean => {
  const normalizedKey: string = contextKey.toLowerCase()

  return blockedAnonymousContextKeys.some((blockedKey: string): boolean => {
    return normalizedKey.includes(blockedKey) === true
  })
}

const filterAnonymousContext = (utmContext: Record<string, string> | undefined): Record<string, string> => {
  if (utmContext === undefined) {
    return {}
  }

  const safeContext: Record<string, string> = {}

  Object.entries(utmContext).forEach((entry: [string, string]): void => {
    const [contextKey, contextValue]: [string, string] = entry

    if (isBlockedAnonymousContextKey(contextKey) === true) {
      return
    }

    safeContext[contextKey] = contextValue
  })

  return safeContext
}

export const getTrackingScopeForConsent = (consentState: ClickConsentState): TrackingScope => {
  if (consentState === 'accepted') {
    return 'full_consent'
  }

  return 'anonymous_functional'
}

export const createAnonymousFunctionalClick = (input: AnonymousClickInput): OutboundClickInsert => {
  return {
    parkId: input.parkId,
    destinationUrlKey: input.destinationUrlKey,
    pagePath: input.pagePath,
    consentState: input.consentState,
    trackingScope: 'anonymous_functional',
    utmContext: filterAnonymousContext(input.utmContext),
    clickedAt: input.clickedAt,
  }
}

const createFullConsentClick = (input: ConsentAwareClickInput): OutboundClickInsert => {
  return {
    parkId: input.parkId,
    destinationUrlKey: input.destinationUrlKey,
    pagePath: input.pagePath,
    consentState: input.consentState,
    trackingScope: 'full_consent',
    utmContext: input.utmContext ?? {},
    clickedAt: input.clickedAt,
  }
}

export const createConsentAwareOutboundClick = (input: ConsentAwareClickInput): OutboundClickInsert => {
  const trackingScope: TrackingScope = getTrackingScopeForConsent(input.consentState)

  if (trackingScope === 'anonymous_functional') {
    return createAnonymousFunctionalClick(input)
  }

  return createFullConsentClick(input)
}

export const hasAnonymousIdentifierLeak = (click: OutboundClickInsert): boolean => {
  const serializedContext: string = JSON.stringify(click.utmContext).toLowerCase()

  return blockedAnonymousContextKeys.some((contextKey: string): boolean => {
    return serializedContext.includes(contextKey) === true
  })
}

export const assertAnonymousClickIsSafe = (click: OutboundClickInsert): void => {
  if (click.trackingScope !== 'anonymous_functional') {
    throw new Error('Expected anonymous functional tracking scope')
  }

  if (hasAnonymousIdentifierLeak(click) === true) {
    throw new Error('Anonymous click contains a blocked identifier key')
  }
}
