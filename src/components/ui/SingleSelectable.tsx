import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type Props = {
  children: ReactNode
  label?: string
} & ViewProps

/**
 * Groups its children into a single selectable component for screen readers.
 */
export const SingleSelectable = ({children, label, ...otherProps}: Props) => (
  <View
    accessible
    accessibilityLabel={label}
    style={styles.singleSelectable}
    {...otherProps}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  singleSelectable: {
    flexShrink: 1, // This component usually contains text, so allow shrinking
  },
})
