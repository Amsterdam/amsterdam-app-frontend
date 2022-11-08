import React from 'react'
import {Box} from '@/components/ui/containers'
import {Alert} from '@/components/ui/feedback'
import {Screen} from '@/components/ui/layout'
import {Address} from '@/modules/address/components'

export const UserScreen = () => (
  <Screen stickyHeader={<Alert />}>
    <Box>
      <Address />
    </Box>
  </Screen>
)
