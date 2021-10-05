import React, {Children, ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {HorizontalAlignment, VerticalAlignment} from './types'
import {mapHorizontalAlignmentInRow, mapVerticalAlignmentInRow} from './utils'

type Props = {
  align?: HorizontalAlignment
  children: ReactNode
  valign?: VerticalAlignment
}

export const Row = ({align, children, valign}: Props) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: mapHorizontalAlignmentInRow(
        align,
        align === 'end-or-between' ? Children.count(children) : undefined,
      ),
      alignItems: mapVerticalAlignmentInRow(valign),
    },
  })
  return <View style={styles.row}>{children}</View>
}
