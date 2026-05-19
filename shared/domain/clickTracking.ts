import type { ClickConsentState, ISODateTime, OutboundClickInsert, UUID } from '../types/database'

export interface AnonymousClickInput {
  parkId: UUID
  destinationUrlKey: string
  pagePath: string
  consentState: ClickConsentState
  clickedAt: ISODateTime
  utmContext?: Record<string, string>
}

const blockedAnonymousContextKeys: string[] = ['cookieid', 'cookie_id', 'userid', 'user_id', 'sessionid', 'session_id']

export const createAnonymousFunctionalClick = (input: AnonymousClickInput): OutboundClickInsert => {
  return {
    parkId: input.parkId,
    destinationUrlKey: input.destinationUrlKey,
    pagePath: input.pagePath,
    consentState: input.consentState,
    trackingScope: 'anonymous_functional',
    utmContext: input.utmContext ?? {},
    clickedAt: input.clickedAt,
  }
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
