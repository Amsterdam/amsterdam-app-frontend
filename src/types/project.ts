import {Image} from './image'
import {Section, Timeline} from './'

// An item in a project list as received from our backend
export type ProjectResponse = {
  content_html: string
  content_text: string
  district_id: number
  district_name: string
  identifier: string
  images: Image[]
  modification_date: string
  project_type: string
  publication_date: string
  source_url: string
  subtitle: string | null
  title: string
}

export type ProjectSummary = Pick<
  ProjectResponse,
  'identifier' | 'district_id' | 'images' | 'subtitle' | 'title'
>

// Only the titles of a project, e.g. for small lists
export type ProjectTitles = Pick<
  ProjectResponse,
  'identifier' | 'subtitle' | 'title'
>

export type Projects = ProjectSummary[]

export type ProjectsQueryArgs = {
  projectType: 'brug' | 'kade'
  districtId: number
  fields: string[]
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

export type ProjectIdQueryArgs = {
  id: string
}

export type ProjectIdsQueryArgs = {
  projectIds: string[]
}
