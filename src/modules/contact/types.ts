import {Image} from '@/types'

export enum ContactEndpointName {
  getCityOffices = 'getCityOffices',
  getWaitingTimes = 'getWaitingTimes',
}

export enum ContactEndpointUrl {
  cityOffices = '/city-offices',
  waitingTimes = '/waiting-times',
}

export type CityOffice = {
  identifier: string
  title: string
  image: Image
  address: Address
  addressContent?: {
    html: string
    title: string
  }
  coordinates: Coordinates
  directionsUrl: string
  visitingHours: {
    exceptions: VisitingHour[]
    regular: VisitingHour[]
  }
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

export type WaitingTime = {
  identifier: string
  queued: number
  waitingTime: number
}
