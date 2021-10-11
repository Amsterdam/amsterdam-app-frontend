import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Spacing} from '../../../tokens'
import {HorizontalAlignment, VerticalAlignment} from './types'
import {
  addGutterBetweenChildren,
  mapCrossAxisAlignment,
  mapMainAxisAlignment,
} from './utils'

type Props = {
  align?: VerticalAlignment
  children: ReactNode
  gutter?: keyof Spacing
  halign?: HorizontalAlignment
}

export const Column = ({align, children, gutter, halign}: Props) => {
  const styles = StyleSheet.create({
    column: {
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(halign),
    },
  })

  return (
    <View style={styles.column}>
      {gutter ? addGutterBetweenChildren(children, gutter, 'height') : children}
    </View>
  )
}
