import React, {ReactNode} from 'react'
import {View} from 'react-native'
import {layoutStyles} from '@/styles'

type Props = {
  children: ReactNode
  flex?: 'flex' | 'grow' | 'shrink'
}

export const Flex = ({children, flex = 'flex'}: Props) => (
  <View style={layoutStyles[flex]}>{children}</View>
)
