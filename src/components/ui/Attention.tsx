import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size} from '../../tokens'

type Props = {
  children: ReactNode
  warning?: Boolean
}

export const Attention = ({children, warning}: Props) => (
  <View style={[styles.attention, warning && styles.warning]}>{children}</View>
)

const borderWidth = 2

const styles = StyleSheet.create({
  attention: {
    borderLeftColor: color.border.primary,
    borderLeftWidth: borderWidth,
    paddingLeft: size.spacing.md - borderWidth,
  },
  warning: {
    borderLeftColor: color.border.invalid,
  },
})
