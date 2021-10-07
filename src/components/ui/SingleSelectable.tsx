/*
 * This component groups its children into a single selectable component
 * For a11y-purposes
 */
import React from 'react'
import {View, ViewProps} from 'react-native'

type Props = {
  children: React.ReactNode
} & ViewProps

export const SingleSelectable = ({children}: Props) => {
  return <View accessible>{children}</View>
}
