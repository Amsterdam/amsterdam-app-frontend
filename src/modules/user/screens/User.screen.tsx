import React from 'react'
import {VersionInfo} from '@/components/features'
import {Alert, Box} from '@/components/ui'
import {Column, Screen} from '@/components/ui/layout'
import {Address} from '@/modules/address/components'
import {ProjectManagerUserSection} from '@/modules/user/components'

export const UserScreen = () => (
  <Screen scroll stickyHeader={<Alert />}>
    <Column align="between" grow gutter="lg">
      <Box>
        <Address />
      </Box>
      <ProjectManagerUserSection />
      <Box insetHorizontal="md">
        <VersionInfo />
      </Box>
    </Column>
  </Screen>
)
