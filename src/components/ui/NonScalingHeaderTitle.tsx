import React from 'react'
import {Title} from './typography/Title'

type Props = {
  text: string
}

export const NonScalingHeaderTitle = ({text}: Props) => (
  <Title allowFontScaling={false} level="h5" text={text} />
)
