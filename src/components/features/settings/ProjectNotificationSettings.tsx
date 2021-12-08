import React, {useContext} from 'react'
import {SettingsContext} from '../../../providers/settings.provider'
import {Box, Text} from '../../ui'
import {Switch} from '../../ui/forms'
import {ScrollView} from '../../ui/layout'
import {NoNotificationsMessage} from './NoNotificationsMessage'
import {NoPreviousSubscriptionsMessage} from './NoPreviousSubscriptionsMessage'
import {ProjectSubscriptionsOverview} from './ProjectSubscriptionsOverview'

export const ProjectNotificationSettings = () => {
  const {notifications, changeNotificationSettings} =
    useContext(SettingsContext)

  const subscribableProjectIds = Object.keys(notifications?.projects ?? {})

  // Toggle enabled notification settings
  // and unsubscribe from all projects if disabling notifications
  const toggleNotificationsEnabled = (projectsEnabled: boolean) => {
    const projects = projectsEnabled
      ? notifications?.projects ?? {}
      : Object.fromEntries(
          Object.keys(notifications?.projects ?? {}).map(projectId => [
            projectId,
            false,
          ]),
        )

    changeNotificationSettings({
      ...notifications,
      projectsEnabled,
      projects,
    })
  }

  return (
    <ScrollView>
      <Box
        background="white"
        borderVertical
        insetHorizontal="md"
        insetVertical="sm">
        <Switch
          accessibilityLabel="Berichten ontvangen"
          label={<Text>Berichten ontvangen</Text>}
          onValueChange={() =>
            toggleNotificationsEnabled(!notifications?.projectsEnabled)
          }
          value={notifications?.projectsEnabled}
        />
      </Box>
      <Box>
        {!notifications?.projectsEnabled && <NoNotificationsMessage />}
        {notifications?.projectsEnabled && !subscribableProjectIds.length ? (
          <NoPreviousSubscriptionsMessage />
        ) : null}
      </Box>
      {notifications?.projectsEnabled && subscribableProjectIds.length ? (
        <ProjectSubscriptionsOverview
          subscribableProjectIds={subscribableProjectIds}
        />
      ) : null}
    </ScrollView>
  )
}
