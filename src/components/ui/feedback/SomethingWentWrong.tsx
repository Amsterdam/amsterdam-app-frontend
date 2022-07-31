import React from 'react'
import {Box, Text} from '@/components/ui/'
import {Attention} from '@/components/ui/feedback'

export const SomethingWentWrong = () => (
  <Box>
    <Attention warning>
      <Text intro>Sorry…</Text>
      <Text>Er ging iets mis.</Text>
    </Attention>
  </Box>
)
