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
  grow?: boolean
  gutter?: keyof SpacingTokens
  halign?: CrossAxisAlignment
}

export const Column = ({
  align,
  children,
  grow = false,
  gutter,
  halign,
}: Props) => {
  const styles = createStyles({align, grow, halign})

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

const createStyles = ({
  align,
  grow,
  halign,
}: Pick<Props, 'align' | 'grow' | 'halign'>) =>
  StyleSheet.create({
    column: {
      alignItems: mapCrossAxisAlignment(halign),
      flex: grow ? 1 : undefined,
      flexShrink: grow ? undefined : 1,
      justifyContent: mapMainAxisAlignment(align),
    },
  })
