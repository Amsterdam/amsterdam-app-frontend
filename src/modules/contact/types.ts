import {Image} from '@/types'

export type CityOffice = {
  identifier: string
  title: string
  image: Image
  address: Address
  addressContent?: Section[]
  coordinates: Coordinates
  directionsLink: Link
  visitingContent?: Section[]
  visitingHoursContent?: Section[]
  appointmentLink?: Link
}

type Address = {
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
}

type Coordinates = {
  lat: number
  lon: number
}

type HoursAndMinutes = {
  hours: number
  minutes: number
}

export type VisitingHour = {
  dayOfWeek: number
  opens: HoursAndMinutes
  closes: HoursAndMinutes
}

export type ExceptionDate = {
  date: string
  opens?: HoursAndMinutes
  closes?: HoursAndMinutes
}

type Link = {
  label: string
  url: string
}

type Section = {
  title?: string
  html: string
}
