import {baseApi} from '@/services'
import {Articles, ArticleQueryArg} from '@/types'
import {formatQueryParams, generateRequestUrl} from '@/utils'

export const articlesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<Articles, ArticleQueryArg>({
      providesTags: ['Articles'],
      query: params => {
        const q = formatQueryParams(params)
        return generateRequestUrl({path: '/articles', params: q})
      },
      transformResponse: (response: {result: Articles}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetArticlesQuery} = articlesApi
