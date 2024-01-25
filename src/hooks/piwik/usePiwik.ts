/* eslint-disable @typescript-eslint/no-empty-function */
import {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {useContext} from 'react'
import {useRoute} from '@/hooks/navigation/useRoute'
import {SentryErrorLogKey, useSentry} from '@/processes/sentry/hooks/useSentry'
import {SendErrorLog} from '@/processes/sentry/types'
import {PiwikContext} from '@/providers/piwik.provider'
import {Piwik} from '@/types/piwik'
export {
  PiwikAction,
  PiwikCategory,
  PiwikDimension,
  PiwikSessionDimension,
} from '@/types/piwik'

// if Piwik is not initialized, we return dummy methods to make it fail silently.
const defaultPiwikContext: Piwik = {
  trackCustomEvent: () => {},
  trackOutlink: () => {},
  trackScreen: () => {},
  trackSearch: () => {},
}

const FILE_NAME = 'usePiwik.ts'

// We can extend the default Piwik methods here, e.g. to automatically add the route name
const getPiwik = (
  {trackCustomEvent, trackOutlink, trackScreen, trackSearch}: PiwikProSdkType,
  sendSentryErrorLog: SendErrorLog,
  routeName?: string,
): Piwik => ({
  trackCustomEvent: (category, action, options) => {
    trackCustomEvent(category, action, {path: routeName, ...options}).catch(
      () => {
        sendSentryErrorLog(SentryErrorLogKey.piwikTrackCustomEvent, FILE_NAME, {
          category,
          action,
          name: options?.name,
        })
      },
    )
  },
  trackOutlink: (url, ...rest) => {
    trackOutlink(url, ...rest).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackOutlink, FILE_NAME, {
        url,
      })
    })
  },
  trackScreen: (path, ...rest) => {
    trackScreen(path, ...rest).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackScreen, FILE_NAME, {
        path,
      })
    })
  },
  trackSearch: (...args) => {
    trackSearch(...args).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackSearch, FILE_NAME)
    })
  },
})

export const usePiwik = (): Piwik => {
  const {name} = useRoute()
  const PiwikInstance = useContext(PiwikContext)
  const {sendSentryErrorLog} = useSentry()

  if (!PiwikInstance) {
    return defaultPiwikContext
  }

  return getPiwik(PiwikInstance, sendSentryErrorLog, name)
}
