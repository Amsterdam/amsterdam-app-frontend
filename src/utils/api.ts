import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'
import {ListQueryArg} from '@/types/list'

type GenericParamsType =
  | Record<string, string[] | string | number | boolean>
  | undefined

type Signature<ParamsType extends GenericParamsType> = {
  baseUrl?: string
  params: ParamsType
  path?: string
}

export const generateRequestUrl = <ParamsType extends GenericParamsType>({
  params = {},
  path,
}: Signature<ParamsType>) => {
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
 * @deprecated API refactor
 * Maps query parameter names from front-end to backend syntax
 */
export const formatQueryParams = ({
  sortBy,
  sortOrder,
  ...rest
}: Partial<ListQueryArg>) => ({
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
  ...rest,
})

export const isApiAuthorizationError = (
  error: FetchBaseQueryError | SerializedError,
) =>
  'status' in error &&
  ([401, 403, 404] as Array<FetchBaseQueryError['status']>).includes(
    error.status,
  )
