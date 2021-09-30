import React, {Children, ReactNode} from 'react'
import {FlexStyle, View} from 'react-native'

type HorizontalAlignment =
  | 'around'
  | 'between'
  | 'center'
  | 'end'
  | 'end-or-between'
  | 'evenly'
  | 'start'

type VerticalAlignment = 'baseline' | 'bottom' | 'center' | 'stretch' | 'top'

type Props = {
  align?: HorizontalAlignment
  children: ReactNode
  valign?: VerticalAlignment
}

export const Row = ({align, children, valign}: Props) => {
  const alignItems: Record<string, FlexStyle['alignItems']> = {
    baseline: 'baseline',
    bottom: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    top: 'flex-start',
  }

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
      style={{
        flexDirection: 'row',
        justifyContent: align && justifyContent[align],
        alignItems: valign && alignItems[valign],
      }}>
      {children}
    </View>
  )
}
