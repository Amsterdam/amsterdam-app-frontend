import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'

type Props = {
  children: ReactNode
  align?: 'start' | 'end'
}

export const Row = ({align, children}: Props) => (
  <View style={[styles.row, align && styles[align]]}>{children}</View>
)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  end: {
    justifyContent: 'flex-end',
  },
  start: {
    justifyContent: 'flex-start',
  },
})
