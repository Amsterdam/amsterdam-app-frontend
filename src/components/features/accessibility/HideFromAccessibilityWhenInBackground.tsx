import {ReactNode} from 'react'
import {ViewProps} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {useOverlay} from '@/store/slices/overlay'

type Props = {
  children: ReactNode
} & ViewProps

export const HideFromAccessibilityWhenInBackground = (props: Props) => {
  const {isOpen: isBottomSheetOpen} = useBottomSheet()
  const {isOpen: isOverlayOpen} = useOverlay()

  return (
    <HideFromAccessibility
      hide={isBottomSheetOpen || isOverlayOpen}
      {...props}
    />
  )
}
