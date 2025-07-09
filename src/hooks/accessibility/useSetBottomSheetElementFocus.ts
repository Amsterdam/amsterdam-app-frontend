import {useEffect, useRef} from 'react'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {Duration} from '@/types/duration'

/**
 * Set accessibility focus on a component when the bottom sheet is open
 * @returns ref - Ref to the component to set accessibility focus on
 */
export const useSetBottomSheetElementFocus = () => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)

  const {isOpen} = useBottomSheet()
  const ref = useRef<any>(null)

  useEffect(() => {
    if (isOpen && ref.current) {
      setAccessibilityFocus(ref.current)
    }
  }, [isOpen, setAccessibilityFocus])

  return ref
}
