export type ListQueryArgs = {
  limit: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export type ProjectIdsQueryArgs = {
  projectIds: string[]
}
