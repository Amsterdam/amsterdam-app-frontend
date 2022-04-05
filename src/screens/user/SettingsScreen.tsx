import React from 'react'
import {VersionInfo} from '../../components/features'
import {Address} from '../../components/features/address'
import {
  NotificationsEnabledSettingsSection,
  ProjectManagerSettingsSection,
  SubscribableProjects,
} from '../../components/features/settings'
import {Alert, Box} from '../../components/ui'
import {Column, Gutter, ScrollView} from '../../components/ui/layout'

export const SettingsScreen = () => (
  <ScrollView>
    <Alert />
    <Column gutter="lg">
      <Address />
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
