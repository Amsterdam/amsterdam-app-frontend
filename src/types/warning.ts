import {Image} from './image'

// An app user creates an initial warning
export type NewWarning = {
  title: string
  body: {
    preface: string
    content: string
  }
  project_id: string
}

// Our backend adds a number of fields
export type Warning = NewWarning & {
  identifier: string
  images?: Image[]
  publication_date: number // Unix timestamp
  modified_date?: number // Unix timestamp
  author_email: string
}
