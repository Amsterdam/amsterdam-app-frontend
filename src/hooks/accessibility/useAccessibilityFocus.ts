import {Component, useCallback} from 'react'
import {FocusDelay} from '@/hooks/accessibility/types'
import {focusOnElement} from '@/utils/accessibility/focusOnElement'
import {setFocusDelay} from '@/utils/accessibility/setFocusDelay'

/**
 * Set accessibility focus on a component
 *
 * @param {number} focusDelay - Duration before focus is set: 'none', 'short', 'normal', 'afterAnimations', 'afterInitialFocus', 'long'
 */

export const useAccessibilityFocus = <T extends Component>(
  focusDelay: FocusDelay = 'none',
) =>
  useCallback(
    (ref: T | null) => {
      // If the ref is null (e.g., during unmount), clear the timeout
      if (!ref) {
        return
      }

      setFocusDelay(() => focusOnElement(ref), focusDelay)
    },
    [focusDelay],
  )
