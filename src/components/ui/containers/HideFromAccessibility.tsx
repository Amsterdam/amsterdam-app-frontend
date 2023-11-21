import {ReactNode} from 'react'
import {View, ViewProps} from 'react-native'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  children: ReactNode
  whileBottomSheetIsOpen?: boolean
} & ViewProps

/**
 * Hides the children from accessibility.
 * @param whileBottomSheetIsOpen If true, the children will only be hidden when the bottom sheet is open.
 */
export const HideFromAccessibility = ({
  children,
  whileBottomSheetIsOpen = false,
  ...viewProps
}: Props) => {
  const {isOpen} = useBottomSheet()

  return (
    <View
      accessibilityElementsHidden={whileBottomSheetIsOpen ? isOpen : true}
      importantForAccessibility={
        whileBottomSheetIsOpen
          ? isOpen
            ? 'no-hide-descendants'
            : 'auto'
          : 'no-hide-descendants'
      }
      {...viewProps}>
      {children}
    </View>
  )
}
