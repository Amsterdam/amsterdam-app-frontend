import React from 'react'
import {Attention} from './Attention'
import {Box} from './Box'
import {Text} from './Text'

export const SomethingWentWrong = () => (
  <Box>
    <Attention warning>
      <Text intro>Sorry…</Text>
      <Text>Er ging iets mis.</Text>
    </Attention>
  </Box>
)
