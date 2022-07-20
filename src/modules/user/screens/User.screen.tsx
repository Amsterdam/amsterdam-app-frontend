import React from 'react'
import {VersionInfo} from '../../../components/features'
import {Alert, Box} from '../../../components/ui'
import {Column, Screen, ScrollView} from '../../../components/ui/layout'
import {Address} from '../../address/components'
import {ProjectManagerUserSection} from '../components'

export const UserScreen = () => (
  <Screen>
    <ScrollView grow>
      <Alert />
      <Column gutter="md">
        <Box>
          <Address />
        </Box>
        <ProjectManagerUserSection />
      </Column>
    </ScrollView>
    <Box insetHorizontal="md">
      <VersionInfo />
    </Box>
  </Screen>
)
