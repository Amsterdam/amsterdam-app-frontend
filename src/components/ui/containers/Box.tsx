import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {layoutStyles} from '@/styles'
import {Theme, useThemable} from '@/themes'
import {SpacingTokens} from '@/themes/tokens'

export type BoxProps = {
  children: ReactNode
  distinct?: boolean
  grow?: boolean
  inset?: keyof SpacingTokens
  insetHorizontal?: keyof SpacingTokens
  insetVertical?: keyof SpacingTokens
} & Omit<ViewProps, 'style'>

export const Box = ({
  children,
  distinct,
  grow,
  inset = 'md',
  insetHorizontal,
  insetVertical,
  ...otherProps
}: BoxProps) => {
  const styles = useThemable(
    createStyles({distinct: distinct, inset, insetHorizontal, insetVertical}),
  )

  return (
    <View style={[styles.box, grow && layoutStyles.grow]} {...otherProps}>
      {children}
    </View>
  )
}

const createStyles =
  ({distinct, inset, insetHorizontal, insetVertical}: Partial<BoxProps>) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
      box: {
        backgroundColor: distinct ? color.box.background.white : undefined,
        padding:
          inset && !insetHorizontal && !insetVertical ? size.spacing[inset] : 0,
        paddingHorizontal: insetHorizontal && size.spacing[insetHorizontal],
        paddingVertical: insetVertical && size.spacing[insetVertical],
      },
    })
