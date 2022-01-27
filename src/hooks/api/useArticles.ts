import useSWR from 'swr'
import {getEnvironment} from '../../environment'

type Params = {
  limit?: number
  projectIds?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

const fetcher = (url: string, params: Params) => {
  console.log(url, params)
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
  console.log({requestURL})
}

export const useArticleSummaries = (args: Params) => {
  const {limit, projectIds, sortBy, sortOrder} = args
  const params = {
    ...(limit && {limit}),
    ...(projectIds && {'project-ids': projectIds.join(',')}),
    ...(sortBy && {'sort-by': sortBy}),
    ...(sortOrder && {'sort-order': sortOrder}),
  }
  const url = getEnvironment().apiUrl + '/articles'
  const {data, error} = useSWR({url, params}, fetcher)

  return {
    articleSummaries: data,
    isLoading: !error && !data,
    isError: error,
  }
}
