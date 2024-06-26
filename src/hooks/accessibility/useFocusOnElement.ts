import {Component, useCallback} from 'react'
import {findNodeHandle, AccessibilityInfo} from 'react-native'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

/**
 * Returns a function to set accessibility focus to element reference
 */
export const useFocusOnElement = () => {
  const trackException = useTrackException()

  return useCallback(
    (component: Component | null) => {
      if (!component) {
        return
      }

      const node = findNodeHandle(component)

      if (!node) {
        trackException(ExceptionLogKey.nodeNotFound, 'useFocusOnElement')

        return
      }

      AccessibilityInfo.setAccessibilityFocus(node)
    },
    [trackException],
  )
}
