export type LimitQueryArg = {
  limit: number
}

export type ListQueryArgsNoLimit = {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export type ListQueryArgs = ListQueryArgsNoLimit & LimitQueryArg
