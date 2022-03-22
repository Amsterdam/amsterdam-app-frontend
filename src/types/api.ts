export type LimitQueryArg = {
  limit: number
}

export type ListQueryArgNoLimit = {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export type PagingQueryArg = {
  page: number
  page_size: number
}

export type ListQueryArg = ListQueryArgNoLimit & LimitQueryArg
