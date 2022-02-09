import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {color, size, Spacing} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'grey' | 'invalid' | 'white'
  children: ReactNode
  inset?: keyof Spacing
  insetHorizontal?: keyof Spacing
  insetVertical?: keyof Spacing
} & Omit<ViewProps, 'style'>

export const Box = ({
  background,
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
  })

  return (
    <View style={styles.box} {...otherProps}>
      {children}
    </View>
  )
}
