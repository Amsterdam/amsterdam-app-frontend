import React from 'react'
import {Text} from './Text'

type Props = {
  text: string
}

export const NonScalingTabBarLabel = ({text}: Props) => (
  <Text allowFontScaling={false}>{text}</Text>
)
