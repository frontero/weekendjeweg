import type { ImportRunStatus, ImportSourceType } from './database'

export interface TradeTrackerImportCredentials {
  accessKey: string
  affiliateSiteId: string
  campaignId: string
  customerId: string
}

export interface TradeTrackerImportConfig extends TradeTrackerImportCredentials {
  importCronSecret: string
}

export interface ImportAccessCheckResult {
  allowed: boolean
  message: string
}

export interface ImportPipelineResult {
  message: string
  recordsImported: number
  sourceType: ImportSourceType
  status: ImportRunStatus
}

export interface LandalImportResponseBody extends ImportPipelineResult {
  credentialStatus: 'missing' | 'configured'
}
