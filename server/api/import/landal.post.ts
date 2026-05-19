import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getHeader, setResponseStatus, type H3Event } from 'h3'
import { createLandalImportPlan, validateImportAccess } from '~~/shared/domain/tradeTrackerImport'
import type { ImportAccessCheckResult, LandalImportResponseBody, TradeTrackerImportConfig } from '~~/shared/types/importPipeline'

const getRuntimeString = (value: unknown): string => {
  if (typeof value !== 'string') {
    return ''
  }

  return value
}

const getTradeTrackerImportConfig = (event: H3Event): TradeTrackerImportConfig => {
  const runtimeConfig = useRuntimeConfig(event)

  return {
    accessKey: getRuntimeString(runtimeConfig.tradeTrackerAccessKey),
    affiliateSiteId: getRuntimeString(runtimeConfig.tradeTrackerAffiliateSiteId),
    campaignId: getRuntimeString(runtimeConfig.tradeTrackerCampaignId),
    customerId: getRuntimeString(runtimeConfig.tradeTrackerCustomerId),
    importCronSecret: getRuntimeString(runtimeConfig.importCronSecret),
  }
}

const getProvidedSecret = (event: H3Event): string | null => {
  return getHeader(event, 'x-import-secret') ?? null
}

const createUnauthorizedResponse = (message: string): LandalImportResponseBody => {
  return {
    credentialStatus: 'missing',
    message,
    recordsImported: 0,
    sourceType: 'api_feed',
    status: 'blocked',
  }
}

export default defineEventHandler((event): LandalImportResponseBody => {
  const config: TradeTrackerImportConfig = getTradeTrackerImportConfig(event)
  const accessCheck: ImportAccessCheckResult = validateImportAccess(config.importCronSecret, getProvidedSecret(event))

  if (accessCheck.allowed === false) {
    setResponseStatus(event, 401)

    return createUnauthorizedResponse(accessCheck.message)
  }

  return createLandalImportPlan(config)
})
