import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Spacing} from '../../../tokens'
import {HorizontalAlignment, VerticalAlignment} from './types'
import {
  ChildrenWithGutters,
  mapCrossAxisAlignment,
  mapMainAxisAlignment,
} from './utils'

type Props = {
  align?: HorizontalAlignment
  children: ReactNode
  gutter?: keyof Spacing
  valign?: VerticalAlignment
}

export const Row = ({align, children, gutter, valign}: Props) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(valign),
    },
  })

  return (
    <View style={styles.row}>
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
