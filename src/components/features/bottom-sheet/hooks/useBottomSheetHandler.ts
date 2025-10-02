import BottomSheet from '@gorhom/bottom-sheet'
import {useRef, useEffect, useCallback} from 'react'
import {useCloseBottomSheetOnBackPress} from '@/components/features/bottom-sheet/hooks/useCloseBottomSheetOnBackPress'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {
  useBottomSheet,
  useBottomSheetSelectors,
} from '@/store/slices/bottomSheet'
import {useScreen} from '@/store/slices/screen'

export const useBottomSheetHandler = () => {
  const {close, open} = useBottomSheet()
  const {isOpen, variant} = useBottomSheetSelectors()
  const {setHideContentFromAccessibility} = useScreen()
  const ref = useRef<BottomSheet>(null)
  const variantRef = useRef(variant) // needed because ref.current?.expand() triggers onChange with old variant value

  useCloseBottomSheetOnBackPress()

  useEffect(() => {
    variantRef.current = variant
  }, [variant])

  useBlurEffect(close)

  const onChange = useCallback(
    (snapPointIndex: number) => {
      const newIsOpen = snapPointIndex !== -1

      if (newIsOpen !== isOpen) {
        newIsOpen ? open(variantRef.current) : close()
      }
    },
    [close, isOpen, open],
  )

  useEffect(() => {
    isOpen ? ref.current?.expand() : ref.current?.close()
    setHideContentFromAccessibility(isOpen)
  }, [isOpen, setHideContentFromAccessibility])

  return {
    onChange,
    ref,
    variant,
  }
}
