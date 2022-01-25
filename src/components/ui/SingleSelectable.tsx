/*
 * Groups its children into a single selectable component for screen readers.
 */
import React from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type Props = {
  children: React.ReactNode
  label?: string
} & ViewProps

export const SingleSelectable = ({children, label, ...otherProps}: Props) => {
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={styles.singleSelectable}
      {...otherProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  singleSelectable: {
    flexShrink: 1, // This component usually contains text, so allow shrinking
  },
})
