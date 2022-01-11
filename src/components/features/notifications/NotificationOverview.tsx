import React, {useContext} from 'react'
import {FlatList} from 'react-native'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {SettingsContext} from '../../../providers/settings.provider'
import {Notification as NotificationType, ProjectTitles} from '../../../types'
import {Box, PleaseWait, Text} from '../../ui'
import {joinedProjectTitles} from '../project'
import {
  getSubscribedProjects,
  NoNotificationsMessage,
  NoPreviousSubscriptionsMessage,
} from '../settings'
import {Notification} from './'

export const NotificationOverview = () => {
  const {settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications

  const subscribedProjects = getSubscribedProjects(
    notificationSettings?.projects,
  )

  // Retrieve all projects to allow displaying their titles
  const {data: projects, isLoading: isProjectsLoading} = useFetch<
    ProjectTitles[]
  >({
    url: getEnvironment().apiUrl + '/projects',
    options: {
      params: {
        fields: 'identifier,subtitle,title',
      },
    },
  })

  // Retrieve notifications for subscribed projects
  const {data: rawNotifications, isLoading: isNotificationsLoading} = useFetch<
    NotificationType[]
  >({
    url: getEnvironment().apiUrl + '/notifications',
    options: {
      params: {
        'project-ids': subscribedProjects.join(','),
      },
    },
  })

  if (!notificationSettings?.projectsEnabled) {
    return <NoNotificationsMessage />
  }

  if (!subscribedProjects.length) {
    return (
      <Box>
        <NoPreviousSubscriptionsMessage />
      </Box>
    )
  }

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
  const notifications: NotificationType[] = rawNotifications.map(
    notification => ({
      ...notification,
      isRead:
        notificationSettings &&
        notificationSettings?.readIds?.includes(
          notification.news_identifier ?? notification.warning_identifier ?? '',
        ),
      projectTitle: projectTitles[notification.project_identifier],
    }),
  )

  return (
    <FlatList
      data={notifications}
      keyExtractor={item => item.publication_date}
      renderItem={({item}) => <Notification notification={item} />}
    />
  )
}
