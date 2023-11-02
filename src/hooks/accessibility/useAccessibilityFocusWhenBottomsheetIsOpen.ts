import {useEffect, useRef} from 'react'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useBottomSheetHandler} from '@/hooks/useBottomSheetHandler'

/**
 * Set accessibility focus on a component when the bottomsheet is open
 * @returns {object} ref - Ref to the component to set accessibility focus on
 */
export const useAccessibilityFocusWhenBottomsheetIsOpen = () => {
  const setAccessibilityFocus = useAccessibilityFocus('long')

  const {isOpen} = useBottomSheetHandler()
  const ref = useRef(null)

  useEffect(() => {
    if (isOpen && ref) {
      setAccessibilityFocus(ref.current)
    }
  }, [isOpen, setAccessibilityFocus])

  return ref
}
