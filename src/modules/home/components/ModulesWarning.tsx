import React from 'react'
import {Attention, Box} from '@/components/ui'
import {Paragraph, Phrase} from '@/components/ui/text'

type Props = {
  text: string
}

export const ModulesWarning = ({text}: Props) => (
  <Box insetHorizontal="md" insetVertical="xxxl">
    <Attention warning>
      <Phrase fontWeight="bold">Fout</Phrase>
      <Paragraph variant="small">{text}</Paragraph>
    </Attention>
  </Box>
)
