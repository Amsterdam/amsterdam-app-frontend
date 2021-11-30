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
  subtitle: string
  title: string
}

// All project details as received from our backend
export type ProjectDetail = {
  body: {
    contact: Section[]
    coordinates: {
      lat: number
      lon: number
    }
    intro: Section[]
    'more-info': Section[]
    timeline: Timeline
    what: Section[]
    when: Section[]
    where: Section[]
    work: Section[]
  }
  district_id: number
  district_name: string
  identifier: string
  images: Image[]
  articles: ProjectDetailNewsArticle[]
  page_id: number
  rel_url: string
  subtitle: string
  title: string
  url: string
}

// A summary of a news article related to a project
// TODO Rename to ProjectDetailArticle
export type ProjectDetailNewsArticle = {
  identifier: string
  project_identifier: string
  url: string
}

// A set of project body sections, used in the front-end
export type ProjectDetailBody = {
  headerTitle: string
  sections: Section[]
  timeline?: Timeline
  title: string
}
