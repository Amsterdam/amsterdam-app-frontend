import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {useAppState} from '@/hooks/useAppState'
import {appFlavour, devLog} from '@/processes'

export const usePiwikLogging = () => {
  useAppState({
    onChange: async nextAppState => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        await PiwikProSdk.trackCustomEvent('appStateChange', nextAppState, {
          customDimensions: {1: appFlavour},
        })
      } catch (e) {
        devLog(e)
      }
    },
  })
}
