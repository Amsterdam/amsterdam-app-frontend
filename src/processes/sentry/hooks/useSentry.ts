import {useMemo} from 'react'
import {getSendSentryErrorLog} from '@/processes/sentry/logging'
import {SentryHandler} from '@/processes/sentry/types'

export {SentryErrorLogKey} from '@/processes/sentry/types'

/**
 * Get logging and breadcrumb functions. If we call useSentry with dangerouslyOverrideConsent, we can log before the consent settings are initialized or indeed without consent.
 * In this case, we log the message and category or filename by default and the additional data only if dangerouslyLogAdditionalDataAnyway is true.
 * Note: only use this if you HAVE TO and make sure you're not sending any personal data!
 */
export const useSentry = (): SentryHandler =>
  useMemo(
    () => ({
      sendSentryErrorLog: getSendSentryErrorLog(true),
    }),
    [],
  )
