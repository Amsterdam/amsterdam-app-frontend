import {SentryLogKey, sentryWhitelist} from '@/types/sentry'

export const sentryLogData = (
  logKey: SentryLogKey,
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
