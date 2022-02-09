import React, {useContext} from 'react'
import {VersionInfo} from '../../components/features'
import {Address} from '../../components/features/address'
import {
  AuthorizedProjects,
  NotificationsEnabled,
  SubscribableProjects,
} from '../../components/features/settings'
import {Alert, Box} from '../../components/ui'
import {Column, Gutter, ScrollView} from '../../components/ui/layout'
import {SettingsContext} from '../../providers'

export const SettingsScreen = () => {
  const {settings} = useContext(SettingsContext)
  const isProjectManager = !!settings?.['project-manager']?.id

  return (
    <ScrollView>
      <Alert />
      <Column gutter="lg">
        <Address />
        {isProjectManager && <AuthorizedProjects />}
        <NotificationsEnabled />
        <SubscribableProjects />
        <Box insetHorizontal="md">
          <VersionInfo />
        </Box>
      </Column>
      <Gutter height="xl" />
    </ScrollView>
  )
}
