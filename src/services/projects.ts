import {
  ListQueryArgsNoLimit,
  NewWarning,
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
    getProjects: builder.query<
      Projects,
      Partial<ProjectsQueryArgs & ListQueryArgsNoLimit>
    >({
      query: params => {
        const q = formatQueryArgs(params)
        return generateRequestUrl('/projects', q)
      },
      transformResponse: (response: {result: Projects}) => response.result,
    }),
  }),
})

export const {useAddWarningMutation} = projectsApi
