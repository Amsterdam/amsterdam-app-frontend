import {Image, ListQueryArgs} from '.'

export type ArticleSummary = {
  identifier: string
  image: Image | null
  publication_date: string
  title: string
  type: 'news' | 'warning'
}

export type Articles = ArticleSummary[]

export type ArticleApiResponse = {
  status: boolean
  result: ArticleSummary[]
}

export type ArticleApiQuery = {
  'project-ids'?: string[]
} & Partial<ListQueryArgs>
