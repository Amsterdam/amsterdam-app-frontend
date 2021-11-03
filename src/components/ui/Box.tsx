import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size, Spacing} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'grey' | 'invalid' | 'white'
  borderVertical?: Boolean
  children: React.ReactNode
  inset?: keyof Spacing
}

export const Box = ({
  background,
  borderVertical,
  children,
  inset = 'md',
}: Props) => {
  const styles = StyleSheet.create({
    box: {
      backgroundColor: background && color.background[background],
      padding: size.spacing[inset],
    },
    borderVertical: {
      borderBottomColor: color.border.onGrey,
      borderTopColor: color.border.onGrey,
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
  })

  return (
    <View style={[styles.box, borderVertical && styles.borderVertical]}>
      {children}
    </View>
  )
}
