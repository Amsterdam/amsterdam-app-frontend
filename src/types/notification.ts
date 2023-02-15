import {ListQueryArg} from '@/types'

export type NotificationQueryArg = {
  body: string
  news_identifier?: string
  project_identifier: string
  title: string
  warning_identifier?: string
}

export type Notification = NotificationQueryArg & {
  identifier: string
  publication_date: string
}

export type NotificationWithProjectTitleAndReadState = Notification & {
  isRead?: boolean
  projectTitle: string
}

export type PushNotificationData = {
  linkSourceid?: string
  type?: string
}

export type PushNotification = {
  data?: PushNotificationData
}
