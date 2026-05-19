import { useRuntimeConfig, useState } from '#app'
import { computed, onMounted, type ComputedRef, type Ref } from 'vue'
import type { ConsentStateApi } from '~~/shared/types/consent'
import type { ClickConsentState } from '~~/shared/types/database'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const storageKey = 'weekendjeweg.analytics-consent'
let hasLoadedGa4Script: boolean = false

const isKnownConsentState = (value: string | null): value is ClickConsentState => {
  if (value === 'accepted') {
    return true
  }

  if (value === 'rejected') {
    return true
  }

  return value === 'unknown'
}

const getStoredConsent = (): ClickConsentState => {
  if (import.meta.client === false) {
    return 'unknown'
  }

  const storedValue: string | null = localStorage.getItem(storageKey)

  if (isKnownConsentState(storedValue) === true) {
    return storedValue
  }

  return 'unknown'
}

const configureDataLayer = (measurementId: string): void => {
  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]): void => {
    if (window.dataLayer === undefined) {
      return
    }

    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { anonymize_ip: true })
}

const appendGa4Script = (measurementId: string): void => {
  if (import.meta.client === false || measurementId.length === 0 || hasLoadedGa4Script === true) {
    return
  }

  configureDataLayer(measurementId)

  const existingScript: HTMLScriptElement | null = document.querySelector(`script[data-weekendjeweg-ga4="${measurementId}"]`)

  if (existingScript !== null) {
    hasLoadedGa4Script = true
    return
  }

  const script: HTMLScriptElement = document.createElement('script')
  script.async = true
  script.dataset.weekendjewegGa4 = measurementId
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.append(script)
  hasLoadedGa4Script = true
}

const loadGa4IfAccepted = (consentState: ClickConsentState, measurementId: string): void => {
  if (consentState !== 'accepted') {
    return
  }

  appendGa4Script(measurementId)
}

const persistConsentState = (nextState: ClickConsentState): void => {
  if (import.meta.client === false) {
    return
  }

  localStorage.setItem(storageKey, nextState)
}

const setConsentState = (state: Ref<ClickConsentState>, nextState: ClickConsentState): void => {
  if (nextState === 'unknown') {
    return
  }

  state.value = nextState
  persistConsentState(nextState)
}

export const useConsentState = (): ConsentStateApi => {
  const runtimeConfig = useRuntimeConfig()
  const consentState: Ref<ClickConsentState> = useState<ClickConsentState>('weekendjeweg-consent-state', (): ClickConsentState => 'unknown')
  const measurementId = computed<string>(() => String(runtimeConfig.public.ga4MeasurementId ?? ''))
  const hasAcceptedAnalytics: ComputedRef<boolean> = computed<boolean>(() => consentState.value === 'accepted')
  const hasConsentChoice: ComputedRef<boolean> = computed<boolean>(() => consentState.value !== 'unknown')

  const acceptAnalytics = (): void => {
    setConsentState(consentState, 'accepted')
    loadGa4IfAccepted(consentState.value, measurementId.value)
  }

  const rejectAnalytics = (): void => {
    setConsentState(consentState, 'rejected')
  }

  onMounted((): void => {
    consentState.value = getStoredConsent()
    loadGa4IfAccepted(consentState.value, measurementId.value)
  })

  return {
    consentState,
    hasAcceptedAnalytics,
    hasConsentChoice,
    acceptAnalytics,
    rejectAnalytics,
  }
}
