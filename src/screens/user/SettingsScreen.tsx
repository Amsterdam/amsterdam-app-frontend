import React from 'react'
import {VersionInfo} from '../../components/features'
import {Address} from '../../components/features/address'
import {
  AuthorizedProjectsSettings,
  NotificationsEnabled,
  SubscribableProjects,
} from '../../components/features/settings'
import {Alert, Box} from '../../components/ui'
import {Column, Gutter, ScrollView} from '../../components/ui/layout'

export const SettingsScreen = () => (
  <ScrollView>
    <Alert />
    <Column gutter="md">
      <Address />
      <AuthorizedProjectsSettings />
      <NotificationsEnabled />
      <SubscribableProjects />
      <Box insetHorizontal="md">
        <VersionInfo />
      </Box>
    </Column>
    <Gutter height="xl" />
  </ScrollView>
)
