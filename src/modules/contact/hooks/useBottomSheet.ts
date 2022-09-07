import BottomSheet from '@gorhom/bottom-sheet'
import {useCallback, useRef, useState} from 'react'

export const useBottomSheet = () => {
  const ref = useRef<BottomSheet>(null)
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    ref.current?.expand()
  }, [])

  const close = useCallback(() => {
    ref.current?.close()
  }, [])

  const toggle = useCallback(() => {
    isOpen ? close() : open()
  }, [isOpen, open, close])

  const onChange = useCallback((index: number) => {
    setIsOpen(index === 0)
  }, [])

  return {
    close,
    isOpen,
    onChange,
    open,
    ref,
    toggle,
  }
}
