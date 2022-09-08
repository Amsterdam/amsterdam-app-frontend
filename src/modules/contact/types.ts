import {Image} from '@/types'

/* Endpoints */

export enum ContactEndpointName {
  getCityOffices = 'getCityOffices',
}

/* City office */

export type CityOffice = {
  identifier: string
  title: string
  image: Image
  address: Address
  addressContent?: {
    title: string
    html: string
  }
  coordinates: Coordinates
  directionsUrl: string
  visitingHoursContent?: string
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
