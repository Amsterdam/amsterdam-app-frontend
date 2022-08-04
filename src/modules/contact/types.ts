import {Image} from '@/types/image'
import {RichText, RichTxt, Section} from '@/types/section'

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
  // date
  last_seen: string
  location?: string
  title?: string
}
