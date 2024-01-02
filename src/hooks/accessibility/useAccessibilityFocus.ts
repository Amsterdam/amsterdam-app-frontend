import {Component, useCallback} from 'react'
import {useFocusOnElement} from '@/hooks/accessibility/useFocusOnElement'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useTimeout} from '@/hooks/useTimeout'
import {Duration} from '@/types/duration'

/**
 * Set accessibility focus on a component
 *
 * @param {number} focusDelay - Duration before focus is set: 'none', 'short', 'normal', 'afterAnimations', 'afterInitialFocus', 'long'
 */

export const useAccessibilityFocus = (focusDelay: Duration = Duration.none) => {
  const focusOnElement = useFocusOnElement()
  const setTimeout = useTimeout()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  return useCallback(
    (ref: Component | null) => {
      if (ref && isScreenReaderEnabled) {
        setTimeout(() => focusOnElement(ref), focusDelay)
      }
    },
    [focusDelay, focusOnElement, isScreenReaderEnabled, setTimeout],
  )
}
