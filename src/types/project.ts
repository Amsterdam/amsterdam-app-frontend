import {Image} from './image'
import {Section, Timeline} from './'

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

export type ProjectDetail = {
  body: {
    contact: Section[]
    intro: Section[]
    timeline: Timeline
    what: Section[]
    when: Section[]
    where: Section[]
    work: Section[]
    'more-info': Section[]
    coordinates: {
      lat: number
      lon: number
    }
  }
  district_id: number
  district_name: string
  identifier: string
  images: Image[]
  news: {
    url: string
    identifier: string
    project_identifier: string
  }[]
  page_id: number
  rel_url: string
  subtitle: string
  title: string
  url: string
}

export type ProjectDetailBody = {
  headerTitle: string
  sections: Section[]
  title: string
  timeline?: Timeline
}
