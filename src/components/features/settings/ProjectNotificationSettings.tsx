import React, {useContext} from 'react'
import {SettingsContext} from '../../../providers'
import {Box, Text} from '../../ui'
import {Switch} from '../../ui/forms'
import {
  NoNotificationsMessage,
  NoPreviousSubscriptionsMessage,
  ProjectSubscriptionsOverview,
  SettingsSection,
} from './'

export const ProjectNotificationSettings = () => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications
  const notificationsEnabled = notificationSettings?.projectsEnabled
  const subscribableProjects = notificationSettings?.projects ?? {}
  const subscribableProjectIds = Object.keys(subscribableProjects)
  const hasSubscribableProjects = subscribableProjectIds.length

  // Disabling notifications will unsubscribe all projects
  const toggleNotificationsEnabled = (enabled: boolean) => {
    const projects = enabled
      ? subscribableProjects
      : Object.fromEntries(
          Object.keys(subscribableProjects).map(projectId => [
            projectId,
            false,
          ]),
        )

    changeSettings('notifications', {
      ...notificationSettings,
      projectsEnabled: enabled,
      projects,
    })
  }

  return (
    <>
      <SettingsSection title="Berichten">
        <Switch
          accessibilityLabel="Ontvang berichten"
          label={<Text large>Ontvang berichten</Text>}
          onValueChange={() =>
            toggleNotificationsEnabled(!notificationsEnabled)
          }
          value={notificationsEnabled}
        />
      </SettingsSection>
      <Box>
        {!notificationsEnabled && <NoNotificationsMessage />}
        {notificationsEnabled && !hasSubscribableProjects ? (
          <NoPreviousSubscriptionsMessage />
        ) : null}
      </Box>
      {notificationsEnabled && hasSubscribableProjects ? (
        <ProjectSubscriptionsOverview
          subscribableProjectIds={subscribableProjectIds}
        />
      ) : null}
    </>
  )
}
