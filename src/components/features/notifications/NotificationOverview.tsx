import React, {useEffect, useState} from 'react'
import {FlatList} from 'react-native'
import {getEnvironment} from '../../../environment'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {
  Notification as NotificationType,
  NotificationSettings,
  ProjectOverviewItem,
} from '../../../types'
import {Box, PleaseWait, Text} from '../../ui'
import {Notification} from './'

export const NotificationOverview = () => {
  const asyncStorage = useAsyncStorage()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)

  // Get all projects as we need to display their titles
  const {data: projects, isLoading: isProjectsLoading} = useFetch<
    ProjectOverviewItem[]
  >({
    url: getEnvironment().apiUrl + '/projects',
  })

  // Retrieve notification settings from device
  useEffect(() => {
    const retrieveNotificationSettings = async () => {
      const currentNotificationSetting: NotificationSettings | undefined =
        await asyncStorage.getValue('notifications')
      setNotificationSettings(currentNotificationSetting)
    }
    retrieveNotificationSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  // Add read state nd project titles to notification
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
      renderItem={({item}) => <Notification notification={item} />}
      keyExtractor={item => item.publication_date}
    />
  )
}
