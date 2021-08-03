export type Project = {
  boroughId: number
  id: number
  image?: {uri: string}
  title: string
  url: string
}

export type ProjectResponse = {
  author: string
  category: string
  content: string // html
  feedid: string
  image_url: string // url
  images: string[]
  modification_date: string // date
  photo_author: string
  publication_date: string // date
  related_articles: string
  source_url: string // url
  title: string
}

export type Section = {
  text: string
  title: string
}

export type ProjectDetail = {
  body: {
    contact?: Section
    what?: Section
    when?: Section
    where?: Section
    work?: Section
  }
  boroughId: string
  id: string
  image?: {uri: string}
  news?: any
  title: string
}

export type ProjectDetailResponse = {
  item: any
}
