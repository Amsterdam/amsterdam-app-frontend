import {Image} from '@/types'

export enum ContactEndpointName {
  getCityOffices = 'getCityOffices',
  getWaitingTimes = 'getWaitingTimes',
}

export type CityOffice = {
  address: Address
  addressContent?: {
    html: string
    title: string
  }
  appointment?: {
    text: string
    url: string
  }
  coordinates: Coordinates
  directionsUrl: string
  identifier: string
  image: Image
  title: string
  visitingHours: {
    exceptions: VisitingHour[]
    regular: VisitingHour[]
  }
  visitingHoursContent?: string
}

type Address = {
  city: string
  postalCode: string
  streetName: string
  streetNumber: string
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
  closing: HoursAndMinutes
  opening: HoursAndMinutes
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
