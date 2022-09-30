import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {
  ChildrenWithGutters,
  CrossAxisAlignment,
  MainAxisAlignment,
  mapCrossAxisAlignment,
  mapMainAxisAlignment,
} from '@/components/ui/layout'
import {layoutStyles} from '@/styles'
import {SpacingTokens} from '@/themes/tokens'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  grow?: boolean
  gutter?: keyof SpacingTokens
  halign?: CrossAxisAlignment
  reverse?: boolean
}

export const Column = ({
  align,
  children,
  grow,
  gutter,
  halign,
  reverse,
}: Props) => {
  const styles = createStyles({align, halign, reverse})

  return (
    <View style={[styles.column, grow && layoutStyles.grow]}>
      {gutter ? (
        <ChildrenWithGutters gutter={gutter} prop="height">
          {children}
        </ChildrenWithGutters>
      ) : (
        children
      )}
    </View>
  )
}

const createStyles = ({align, halign, reverse}: Partial<Props>) =>
  StyleSheet.create({
    column: {
      flexDirection: reverse ? 'column-reverse' : 'column',
      alignItems: mapCrossAxisAlignment(halign),
      flexShrink: 1,
      justifyContent: mapMainAxisAlignment(align),
    },
  })
