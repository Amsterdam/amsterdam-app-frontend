import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {color, size, Spacing} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'grey' | 'invalid' | 'white'
  borderVertical?: Boolean
  children: ReactNode
  inset?: keyof Spacing
  insetHorizontal?: keyof Spacing
  insetVertical?: keyof Spacing
} & Omit<ViewProps, 'style'>

export const Box = ({
  background,
  borderVertical,
  children,
  inset = 'md',
  insetHorizontal,
  insetVertical,
  ...otherProps
}: Props) => {
  const styles = StyleSheet.create({
    box: {
      backgroundColor: background && color.background[background],
      padding:
        inset && !insetHorizontal && !insetVertical ? size.spacing[inset] : 0,
      paddingHorizontal: insetHorizontal && size.spacing[insetHorizontal],
      paddingVertical: insetVertical && size.spacing[insetVertical],
    },
    borderVertical: {
      borderBottomColor: color.border.onGrey,
      borderTopColor: color.border.onGrey,
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
  })

  return (
    <View
      style={[styles.box, borderVertical && styles.borderVertical]}
      {...otherProps}>
      {children}
    </View>
  )
}
