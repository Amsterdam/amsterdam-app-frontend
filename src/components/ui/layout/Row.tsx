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

export type RowProps = {
  /** The horizontal alignment of the items in the row. */
  align?: MainAxisAlignment
  /** The content of the row. */
  children: ReactNode
  /** The amount of horizontal whitespace between the items in the row. */
  gutter?: keyof SpacingTokens
  /** Whether the items in the row should be reversed. */
  reverse?: boolean
  /** The vertical alignment of the items in the row. */
  valign?: CrossAxisAlignment
  /** The amount of vertical whitespace between the items in the row. */
  vgutter?: keyof SpacingTokens
  /** Whether the items in the row should wrap to the next line. */
  wrap?: boolean
} & Pick<FlexStyle, 'flex'>

export const Row = ({
  align,
  children,
  flex,
  gutter,
  valign,
  reverse,
  vgutter,
  wrap,
}: RowProps) => {
  const styles = useThemable(
    createStyles({align, flex, gutter, reverse, valign, vgutter, wrap}),
  )

  return <View style={styles.row}>{children}</View>
}

const createStyles =
  ({align, flex, gutter, reverse, valign, vgutter, wrap}: Partial<RowProps>) =>
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
      },
    })
