import React from 'react'
import {Attention, Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Gutter} from '@/components/ui/layout'
import {Paragraph, Phrase} from '@/components/ui/text'

type Props = {
  onRetry?: () => void
  text: string
}

export const ModulesWarning = ({onRetry, text}: Props) => (
  <Box insetHorizontal="md" insetVertical="xxxl">
    <Attention warning>
      <Phrase fontWeight="bold">Fout</Phrase>
      <Paragraph variant="small">{text}</Paragraph>
    </Attention>
    <Gutter height="md" />
    {!!onRetry && <Button label="Opnieuw proberen" onPress={onRetry} />}
  </Box>
)
