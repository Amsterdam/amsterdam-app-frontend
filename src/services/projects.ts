import {
  ListQueryArgsNoLimit,
  NewWarning,
  ProjectDetail,
  ProjectDetailQueryArgs,
  Projects,
  ProjectsQueryArgs,
  WarningResponse,
} from '../types'
import {formatQueryArgs, generateRequestUrl} from '../utils'
import {baseApi} from './init'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addWarning: builder.mutation<WarningResponse, NewWarning>({
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
    getProject: builder.query<ProjectDetail, ProjectDetailQueryArgs>({
      query: params => generateRequestUrl('/project/details', params),
      transformResponse: (response: {result: ProjectDetail}) => response.result,
    }),
    getProjects: builder.query<
      Projects,
      Partial<ProjectsQueryArgs & ListQueryArgsNoLimit> | void
    >({
      query: params => {
        if (params) {
          const q = formatQueryArgs(params)
          return generateRequestUrl('/projects', q)
        }
        return '/projects'
      },
      transformResponse: (response: {result: Projects}) => response.result,
    }),
  }),
})

export const {useAddWarningMutation, useGetProjectQuery, useGetProjectsQuery} =
  projectsApi
