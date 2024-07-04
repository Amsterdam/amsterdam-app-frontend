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
   * The amount of inner spacing at the end of ltr
   */
  insetBottom?: keyof SpacingTokens
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
  /**
   *
   */
  variant?: 'default' | 'city-pass'
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
    insetVertical,
    insetTop,
    insetBottom,
    variant,
    ...viewProps
  }: BoxProps) => {
    const styles = useThemable(
      createStyles({
        borderColor,
        borderStyle,
        distinct,
        inset,
        insetHorizontal,
        insetTop,
        insetVertical,
        insetBottom,
        variant,
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
    insetBottom,
    variant,
  }: Partial<BoxProps>) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
      box: {
        backgroundColor: distinct
          ? color.box.background.white
          : variant === 'city-pass'
            ? color.box.background.cityPass
            : undefined,
        borderColor: borderColor ? color.border[borderColor] : undefined,
        borderStyle,
        borderWidth: borderStyle ? 1 : undefined,
        padding:
          inset &&
          !insetHorizontal &&
          !insetTop &&
          !insetBottom &&
          !insetVertical
            ? size.spacing[inset]
            : 0,
        paddingHorizontal: insetHorizontal && size.spacing[insetHorizontal],
        paddingTop: insetTop && size.spacing[insetTop],
        paddingBottom: insetBottom && size.spacing[insetBottom],
        paddingVertical: insetVertical && size.spacing[insetVertical],
      },
    })
