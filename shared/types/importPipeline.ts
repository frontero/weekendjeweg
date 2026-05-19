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

export interface TradeTrackerFeedProductAdditional {
  name: string
  value: string
}

export interface TradeTrackerFeedProduct {
  additional: TradeTrackerFeedProductAdditional[]
  description: string | null
  identifier: string
  imageUrl: string | null
  name: string
  priceAmount: number
  productCategoryName: string | null
  productUrl: string
}

export interface TradeTrackerFeedImportResult {
  products: TradeTrackerFeedProduct[]
  recordsImported: number
}
