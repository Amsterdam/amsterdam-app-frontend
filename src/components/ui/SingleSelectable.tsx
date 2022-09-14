import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type Props = {
  children: ReactNode
} & ViewProps

/**
 * Groups its children into a single selectable component for screen readers.
 */
export const SingleSelectable = ({children, style, ...otherProps}: Props) => (
  <View accessible style={[style, styles.singleSelectable]} {...otherProps}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  singleSelectable: {
    flexShrink: 1, // This component usually contains text, so allow shrinking
  },
})
