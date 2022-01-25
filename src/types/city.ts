import {Image} from './image'
import {RichTxt, Section} from './section'

export type CityContactInfo = {
  sections: Section[]
}

export type CityOffices = {
  offices: CityOfficeOverviewItem[]
}

export type CityOfficeOverviewItem = {
  identifier: string
  location: string
  url: string
}

export type CityOffice = {
  identifier: string
  location: string
  contact: {
    Bellen: RichTxt
    Mailen: RichTxt
    Openingstijden: RichTxt
  }
  images: Image
  info: RichTxt
  address: RichTxt
  last_seen: string // date
  active: boolean
}
