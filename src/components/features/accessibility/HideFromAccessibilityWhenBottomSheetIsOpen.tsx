import {ReactNode} from 'react'
import {ViewProps} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  children: ReactNode
} & ViewProps

export const HideFromAccessibilityWhenBottomSheetIsOpen = (props: Props) => {
  const {isOpen} = useBottomSheet()

  return (
    <HideFromAccessibility
      hide={isOpen}
      {...props}
    />
  )
}
