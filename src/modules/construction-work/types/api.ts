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

export type ArticleBase = {
  body: string | null
  id: number
  modification_date: string
  publication_date: string
  title: string
}

export type ArticleType = 'article' | 'warning'

export type ArticleMetaId = {
  id: number
  type: ArticleType
}

export type ProjectRecentArticle = {
  meta_id: ArticleMetaId
  modification_date: string
}

export type ProjectBase = {
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

// /articles

export type ArticlesQueryArgs = {
  limit?: number
  project_ids?: string
} & SortQueryArgs

export type ArticlesItem = {
  images: ApiImage[] | null
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
  address: string | null // @TODO: not in API definition (100764)
  email: string | null
  id: number
  name: string | null
  phone: string | null
  position: string | null
}

export type ProjectDetailSection = {
  body: string | null
  title: string | null
}

export type ProjectDetailSections = {
  contact: ProjectDetailSection[] | null
  what: ProjectDetailSection[] | null
  when: ProjectDetailSection[] | null
  where: ProjectDetailSection[] | null
  work: ProjectDetailSection[] | null
}

export type ProjectDetailTimelineSubItem = {
  body: string | null
  date: string
  title: string
}

export type ProjectDetailTimelineItem = {
  body: string | null
  collapsed: boolean
  date: string
  items: ProjectDetailTimelineSubItem[] | null
  progress: 'Afgelopen' | 'Huidig' | 'Aankomend' // @TODO: not in API definition (100764)
  title: string
}

export type ProjectDetailTimeline = {
  intro: string | null
  items: ProjectDetailTimelineItem[]
  title: string
}

export type ProjectDetail = ProjectBase & {
  active: boolean
  contacts: ProjectDetailContact[] | null
  coordinates: {
    lat: number
    lon: number
  } | null
  creation_date: string
  expiration_date: string | null
  followers: number
  foreign_id: number
  images: ApiImage[] | null
  last_seen: string | null
  modification_date: string
  publication_date: string
  sections: ProjectDetailSections | null
  timeline: ProjectDetailTimeline | null
  url: string
}

export type ProjectDetailsResponse = ProjectDetail

// /project/news

export type ProjectNewsQueryArgs = ProjectIdQueryArgs

export type ProjectNewsResponse = ArticleBase & {
  active: boolean
  creation_date: string
  expiration_date: string | null
  foreign_id: number
  image: ApiImage | null
  intro: string | null
  last_seen: string | null
  projects: number[]
  type: ArticleType
  url: string
}

// /project/warning

export type ProjectWarningQueryArgs = ProjectIdQueryArgs

export type ProjectWarningResponse = ArticleBase & {
  author_email: string | null
  images: ApiImage[] | null
  project_id: number | null
}

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

export type ProjectsSearchApiQueryArgs = Omit<
  ProjectsSearchQueryArgs,
  'fields' | 'query_fields'
> & {
  fields: string
  query_fields: string
}

export type ProjectsSearchResponse = Paginated<ProjectsItem>
