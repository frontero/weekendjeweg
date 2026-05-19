import { fetchTradeTrackerFeedProducts, type TradeTrackerSoapFetcher } from './tradeTrackerSoapClient'
import type {
  ImportAccessCheckResult,
  LandalImportResponseBody,
  TradeTrackerFeedImportResult,
  TradeTrackerImportConfig,
} from '../types/importPipeline'

const credentialLabels: Record<keyof TradeTrackerImportConfig, string> = {
  accessKey: 'TRADETRACKER_ACCESS_KEY',
  affiliateSiteId: 'TRADETRACKER_AFFILIATE_SITE_ID',
  campaignId: 'TRADETRACKER_LANDAL_CAMPAIGN_ID',
  customerId: 'TRADETRACKER_CUSTOMER_ID',
  importCronSecret: 'IMPORT_CRON_SECRET',
}

const hasText = (value: string): boolean => {
  return value.trim().length > 0
}

const getMissingCredentialNames = (config: TradeTrackerImportConfig): string[] => {
  const missingCredentialNames: string[] = []

  Object.entries(credentialLabels).forEach((entry: [string, string]): void => {
    const [key, label]: [string, string] = entry
    const value: string = config[key as keyof TradeTrackerImportConfig]

    if (hasText(value) === false) {
      missingCredentialNames.push(label)
    }
  })

  return missingCredentialNames
}

const createFailureMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return `TradeTracker feed-import is mislukt: ${error.message}`
  }

  return 'TradeTracker feed-import is mislukt door een onbekende fout.'
}

export const validateImportAccess = (configuredSecret: string, providedSecret: string | null): ImportAccessCheckResult => {
  if (hasText(configuredSecret) === false) {
    return {
      allowed: false,
      message: 'Import secret ontbreekt in runtime-config.',
    }
  }

  if (providedSecret === null) {
    return {
      allowed: false,
      message: 'Import secret ontbreekt in request.',
    }
  }

  if (providedSecret !== configuredSecret) {
    return {
      allowed: false,
      message: 'Import secret is ongeldig.',
    }
  }

  return {
    allowed: true,
    message: 'Import request is geautoriseerd.',
  }
}

export const createLandalImportPlan = (config: TradeTrackerImportConfig): LandalImportResponseBody => {
  const missingCredentialNames: string[] = getMissingCredentialNames(config)

  if (missingCredentialNames.length > 0) {
    return {
      credentialStatus: 'missing',
      message: `Landal import geblokkeerd; ontbrekende configuratie: ${missingCredentialNames.join(', ')}.`,
      recordsImported: 0,
      sourceType: 'api_feed',
      status: 'blocked',
    }
  }

  return {
    credentialStatus: 'configured',
    message: 'TradeTracker configuratie is aanwezig; feed-import kan starten.',
    recordsImported: 0,
    sourceType: 'api_feed',
    status: 'pending',
  }
}

export const runLandalTradeTrackerImport = async (
  config: TradeTrackerImportConfig,
  fetcher: TradeTrackerSoapFetcher = fetch,
): Promise<LandalImportResponseBody> => {
  const importPlan: LandalImportResponseBody = createLandalImportPlan(config)

  if (importPlan.status === 'blocked') {
    return importPlan
  }

  try {
    const result: TradeTrackerFeedImportResult = await fetchTradeTrackerFeedProducts(config, fetcher)

    return {
      credentialStatus: 'configured',
      message: `TradeTracker feed opgehaald; ${result.recordsImported} productrecords klaar voor normalisatie.`,
      recordsImported: result.recordsImported,
      sourceType: 'api_feed',
      status: 'success',
    }
  } catch (error: unknown) {
    return {
      credentialStatus: 'configured',
      message: createFailureMessage(error),
      recordsImported: 0,
      sourceType: 'api_feed',
      status: 'failed',
    }
  }
}
