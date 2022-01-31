// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getEnvironment} from '../environment'
import {Articles} from '../types'

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
    getArticlesByProjectIds: builder.query<Articles, QueryArg>({
      query: () => 'articles',
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetArticlesByProjectIdsQuery} = articlesApi
