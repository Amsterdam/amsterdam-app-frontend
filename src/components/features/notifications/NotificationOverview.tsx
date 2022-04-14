import React from 'react'
import {FlatList} from 'react-native'
import {useSelector} from 'react-redux'
import {Box, PleaseWait, Text} from '../../ui'
import {
  NoNotificationsMessage,
  NoPreviousSubscriptionsMessage,
} from '../settings'
import {Notification, selectNotificationSettings, useNotifications} from './'

export const NotificationOverview = () => {
  const notificationSettings = useSelector(selectNotificationSettings)
  const {isLoading, richNotifications, subscribedProjects} = useNotifications()

  if (!notificationSettings.projectsEnabled) {
    return <NoNotificationsMessage />
  }

  if (!subscribedProjects.length) {
    return (
      <Box>
        <NoPreviousSubscriptionsMessage />
      </Box>
    )
  }

  if (isLoading) {
    return <PleaseWait />
  }

  if (!richNotifications.length) {
    return (
      <Box>
        <Text>Geen berichten gevonden.</Text>
      </Box>
    )
  }

  return (
    <FlatList
      data={richNotifications}
      keyExtractor={item => item.publication_date}
      renderItem={({item}) => <Notification notification={item} />}
    />
  )
}
