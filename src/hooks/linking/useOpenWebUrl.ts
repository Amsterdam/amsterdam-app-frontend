import {useCallback} from 'react'
import {Alert, Linking} from 'react-native'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {addAppParamsToUrl} from '@/utils/addAppParamsToUrl'
import {getCurrentModuleSlugFromNavigationRootState} from '@/utils/getCurrentModuleSlugFromNavigationRootState'

export type OpenWebUrl = (url: string) => void

export const useOpenWebUrl = (): OpenWebUrl => {
  const {sendSentryErrorLog} = useSentry()
  const {trackOutlink} = usePiwik()

  return useCallback(
    (url: string) => {
      const fullUrl = addAppParamsToUrl(
        url,
        getCurrentModuleSlugFromNavigationRootState(),
      )

      trackOutlink(fullUrl)

      Linking.openURL(fullUrl).catch(() => {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
        sendSentryErrorLog(SentryErrorLogKey.openWebUrl, 'useOpenWebUrl.ts', {
          url,
        })
      })
    },
    [sendSentryErrorLog, trackOutlink],
  )
}
