import {
  ListQueryArgNoLimit,
  NearestProjects,
  NearestProjectsQueryArg,
  NewProjectWarning,
  NewsArticle,
  ProjectDetail,
  ProjectIdQueryArg,
  ProjectManagerResponse,
  Projects,
  ProjectsQueryArg,
  ProjectWarning,
  ProjectWarningIdQueryArg,
  ProjectWarningImageQueryArg,
  ProjectWarningResponse,
} from '../types'
import {formatQueryParams, generateRequestUrl} from '../utils'
import {baseApi} from './init'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addProjectWarning: builder.mutation<
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

    addProjectWarningImage: builder.mutation<
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

    getNearestProjects: builder.query<NearestProjects, NearestProjectsQueryArg>(
      {
        query: params => generateRequestUrl('/projects/distance', params),
        transformResponse: (response: {result: NearestProjects}) =>
          response.result,
      },
    ),

    getProjectWarning: builder.query<ProjectWarning, ProjectWarningIdQueryArg>({
      query: params => generateRequestUrl('/project/warning', params),
      transformResponse: (response: {result: ProjectWarning}) =>
        response.result,
    }),
  }),
})

export const {
  useAddProjectWarningMutation,
  useGetNearestProjectsQuery,
  useAddProjectWarningImageMutation,
  useGetProjectManagerQuery,
  useGetProjectNewsQuery,
  useGetProjectQuery,
  useGetProjectWarningQuery,
  useGetProjectsQuery,
} = projectsApi
