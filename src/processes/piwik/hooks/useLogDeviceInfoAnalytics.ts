import {useEffect} from 'react'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {
  PiwikAction,
  PiwikSessionDimension,
  useTrackEvents,
} from '@/processes/logging/hooks/useTrackEvents'

export const useLogDeviceInfoAnalytics = () => {
  const {ready, trackCustomEvent} = useTrackEvents()
  const {fontScale, isLandscape, isPortrait, isTablet} = useDeviceContext()

  useEffect(() => {
    if (!ready) {
      return
    }

    trackCustomEvent('device', PiwikAction.deviceInfoChange, {
      [PiwikSessionDimension.fontScale]: fontScale.toString(),
      [PiwikSessionDimension.isLandscape]: isLandscape.toString(),
      [PiwikSessionDimension.isPortrait]: isPortrait.toString(),
      [PiwikSessionDimension.isTablet]: isTablet.toString(),
    })
  }, [fontScale, isLandscape, isPortrait, isTablet, ready, trackCustomEvent])
}
