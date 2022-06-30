import {useMemo} from 'react'
import {getCaptureSentryBreadcrumb, getSendSentryErrorLog} from '@/processes'
import {SentryHandler} from '@/types'

/**
 * Get logging and breadcrumb functions. If we call useSentry with dangerouslyOverrideConsent, we can log before the consent settings are initialized or indeed without consent.
 * In this case, we log the message and category or filename by default and the additional data only if dangerouslyLogAdditionalDataAnyway is true.
 * Note: only use this if you HAVE TO and make sure you're not sending any personal data!
 */
export const useSentry = (
  dangerouslyOverrideConsent: boolean = false,
  dangerouslyLogAdditionalDataAnyway: boolean = false,
): SentryHandler => {
  // @TODO: when we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting
  const consent = true
  return useMemo(() => {
    if (consent || dangerouslyOverrideConsent) {
      return {
        captureSentryBreadcrumb: getCaptureSentryBreadcrumb(
          consent || dangerouslyLogAdditionalDataAnyway,
        ),
        sendSentryErrorLog: getSendSentryErrorLog(
          consent || dangerouslyLogAdditionalDataAnyway,
        ),
      }
    }
    return {
      captureSentryBreadcrumb: () => {},
      sendSentryErrorLog: () => {},
    }
  }, [consent, dangerouslyOverrideConsent, dangerouslyLogAdditionalDataAnyway])
}
