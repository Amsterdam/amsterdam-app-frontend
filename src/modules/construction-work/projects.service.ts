import {baseApi} from '../../services'
import {
  NewProjectWarning,
  NewsArticle,
  Project,
  ProjectDetail,
  ProjectIdQueryArg,
  ProjectManagerResponse,
  ProjectsByDistanceQueryArg,
  ProjectsByTextQueryArg,
  ProjectsQueryArg,
  ProjectWarning,
  ProjectWarningIdQueryArg,
  ProjectWarningImageQueryArg,
  ProjectWarningResponse,
  SortListQueryArg,
} from '../../types'
import {formatQueryParams, generateRequestUrl} from '../../utils'

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
      query: params => generateRequestUrl({path: '/project/details', params}),
      transformResponse: (response: {result: ProjectDetail}) => response.result,
    }),

    getProjectManager: builder.query<ProjectManagerResponse, ProjectIdQueryArg>(
      {
        query: params => generateRequestUrl({path: '/project/manager', params}),
        transformResponse: (response: {result: [ProjectManagerResponse]}) =>
          response.result[0],
      },
    ),

    getProjectNews: builder.query<NewsArticle, ProjectIdQueryArg>({
      query: params => generateRequestUrl({path: '/project/news', params}),
      transformResponse: (response: {result: NewsArticle}) => response.result,
    }),

    getProjects: builder.query<
      Project[],
      Partial<ProjectsQueryArg & SortListQueryArg> | void
    >({
      query: params => {
        if (params) {
          return generateRequestUrl({
            path: '/construction-work',
            params: formatQueryParams(params),
          })
        }
        return '/construction-work'
      },
      transformResponse: (response: {result: Project[]}) => response.result,
    }),

    getProjectsByDistance: builder.query<Project[], ProjectsByDistanceQueryArg>(
      {
        query: params =>
          generateRequestUrl({path: '/construction-work/distance', params}),
        transformResponse: (response: {result: Project[]}) => response.result,
      },
    ),

    getProjectsByText: builder.query<Project[], ProjectsByTextQueryArg>({
      query: params => {
        return generateRequestUrl({
          path: '/construction-work/search',
          params: formatQueryParams(params),
        })
      },
      transformResponse: (response: {result: Project[]}) => response.result,
    }),

    getProjectWarning: builder.query<ProjectWarning, ProjectWarningIdQueryArg>({
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
