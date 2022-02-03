import {Articles, QueryArgs} from '../types'
import {generateRequestUrl} from '../utils'
import {formatQueryParams} from '../utils/formatQueryParams'
import {emptySplitApi} from './init'

// Define a service using a base URL and expected endpoints
export const articlesApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<Articles, Partial<QueryArgs>>({
      query: params => {
        const q = formatQueryParams(params)
        return generateRequestUrl('/articles', q)
      },
      transformResponse: (response: {result: Articles}) => response.result,
    }),
  }),
  overrideExisting: true,
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetArticlesQuery} = articlesApi
