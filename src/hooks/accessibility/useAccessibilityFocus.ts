import {Component, useCallback, useRef} from 'react'
import {FocusDelay} from '@/hooks/accessibility/types'
import {focusOnElement} from '@/utils/accessibility/focusOnElement'
import {setFocusDelay} from '@/utils/accessibility/setFocusDelay'

/**
 * Set accessibility focus on a component
 *
 * @param {number} focusDelay - Duration before focus is set: 'none', 'short', 'normal', 'afterAnimations', 'afterInitialFocus', 'long'
 */

export const useAccessibilityFocus = <T extends Component>(
  focusDelay: FocusDelay,
) => {
  const timeoutIdRef = useRef<number | null>(null) // Store the timeout ID in a ref

  return useCallback(
    (ref: T | null) => {
      // If the ref is null (e.g., during unmount), clear the timeout
      if (!ref) {
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current)
        }

        return
      }

      timeoutIdRef.current = setFocusDelay(
        () => focusOnElement(ref),
        focusDelay,
      ) as unknown as number
    },
    [focusDelay],
  )
}
