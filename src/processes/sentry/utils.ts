import {sentryWhitelist} from '@/processes/sentry/constants'
import {SentryErrorLogKey} from '@/processes/sentry/types'

/**
 * Get only whitelisted data for Sentry
 */
export const getFilteredSentryData = (
  logKey: SentryErrorLogKey,
  data?: Record<string, unknown>,
) => {
  if (!data || Object.keys(data).length === 0) {
    return undefined
  }

  return sentryWhitelist[logKey]?.reduce(
    (obj, key) => ({...obj, [key]: data[key]}),
    {},
  )
}

/**
 * Remove query string from URL as it may contain user data
 */
export const sanitizeUrl = (url: string) => (url ? url.split('?')[0] : '')
