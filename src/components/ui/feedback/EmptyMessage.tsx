import React from 'react'
import {SingleSelectable} from '@/components/ui'
import {Paragraph, Title} from '@/components/ui/text'
import {accessibleText} from '@/utils'

export type EmptyMessageProps = {
  text: string
}

export const EmptyMessage = ({text}: EmptyMessageProps) => {
  const title = 'Helaas…'

  return (
    <SingleSelectable label={accessibleText(title, text)}>
      <Title level="h1" text={title} />
      <Paragraph>{text}</Paragraph>
    </SingleSelectable>
  )
}
