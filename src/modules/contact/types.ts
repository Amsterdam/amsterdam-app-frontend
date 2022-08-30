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

type OpeningAndClosingTimes = {
  opening: HoursAndMinutes
  closing: HoursAndMinutes
}

export type VisitingHour = {
  dayOfWeek: number
} & OpeningAndClosingTimes

export type ExceptionDate = {
  date: string
} & Partial<OpeningAndClosingTimes>

type Link = {
  label: string
  url: string
}

type Section = {
  title?: string
  html: string
}
