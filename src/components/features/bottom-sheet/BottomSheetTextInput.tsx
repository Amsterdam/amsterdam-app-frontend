import {BottomSheetTextInput as BottomSheetTextInputBase} from '@gorhom/bottom-sheet'
import {useEffect} from 'react'
import type {TextInputProps} from '@/components/ui/forms/input/types'
import {useBottomSheetSelectors} from '@/store/slices/bottomSheet'

export const BottomSheetTextInput = ({
  autoFocus,
  ref,
  ...props
}: TextInputProps) => {
  const {isOpen} = useBottomSheetSelectors()

  useEffect(() => {
    if (!isOpen) {
      ref?.current?.blur()
    } else if (autoFocus) {
      setTimeout(() => ref?.current?.focus(), 500)
    }
  }, [autoFocus, isOpen, ref])

  return (
    <BottomSheetTextInputBase
      ref={ref}
      {...props}
    />
  )
}
