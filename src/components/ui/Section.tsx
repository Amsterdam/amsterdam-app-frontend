import React from 'react'
import {Text, Title} from '@/components/ui/'

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
