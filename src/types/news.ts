import {Image} from './image'
import {RichText} from './section'

export type NewsArticleList = NewsArticle[]

export type NewsArticle = {
  identifier: string
  project_identifier: string
  url: string
  title: string
  publication_date: string
  body?: NewsArticleBody
  images?: Image[]
  assets?: NewsArticleAsset[]
}

type NewsArticleBody = {
  content: RichText
  preface: RichText
  summary: RichText
}

type NewsArticleAsset = any
