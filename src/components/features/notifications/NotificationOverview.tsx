import React, {useContext} from 'react'
import {FlatList} from 'react-native'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {SettingsContext} from '../../../providers/settings.provider'
import {
  Notification as NotificationType,
  ProjectOverviewItem,
} from '../../../types'
import {Box, PleaseWait, Text} from '../../ui'
import {joinedProjectTitles} from '../project'
import {Notification} from './'

export const NotificationOverview = () => {
  const {settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications

  // Get all projects as we need to display their titles
  const {data: projects, isLoading: isProjectsLoading} = useFetch<
    ProjectOverviewItem[]
  >({
    url: getEnvironment().apiUrl + '/projects',
  })

  // Retrieve notifications for subscribed projects
  const {data: rawNotifications, isLoading: isNotificationsLoading} = useFetch<
    NotificationType[]
  >({
    url: getEnvironment().apiUrl + '/notifications',
    options: {
      params: {
        'project-ids': Object.keys(notificationSettings?.projects ?? {}).join(
          ',',
        ),
      },
    },
  })

  if (isProjectsLoading || isNotificationsLoading) {
    return <PleaseWait />
  }

  if (!rawNotifications || !rawNotifications.length) {
    return (
      <Box>
        <Text>Geen berichten gevonden.</Text>
      </Box>
    )
  }

  // Create mapping from project id to titles
  const projectTitles = joinedProjectTitles(projects)

  // Add read state and project titles to notification
  const notifications: NotificationType[] = rawNotifications
    .sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1))
    .map(notification => ({
      ...notification,
      isRead:
        notificationSettings &&
        notificationSettings?.readIds?.includes(
          notification.news_identifier ?? notification.warning_identifier ?? '',
        ),
      projectTitle: projectTitles[notification.project_identifier],
    }))

  return (
    <FlatList
      data={notifications}
      keyExtractor={item => item.publication_date}
      renderItem={({item}) => <Notification notification={item} />}
    />
  )
}
