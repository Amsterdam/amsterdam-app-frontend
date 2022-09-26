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
}

export const Column = ({align, children, grow, gutter, halign}: Props) => {
  const styles = createStyles({align, halign})

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

const createStyles = ({align, halign}: Pick<Props, 'align' | 'halign'>) =>
  StyleSheet.create({
    column: {
      alignItems: mapCrossAxisAlignment(halign),
      flexShrink: 1,
      justifyContent: mapMainAxisAlignment(align),
    },
  })
