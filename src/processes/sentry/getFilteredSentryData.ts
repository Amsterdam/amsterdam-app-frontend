import {sentryAllowList} from '@/processes/sentry/allowList'
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

  return (sentryAllowList[logKey] as readonly string[])?.reduce(
    (obj, key) => ({...obj, [key]: data[key]}),
    {},
  )
}
