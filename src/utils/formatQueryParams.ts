import {ListQueryArgs, ProjectIdsQueryArgs} from '../types'

/**
 * Maps query parameter names from front-end to backend syntax
 */
export const formatListQueryParams = ({
  limit,
  sortBy,
  sortOrder,
}: Partial<ListQueryArgs>) => ({
  ...(limit && {limit}),
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
})

export const formatProjectQueryParams = ({
  projectIds,
}: Partial<ProjectIdsQueryArgs>) => ({
  ...(projectIds && {'project-ids': projectIds.join(',')}),
})
