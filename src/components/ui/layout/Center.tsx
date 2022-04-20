import React, {ReactNode} from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'

type Props = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export const Center = ({children, style}: Props) => (
  <View style={[styles.center, style]}>{children}</View>
)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
