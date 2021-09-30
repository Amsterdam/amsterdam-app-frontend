import React, {Children, ReactNode} from 'react'
import {FlexStyle, StyleSheet, View} from 'react-native'

type Alignment =
  | 'around'
  | 'between'
  | 'center'
  | 'end'
  | 'end-or-between'
  | 'evenly'
  | 'start'

type Props = {
  align?: Alignment
  children: ReactNode
}

export const Row = ({align, children}: Props) => {
  const justifyContent: Record<string, FlexStyle['justifyContent']> = {
    around: 'space-around',
    between: 'space-between',
    center: 'center',
    end: 'flex-end',
    'end-or-between':
      Children.count(children) > 1 ? 'space-between' : 'flex-end',
    evenly: 'space-evenly',
    start: 'flex-start',
  }

  return (
    <View
      style={[styles.row, align && {justifyContent: justifyContent[align]}]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
})
