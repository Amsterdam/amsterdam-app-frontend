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
  ProjectsItem,
  ProjectsQueryArg,
  ProjectWarning,
  ProjectWarningIdQueryArg,
} from '@/modules/construction-work/types'
import {baseApi} from '@/services'
import {MutationResponse, SortListQueryArg} from '@/types'
import {formatQueryParams, generateRequestUrl} from '@/utils'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ProjectsEndpointName.followProject]: builder.mutation<
      MutationResponse,
      FollowProjectBody
    >({
      invalidatesTags: ['Projects'],
      query(body) {
        return {
          url: '/projects/follow',
          method: 'POST',
          body,
        }
      },
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
      transformResponse: (response: {result: Articles}) => response.result,
    }),

    [ProjectsEndpointName.getProject]: builder.query<
      Project,
      ProjectIdQueryArg & AddressQueryArg
    >({
      providesTags: ['Projects'],
      query: params => generateRequestUrl({path: '/project/details', params}),
      transformResponse: (response: {result: Project}) => response.result,
    }),

    [ProjectsEndpointName.getProjectNews]: builder.query<
      NewsArticle,
      ProjectIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/news', params}),
      transformResponse: (response: {result: NewsArticle}) => response.result,
    }),

    [ProjectsEndpointName.getProjects]: builder.query<
      ProjectsItem[],
      Partial<
        ProjectsQueryArg & AddressQueryArg & FieldsQueryArg & SortListQueryArg
      > | void
    >({
      providesTags: ['Projects'],
      query: params => {
        if (params) {
          return generateRequestUrl({
            path: '/projects',
            params: formatQueryParams(params),
          })
        }
        return '/projects'
      },
      transformResponse: (response: {result: ProjectsItem[]}) =>
        response.result,
    }),

    [ProjectsEndpointName.getProjectsByText]: builder.query<
      ProjectsItem[],
      ProjectsByTextQueryArg & FieldsQueryArg
    >({
      query: params => {
        return generateRequestUrl({
          path: '/projects/search',
          params: formatQueryParams(params),
        })
      },
      transformResponse: (response: {result: ProjectsItem[]}) =>
        response.result,
    }),

    [ProjectsEndpointName.getProjectWarning]: builder.query<
      ProjectWarning,
      ProjectWarningIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/warning', params}),
      transformResponse: (response: {result: ProjectWarning}) =>
        response.result,
    }),

    [ProjectsEndpointName.unfollowProject]: builder.mutation<
      MutationResponse,
      FollowProjectBody
    >({
      invalidatesTags: ['Projects'],
      query(body) {
        return {
          url: '/projects/follow',
          method: 'DELETE',
          body,
        }
      },
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
  useUnfollowProjectMutation,
} = projectsApi
