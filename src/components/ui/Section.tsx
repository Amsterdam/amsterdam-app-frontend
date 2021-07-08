import React from 'react'
import {Text} from './Text'
import {Title} from './Title'

export const Section = ({title, text}: {title: string; text?: string}) =>
  text ? (
    <>
      <Title level={2} prose text={title} />
      <Text>{text}</Text>
    </>
  ) : null
