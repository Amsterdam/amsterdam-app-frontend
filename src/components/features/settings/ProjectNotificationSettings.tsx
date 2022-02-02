import React, {useContext} from 'react'
import {SettingsContext} from '../../../providers'
import {Box, Text} from '../../ui'
import {Switch} from '../../ui/forms'
import {BlockList} from '../../ui/layout'
import {
  NoNotificationsMessage,
  NoPreviousSubscriptionsMessage,
  ProjectSubscriptionsOverview,
} from './'

export const ProjectNotificationSettings = () => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications

  const subscribableProjectIds = Object.keys(
    notificationSettings?.projects ?? {},
  )

  // Disabling notifications will unsubscribe all projects
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
    // TODO - add PleaseWait
    <>
      <BlockList title="Berichten">
        <Switch
          accessibilityLabel="Ontvang berichten"
          label={<Text large>Ontvang berichten</Text>}
          onValueChange={() =>
            toggleNotificationsEnabled(!notificationSettings?.projectsEnabled)
          }
          value={notificationSettings?.projectsEnabled}
        />
      </BlockList>
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
    </>
  )
}
