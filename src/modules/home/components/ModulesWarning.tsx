import React from 'react'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Warning} from '@/components/ui/feedback'
import {Gutter} from '@/components/ui/layout'

type Props = {
  onRetry?: () => void
  text: string
}

export const ModulesWarning = ({onRetry, text}: Props) => (
  <Box>
    <Warning title="Fout" text={text} />
    <Gutter height="md" />
    {!!onRetry && <Button label="Probeer opnieuw" onPress={onRetry} />}
  </Box>
)
