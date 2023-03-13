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
