// An app user creates an initial notification
export type NewNotification = {
  identifier: string
  title: string
  body: string
  project_id: string
  project_news_id?: string
  project_warning_id?: string
}

// Our backend adds a field
export type Notification = NewNotification & {
  publication_date: number
}
