import {ReactNode} from 'react'
import {AccessibilityProps, FlexStyle, StyleSheet, View} from 'react-native'
import {
  CrossAxisAlignment,
  MainAxisAlignment,
} from '@/components/ui/layout/types'
import {mapCrossAxisAlignment} from '@/components/ui/layout/utils/mapCrossAxisAlignment'
import {mapMainAxisAlignment} from '@/components/ui/layout/utils/mapMainAxisAlignment'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

export type RowProps = {
  /** The horizontal alignment of the items in the row. */
  align?: MainAxisAlignment
  /** The content of the row. */
  children: ReactNode
  /** The amount of horizontal spacing between the items in the row. */
  gutter?: keyof SpacingTokens
  /** Whether the items in the row should be reversed. */
  reverse?: boolean
  /** The vertical alignment of the items in the row. */
  valign?: CrossAxisAlignment
  /** The amount of vertical spacing between the items in the row. */
  vgutter?: keyof SpacingTokens
  /** Whether the items in the row should wrap to the next line. */
  wrap?: boolean
  /** Sets the zIndex style property */
  zIndex?: number
} & Pick<FlexStyle, 'flex'> &
  AccessibilityProps

/**
 * Lays out its children horizontally.
 *
 * Allows specifying the amount of spacing between the items, alignment of the items in the row,
 * whether the row should grow to fill the available space, whether the items can wrap to new lines,
 * and whether the items should be displayed in reverse order.
 *
 * @example <Row align="start" gutter="md">…</Row>
 */
export const Row = ({
  align,
  children,
  flex,
  gutter,
  valign,
  reverse,
  vgutter,
  wrap,
  zIndex,
}: RowProps) => {
  const styles = useThemable(
    createStyles({align, flex, gutter, reverse, valign, vgutter, wrap, zIndex}),
  )

  return <View style={styles.row}>{children}</View>
}

const createStyles =
  ({
    align,
    flex,
    gutter,
    reverse,
    valign,
    vgutter,
    wrap,
    zIndex,
  }: Partial<RowProps>) =>
  ({size}: Theme) =>
    StyleSheet.create({
      row: {
        flexDirection: reverse ? 'row-reverse' : 'row',
        flexWrap: wrap ? 'wrap' : undefined,
        flex,
        flexShrink: 1,
        justifyContent: mapMainAxisAlignment(align),
        alignItems: mapCrossAxisAlignment(valign),
        columnGap: gutter && size.spacing[gutter],
        rowGap:
          (wrap && vgutter && size.spacing[vgutter]) ||
          (wrap && gutter && size.spacing[gutter]) ||
          undefined,
        zIndex,
      },
    })
