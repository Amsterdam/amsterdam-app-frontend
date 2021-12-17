export type NewNotification = {
  title: string
  body: string
  project_identifier: string
  news_identifier?: string
  warning_identifier?: string
}

export type Notification = NewNotification & {
  isRead?: Boolean
  publication_date: string
}

export type PushNotificationData = {
  type?: string
  linkSourceid?: string
}

export type PushNotification = {
  data?: PushNotificationData
}
