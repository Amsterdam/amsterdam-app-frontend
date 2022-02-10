import {ListQueryArgs, ProjectIdsQueryArgs, ProjectsQueryArgs} from '../types'

/**
 * Maps query parameter names from front-end to backend syntax
 */
export const formatQueryArgs = ({
  districtId,
  projectIds,
  projectType,
  sortBy,
  sortOrder,
  ...rest
}: Partial<ListQueryArgs & ProjectIdsQueryArgs & ProjectsQueryArgs>) => ({
  ...(districtId && {'district-id': districtId}),
  ...(projectType && {'project-type': projectType}),
  ...(projectIds && {'project-ids': projectIds.join(',')}),
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
  ...rest,
})
