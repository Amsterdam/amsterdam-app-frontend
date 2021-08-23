import React from 'react'
import {Box, Gutter, Text, Title} from '../../components/ui'
import {size} from '../../tokens'

export const WasteGuideByAddress = () => (
  <>
    <Box background="lighter">
      <Title level={2} text="Uw adres" />
      <Text>
        Vul hieronder uw adres in. Dan ziet u wat u moet doen met uw afval.
      </Text>
      <Gutter height={size.spacing.md} />
      <Text secondary>(Aan deze functie wordt gewerkt…)</Text>
    </Box>
  </>
)
