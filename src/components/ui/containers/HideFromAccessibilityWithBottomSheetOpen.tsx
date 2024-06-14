import {ReactNode} from 'react'
import {ViewProps} from 'react-native'
import {HideFromAccessibility} from '@/components/ui/containers/HideFromAccessibility'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  children: ReactNode
} & ViewProps

/**
 * Use to hide children for accessibility when the bottom sheet is open so the screen reader focuses on the bottom sheet.
 */
export const HideFromAccessibilityWithBottomSheetOpen = (props: Props) => {
  const {isOpen} = useBottomSheet()

  return (
    <HideFromAccessibility
      hide={isOpen}
      {...props}
    />
  )
}
