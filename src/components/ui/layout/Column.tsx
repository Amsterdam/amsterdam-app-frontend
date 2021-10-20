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
  halign?: CrossAxisAlignment
}

export const Column = ({align, children, gutter, halign}: Props) => {
  const styles = StyleSheet.create({
    column: {
      flex: 1,
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(halign),
    },
  })

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
