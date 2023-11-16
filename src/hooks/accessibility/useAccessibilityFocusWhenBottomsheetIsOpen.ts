import {useEffect, useRef} from 'react'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useBottomSheetHandler} from '@/hooks/useBottomSheetHandler'
import {Duration} from '@/types/duration'

/**
 * Set accessibility focus on a component when the bottom sheet is open
 * @returns ref - Ref to the component to set accessibility focus on
 */
export const useAccessibilityFocusWhenBottomsheetIsOpen = () => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)

  const {isOpen} = useBottomSheetHandler()
  const ref = useRef(null)

  useEffect(() => {
    if (isOpen && ref.current) {
      setAccessibilityFocus(ref.current)
    }
  }, [isOpen, setAccessibilityFocus])

  return ref
}
