import {
  Image,
  ListQueryArg,
  PageListQueryArg,
  RichText,
  Section,
  Timeline,
} from '@/types'

export enum ProjectsEndpointName {
  addProjectWarning = 'addProjectWarning',
  addProjectWarningImage = 'addProjectWarningImage',
  followProject = 'followProject',
  getArticles = 'getArticles',
  getProject = 'getProject',
  getProjectNews = 'getProjectNews',
  getProjects = 'getProjects',
  getProjectsByText = 'getProjectsByText',
  getProjectWarning = 'getProjectWarning',
  unfollowProject = 'unfollowProject',
}

export type ArticleSummary = {
  identifier: string
  image?: Image | null
  images?: ProjectWarningImage[]
  publication_date: string
  title: string
  type: 'news' | 'warning'
}

export type Articles = ArticleSummary[]

export type ArticleApiResponse = {
  status: boolean
  result: ArticleSummary[]
}

export type ArticleQueryArg = {
  projectIds?: string[]
} & Partial<ListQueryArg>

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

export type FieldsQueryArg = {
  fields?: string[]
}

export type FollowProjectBody = {
  project_id: string
}

export type ProjectContact = {
  address: string
  email: string
  name: string
  phone: string
  position: string
}

export type RecentArticle = {
  identifier: string
  publication_date: string
}

export type ProjectsItem = {
  active: boolean
  content_html: string
  content_text: string
  district_id: number
  district_name: string
  followed: boolean
  identifier: string
  images: Image[] | null
  last_seen: string // date
  meter: number
  modification_date: string
  project_type: string
  publication_date: string
  recent_articles?: RecentArticle[] // only present when sent 'articles_max_age' in request body
  score: number
  source_url: string
  strides: number
  subtitle: string | null
  title: string
}

export type ProjectSummary = Pick<
  ProjectsItem,
  'identifier' | 'district_id' | 'images' | 'subtitle' | 'title'
>

export type ProjectTitles = Pick<
  ProjectSummary,
  'identifier' | 'subtitle' | 'title'
>

export type ProjectsQueryArg = {
  articles_max_age: number
  projectType: 'brug' | 'kade'
  districtId: number
  fields: string[]
}

export type ProjectsByTextQueryArg = {
  queryFields: string[]
  text: string
} & Partial<PageListQueryArg>

export type Project = {
  active: boolean
  body: {
    contact: Section[]
    intro: Section[]
    'more-info': Section[]
    timeline: Timeline
    what: Section[]
    when: Section[]
    where: Section[]
    work: Section[]
  }
  contacts: ProjectContact[]
  coordinates: {
    lat: number
    lon: number
  }
  district_id: number
  district_name: string
  followed: boolean
  followers: number
  identifier: string
  images: Image[]
  last_seen: string // date
  meter: number
  news: ProjectNews[]
  page_id: number
  project_type: string
  rel_url: string
  strides: number
  subtitle: string
  title: string
  url: string
}

export type ProjectNews = {
  identifier: string
  project_identifier: string
  url: string
}

export type ProjectBody = {
  contacts?: ProjectContact[]
  sections?: Section[]
  timeline?: Timeline
  title: string
}

export type ProjectIdQueryArg = {
  id: string
}

export type ProjectIdsQueryArg = {
  projectIds: string[]
}

export type ProjectWarningImageQueryArg = {
  project_warning_id: string
  image: {
    main: boolean
    description: string
    data: string
  }
}

export type NewProjectWarning = {
  title: string
  body: {
    content: string
    preface: string
  }
  project_identifier: string
  project_manager_id: string
}

export type ProjectWarningImageSources = {
  image_id: string
  mime_type: string
  width: number
  height: number
}[]

export type ProjectWarningImage = {
  main: boolean
  aspect_ratio: number
  description: string
  coordinates: {
    lon: number
    lat: number
  }
  landscape: boolean
  sources: ProjectWarningImageSources
}

export type ProjectWarning = NewProjectWarning & {
  author_email: string
  identifier: string
  images?: ProjectWarningImage[]
  modification_date?: string
  publication_date: string
}

export type ProjectWarningIdQueryArg = {
  id: string
}

export type ProjectWarningResponse = {
  warning_identifier: string
}