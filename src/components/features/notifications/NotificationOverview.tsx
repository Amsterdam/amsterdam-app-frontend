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

  if (!rawNotifications?.length) {
    return (
      <Box>
        <Text>Geen berichten gevonden.</Text>
      </Box>
    )
  }

  // Create mapping from project id to titles
  const projectTitles: Record<string, string> = projects
    ? projects.reduce((acc, project) => {
        return {
          ...acc,
          [project.identifier]: [project.title, project.subtitle].join(', '),
        }
      }, {})
    : {}

  // Add read state and project titles to notification
  const notifications: NotificationType[] = (rawNotifications ?? [])
    .sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1))
    .map(notification => ({
      ...notification,
      isRead: true, // TEMP
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
