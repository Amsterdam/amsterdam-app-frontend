import BottomSheet from '@gorhom/bottom-sheet'
import {useCallback, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  closeBottomSheet,
  openBottomSheet,
  selectIsBottomSheetOpen,
} from '@/store'

export const useBottomSheet = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsBottomSheetOpen)
  const ref = useRef<BottomSheet>(null)

  const open = useCallback(() => {
    ref.current?.expand()
  }, [])

  const close = useCallback(() => {
    ref.current?.close()
  }, [])

  useEffect(() => {
    isOpen ? open() : close()
  }, [close, isOpen, open])

  const onChange = useCallback(
    (snapPointIndex: number) => {
      const newIsOpen = snapPointIndex !== -1

      if (newIsOpen !== isOpen) {
        dispatch(newIsOpen ? openBottomSheet() : closeBottomSheet())
      }
    },
    [dispatch, isOpen],
  )

  return {
    onChange,
    ref,
  }
}
