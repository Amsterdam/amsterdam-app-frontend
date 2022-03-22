import {
  ListQueryArgNoLimit,
  NearestProjectsQueryArg,
  NewProjectWarning,
  NewsArticle,
  Project,
  ProjectDetail,
  ProjectIdQueryArg,
  ProjectManagerResponse,
  ProjectsQueryArg,
  ProjectsSearchQueryArg,
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
      Project[],
      Partial<ProjectsQueryArg & ListQueryArgNoLimit> | void
    >({
      query: params => {
        if (params) {
          return generateRequestUrl('/projects', formatQueryParams(params))
        }
        return '/projects'
      },
      transformResponse: (response: {result: Project[]}) => response.result,
    }),

    getProjectsByDistance: builder.query<Project[], NearestProjectsQueryArg>({
      query: params => generateRequestUrl('/projects/distance', params),
      transformResponse: (response: {result: Project[]}) => response.result,
    }),

    getProjectsByText: builder.query<
      Project[],
      Partial<ProjectsSearchQueryArg>
    >({
      query: params => {
        return generateRequestUrl('/projects/search', formatQueryParams(params))
      },
      transformResponse: (response: {result: Project[]}) => response.result,
    }),

    getProjectWarning: builder.query<ProjectWarning, ProjectWarningIdQueryArg>({
      query: params => generateRequestUrl('/project/warning', params),
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
