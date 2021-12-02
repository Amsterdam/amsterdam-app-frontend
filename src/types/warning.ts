import {Image} from './image'

// An app user creates an initial warning
export type NewWarning = {
  title: string
  body: {
    content: string
    preface: string
  }
  project_identifier: string
  project_manager_id: string
}

// Our backend adds a number of fields
export type Warning = NewWarning & {
  author_email: string
  identifier: string
  images?: Image[]
  modification_date?: string
  publication_date: string
}

export type WarningResponse = {
  warning_identifier: string
}
