import {useCallback} from 'react'
import {AccessibilityInfo} from 'react-native'
import {FocusDelay} from '@/hooks/accessibility/types'
import {setFocusDelay} from '@/utils/accessibility/setFocusDelay'

type UseAccessibilityAnnounceParams = {
  focusDelay?: FocusDelay
  queue?: boolean
}

export const useAccessibilityAnnounce = ({
  focusDelay = 'short',
  queue = false,
}: UseAccessibilityAnnounceParams = {}) =>
  useCallback(
    (announcement: string) => {
      const timeoutId = setFocusDelay(
        () =>
          AccessibilityInfo.announceForAccessibilityWithOptions(announcement, {
            queue,
          }),
        focusDelay,
      )

      return () => clearTimeout(timeoutId)
    },
    [focusDelay, queue],
  )
