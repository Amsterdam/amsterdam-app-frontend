import {ReactNode, memo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {layoutStyles} from '@/styles/layoutStyles'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

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
   * The amount of inner spacing.
   */
  inset?: keyof SpacingTokens
  /**
   * The amount of inner spacing at the left and right.
   */
  insetHorizontal?: keyof SpacingTokens
  /**
   * The amount of inner spacing at the start of ltr
   */
  insetTop?: keyof SpacingTokens
  /**
   * The amount of inner spacing at the top and bottom.
   */
  insetVertical?: keyof SpacingTokens
} & Omit<ViewProps, 'style'>

/**
 * Visually groups its content.
 * Allows to set insets and a background colour.
 */
export const Box = memo(
  ({
    borderColor,
    borderStyle,
    children,
    distinct,
    grow,
    inset = 'md',
    insetHorizontal,
    insetTop,
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
        insetTop,
        insetVertical,
      }),
    )

    return (
      <View
        style={[styles.box, grow && layoutStyles.grow]}
        {...viewProps}>
        {children}
      </View>
    )
  },
)

const createStyles =
  ({
    borderColor,
    borderStyle,
    distinct,
    inset,
    insetHorizontal,
    insetTop,
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
          inset && !insetHorizontal && !insetTop && !insetVertical
            ? size.spacing[inset]
            : 0,
        paddingHorizontal: insetHorizontal && size.spacing[insetHorizontal],
        paddingTop: insetTop && size.spacing[insetTop],
        paddingVertical: insetVertical && size.spacing[insetVertical],
      },
    })
