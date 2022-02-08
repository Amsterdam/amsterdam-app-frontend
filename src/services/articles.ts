import {Articles, ArticleQueryAgrs} from '../types'
import {generateRequestUrl} from '../utils'
import {formatQueryParams} from '../utils/formatQueryParams'
import {baseApi} from './init'

export const articlesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<Articles, ArticleQueryAgrs>({
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
