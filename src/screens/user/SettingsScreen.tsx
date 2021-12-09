import React from 'react'
import {VersionInfo} from '../../components/features'
import {
  ProjectManagerSettings,
  ProjectNotificationSettings,
} from '../../components/features/settings'
import {Box} from '../../components/ui'
import {Column, Gutter, ScrollView} from '../../components/ui/layout'
import {size} from '../../tokens'

export const SettingsScreen = () => (
  <ScrollView>
    <Gutter height={size.spacing.md} />
    <Column gutter="md">
      <ProjectNotificationSettings />
      <ProjectManagerSettings />
      <Box insetHorizontal="md">
        <VersionInfo />
      </Box>
    </Column>
  </ScrollView>
)
