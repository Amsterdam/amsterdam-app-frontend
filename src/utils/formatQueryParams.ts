import {QueryArgs} from '../types'

export const formatQueryParams = ({
  limit,
  projectIds,
  sortBy,
  sortOrder,
}: Partial<QueryArgs>) => ({
  ...(limit && {limit}),
  ...(projectIds && {'project-ids': projectIds.join(',')}),
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
})
