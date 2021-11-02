/*
 * This component groups its children into a single selectable component
 * For a11y-purposes
 */
import React from 'react'
import {View, ViewProps} from 'react-native'

type Props = {
  children: React.ReactNode
  label?: string
} & ViewProps

export const SingleSelectable = ({children, label}: Props) => {
  return (
    <View accessible accessibilityLabel={label}>
      {children}
    </View>
  )
}
