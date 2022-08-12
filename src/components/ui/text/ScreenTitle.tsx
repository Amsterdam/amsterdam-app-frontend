import React from 'react'
import {Title} from '@/components/ui/text'

type Props = {
  text: string
}

export const ScreenTitle = ({text}: Props) => (
  <Title
    allowFontScaling={false}
    ellipsizeMode="middle"
    level="h5"
    numberOfLines={1}
    text={text}
  />
)
