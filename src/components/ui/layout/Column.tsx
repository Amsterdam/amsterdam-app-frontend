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
  halign?: CrossAxisAlignment
}

export const Column = ({align, children, gutter, halign}: Props) => {
  const styles = createStyles({align, halign})

  return (
    <View style={styles.column}>
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

const createStyles = ({align, halign}: Partial<Props>) =>
  StyleSheet.create({
    column: {
      flexGrow: 1,
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(halign),
    },
  })
