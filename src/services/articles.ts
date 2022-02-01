import {Articles} from '../types'
import {generateRequestUrl} from '../utils'
import {emptySplitApi} from './init'

type QueryArg = {
  limit?: number
  projectIds?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

const mapQueryParamsToBackendFormat = ({
  limit,
  projectIds,
  sortBy,
  sortOrder,
}: QueryArg) => ({
  ...(limit && {limit}),
  ...(projectIds && {'project-ids': projectIds.join(',')}),
  ...(sortBy && {'sort-by': sortBy}),
  ...(sortOrder && {'sort-order': sortOrder}),
})

// Define a service using a base URL and expected endpoints
export const articlesApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<Articles, QueryArg>({
      query: params => {
        const q = mapQueryParamsToBackendFormat(params)
        return generateRequestUrl('/articles', q)
      },
      transformResponse: (response: {result: Articles}) => response.result,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetArticlesQuery} = articlesApi
