import React from 'react'
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native'
import {BellActive, BellInactive} from '../../assets/icons'
import {Box, Gutter, Text} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {useFetch} from '../../hooks'
import {color, size} from '../../tokens'
import {Notification, ProjectOverviewItem} from '../../types'
import {formatDate} from '../../utils'

export const NotificationOverviewScreen = () => {
  // TEMP Get all projects to display all notifications
  const {data: projects, isLoading: isProjectsLoading} = useFetch<
    ProjectOverviewItem[]
  >({
    url: getEnvironment().apiUrl + '/projects',
  })

  const projectNames: Record<string, string> = projects
    ? projects.reduce((obj, item) => {
        return {
          ...obj,
          [item.identifier]: item.title,
        }
      }, {})
    : {}

  const {data: notifications, isLoading: isNotificationsLoading} = useFetch<
    Notification[]
  >({
    url: getEnvironment().apiUrl + '/notifications',
    options: {
      params: {
        'project-ids': Object.keys(projectNames).join(','),
      },
    },
  })

  if (isProjectsLoading || isNotificationsLoading) {
    return (
      <Box>
        <ActivityIndicator />
      </Box>
    )
  }

  const notificationsWithReadStatus: Notification[] = (notifications ?? []).map(
    (notification, index) => ({
      ...notification,
      isRead: index > 2, // TEMP
    }),
  )

  return (
    <ScrollView>
      {notifications?.length ? (
        notificationsWithReadStatus.map(notification => (
          <View
            key={notification.publication_date}
            style={[styles.item, !notification.isRead && styles.itemIsUnread]}>
            <View style={styles.icon}>
              {notification.isRead ? <BellInactive /> : <BellActive />}
            </View>
            <View style={styles.content}>
              <Text intro small>
                {notification.title}
              </Text>
              <Gutter height={size.spacing.xs} />
              <Text>{notification.body}</Text>
              <Gutter height={size.spacing.xs} />
              <Text small>{projectNames[notification.project_identifier]}</Text>
              <Text secondary small>
                {formatDate(notification.publication_date)}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Box>
          <Text>Geen notificaties gevonden.</Text>
        </Box>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  icon: {
    marginRight: size.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: color.background.grey,
    borderBottomWidth: 2,
    borderBottomColor: color.border.default,
    padding: size.spacing.md,
  },
  itemIsUnread: {
    backgroundColor: color.background.white,
    borderBottomColor: color.border.invalid,
  },
})
