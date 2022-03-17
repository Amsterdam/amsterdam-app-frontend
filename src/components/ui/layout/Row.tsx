import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {ChildrenWithGutters} from './'
import {Spacing} from '../../../tokens'
import {CrossAxisAlignment, MainAxisAlignment} from './types'
import {mapCrossAxisAlignment, mapMainAxisAlignment} from './utils'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof Spacing
  valign?: CrossAxisAlignment
  wrap?: boolean
}

export const Row = ({align, children, gutter, valign, wrap}: Props) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(valign),
    },
    wrap: {
      flexWrap: 'wrap',
    },
  })

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
