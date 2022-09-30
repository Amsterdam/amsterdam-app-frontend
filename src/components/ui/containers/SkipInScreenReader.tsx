import React, {ReactNode} from 'react'
import {View, ViewProps} from 'react-native'

type Props = {
  children: ReactNode
} & ViewProps

/**
 * Hides its content from screen readers.
 * Make sure the content is made accessible elsewhere.
 */
export const SkipInScreenReader = ({children, ...otherProps}: Props) => {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      {...otherProps}>
      {children}
    </View>
  )
}
