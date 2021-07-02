import React from 'react'
import {View} from 'react-native'

type Props = {
  height?: number
  width?: number
}

export const Gutter = ({width, height}: Props) => (
  <View style={width ? {width} : height ? {height} : undefined} />
)
