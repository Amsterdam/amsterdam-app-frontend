import ExternalLink from '@amsterdam/asc-assets/static/icons/ExternalLink.svg'
import React from 'react'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {openWebUrl} from '@/utils'

export const WasteGuideForWeesp = () => (
  <Box>
    <Column gutter="md">
      <Paragraph>
        In Weesp haalt de GAD het afval op. Kijk op hun website hoe dat werkt.
      </Paragraph>
    </Column>
    <Gutter height="lg" />
    <Row align="start">
      <Button
        accessibilityRole="link"
        icon={ExternalLink}
        label="Ga naar GAD.nl"
        onPress={() => openWebUrl('https://www.gad.nl/')}
      />
    </Row>
  </Box>
)
