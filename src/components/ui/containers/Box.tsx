import {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {layoutStyles} from '@/styles'
import {Theme, useThemable} from '@/themes'
import {SpacingTokens} from '@/themes/tokens'

export type BoxProps = {
  borderColor?: keyof Theme['color']['border']
  borderStyle?: 'dashed' | 'dotted' | 'solid'
  children: ReactNode
  /**
   * Whether the box has a background color, setting it apart from its surroundings. In light mode, it is white.
   * Only to be used when the box covers another color, like on light grey (settings) screens or in the navigation header.
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
  borderColor,
  borderStyle,
  children,
  distinct,
  grow,
  inset = 'md',
  insetHorizontal,
  insetVertical,
  ...viewProps
}: BoxProps) => {
  const styles = useThemable(
    createStyles({
      borderColor,
      borderStyle,
      distinct: distinct,
      inset,
      insetHorizontal,
      insetVertical,
    }),
  )

  return (
    <View style={[styles.box, grow && layoutStyles.grow]} {...viewProps}>
      {children}
    </View>
  )
}

const createStyles =
  ({
    borderColor,
    borderStyle,
    distinct,
    inset,
    insetHorizontal,
    insetVertical,
  }: Partial<BoxProps>) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
      box: {
        backgroundColor: distinct ? color.box.background.white : undefined,
        borderColor: borderColor ? color.border[borderColor] : undefined,
        borderStyle: borderStyle,
        borderWidth: borderStyle ? 1 : undefined,
        padding:
          inset && !insetHorizontal && !insetVertical ? size.spacing[inset] : 0,
        paddingHorizontal: insetHorizontal && size.spacing[insetHorizontal],
        paddingVertical: insetVertical && size.spacing[insetVertical],
      },
    })
