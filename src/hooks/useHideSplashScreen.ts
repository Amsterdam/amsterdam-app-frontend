import {useCallback} from 'react'
import RNBootSplash from 'react-native-bootsplash'
import {SentryErrorLogKey, useSentry} from '@/processes/sentry/hooks/useSentry'

export const useHideSplashScreen = () => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(() => {
    RNBootSplash.hide({fade: true}).catch((error: unknown) => {
      sendSentryErrorLog(
        SentryErrorLogKey.hideSplashScreen,
        'AppNavigationContainer.tsx',
        {error},
      )
    })
  }, [sendSentryErrorLog])
}
