import React from 'react'
import {Attention} from '@/components/ui/feedback/Attention'
import {Paragraph, Phrase} from '@/components/ui/text'

type Props = {
  text: string
  title: string
}

export const Warning = ({text, title}: Props) => (
  <Attention warning>
    <Phrase fontWeight="bold">{title}</Phrase>
    <Paragraph variant="small">{text}</Paragraph>
  </Attention>
)
