import React from 'react'
import {VersionInfo} from '../../components/features'
import {
  NotificationsEnabledSettingsSection,
  ProjectManagerSettingsSection,
  SubscribableProjects,
} from '../../components/features/settings'
import {Alert, Box} from '../../components/ui'
import {Column, Gutter, ScrollView} from '../../components/ui/layout'
import {Address} from '../address/components'

export const UserScreen = () => (
  <ScrollView>
    <Alert />
    <Column gutter="lg">
      <Box>
        <Address />
      </Box>
      <ProjectManagerSettingsSection />
      <NotificationsEnabledSettingsSection />
      <SubscribableProjects />
      <Box insetHorizontal="md">
        <VersionInfo />
      </Box>
    </Column>
    <Gutter height="xl" />
  </ScrollView>
)
