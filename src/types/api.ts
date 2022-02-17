export type LimitQueryArg = {
  limit: number
}

export type ListQueryArgNoLimit = {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export type ListQueryArg = ListQueryArgNoLimit & LimitQueryArg
