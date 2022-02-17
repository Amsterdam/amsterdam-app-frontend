import {ListQueryArg, ProjectIdsQueryArg, ProjectsQueryArg} from '../types'

export const generateRequestUrl = (url: string, params = {}) => {
  const arrayParams = Object.entries(params)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([key, value]) =>
      (value as string[]).flatMap((val: string) => `${key}=${val}`),
    )

  const scalarParams = Object.entries(params)
    .filter(([, value]) => Boolean(value) && !Array.isArray(value))
    .flatMap(([key, value]) => `${key}=${value}`)

  const queryParams = arrayParams.concat(scalarParams).join('&')
  const requestURL = [url, queryParams].filter(Boolean).join('?')
  return requestURL
}

/**
 * Maps query parameter names from front-end to backend syntax
 */
export const formatQueryParams = ({
  districtId,
  fields,
  projectIds,
  projectType,
  sortBy,
  sortOrder,
  ...rest
}: Partial<ListQueryArg & ProjectIdsQueryArg & ProjectsQueryArg>) => ({
  ...(districtId && {'district-id': districtId}),
  ...(projectType && {'project-type': projectType}),
  ...(fields && {fields: fields.join(',')}),
  ...(projectIds && {'project-ids': projectIds.join(',')}),
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
  ...rest,
})
