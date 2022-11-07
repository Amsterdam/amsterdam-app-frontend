import React from 'react'
import {Attention} from '@/components/ui/feedback/Attention'
import {Paragraph, Title} from '@/components/ui/text'

type Props = {
  text: string
  title: string
}

export const Warning = ({text, title}: Props) => (
  <Attention warning>
    <Title level="h5" text={title} />
    <Paragraph variant="small">{text}</Paragraph>
  </Attention>
)
