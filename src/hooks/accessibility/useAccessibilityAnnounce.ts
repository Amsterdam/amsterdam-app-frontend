import {useCallback} from 'react'
import {AccessibilityInfo} from 'react-native'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {useTimeout} from '@/hooks/useTimeout'
import {Duration} from '@/types/duration'

type UseAccessibilityAnnounceParams = {
  focusDelay?: Duration
  queue?: boolean
}

export const useAccessibilityAnnounce = ({
  focusDelay = Duration.Short,
  queue = true,
}: UseAccessibilityAnnounceParams = {}) => {
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const setTimeout = useTimeout()

  return useCallback(
    (announcement: string) => {
      if (!isScreenReaderEnabled) {
        return
      }

      setTimeout(
        () =>
          AccessibilityInfo.announceForAccessibilityWithOptions(announcement, {
            queue,
          }),
        focusDelay,
      )
    },
    [focusDelay, isScreenReaderEnabled, queue, setTimeout],
  )
}
