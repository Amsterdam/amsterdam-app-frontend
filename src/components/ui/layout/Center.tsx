import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type Props = {
  children: ReactNode
} & ViewProps

export const Center = ({children, ...otherProps}: Props) => (
  <View style={[styles.center, otherProps.style]}>{children}</View>
)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
