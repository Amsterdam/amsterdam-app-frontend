import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Spacing} from '../../../tokens'
import {CrossAxisAlignment, MainAxisAlignment} from './types'
import {mapCrossAxisAlignment, mapMainAxisAlignment} from './utils'
import {ChildrenWithGutters} from './'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof Spacing
  valign?: CrossAxisAlignment
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
