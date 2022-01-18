import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {BellActive, BellInactive} from '../../../assets/icons'
import {color, size} from '../../../tokens'
import {Notification as NotificationType} from '../../../types'
import {accessibleText, formatDate, formatTime} from '../../../utils'
import {SingleSelectable, Text} from '../../ui'
import {Gutter, Row} from '../../ui/layout'

type Props = {
  notification: NotificationType
}

export const Notification = ({notification}: Props) => {
  const date = formatDate(notification.publication_date)
  const time = formatTime(notification.publication_date)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Notification'>>()

  const navigateToArticle = () => {
    if (notification.news_identifier) {
      navigation.navigate(routes.projectNews.name, {
        id: notification.news_identifier,
      })
    }
    if (notification.warning_identifier) {
      navigation.navigate(routes.projectWarning.name, {
        id: notification.warning_identifier,
      })
    }
  }

  return (
    <TouchableOpacity
      onPress={() => navigateToArticle()}
      accessibilityRole="button">
      <SingleSelectable
        style={[styles.notification, !notification.isRead && styles.notRead]}
        accessibilityLabel={accessibleText(
          (notification.isRead ? 'Gelezen' : 'Ongelezen') + ' bericht',
          notification.title,
          notification.body,
          'over ' + notification.projectTitle,
          'op ' + date,
          'om ' + time,
        )}>
        <Row gutter="sm">
          <View style={styles.icon}>
            {notification.isRead ? (
              // TODO Improve colour token
              <BellInactive fill={color.font.tertiary} />
            ) : (
              <BellActive />
            )}
          </View>
          <Text small>{notification.projectTitle}</Text>
        </Row>
        <Gutter height="sm" />
        <Text intro accessibilityRole="header">
          {notification.title}
        </Text>
        <Text>{notification.body}</Text>
        <Gutter height="xs" />
        <Text small>
          {date} {time}
        </Text>
      </SingleSelectable>
    </TouchableOpacity>
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
