export type LimitListQueryArg = {
  limit: number
}

export type PageListQueryArg = {
  page: number
  page_size: number
}

export type SortListQueryArg = {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export type ListQueryArg = LimitListQueryArg &
  SortListQueryArg &
  PageListQueryArg
