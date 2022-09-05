import {Image} from '@/types'

/* City office */

export type CityOffice = {
  identifier: string
  title: string
  image: Image
  address: Address
  addressContent?: Section
  coordinates: Coordinates
  directionsLink: Link
  visitingHoursContent?: Section
  appointment?: {
    text: string
    url: string
  }
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

/* Visiting hours */

export type VisitingHour = {
  dayOfWeek: number
} & OpeningAndClosingTimes

export type ExceptionDate = {
  date: string
} & Partial<OpeningAndClosingTimes>

type OpeningAndClosingTimes = {
  opening: HoursAndMinutes
  closing: HoursAndMinutes
}

export type HoursAndMinutes = {
  hours: number
  minutes: number
}

/* Generic content */

type Link = {
  label: string
  url: string
}

type Section = {
  title?: string
  html: string
}
