import {ListQueryArgs, ProjectIdsQueryArgs} from '../types'

/**
 * Maps query parameter names from front-end to backend syntax
 */
export const formatQueryParams = ({
  limit,
  projectIds,
  sortBy,
  sortOrder,
}: Partial<ProjectIdsQueryArgs & ListQueryArgs>) => ({
  ...(limit && {limit}),
  ...(projectIds && {'project-ids': projectIds.join(',')}),
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
})
