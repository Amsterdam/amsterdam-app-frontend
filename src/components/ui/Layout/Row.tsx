import React, {ReactNode} from 'react'
import {View} from 'react-native'
import {HorizontalAlignment, VerticalAlignment} from './types'
import {mapHorizontalAlignmentInRow, mapVerticalAlignmentInRow} from './utils'

type Props = {
  align?: HorizontalAlignment
  children: ReactNode
  valign?: VerticalAlignment
}

export const Row = ({align, children, valign}: Props) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: mapHorizontalAlignmentInRow(align, children),
      alignItems: mapVerticalAlignmentInRow(valign),
    }}>
    {children}
  </View>
)
