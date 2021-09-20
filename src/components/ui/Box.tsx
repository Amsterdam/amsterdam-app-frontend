import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size, Spacing} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'invalid' | 'light' | 'lighter'
  children: React.ReactNode
  inset?: keyof Spacing
}

export const Box = ({background, children, inset = 'md'}: Props) => {
  const styles = StyleSheet.create({
    box: {
      backgroundColor: background && color.background[background],
      padding: size.spacing[inset],
    },
  })

  return <View style={styles.box}>{children}</View>
}
