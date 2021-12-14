import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {BellActive, BellInactive} from '../../../assets/icons'
import {getEnvironment} from '../../../environment'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {color, size} from '../../../tokens'
import {
  Notification,
  NotificationSettings,
  ProjectOverviewItem,
} from '../../../types'
import {accessibleText, formatDate} from '../../../utils'
import {Box, PleaseWait, SingleSelectable, Text} from '../../ui'
import {Gutter, Row} from '../../ui/layout'

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

  return notifications?.length ? (
    <>
      {notificationsWithReadStatus.map(notification => {
        const project = projectTitles[notification.project_identifier]
        const date = formatDate(notification.publication_date)

        return (
          <SingleSelectable
            key={notification.publication_date}
            style={[
              styles.notification,
              !notification.isRead && styles.notRead,
            ]}
            accessibilityLabel={accessibleText(
              notification.title,
              notification.body,
              'over ' + project,
              'op ' + date,
            )}>
            <Row gutter="sm">
              {notification.isRead ? <BellInactive /> : <BellActive />}
              <Text small>{project}</Text>
            </Row>
            <Gutter height={size.spacing.sm} />
            <Text intro accessibilityRole="header">
              {notification.title}
            </Text>
            <Text>{notification.body}</Text>
            <Gutter height={size.spacing.xs} />
            <Text small>{date}</Text>
          </SingleSelectable>
        )
      })}
    </>
  ) : (
    <Box>
      <Text>Geen berichten gevonden.</Text>
    </Box>
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
