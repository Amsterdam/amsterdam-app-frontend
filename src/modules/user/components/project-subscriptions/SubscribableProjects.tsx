import React from 'react'
import {useSelector} from 'react-redux'
import {
  NoNotificationsMessage,
  NoPreviousSubscriptionsMessage,
  SubscribableProjectsSettingsSection,
} from '../'
import {selectNotificationSettings} from '../../../../components/features/notifications'
import {Box} from '../../../../components/ui'
import {isEmptyObject} from '../../../../utils'

export const SubscribableProjects = () => {
  const notificationsSettings = useSelector(selectNotificationSettings)
  const isNotificationsEnabled = notificationsSettings.projectsEnabled

  if (!isNotificationsEnabled) {
    return (
      <Box>
        <NoNotificationsMessage />
      </Box>
    )
  }

  if (isEmptyObject(notificationsSettings.projects)) {
    return (
      <Box insetHorizontal="md">
        <NoPreviousSubscriptionsMessage />
      </Box>
    )
  }

  return (
    <SubscribableProjectsSettingsSection
      subscribableProjectIds={Object.keys(notificationsSettings.projects)}
    />
  )
}
