// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getEnvironment} from '../environment'
import {Articles} from '../types'
import {generateRequestUrl} from '../utils'

type QueryArg = {
  limit?: number
  projectIds?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Define a service using a base URL and expected endpoints
export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({baseUrl: getEnvironment().apiUrl}),
  endpoints: builder => ({
    getArticles: builder.query<Articles, QueryArg>({
      query: params => generateRequestUrl('/articles', {...params}),
      transformResponse: (response: {result: Articles}) => response.result,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetArticlesQuery} = articlesApi
