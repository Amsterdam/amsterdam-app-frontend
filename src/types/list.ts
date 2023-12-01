/** @deprecated API refactor */
export type LimitListQueryArg = {
  limit: number
}

/** @deprecated API refactor */
export type PageListQueryArg = {
  page: number
  page_size: number
}

/** @deprecated API refactor */
export type SortListQueryArg = {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

/** @deprecated API refactor */
export type ListQueryArg = LimitListQueryArg &
  SortListQueryArg &
  PageListQueryArg
