import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {layoutStyles} from '../../styles'
import {color, size, Spacing} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'grey' | 'invalid' | 'white'
  children: ReactNode
  grow?: boolean
  inset?: keyof Spacing
  insetHorizontal?: keyof Spacing
  insetVertical?: keyof Spacing
} & Omit<ViewProps, 'style'>

export const Box = ({
  background,
  children,
  grow,
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
    <View style={[styles.box, grow && layoutStyles.grow]} {...otherProps}>
      {children}
    </View>
  )
}
