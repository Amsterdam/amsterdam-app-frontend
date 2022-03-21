import {Image} from './image'
import {Section, Timeline} from './'

// An item in a project list as received from our backend
export type Project = {
  active: boolean
  content_html: string
  content_text: string
  district_id: number
  district_name: string
  identifier: string
  images: Image[]
  last_seen: string // date
  meter?: number
  modification_date: string
  project_type: string
  publication_date: string
  score: number
  source_url: string
  strides?: number
  subtitle: string | null
  title: string
}

export type ProjectSummary = Pick<
  Project,
  'identifier' | 'district_id' | 'images' | 'subtitle' | 'title'
>

// Only the titles of a project, e.g. for small lists
export type ProjectTitles = Pick<
  ProjectSummary,
  'identifier' | 'subtitle' | 'title'
>

export type ProjectsQueryArg = {
  projectType: 'brug' | 'kade'
  districtId: number
  fields: string[]
}

export type PagingQueryArg = {
  page: number
  page_size: number
}

export type ProjectsSearchQueryArg = {
  fields: string[]
  queryFields: string[]
  text: string
} & PagingQueryArg

export type NearestProjectsQueryArg = {
  address: string
  lat: number
  lon: number
  radius: number
}

// All project details as received from our backend
export type ProjectDetail = {
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
  coordinates: {
    lat: number
    lon: number
  }
  district_id: number
  district_name: string
  identifier: string
  images: Image[]
  page_id: number
  rel_url: string
  subtitle: string
  title: string
  url: string
}

// A set of project body sections, used in the front-end
export type ProjectDetailBody = {
  headerTitle: string
  sections: Section[]
  timeline?: Timeline
  title: string
}

export type ProjectIdQueryArg = {
  id: string
}

export type ProjectIdsQueryArg = {
  projectIds: string[]
}

export type ProjectManagerResponse = {
  identifier: string
  email: string
  projects: string[]
}

// An app user creates an initial warning
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

// Our backend adds a number of fields
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
