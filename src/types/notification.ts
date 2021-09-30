// An app user creates an initial notification
export type NewNotification = {
  title: string
  body: string
  project_identifier: string
  news_identifier?: string
  warning_identifier?: string
}

// Our backend adds a field
export type Notification = NewNotification & {
  publication_date: number
}
