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
      <Title level={4} margin text={title} />
      <Text margin>{text}</Text>
    </>
  ) : null
