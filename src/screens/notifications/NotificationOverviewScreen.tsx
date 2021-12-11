import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {BellActive, BellInactive} from '../../assets/icons'
import {Box, PleaseWait, Text} from '../../components/ui'
import {Gutter, Row} from '../../components/ui/layout'
import {getEnvironment} from '../../environment'
import {useAsyncStorage, useFetch} from '../../hooks'
import {color, size} from '../../tokens'
import {
  Notification,
  NotificationSettings,
  ProjectOverviewItem,
} from '../../types'
import {formatDate} from '../../utils'

export const NotificationOverviewScreen = () => {
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
        await asyncStorage.getData('notifications')
      setNotificationSettings(currentNotificationSetting)
    }
    retrieveNotificationSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Retrieve notifications for subscribed projects
  const {data: notifications, isLoading: isNotificationsLoading} = useFetch<
    Notification[]
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

  // Create mapping from project id to name
  const projectTitles: Record<string, string> = projects
    ? projects.reduce((acc, project) => {
        return {
          ...acc,
          [project.identifier]: [project.title, project.subtitle].join(', '),
        }
      }, {})
    : {}

  const notificationsWithReadStatus: Notification[] = (notifications ?? [])
    .sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1))
    .map(notification => ({
      ...notification,
      isRead: true, // TEMP
    }))

  return (
    <ScrollView>
      {notifications?.length ? (
        notificationsWithReadStatus.map(notification => (
          <View
            key={notification.publication_date}
            style={[
              styles.notification,
              !notification.isRead && styles.notRead,
            ]}>
            <Row gutter="sm">
              {notification.isRead ? <BellInactive /> : <BellActive />}
              <Text small>
                {projectTitles[notification.project_identifier]}
              </Text>
            </Row>
            <Gutter height={size.spacing.sm} />
            <Text intro accessibilityRole="header">
              {notification.title}
            </Text>
            <Text>{notification.body}</Text>
            <Gutter height={size.spacing.xs} />
            <Text small>{formatDate(notification.publication_date)}</Text>
          </View>
        ))
      ) : (
        <Box>
          <Text>Geen berichten gevonden.</Text>
        </Box>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  notification: {
    backgroundColor: color.background.grey,
    borderBottomWidth: 2,
    borderBottomColor: color.border.divider,
    padding: size.spacing.md,
  },
  notRead: {
    backgroundColor: color.background.white,
    borderBottomColor: color.border.invalid,
  },
})
