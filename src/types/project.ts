import {Image} from './image'
import {Section, Timeline} from './'

// An item in a project list as received from our backend
export type ProjectOverviewItem = {
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

export type Projects = ProjectOverviewItem[]

// Only the titles of a project, e.g. for small lists
export type ProjectTitles = Pick<
  ProjectOverviewItem,
  'identifier' | 'subtitle' | 'title'
>

// All project details as received from our backend
export type ProjectDetail = {
  articles?: ProjectDetailArticlePreview[]
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

// A summary of a news article related to a project
export type ProjectDetailArticlePreview = {
  identifier: string
  image: Image
  publication_date: string
  title: string
  type: 'news' | 'warning'
}

// A set of project body sections, used in the front-end
export type ProjectDetailBody = {
  headerTitle: string
  sections: Section[]
  timeline?: Timeline
  title: string
}
