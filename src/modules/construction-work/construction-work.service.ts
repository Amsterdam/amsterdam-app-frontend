import {baseApi} from '@/services'
import {
  NewProjectWarning,
  NewsArticle,
  Project,
  ProjectIdQueryArg,
  ProjectManagerResponse,
  ProjectsByDistanceQueryArg,
  ProjectsByTextQueryArg,
  ProjectsEndpointName,
  ProjectsItem,
  ProjectsQueryArg,
  ProjectWarning,
  ProjectWarningIdQueryArg,
  ProjectWarningImageQueryArg,
  ProjectWarningResponse,
  SortListQueryArg,
} from '@/types'
import {formatQueryParams, generateRequestUrl} from '@/utils'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ProjectsEndpointName.addProjectWarning]: builder.mutation<
      ProjectWarningResponse,
      NewProjectWarning
    >({
      invalidatesTags: ['Articles'],
      query(body) {
        return {
          url: '/project/warning',
          method: 'POST',
          body,
        }
      },
      transformResponse: (response: {result: ProjectWarningResponse}) =>
        response.result,
    }),

    [ProjectsEndpointName.addProjectWarningImage]: builder.mutation<
      unknown,
      ProjectWarningImageQueryArg
    >({
      invalidatesTags: ['Articles'],
      query(body) {
        return {
          url: '/project/warning/image',
          method: 'POST',
          body,
        }
      },
    }),

    [ProjectsEndpointName.getProject]: builder.query<
      Project,
      ProjectIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/details', params}),
      transformResponse: (response: {result: Project}) => response.result,
    }),

    [ProjectsEndpointName.getProjectManager]: builder.query<
      ProjectManagerResponse,
      ProjectIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/manager', params}),
      transformResponse: (response: {result: [ProjectManagerResponse]}) =>
        response.result[0],
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
      Partial<ProjectsQueryArg & SortListQueryArg> | void
    >({
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

    [ProjectsEndpointName.getProjectsByDistance]: builder.query<
      ProjectsItem[],
      ProjectsByDistanceQueryArg
    >({
      query: params => generateRequestUrl({path: '/projects/distance', params}),
      transformResponse: (response: {result: ProjectsItem[]}) =>
        response.result,
    }),

    [ProjectsEndpointName.getProjectsByText]: builder.query<
      ProjectsItem[],
      ProjectsByTextQueryArg
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
  }),
  overrideExisting: true,
})

export const {
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
  useGetProjectManagerQuery,
  useGetProjectNewsQuery,
  useGetProjectQuery,
  useGetProjectWarningQuery,
  useGetProjectsByDistanceQuery,
  useGetProjectsByTextQuery,
  useGetProjectsQuery,
} = projectsApi
