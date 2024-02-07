import {useCallback, useEffect} from 'react'
import {AccessibilityInfo} from 'react-native'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useTimeout} from '@/hooks/useTimeout'
import {Duration} from '@/types/duration'

const DEFAULT_ANNOUNCE_DELAY = Duration.short

export const useAccessibilityAnnounce = () => {
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const setTimeout = useTimeout()

  return useCallback(
    (
      announcement: string,
      focusDelay: Duration | undefined = DEFAULT_ANNOUNCE_DELAY,
    ) => {
      if (!isScreenReaderEnabled) {
        return
      }

      setTimeout(
        () =>
          AccessibilityInfo.announceForAccessibilityWithOptions(announcement, {
            queue: true, // queue behind existing announcements - iOS only
          }),
        focusDelay,
      )
    },
    [isScreenReaderEnabled, setTimeout],
  )
}

export const useAccessibilityAnnounceEffect = (
  announcement: string | undefined,
  focusDelay: Duration | undefined = DEFAULT_ANNOUNCE_DELAY,
) => {
  const accessibilityAnnounce = useAccessibilityAnnounce()

  useEffect(() => {
    if (!announcement) {
      return
    }

    accessibilityAnnounce(announcement, focusDelay)
  }, [accessibilityAnnounce, announcement, focusDelay])
}
