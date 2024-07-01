import {useCallback} from 'react'
import RNBootSplash from 'react-native-bootsplash'
import {
  useTrackException,
  ExceptionLogKey,
} from '@/processes/logging/hooks/useTrackException'

export const useHideSplashScreen = () => {
  const trackException = useTrackException()

  return useCallback(() => {
    RNBootSplash.hide({fade: true}).catch((error: unknown) => {
      trackException(
        ExceptionLogKey.hideSplashScreen,
        'AppNavigationContainer.tsx',
        {error},
      )
    })
  }, [trackException])
}
