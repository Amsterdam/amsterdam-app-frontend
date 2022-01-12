import React from 'react'
import {VersionInfo} from '../../components/features'
import {Address} from '../../components/features/address'
import {
  ProjectManagerSettings,
  ProjectNotificationSettings,
} from '../../components/features/settings'
import {Box} from '../../components/ui'
import {Column, Gutter, ScrollView} from '../../components/ui/layout'

export const SettingsScreen = () => (
  <ScrollView>
    <Gutter height="md" />
    <Column gutter="md">
      <Address />
      <ProjectNotificationSettings />
      <ProjectManagerSettings />
      <Box insetHorizontal="md">
        <VersionInfo />
      </Box>
    </Column>
    <Gutter height="xl" />
  </ScrollView>
)
