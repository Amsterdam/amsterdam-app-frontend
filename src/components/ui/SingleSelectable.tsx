import React from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

/**
 * Groups its children into a single selectable component for screen readers.
 */
export const SingleSelectable = ({
  children,
  style,
  ...otherProps
}: ViewProps) => (
  <View accessible style={[style, styles.singleSelectable]} {...otherProps}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  singleSelectable: {
    flexShrink: 1, // This component usually contains text, so allow shrinking
  },
})
