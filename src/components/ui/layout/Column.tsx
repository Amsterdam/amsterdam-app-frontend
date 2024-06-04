import {ReactNode} from 'react'
import {FlexStyle, StyleSheet, View} from 'react-native'
import {
  CrossAxisAlignment,
  MainAxisAlignment,
} from '@/components/ui/layout/types'
import {mapCrossAxisAlignment} from '@/components/ui/layout/utils/mapCrossAxisAlignment'
import {mapMainAxisAlignment} from '@/components/ui/layout/utils/mapMainAxisAlignment'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

export type ColumnProps = {
  /** The vertical alignment of the items in the column. */
  align?: MainAxisAlignment
  /** The flex basis factor of the column. */
  basis?: number
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
  /** Whether the column should shrink to fill the available space.  */
  shrink?: number
  /** Sets the zIndex style property */
  zIndex?: number
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
  basis,
  children,
  flex,
  grow,
  gutter,
  halign,
  reverse,
  shrink,
  zIndex,
}: ColumnProps) => {
  const styles = useThemable(
    createStyles({
      align,
      basis,
      flex,
      grow,
      gutter,
      halign,
      reverse,
      shrink,
      zIndex,
    }),
  )

  return <View style={styles.column}>{children}</View>
}

const createStyles =
  ({
    align,
    basis,
    flex,
    grow,
    gutter,
    halign,
    reverse,
    shrink,
    zIndex,
  }: Partial<ColumnProps>) =>
  ({size}: Theme) =>
    StyleSheet.create({
      column: {
        flexDirection: reverse ? 'column-reverse' : 'column',
        alignItems: mapCrossAxisAlignment(halign),
        flex,
        flexBasis: basis,
        flexGrow: grow ? 1 : undefined,
        flexShrink: shrink,
        justifyContent: mapMainAxisAlignment(align),
        rowGap: gutter && size.spacing[gutter],
        zIndex,
      },
    })
