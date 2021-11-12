import React from 'react'
import {Title} from './Title'

type Props = {
  text: string
}

export const NonScalingHeaderTitle = ({text}: Props) => (
  <Title allowFontScaling={false} level={4} text={text} />
)
