import {ReactNode} from 'react'
import {FlexStyle, StyleSheet, View} from 'react-native'
import {
  CrossAxisAlignment,
  MainAxisAlignment,
  mapCrossAxisAlignment,
  mapMainAxisAlignment,
} from '@/components/ui/layout'
import {Theme, useThemable} from '@/themes'
import {SpacingTokens} from '@/themes/tokens'

export type ColumnProps = {
  /** The vertical alignment of the items in the column. */
  align?: MainAxisAlignment
  /** The content of the column. */
  children: ReactNode
  /** Whether the column should grow to fill the available space. */
  grow?: boolean
  /** The amount of vertical spacing between the items in the column. */
  gutter?: keyof SpacingTokens
  /** The horizontal alignment of the items in the column. */
  halign?: CrossAxisAlignment
  /** Whether the items in the column should be reversed. */
  reverse?: boolean
} & Pick<FlexStyle, 'flex'>

/**
 * Lays out its children vertically.
 *
 * Allows specifying the amount of spacing between the items, alignment of the items in the column, whether
 * the column should grow to fill the available space, and whether the items should be displayed in reverse order.
 *
 * @example <Column gutter="md" flex={1}>…</Column>
 */
export const Column = ({
  align,
  children,
  flex,
  grow,
  gutter,
  halign,
  reverse,
}: ColumnProps) => {
  const styles = useThemable(
    createStyles({align, flex, grow, gutter, halign, reverse}),
  )

  return <View style={styles.column}>{children}</View>
}

const createStyles =
  ({align, flex, grow, gutter, halign, reverse}: Partial<ColumnProps>) =>
  ({size}: Theme) =>
    StyleSheet.create({
      column: {
        flexDirection: reverse ? 'column-reverse' : 'column',
        alignItems: mapCrossAxisAlignment(halign),
        flex,
        flexGrow: grow ? 1 : undefined,
        flexShrink: 1,
        justifyContent: mapMainAxisAlignment(align),
        rowGap: gutter && size.spacing[gutter],
      },
    })
