import {Notification} from '@notifee/react-native'

export type NotificationQueryArg = {
  body: string
  news_identifier?: string
  project_identifier: string
  title: string
  warning_identifier?: string
}

export type PushNotificationType =
  | 'NewsUpdatedByProjectManager'
  | 'ProjectWarningCreatedByProjectManager'

export type PushNotificationRouteConfig = {
  id: PushNotificationType
  route: string
  routeWithPrefix: string
}

export type PushNotificationData = {
  linkSourceid?: string
  type?: PushNotificationType
}

export type PushNotification = Notification & {data?: PushNotificationData}
