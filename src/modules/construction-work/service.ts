import {AddressQueryArg} from '@/modules/address'
import {
  ArticleQueryArg,
  Articles,
  FieldsQueryArg,
  FollowProjectBody,
  NewsArticle,
  Project,
  ProjectIdQueryArg,
  ProjectsByTextQueryArg,
  ProjectsEndpointName,
  ProjectsFollowedArticlesQueryArg,
  ProjectsFollowedArticlesResponse,
  ProjectsItem,
  ProjectsQueryArg,
  ProjectWarning,
  ProjectWarningIdQueryArg,
} from '@/modules/construction-work/types'
import {baseApi} from '@/services'
import {CacheLifetime, MutationResponse, SortListQueryArg} from '@/types'
import {formatQueryParams, generateRequestUrl} from '@/utils'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ProjectsEndpointName.followProject]: builder.mutation<
      MutationResponse,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        url: '/projects/follow',
        method: 'POST',
        body,
      }),
    }),

    [ProjectsEndpointName.getArticles]: builder.query<
      Articles,
      ArticleQueryArg
    >({
      providesTags: ['Articles'],
      query: params => {
        const q = formatQueryParams(params)
        return generateRequestUrl({path: '/articles', params: q})
      },
      keepUnusedDataFor: CacheLifetime.minute,
      transformResponse: (response: {result: Articles}) => response.result,
    }),

    [ProjectsEndpointName.getProject]: builder.query<
      Project,
      ProjectIdQueryArg & AddressQueryArg
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => generateRequestUrl({path: '/project/details', params}),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: Project}) => response.result,
    }),

    [ProjectsEndpointName.getProjectNews]: builder.query<
      NewsArticle,
      ProjectIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/news', params}),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: NewsArticle}) => response.result,
    }),

    [ProjectsEndpointName.getProjects]: builder.query<
      ProjectsItem[],
      Partial<
        ProjectsQueryArg & AddressQueryArg & FieldsQueryArg & SortListQueryArg
      > | void
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => {
        if (params) {
          return generateRequestUrl({
            path: '/projects',
            params: formatQueryParams({...params, page_size: 10}),
          })
        }
        return '/projects'
      },
      keepUnusedDataFor: CacheLifetime.hour,
      serializeQueryArgs: ({endpointName}) => endpointName,
      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg?.page === 1) {
          return newItems
        }
        currentCache.push(...newItems)
      },
      forceRefetch: ({currentArg, previousArg}) => currentArg !== previousArg,
      transformResponse: (response: {result: ProjectsItem[]}) =>
        response.result,
    }),

    [ProjectsEndpointName.getProjectsFollowedArticles]: builder.query<
      ProjectsFollowedArticlesResponse,
      ProjectsFollowedArticlesQueryArg | void
    >({
      providesTags: ['Articles', 'FollowedProjects'],
      query: params => {
        const path = '/projects/followed/articles'
        if (params) {
          return generateRequestUrl({
            path,
            params,
          })
        }
        return path
      },
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {
        result: ProjectsFollowedArticlesResponse
      }) => response.result,
    }),

    [ProjectsEndpointName.getProjectsByText]: builder.query<
      ProjectsItem[],
      ProjectsByTextQueryArg & FieldsQueryArg
    >({
      providesTags: ['Projects'],
      query: params =>
        generateRequestUrl({
          path: '/projects/search',
          params: formatQueryParams({...params, page_size: 1000}),
        }),

      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: ProjectsItem[]}) =>
        response.result,
    }),

    [ProjectsEndpointName.getProjectWarning]: builder.query<
      ProjectWarning,
      ProjectWarningIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/warning', params}),
      keepUnusedDataFor: CacheLifetime.week,
      transformResponse: (response: {result: ProjectWarning}) =>
        response.result,
    }),

    [ProjectsEndpointName.unfollowProject]: builder.mutation<
      MutationResponse,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        url: '/projects/follow',
        method: 'DELETE',
        body,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useFollowProjectMutation,
  useGetArticlesQuery,
  useGetProjectNewsQuery,
  useGetProjectQuery,
  useGetProjectWarningQuery,
  useGetProjectsByTextQuery,
  useGetProjectsQuery,
  useGetProjectsFollowedArticlesQuery,
  useUnfollowProjectMutation,
} = projectsApi
