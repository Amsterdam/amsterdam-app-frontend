import React from 'react'
import {Text} from './Text'
import {Title} from './Title'

type Props = {
  text?: string
  title: string
}

export const Section = ({text, title}: Props) =>
  text ? (
    <>
      <Title level={2} prose text={title} />
      <Text>{text}</Text>
    </>
  ) : null
