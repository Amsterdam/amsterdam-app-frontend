import {NewWarning, WarningResponse} from '../types'
import {emptySplitApi} from './init'

// Define a service using a base URL and expected endpoints
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useAddWarningMutation} = projectsApi
