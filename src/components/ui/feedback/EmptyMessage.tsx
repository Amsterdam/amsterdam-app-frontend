import React from 'react'
import {SingleSelectable} from '@/components/ui'
import {Paragraph, Title} from '@/components/ui/text'
import {accessibleText} from '@/utils'

type Props = {
  text: string
}

export const EmptyMessage = ({text}: Props) => {
  const title = 'Helaas …'

  return (
    <SingleSelectable accessibilityLabel={accessibleText(title, text)}>
      <Title level="h3" text={title} />
      <Paragraph>{text}</Paragraph>
    </SingleSelectable>
  )
}
