import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'
import {
  FieldsQueryArg,
  ProjectIdsQueryArg,
  ProjectsByTextQueryArg,
  ProjectsQueryArg,
} from '@/modules/construction-work/types'
import {ListQueryArg} from '@/types/list'

type Signature = {
  baseUrl?: string
  params: Record<string, string[] | string | number | boolean>
  path?: string
}

export const generateRequestUrl = ({params = {}, path}: Signature) => {
  const arrayParams = Object.entries(params)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([key, value]) =>
      (value as string[]).flatMap((val: string) => `${key}=${val}`),
    )

  const scalarParams = Object.entries(params)
    .filter(([, value]) => Boolean(value) && !Array.isArray(value))
    .flatMap(([key, value]) => `${key}=${value as string}`)

  const queryParams = arrayParams.concat(scalarParams).join('&')

  return [path, queryParams].join('?')
}

/**
 * Maps query parameter names from front-end to backend syntax
 */
export const formatQueryParams = ({
  districtId,
  fields,
  pageSize,
  projectIds,
  projectType,
  queryFields,
  sortBy,
  sortOrder,
  ...rest
}: Partial<
  ListQueryArg &
    ProjectIdsQueryArg &
    ProjectsByTextQueryArg &
    FieldsQueryArg &
    ProjectsQueryArg
>) => ({
  ...(districtId && {'district-id': districtId}),
  ...(fields && {fields: fields.join(',')}),
  ...(projectIds && {'project-ids': projectIds.join(',')}),
  ...(projectType && {'project-type': projectType}),
  ...(queryFields && {query_fields: queryFields.join(',')}),
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
  ...(pageSize && {page_size: pageSize}),
  ...rest,
})

export const isApiAuthorizationError = (
  error: FetchBaseQueryError | SerializedError,
) =>
  'status' in error &&
  ([401, 403, 404] as Array<FetchBaseQueryError['status']>).includes(
    error.status,
  )
