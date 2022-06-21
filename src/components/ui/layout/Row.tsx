import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {ChildrenWithGutters} from '@/components/ui/layout'
import {
  CrossAxisAlignment,
  MainAxisAlignment,
} from '@/components/ui/layout/types'
import {
  mapCrossAxisAlignment,
  mapMainAxisAlignment,
} from '@/components/ui/layout/utils'
import {SpacingTokens} from '@/themes/tokens'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof SpacingTokens
  valign?: CrossAxisAlignment
  wrap?: boolean
}

export const Row = ({align, children, gutter, valign, wrap}: Props) => {
  const styles = createStyles({align, valign})

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

const createStyles = ({align, valign}: Partial<Props>) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(valign),
    },
    wrap: {
      flexWrap: 'wrap',
    },
  })
