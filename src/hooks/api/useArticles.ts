import useSWR from 'swr'
import {getEnvironment} from '../../environment'
import {generateRequestUrl} from '../../utils/api'

type Data = Record<string, unknown>

type Params = {
  limit?: number
  projectIds?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

type FetcherArguments = {
  url: string
  params: Params
  requestOptions?: Data
}

const fetcher = async ({
  url,
  params,
  requestOptions = {},
}: FetcherArguments) => {
  const requestURL = generateRequestUrl(url, params)
  const fetchResponse = await fetch(requestURL, {
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    method: 'GET',
  })

  const responseData = (
    requestOptions.responseType === 'blob'
      ? await fetchResponse.blob()
      : await fetchResponse.json()
  ) as Data

  if (!fetchResponse.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  return responseData
}

export const useArticleSummaries = (params?: Params) => {
  const url = getEnvironment().apiUrl + '/articles'
  const {data, error} = useSWR({url, params}, fetcher)

  return {
    articleSummaries: data,
    isLoading: !error && !data,
    isError: error,
  }
}
