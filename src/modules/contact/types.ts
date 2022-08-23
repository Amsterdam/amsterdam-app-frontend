import {Image} from '@/types'

export type Response = {
  cityOffices: CityOffice[]
  visitingHours: VisitingHour[]
}

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

type VisitingHour = {
  day: WeekDay
  time: TimeRange
}

type TimeRange = {
  start: string
  end: string
}

type Link = {
  label: string
  url: string
}

type Section = {
  title?: string
  html: string
}

enum WeekDay {
  'maandag' = 0,
  'dinsdag' = 1,
  'woensdag' = 2,
  'donderdag' = 3,
  'vrijdag' = 4,
  'zaterdag' = 5,
  'zondag' = 6,
}
