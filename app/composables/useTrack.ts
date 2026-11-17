export type TrackEvent =
  | 'whatsapp_click'
  | 'instagram_click'
  | 'add_to_order'
  | 'send_order'
  | 'use_estimate'
  | 'copy_message'

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
  dataLayer?: Record<string, unknown>[]
}

/**
 * Sends conversion events to Google Analytics 4, Meta Pixel or Tag Manager
 * when any of them is installed. Without them it does nothing.
 */
export function useTrack() {
  return (event: TrackEvent, data: Record<string, unknown> = {}) => {
    if (import.meta.server) return
    const w = window as AnalyticsWindow
    w.gtag?.('event', event, data)
    w.fbq?.('trackCustom', event, data)
    w.dataLayer?.push({ event, ...data })
  }
}
