import {getEnvironment} from '../environment'
import {
  ListQueryArg,
  ProjectIdsQueryArg,
  ProjectsByTextQueryArg,
  ProjectsQueryArg,
} from '../types'

type Signature = {
  baseUrl?: string
  path?: string
  params: {}
}

/**
 *
 * @param {string} baseUrl Defaults to the url of our backend-for-frontend server
 * @param {Object} params Defaults to empty Object
 * @param {string} path optional
 * @returns
 */

export const generateRequestUrl = ({
  baseUrl = getEnvironment().apiUrl,
  params = {},
  path,
}: Signature) => {
  const arrayParams = Object.entries(params)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([key, value]) =>
      (value as string[]).flatMap((val: string) => `${key}=${val}`),
    )

  const scalarParams = Object.entries(params)
    .filter(([, value]) => Boolean(value) && !Array.isArray(value))
    .flatMap(([key, value]) => `${key}=${value}`)

  const queryParams = arrayParams.concat(scalarParams).join('&')

  const requestURL = [baseUrl + path, queryParams].join('?')

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
  queryFields,
  sortBy,
  sortOrder,
  ...rest
}: Partial<
  ListQueryArg & ProjectIdsQueryArg & ProjectsByTextQueryArg & ProjectsQueryArg
>) => ({
  ...(districtId && {'district-id': districtId}),
  ...(fields && {fields: fields.join(',')}),
  ...(projectIds && {'project-ids': projectIds.join(',')}),
  ...(projectType && {'project-type': projectType}),
  ...(queryFields && {query_fields: queryFields.join(',')}),
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
  ...rest,
})
