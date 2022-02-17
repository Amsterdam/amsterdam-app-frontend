import {Articles, ArticleQueryArgs} from '../types'
import {formatQueryParams, generateRequestUrl} from '../utils'
import {baseApi} from './init'

export const articlesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<Articles, ArticleQueryArgs>({
      providesTags: ['Articles'],
      query: params => {
        const q = formatQueryParams(params)
        return generateRequestUrl('/articles', q)
      },
      transformResponse: (response: {result: Articles}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetArticlesQuery} = articlesApi
