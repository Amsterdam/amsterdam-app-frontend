import React from 'react'
import {StyleSheet, View} from 'react-native'
import {BellActive, BellInactive} from '../../../assets/icons'
import {color, size} from '../../../tokens'
import {Notification as NotificationType} from '../../../types'
import {accessibleText, formatDate} from '../../../utils'
import {SingleSelectable, Text} from '../../ui'
import {Gutter, Row} from '../../ui/layout'

type Props = {
  notification: NotificationType
}

export const Notification = ({notification}: Props) => {
  const date = formatDate(notification.publication_date)

  return (
    <SingleSelectable
      style={[styles.notification, !notification.isRead && styles.notRead]}
      accessibilityLabel={accessibleText(
        notification.title,
        notification.body,
        'over ' + notification.projectTitle,
        'op ' + date,
      )}>
      <Row gutter="sm">
        <View style={styles.icon}>
          {notification.isRead ? <BellInactive /> : <BellActive />}
        </View>
        <Text small>{notification.projectTitle}</Text>
      </Row>
      <Gutter height="sm" />
      <Text intro accessibilityRole="header">
        {notification.title}
      </Text>
      <Text>{notification.body}</Text>
      <Gutter height="xs" />
      <Text small>{date}</Text>
    </SingleSelectable>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 18,
    aspectRatio: 1,
    marginTop: 2,
  },
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
