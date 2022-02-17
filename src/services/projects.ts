import {
  ListQueryArgNoLimit,
  NewsArticle,
  NewWarning,
  ProjectDetail,
  ProjectIdQueryArg,
  ProjectManagerResponse,
  Projects,
  ProjectsQueryArg,
  Warning,
  WarningIdQueryArg,
  WarningImageQueryArg,
  WarningResponse,
} from '../types'
import {formatQueryParams, generateRequestUrl} from '../utils'
import {baseApi} from './init'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addProjectWarning: builder.mutation<WarningResponse, NewWarning>({
      invalidatesTags: ['Articles'],
      query(body) {
        return {
          url: '/project/warning',
          method: 'POST',
          body,
        }
      },
      transformResponse: (response: {result: WarningResponse}) =>
        response.result,
    }),

    addProjectWarningImage: builder.mutation<unknown, WarningImageQueryArg>({
      invalidatesTags: ['Articles'],
      query(body) {
        return {
          url: '/project/warning/image',
          method: 'POST',
          body,
        }
      },
    }),

    getProject: builder.query<ProjectDetail, ProjectIdQueryArg>({
      query: params => generateRequestUrl('/project/details', params),
      transformResponse: (response: {result: ProjectDetail}) => response.result,
    }),

    getProjectManager: builder.query<ProjectManagerResponse, ProjectIdQueryArg>(
      {
        query: params => generateRequestUrl('/project/manager', params),
        transformResponse: (response: {result: [ProjectManagerResponse]}) =>
          response.result[0],
      },
    ),

    getProjectNews: builder.query<NewsArticle, ProjectIdQueryArg>({
      query: params => generateRequestUrl('/project/news', params),
      transformResponse: (response: {result: NewsArticle}) => response.result,
    }),

    getProjects: builder.query<
      Projects,
      Partial<ProjectsQueryArg & ListQueryArgNoLimit> | void
    >({
      query: params => {
        if (params) {
          const q = formatQueryParams(params)
          return generateRequestUrl('/projects', q)
        }
        return '/projects'
      },
      transformResponse: (response: {result: Projects}) => response.result,
    }),

    getProjectWarning: builder.query<Warning, WarningIdQueryArg>({
      query: params => generateRequestUrl('/project/warning', params),
      transformResponse: (response: {result: Warning}) => response.result,
    }),
  }),
})

export const {
  useAddProjectWarningMutation,
  useGetProjectManagerQuery,
  useGetProjectNewsQuery,
  useGetProjectQuery,
  useGetProjectsQuery,
  useGetProjectWarningQuery,
} = projectsApi
