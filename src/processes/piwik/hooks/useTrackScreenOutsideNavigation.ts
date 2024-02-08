import {useEffect} from 'react'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {type ScreenOutsideNavigationName} from '@/processes/piwik/types'
export {ScreenOutsideNavigationName} from '@/processes/piwik/types'

export const useTrackScreenOutsideNavigation = (
  name: ScreenOutsideNavigationName,
  shouldTrack = true,
) => {
  const {trackScreen} = usePiwik()

  useEffect(() => {
    if (!shouldTrack) {
      return
    }

    trackScreen(name)
  }, [name, shouldTrack, trackScreen])
}
