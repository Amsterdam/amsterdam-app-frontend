import {ReactNode} from 'react'
import {View, ViewProps} from 'react-native'

type Props = {
  children: ReactNode
  hide?: boolean
} & ViewProps

/**
 * Use to hide content for accessibility.
 */
export const HideFromAccessibility = ({
  children,
  hide = true,
  ...viewProps
}: Props) => (
  <View
    accessibilityElementsHidden={hide}
    importantForAccessibility={hide ? 'no-hide-descendants' : 'auto'}
    {...viewProps}>
    {children}
  </View>
)
