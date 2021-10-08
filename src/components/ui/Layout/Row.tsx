import React, {Children, ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Spacing} from '../../../tokens'
import {HorizontalAlignment, VerticalAlignment} from './types'
import {mapCrossAxisAlignment, mapMainAxisAlignment} from './utils'
import {addGutterBetweenChildren} from './utils/addGutterBetweenChildren'

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
      justifyContent: mapMainAxisAlignment(
        align,
        align === 'end-or-between' ? Children.count(children) : undefined,
      ),
      alignItems: mapCrossAxisAlignment(valign),
    },
  })

  return (
    <View style={styles.row}>
      {gutter ? addGutterBetweenChildren(children, gutter, 'width') : children}
    </View>
  )
}
