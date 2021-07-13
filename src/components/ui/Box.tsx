import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, Spacing, spacing} from '../../tokens'

type Props = {
  background?: 'blue' | 'grey' | 'red' | 'white'
  children: React.ReactNode
  inset?: keyof Spacing
}

export const Box = ({background, children, inset = 'md'}: Props) => {
  const backgroundColors = {
    blue: color.primary.main,
    grey: color.tint.level2,
    red: color.secondary.main,
    white: color.tint.level1,
  }

  const styles = StyleSheet.create({
    box: {
      backgroundColor: background && backgroundColors[background],
      padding: spacing[inset],
    },
  })

  return <View style={styles.box}>{children}</View>
}
