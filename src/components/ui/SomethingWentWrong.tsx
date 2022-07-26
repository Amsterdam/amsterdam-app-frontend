import React from 'react'
import {Attention, Box, Text} from '@/components/ui/'

export const SomethingWentWrong = () => (
  <Box>
    <Attention warning>
      <Text intro>Sorry…</Text>
      <Text>Er ging iets mis.</Text>
    </Attention>
  </Box>
)
