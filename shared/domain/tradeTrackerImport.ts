import type {
  ImportAccessCheckResult,
  LandalImportResponseBody,
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
    message: 'TradeTracker configuratie is aanwezig; echte feed-client is de volgende implementatiestap.',
    recordsImported: 0,
    sourceType: 'api_feed',
    status: 'blocked',
  }
}
