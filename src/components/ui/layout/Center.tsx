import React, {ReactNode} from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {layoutStyles} from '@/styles'

type Props = {
  children: ReactNode
  grow?: boolean
  style?: StyleProp<ViewStyle>
}

export const Center = ({children, grow, style}: Props) => (
  <View style={[styles.center, grow && layoutStyles.grow, style]}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
