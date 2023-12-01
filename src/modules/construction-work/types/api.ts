import {
  AddressQueryArgs,
  ApiImage,
  Paginated,
  PaginationQueryArgs,
  SortQueryArgs,
} from '@/types/api'

export enum ProjectsEndpointName {
  articles = 'articles',
  projectDetails = 'projectDetails',
  projectNews = 'projectNews',
  projectWarning = 'projectWarning',
  projects = 'projects',
  projectsFollowDelete = 'projectsFollowDelete',
  projectsFollowPost = 'projectsFollowPost',
  projectsFollowedArticles = 'projectsFollowedArticles',
  projectsSearch = 'projectsSearch',
}

// shared

export type ArticleType = 'article' | 'warning'

export type ArticleMetaId = {
  id: number
  type: ArticleType
}

export type ProjectRecentArticle = {
  meta_id: ArticleMetaId
  modification_date: string
}

type ProjectBase = {
  followed: boolean
  id: number
  image: ApiImage | null
  meter: number | null
  recent_articles: ProjectRecentArticle[]
  strides: number | null
  subtitle: string | null
  title: string
}

export type ProjectIdQueryArgs = {id: number}

export type Article = {
  active: boolean
  body: string
  creation_date: string
  expiration_date: string | null
  foreign_id: number
  id: number
  image: ApiImage | null
  intro: string
  last_seen: string
  modification_date: string
  projects: {type: number}[]
  publication_date: string
  title: string
  type: ArticleType
  url: string
}

// /articles

export type ArticlesQueryArgs = {
  limit?: number
  project_ids?: string
} & SortQueryArgs

export type ArticlesItem = {
  images?: ApiImage[]
  meta_id: ArticleMetaId
  publication_date: string
  title: string
  type: ArticleType
}

export type ArticlesResponse = ArticlesItem[]

// /project/details

export type ProjectDetailsQueryArgs = {
  article_max_age?: number
  id: number
} & AddressQueryArgs

export type ProjectDetailContact = {
  address: string | null // @TODO: not in API definition
  email: string
  id: number
  name: string
  phone: string | null
  position: string
}

export type ProjectDetailSection = {
  body: string | null
  title: string
}

export type ProjectDetailSections = {
  contact: ProjectDetailSection[]
  what: ProjectDetailSection[]
  when: ProjectDetailSection[]
  where: ProjectDetailSection[]
  work: ProjectDetailSection[]
}

export type ProjectDetailTimelineSubItem = {
  body: string
  date: string
  title: string
}

export type ProjectDetailTimelineItem = {
  body: string
  collapsed: boolean
  date: string
  items: ProjectDetailTimelineSubItem[]
  progress: 'Afgelopen' | 'Huidig' | 'Aankomend' // @TODO: not in API definition
  title: string
}

export type ProjectDetailTimeline = {
  intro: string
  items: ProjectDetailTimelineItem[]
  title: string
}

export type ProjectDetail = ProjectBase & {
  active: boolean
  contacts: ProjectDetailContact[]
  coordinates: {
    lat: number
    lon: number
  }
  creation_date: string
  expiration_date: string
  followers: number
  foreign_id: number
  images: ApiImage[]
  last_seen: string
  modification_date: string
  publication_date: string
  sections: ProjectDetailSections
  timeline: ProjectDetailTimeline | null
  url: string
}

export type ProjectDetailsResponse = ProjectDetail

// /project/news

export type ProjectNewsQueryArgs = ProjectIdQueryArgs

export type ProjectNewsResponse = Article

// /project/warning

export type ProjectWarningQueryArgs = ProjectIdQueryArgs

export type ProjectWarningResponse = Article

// /projects

export type ProjectsQueryArgs = {
  article_max_age?: number
  page?: number
  page_size?: number
} & AddressQueryArgs

export type ProjectsItem = ProjectBase

export type ProjectsResponse = Paginated<ProjectsItem>

// /projects/follow

export type FollowProjectBody = {id: number}

// /projects/followed/articles

export type ProjectsFollowedArticlesQueryArgs = {
  article_max_age: number
}

export type ProjectsFollowedArticlesItem = {
  meta_id: ArticleMetaId
}

export type ProjectsFollowedArticlesResponse = Record<
  string,
  ProjectsFollowedArticlesItem[]
>

// /projects/search

export type ProjectsSearchQueryArgs = {
  article_max_age?: number
  fields: (keyof ProjectsItem)[]
  query_fields: (keyof ProjectsItem)[]
  text: string
} & AddressQueryArgs &
  PaginationQueryArgs

export type ProjectsSearchResponse = Paginated<ProjectsItem>
