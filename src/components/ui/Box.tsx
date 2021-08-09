import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size, Spacing} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'invalid' | 'light' | 'lighter'
  children: React.ReactNode
  inset?: keyof Spacing
  insetVertical?: boolean
}

export const Box = ({
  background,
  children,
  inset = 'md',
  insetVertical,
}: Props) => {
  const styles = StyleSheet.create({
    box: {
      backgroundColor: background && color.background[background],
      padding: size.spacing[inset],
    },
    verticalPaddingOnly: {
      paddingHorizontal: 0,
      paddingVertical: size.spacing[inset],
    },
  })

  return (
    <View style={[styles.box, insetVertical && styles.verticalPaddingOnly]}>
      {children}
    </View>
  )
}
