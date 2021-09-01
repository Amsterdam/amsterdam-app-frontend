import {Section, Timeline} from '.'

export type ProjectOverviewItem = {
  content_html: string
  content_text: string
  district_id: number
  district_name: string
  identifier: string
  images: ProjectImage[]
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
  images: ProjectImage[]
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

export type ProjectImage = {
  sources: ProjectImageSources
  type: string
}

export type ProjectImageSources = {
  orig: ProjectImageSource
  '220px': ProjectImageSource
  '460px': ProjectImageSource
  '700px': ProjectImageSource
  '80px': ProjectImageSource
}

export type ProjectImageSource = {
  description: string
  filename: string
  image_id: string
  size: string
  url: string
}
