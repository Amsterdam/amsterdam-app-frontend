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
  shrink?: boolean
  valign?: CrossAxisAlignment
  wrap?: boolean
}

export const Row = ({
  align,
  children,
  gutter,
  shrink = true,
  valign,
  wrap,
}: Props) => {
  const styles = createStyles({align, shrink, valign})

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

const createStyles = ({align, shrink, valign}: Partial<Props>) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      flexShrink: shrink ? 1 : 0,
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(valign),
    },
    wrap: {
      flexWrap: 'wrap',
    },
  })
