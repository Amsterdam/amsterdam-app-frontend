import React from 'react'
import {Box} from '@/components/ui/containers'
import {Warning} from '@/components/ui/feedback'

export const SomethingWentWrong = () => (
  <Box>
    <Warning title="Sorry …" text="Er ging iets mis." />
  </Box>
)
