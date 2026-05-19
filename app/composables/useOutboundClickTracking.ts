import type { OutboundClickRequestBody, OutboundClickTrackInput } from '~~/shared/types/affiliate'

const createOutboundClickBody = (input: OutboundClickTrackInput): OutboundClickRequestBody => {
  return {
    parkId: input.parkId,
    destinationUrlKey: input.destinationUrlKey,
    pagePath: input.pagePath,
    consentState: input.consentState,
    clickedAt: input.clickedAt ?? new Date().toISOString(),
    utmContext: input.utmContext ?? {},
  }
}

const sendWithBeacon = (body: string): boolean => {
  if (import.meta.client === false) {
    return false
  }

  if (typeof navigator.sendBeacon !== 'function') {
    return false
  }

  const payload: Blob = new Blob([body], { type: 'application/json' })

  return navigator.sendBeacon('/api/outbound-click', payload)
}

const sendWithFetch = (body: string): void => {
  if (import.meta.client === false) {
    return
  }

  void fetch('/api/outbound-click', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
    keepalive: true,
  }).catch((): void => {})
}

export const useOutboundClickTracking = () => {
  const trackOutboundClick = (input: OutboundClickTrackInput): void => {
    const body: string = JSON.stringify(createOutboundClickBody(input))

    if (sendWithBeacon(body) === true) {
      return
    }

    sendWithFetch(body)
  }

  return {
    trackOutboundClick,
  }
}
