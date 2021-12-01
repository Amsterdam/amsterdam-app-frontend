import {Image} from './image'
import {RichText} from './section'

export type NewsArticle = {
  assets?: NewsArticleAsset[]
  body?: NewsArticleBody
  identifier: string
  images?: Image[]
  project_identifier: string
  publication_date: string
  title: string
  url: string
}

type NewsArticleBody = {
  content: RichText
  preface: RichText
  summary: RichText
}

type NewsArticleAsset = any
