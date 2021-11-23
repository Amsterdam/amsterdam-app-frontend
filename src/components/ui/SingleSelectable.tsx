/*
 * Groups its children into a single selectable component for screen readers.
 */
import React from 'react'
import {View, ViewProps} from 'react-native'

type Props = {
  children: React.ReactNode
  label?: string
} & ViewProps

export const SingleSelectable = ({children, label, ...otherProps}: Props) => {
  return (
    <View accessible accessibilityLabel={label} {...otherProps}>
      {children}
    </View>
  )
}
