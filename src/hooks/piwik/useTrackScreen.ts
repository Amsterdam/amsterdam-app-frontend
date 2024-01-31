import {useEffect} from 'react'
import {usePiwik} from '@/hooks/piwik/usePiwik'
import {type ScreenOutsideNavigationName} from '@/types/piwik'
export {ScreenOutsideNavigationName} from '@/types/piwik'

export const useTrackScreen = (
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
