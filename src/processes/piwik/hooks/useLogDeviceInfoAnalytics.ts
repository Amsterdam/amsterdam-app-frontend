import {useCallback, useEffect} from 'react'
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

  useEffect(() => {
    trackDeviceInfo(fontScale, PiwikSessionDimension.fontScale)
  }, [fontScale, trackDeviceInfo])

  useEffect(() => {
    trackDeviceInfo(isLandscape, PiwikSessionDimension.isLandscape)
  }, [isLandscape, trackDeviceInfo])

  useEffect(() => {
    trackDeviceInfo(isPortrait, PiwikSessionDimension.isPortrait)
  }, [isPortrait, trackDeviceInfo])

  useEffect(() => {
    trackDeviceInfo(isTablet, PiwikSessionDimension.isTablet)
  }, [isTablet, trackDeviceInfo])
}
