import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size, Spacing} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'invalid' | 'lighter' | 'lightish'
  bordered?: boolean
  children: React.ReactNode
  inset?: keyof Spacing
}

export const Box = ({background, bordered, children, inset = 'md'}: Props) => {
  const styles = StyleSheet.create({
    box: {
      backgroundColor: background && color.background[background],
      padding: size.spacing[inset],
    },
    border: {
      borderWidth: 1,
      borderColor: color.border.input,
    },
  })

  return <View style={[styles.box, bordered && styles.border]}>{children}</View>
}
