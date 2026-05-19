import type { ComputedRef, Ref } from 'vue'
import type { ClickConsentState } from './database'

export interface ConsentStateApi {
  consentState: Ref<ClickConsentState>
  hasAcceptedAnalytics: ComputedRef<boolean>
  hasConsentChoice: ComputedRef<boolean>
  acceptAnalytics: () => void
  rejectAnalytics: () => void
}
