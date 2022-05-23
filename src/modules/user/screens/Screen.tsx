import React from 'react'
import {VersionInfo} from '../../../components/features'
import {Alert, Box} from '../../../components/ui'
import {Column, Gutter, ScrollView} from '../../../components/ui/layout'
import {Address} from '../../address/components'
import {
  NotificationsEnabledSettingsSection,
  ProjectManagerUserSection,
  SubscribableProjects,
} from '../components'

export const UserScreen = () => (
  <ScrollView>
    <Alert />
    <Column gutter="lg">
      <Box>
        <Address />
      </Box>
      <ProjectManagerUserSection />
      <NotificationsEnabledSettingsSection />
      <SubscribableProjects />
      <Box insetHorizontal="md">
        <VersionInfo />
      </Box>
    </Column>
    <Gutter height="xl" />
  </ScrollView>
)
