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

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof SpacingTokens
  reverse?: boolean
  valign?: CrossAxisAlignment
  wrap?: boolean
} & Pick<FlexStyle, 'flex'>

export const Row = ({
  align,
  children,
  flex,
  gutter,
  valign,
  reverse,
  wrap,
}: Props) => {
  const styles = useThemable(
    createStyles({align, flex, gutter, reverse, valign}),
  )

  return <View style={[styles.row, wrap && styles.wrap]}>{children}</View>
}

const createStyles =
  ({align, flex, gutter, reverse, valign}: Partial<Props>) =>
  ({size}: Theme) =>
    StyleSheet.create({
      row: {
        flexDirection: reverse ? 'row-reverse' : 'row',
        flex,
        flexShrink: 1,
        justifyContent: mapMainAxisAlignment(align),
        alignItems: mapCrossAxisAlignment(valign),
        columnGap: gutter && size.spacing[gutter],
      },
      wrap: {
        flexWrap: 'wrap',
      },
    })
