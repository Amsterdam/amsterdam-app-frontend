import {Image} from './image'
import {RichText, RichTxt, Section} from './section'

export type CityContactInfo = {
  sections: Section[]
}

export type CityOffices = {
  offices: CityOfficeOverviewItem[]
}

export type CityOfficeOverviewItem = {
  identifier: string
  location?: string
  title?: string
  url: string
}

export type CityOffice = {
  active: boolean
  address: RichText & RichTxt
  identifier: string
  contact: {
    Bellen: RichText & RichTxt
    Mailen: RichText & RichTxt
    Openingstijden: RichText & RichTxt
  }
  images: Image
  info: RichText & RichTxt
  last_seen: string // date
  location?: string
  title?: string
}
