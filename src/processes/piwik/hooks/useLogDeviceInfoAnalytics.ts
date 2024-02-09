import {useCallback} from 'react'
import {
  usePiwikOutsideNavigation,
  PiwikSessionDimension,
  PiwikAction,
} from '@/hooks/piwik/usePiwik'
import {useDeviceContext} from '@/hooks/useDeviceContext'

export const useLogDeviceInfoAnalytics = () => {
  const {trackCustomEvent} = usePiwikOutsideNavigation()
  const {fontScale, isLandscape, isPortrait, isTablet} = useDeviceContext()

  const trackDeviceInfo = useCallback(
    (deviceInfo: number | boolean, dimension: PiwikSessionDimension) => {
      trackCustomEvent('general', PiwikAction.accessibilityEventListener, {
        name: 'device',
        customDimensions: {
          [dimension]: deviceInfo.toString(),
        },
      })
    },
    [trackCustomEvent],
  )

  return useCallback(() => {
    const deviceInfoList = [
      {callbackFn: fontScale, piwikDimension: PiwikSessionDimension.fontScale},
      {
        callbackFn: isLandscape,
        piwikDimension: PiwikSessionDimension.isLandscape,
      },
      {
        callbackFn: isPortrait,
        piwikDimension: PiwikSessionDimension.isPortrait,
      },
      {callbackFn: isTablet, piwikDimension: PiwikSessionDimension.isTablet},
    ]

    deviceInfoList.forEach(({callbackFn, piwikDimension}) => {
      trackDeviceInfo(callbackFn, piwikDimension)
    })
  }, [fontScale, isLandscape, isPortrait, isTablet, trackDeviceInfo])
}
