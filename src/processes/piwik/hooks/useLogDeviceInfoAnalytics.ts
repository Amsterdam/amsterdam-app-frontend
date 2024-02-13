import {useCallback} from 'react'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {
  PiwikAction,
  PiwikSessionDimension,
  usePiwik,
} from '@/processes/piwik/hooks/usePiwik'

export const useLogDeviceInfoAnalytics = () => {
  const {trackCustomEvent} = usePiwik()
  const {fontScale, isLandscape, isPortrait, isTablet} = useDeviceContext()

  return useCallback(
    (action = PiwikAction.toForeground) => {
      trackCustomEvent('general', action, {
        name: 'device',
        customDimensions: {
          [PiwikSessionDimension.fontScale]: fontScale.toString(),
          [PiwikSessionDimension.isLandscape]: isLandscape.toString(),
          [PiwikSessionDimension.isPortrait]: isPortrait.toString(),
          [PiwikSessionDimension.isTablet]: isTablet.toString(),
        },
      })
    },
    [fontScale, isLandscape, isPortrait, isTablet, trackCustomEvent],
  )
}
