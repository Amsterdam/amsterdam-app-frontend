import {Articles, ProjectIdsQueryArgs, ListQueryArgs} from '../types'
import {generateRequestUrl} from '../utils'
import {formatQueryParams} from '../utils/formatQueryParams'
import {emptySplitApi} from './init'

export const articlesApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<
      Articles,
      Partial<ProjectIdsQueryArgs & ListQueryArgs>
    >({
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
