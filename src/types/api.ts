export type MutationResponse = {
  result: string
  status: boolean
}

type Page = {
  number: number
  size: number
  totalElements: number
  totalPages: number
}

export type Paginated<T> = {
  page: Page
  result: T[]
}

export enum CacheLifetime {
  none = 0,
  second = 1,
  minute = 60,
  fiveMinutes = 60 * 5,
  hour = 60 * 60,
  day = 60 * 60 * 24,
  week = 60 * 60 * 24 * 7,
}
