import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color} from '../../tokens'

type Props = {
  children: React.ReactNode
  background: 'blue' | 'red'
}
export const Alert = ({children, background}: Props) => (
  <View style={[styles.frame, styles[background]]}>{children}</View>
)

const styles = StyleSheet.create({
  blue: {
    backgroundColor: color.primary.main,
  },
  frame: {
    padding: 15,
  },
  red: {
    backgroundColor: color.secondary.main,
  },
})
