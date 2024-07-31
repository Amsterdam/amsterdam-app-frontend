import {ReactNode} from 'react'
import {ViewProps} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {useOverlay} from '@/store/slices/overlay'

type Props = {
  children: ReactNode
} & ViewProps

export const HideFromAccessibilityWhenOverlayIsOpen = (props: Props) => {
  const {isOpen} = useOverlay()

  return (
    <HideFromAccessibility
      hide={isOpen}
      {...props}
    />
  )
}
