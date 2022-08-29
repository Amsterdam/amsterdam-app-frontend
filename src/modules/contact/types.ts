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
  dayOfWeek: DayOfWeek
  opens: HoursAndMinutes
  closes: HoursAndMinutes
}

type Link = {
  label: string
  url: string
}

type Section = {
  title?: string
  html: string
}

enum DayOfWeek {
  'maandag' = 0,
  'dinsdag' = 1,
  'woensdag' = 2,
  'donderdag' = 3,
  'vrijdag' = 4,
  'zaterdag' = 5,
  'zondag' = 6,
}
