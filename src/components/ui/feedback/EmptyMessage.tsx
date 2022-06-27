import React from 'react'
import {Paragraph, Title} from '@/components/ui/text'

type Props = {
  text: string
}

export const EmptyMessage = ({text}: Props) => {
  return (
    <>
      <Title level="h1" text="Helaas…" />
      <Paragraph>{text}</Paragraph>
    </>
  )
}
