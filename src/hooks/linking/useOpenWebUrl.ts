import {useCallback} from 'react'
import {Alert, Linking} from 'react-native'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {addAppParamsToUrl} from '@/utils/addAppParamsToUrl'
import {getCurrentModuleSlugFromNavigationRootState} from '@/utils/getCurrentModuleSlugFromNavigationRootState'

export type OpenWebUrl = (url: string) => void

export const useOpenWebUrl = (): OpenWebUrl => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(
    (url: string) => {
      const fullUrl = addAppParamsToUrl(
        url,
        getCurrentModuleSlugFromNavigationRootState(),
      )

      Linking.openURL(fullUrl).catch(() => {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
        sendSentryErrorLog(SentryErrorLogKey.openWebUrl, 'useOpenWebUrl.ts', {
          url,
        })
      })
    },
    [sendSentryErrorLog],
  )
}
