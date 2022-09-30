import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {
  ChildrenWithGutters,
  CrossAxisAlignment,
  MainAxisAlignment,
  mapCrossAxisAlignment,
  mapMainAxisAlignment,
} from '@/components/ui/layout'
import {SpacingTokens} from '@/themes/tokens'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof SpacingTokens
  valign?: CrossAxisAlignment
  reverse?: boolean
  wrap?: boolean
}

export const Row = ({
  align,
  children,
  gutter,
  valign,
  reverse,
  wrap,
}: Props) => {
  const styles = createStyles({align, reverse, valign})

  return (
    <View style={[styles.row, wrap && styles.wrap]}>
      {gutter ? (
        <ChildrenWithGutters gutter={gutter} prop="width">
          {children}
        </ChildrenWithGutters>
      ) : (
        children
      )}
    </View>
  )
}

const createStyles = ({align, reverse, valign}: Partial<Props>) =>
  StyleSheet.create({
    row: {
      flexDirection: reverse ? 'row-reverse' : 'row',
      flexShrink: 1,
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(valign),
    },
    wrap: {
      flexWrap: 'wrap',
    },
  })
