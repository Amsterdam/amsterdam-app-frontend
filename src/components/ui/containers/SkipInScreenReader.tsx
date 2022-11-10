import React, {ReactNode} from 'react'
import {View, ViewProps} from 'react-native'

type Props = {
  children: ReactNode
} & ViewProps

/**
 * Hides its content from screen readers.
 * Make sure the content is made accessible elsewhere.
 */
export const SkipInScreenReader = ({children, ...viewProps}: Props) => (
  <View
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants"
    {...viewProps}>
    {children}
  </View>
)
