import {NewWarning, WarningResponse} from '../types'
import {emptySplitApi} from './init'

export const projectsApi = emptySplitApi.injectEndpoints({
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
  }),
})

export const {useAddWarningMutation} = projectsApi
