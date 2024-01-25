/* eslint-disable @typescript-eslint/no-empty-function */
import {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {useContext} from 'react'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useSentry} from '@/hooks/sentry/useSentry'
import {PiwikContext} from '@/providers/piwik.provider'
import {Piwik} from '@/types/piwik'
import {SendErrorLog} from '@/types/sentry'
export {PiwikAction, PiwikCategory, PiwikDimensions} from '@/types/piwik'

// if Piwik is not initialized, we return dummy methods to make it fail silently.
const defaultPiwikContext: Piwik = {
  trackCustomEvent: () => {},
  trackScreen: () => {},
}

// we can extend the default Piwik methods here
const getPiwik = (
  {trackCustomEvent, trackScreen}: PiwikProSdkType,
  sendSentryErrorLog: SendErrorLog,
  routeName?: string,
): Piwik => ({
  trackCustomEvent: (category, action, options) => {
    trackCustomEvent(category, action, {path: routeName, ...options}).catch(
      () => {
        sendSentryErrorLog('trackCustomEvent failed', 'usePiwik.ts', {
          category,
          action,
          name: options?.name,
        })
      },
    )
  },
  trackScreen: (path, options) => {
    trackScreen(path, options).catch(() => {
      sendSentryErrorLog('trackScreen failed', 'usePiwik.ts', {path})
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
