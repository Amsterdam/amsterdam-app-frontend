import BottomSheet from '@gorhom/bottom-sheet'
import {useCallback, useEffect, useRef} from 'react'
import {useBeforeRemove} from '@/hooks/navigation/useBeforeRemove'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const useBottomSheetHandler = () => {
  const {close, isOpen, open} = useBottomSheet()
  const ref = useRef<BottomSheet>(null)

  useBeforeRemove(close)

  useEffect(() => {
    isOpen ? ref.current?.expand() : ref.current?.close()
  }, [isOpen])

  const onChange = useCallback(
    (snapPointIndex: number) => {
      const newIsOpen = snapPointIndex !== -1

      if (newIsOpen !== isOpen) {
        newIsOpen ? open() : close()
      }
    },
    [close, isOpen, open],
  )

  return {
    onChange,
    ref,
  }
}
