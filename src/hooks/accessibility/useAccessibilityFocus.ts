import {Component, useCallback} from 'react'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useTimeout} from '@/hooks/useTimeout'
import {Duration} from '@/types/duration'
import {useFocusOnElement} from '@/utils/accessibility/focusOnElement'

/**
 * Set accessibility focus on a component
 *
 * @param {number} focusDelay - Duration before focus is set: 'none', 'short', 'normal', 'afterAnimations', 'afterInitialFocus', 'long'
 */

export const useAccessibilityFocus = <T extends Component>(
  focusDelay: Duration = Duration.none,
) => {
  const focusOnElement = useFocusOnElement()
  const setTimeout = useTimeout()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  return useCallback(
    (ref: T) => {
      if (ref && isScreenReaderEnabled) {
        setTimeout(() => focusOnElement(ref), focusDelay)
      }
    },
    [focusDelay, focusOnElement, isScreenReaderEnabled, setTimeout],
  )
}
