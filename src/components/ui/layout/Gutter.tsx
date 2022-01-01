import React from 'react'
import {View} from 'react-native'
import {size, Spacing} from '../../../tokens'

type Props = {
  height?: keyof Spacing
  width?: keyof Spacing
}

export const Gutter = ({width, height}: Props) => (
  <View
    style={{
      width: width && size.spacing[width],
      height: height && size.spacing[height],
    }}
  />
)
