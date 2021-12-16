import React, {useContext} from 'react'
import {SettingsContext} from '../../../providers/settings.provider'
import {Box, Text} from '../../ui'
import {Switch} from '../../ui/forms'
import {ScrollView} from '../../ui/layout'
import {NoNotificationsMessage} from './NoNotificationsMessage'
import {NoPreviousSubscriptionsMessage} from './NoPreviousSubscriptionsMessage'
import {ProjectSubscriptionsOverview} from './ProjectSubscriptionsOverview'

export const ProjectNotificationSettings = () => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications

  const subscribableProjectIds = Object.keys(
    notificationSettings?.projects ?? {},
  )

  // Toggle enabled notification settings
  // and unsubscribe from all projects if disabling notifications
  const toggleNotificationsEnabled = (projectsEnabled: boolean) => {
    const projects = projectsEnabled
      ? notificationSettings?.projects ?? {}
      : Object.fromEntries(
          Object.keys(notificationSettings?.projects ?? {}).map(projectId => [
            projectId,
            false,
          ]),
        )

    changeSettings('notifications', {
      ...notificationSettings,
      projectsEnabled,
      projects,
    })
  }

  return (
    // TODO - add pleasewait
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
            toggleNotificationsEnabled(!notificationSettings?.projectsEnabled)
          }
          value={notificationSettings?.projectsEnabled}
        />
      </Box>
      <Box>
        {!notificationSettings?.projectsEnabled && <NoNotificationsMessage />}
        {notificationSettings?.projectsEnabled &&
        !subscribableProjectIds.length ? (
          <NoPreviousSubscriptionsMessage />
        ) : null}
      </Box>
      {notificationSettings?.projectsEnabled &&
      subscribableProjectIds.length ? (
        <ProjectSubscriptionsOverview
          subscribableProjectIds={subscribableProjectIds}
        />
      ) : null}
    </ScrollView>
  )
}
