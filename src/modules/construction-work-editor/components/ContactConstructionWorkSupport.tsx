import React from 'react'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {openMailUrl} from '@/utils'

export const ContactConstructionWorkSupport = () => (
  <Box insetHorizontal="md">
    <Column gutter="sm">
      <Paragraph>Ontbreekt er een bouwproject?</Paragraph>
      <Button
        label="Neem contact op met de redactie"
        onPress={() => openMailUrl('redactieprojecten@amsterdam.nl')}
        variant="secondary"
      />
    </Column>
  </Box>
)
