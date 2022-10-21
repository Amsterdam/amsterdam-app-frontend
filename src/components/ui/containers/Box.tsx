import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {layoutStyles} from '@/styles'
import {Theme, useThemable} from '@/themes'
import {SpacingTokens} from '@/themes/tokens'

export type BoxProps = {
  children: ReactNode
  /**
   * Whether the box has a background color, setting it apart from its surroundings.
   * In light mode, it is white – only to be used on light grey (settings) screens.
   */
  distinct?: boolean
  /**
   * Whether the box grows to fill its parent container.
   */
  grow?: boolean
  /**
   * The amount of inner whitespace.
   */
  inset?: keyof SpacingTokens
  /**
   * The amount of inner whitespace at the left and right.
   */
  insetHorizontal?: keyof SpacingTokens
  /**
   * The amount of inner whitespace at the top and bottom.
   */
  insetVertical?: keyof SpacingTokens
} & Omit<ViewProps, 'style'>

/**
 * Visually groups its content.
 * Allows to set insets and a background colour.
 */
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
