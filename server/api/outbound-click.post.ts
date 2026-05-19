import { useRuntimeConfig } from '#imports'
import { defineEventHandler, readBody, setResponseStatus, type H3Event } from 'h3'
import { assertAnonymousClickIsSafe, createConsentAwareOutboundClick } from '~~/shared/domain/clickTracking'
import type { OutboundClickRequestBody, OutboundClickResponseBody } from '~~/shared/types/affiliate'
import type { ClickConsentState, OutboundClickInsert, TrackingScope } from '~~/shared/types/database'

interface SupabaseRestConfig {
  supabaseUrl: string
  supabaseServiceRoleKey: string
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && Array.isArray(value) === false
}

const isClickConsentState = (value: unknown): value is ClickConsentState => {
  if (value === 'unknown') {
    return true
  }

  if (value === 'accepted') {
    return true
  }

  return value === 'rejected'
}

const getStringField = (body: Record<string, unknown>, key: string): string | null => {
  const value: unknown = body[key]

  if (typeof value !== 'string') {
    return null
  }

  return value
}

const getUtmContext = (body: Record<string, unknown>): Record<string, string> => {
  const rawContext: unknown = body.utmContext

  if (isRecord(rawContext) === false) {
    return {}
  }

  const context: Record<string, string> = {}

  Object.entries(rawContext).forEach((entry: [string, unknown]): void => {
    const [key, value]: [string, unknown] = entry

    if (typeof value !== 'string') {
      return
    }

    context[key] = value
  })

  return context
}

const createClickRequest = (body: unknown): OutboundClickRequestBody | null => {
  if (isRecord(body) === false) {
    return null
  }

  const parkId: string | null = getStringField(body, 'parkId')
  const destinationUrlKey: string | null = getStringField(body, 'destinationUrlKey')
  const pagePath: string | null = getStringField(body, 'pagePath')
  const clickedAt: string = getStringField(body, 'clickedAt') ?? new Date().toISOString()
  const consentState: unknown = body.consentState

  if (parkId === null || destinationUrlKey === null || pagePath === null || isClickConsentState(consentState) === false) {
    return null
  }

  return {
    parkId,
    destinationUrlKey,
    pagePath,
    consentState,
    clickedAt,
    utmContext: getUtmContext(body),
  }
}

const getSupabaseRestConfig = (event: H3Event): SupabaseRestConfig | null => {
  const runtimeConfig = useRuntimeConfig(event)
  const supabaseUrl: string = String(runtimeConfig.supabaseUrl ?? '')
  const supabaseServiceRoleKey: string = String(runtimeConfig.supabaseServiceRoleKey ?? '')

  if (supabaseUrl.length === 0 || supabaseServiceRoleKey.length === 0) {
    return null
  }

  return {
    supabaseUrl,
    supabaseServiceRoleKey,
  }
}

const toSupabasePayload = (click: OutboundClickInsert): Record<string, unknown> => {
  return {
    park_id: click.parkId,
    destination_url_key: click.destinationUrlKey,
    page_path: click.pagePath,
    consent_state: click.consentState,
    tracking_scope: click.trackingScope,
    utm_context: click.utmContext,
    clicked_at: click.clickedAt,
  }
}

const storeClickInSupabase = async (event: H3Event, click: OutboundClickInsert): Promise<boolean> => {
  const config: SupabaseRestConfig | null = getSupabaseRestConfig(event)

  if (config === null) {
    return false
  }

  const response: Response = await fetch(`${config.supabaseUrl}/rest/v1/outbound_clicks`, {
    method: 'POST',
    body: JSON.stringify(toSupabasePayload(click)),
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
  })

  return response.ok
}

const tryStoreClick = async (event: H3Event, click: OutboundClickInsert): Promise<boolean> => {
  try {
    return await storeClickInSupabase(event, click)
  } catch (error: unknown) {
    return false
  }
}

const assertClickSafety = (click: OutboundClickInsert): void => {
  if (click.trackingScope !== 'anonymous_functional') {
    return
  }

  assertAnonymousClickIsSafe(click)
}

export default defineEventHandler(async (event): Promise<OutboundClickResponseBody> => {
  const requestBody: unknown = await readBody(event)
  const clickRequest: OutboundClickRequestBody | null = createClickRequest(requestBody)

  if (clickRequest === null) {
    setResponseStatus(event, 400)

    return {
      stored: false,
      trackingScope: 'anonymous_functional' satisfies TrackingScope,
    }
  }

  const click: OutboundClickInsert = createConsentAwareOutboundClick(clickRequest)
  assertClickSafety(click)

  return {
    stored: await tryStoreClick(event, click),
    trackingScope: click.trackingScope,
  }
})
