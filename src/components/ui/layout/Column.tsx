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
  grow?: boolean
  gutter?: keyof SpacingTokens
  halign?: CrossAxisAlignment
  reverse?: boolean
} & Pick<FlexStyle, 'flex'>

export const Column = ({
  align,
  children,
  flex,
  grow,
  gutter,
  halign,
  reverse,
}: Props) => {
  const styles = useThemable(
    createStyles({align, flex, grow, gutter, halign, reverse}),
  )

  return <View style={styles.column}>{children}</View>
}

const createStyles =
  ({align, flex, grow, gutter, halign, reverse}: Partial<Props>) =>
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
