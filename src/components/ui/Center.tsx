import React from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type Props = {
  children: React.ReactNode
} & ViewProps

export const Center = ({children, ...otherProps}: Props) => (
  <View style={[styles.center, otherProps.style]}>{children}</View>
)

const styles = StyleSheet.create({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
