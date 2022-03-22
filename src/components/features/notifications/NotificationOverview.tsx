import {skipToken} from '@reduxjs/toolkit/dist/query'
import React, {useContext} from 'react'
import {FlatList} from 'react-native'
import {SettingsContext} from '../../../providers'
import {useGetNotificationsQuery, useGetProjectsQuery} from '../../../services'
import {FrontEndNotification} from '../../../types'
import {Box, PleaseWait, Text} from '../../ui'
import {createProjectTitlesDictionary} from '../project'
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

  const {
    data: notifications = [],
    isLoading: isNotificationsLoading = undefined,
  } = useGetNotificationsQuery(
    subscribedProjects.length
      ? {
          projectIds: subscribedProjects,
        }
      : skipToken,
  )

  const {data: projects, isLoading: isProjectsLoading} = useGetProjectsQuery({
    fields: ['identifier', 'subtitle', 'title'],
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

  if (!notifications || !notifications.length) {
    return (
      <Box>
        <Text>Geen berichten gevonden.</Text>
      </Box>
    )
  }

  // Create mapping from project id to titles
  const projectTitlesDictionary = createProjectTitlesDictionary(projects)

  // Add read state and project titles to notification
  const extendedNotifications: FrontEndNotification[] = notifications.map(
    notification => ({
      ...notification,
      isRead:
        notificationSettings?.readIds &&
        notificationSettings.readIds.includes(
          notification.news_identifier ?? notification.warning_identifier ?? '',
        ),
      projectTitle: projectTitlesDictionary[notification.project_identifier],
    }),
  )

  return (
    <FlatList
      data={extendedNotifications}
      keyExtractor={item => item.publication_date}
      renderItem={({item}) => <Notification notification={item} />}
    />
  )
}
