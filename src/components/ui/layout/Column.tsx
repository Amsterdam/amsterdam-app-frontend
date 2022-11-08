import React, {ReactNode} from 'react'
import {FlexStyle, StyleSheet, View} from 'react-native'
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
  const styles = createStyles({align, flex, halign, reverse})

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

const createStyles = ({align, flex, halign, reverse}: Partial<Props>) =>
  StyleSheet.create({
    column: {
      flexDirection: reverse ? 'column-reverse' : 'column',
      alignItems: mapCrossAxisAlignment(halign),
      flex,
      flexShrink: 1,
      justifyContent: mapMainAxisAlignment(align),
    },
  })
