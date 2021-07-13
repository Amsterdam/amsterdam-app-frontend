import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, Spacing, spacing} from '../../tokens'

type Props = {
  background?: 'grey' | 'white'
  children: React.ReactNode
  inset?: keyof Spacing
}

export const Box = ({background, children, inset = 'md'}: Props) => {
  const backgroundColors = {
    grey: color.tint.level2,
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
