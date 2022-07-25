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
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
