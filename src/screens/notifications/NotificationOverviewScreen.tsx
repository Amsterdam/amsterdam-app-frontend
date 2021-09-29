import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {BellActive, BellInactive} from '../../assets/icons'
import {Gutter, Text} from '../../components/ui'
import {notifications} from '../../data/mock/notifications'
import {color, size} from '../../tokens'
import {formatDate} from '../../utils'

export const NotificationOverviewScreen = () => {
  return (
    <ScrollView>
      {notifications.map(notification => (
        <View
          key={notification.identifier}
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
            <Text secondary small>
              {formatDate(notification.publication_date)}
            </Text>
          </View>
        </View>
      ))}
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
    backgroundColor: color.background.lightish,
    borderBottomWidth: 2,
    borderBottomColor: color.border.separator,
    padding: size.spacing.md,
  },
  itemIsUnread: {
    backgroundColor: color.background.lighter,
    borderBottomColor: color.border.warning,
  },
})
