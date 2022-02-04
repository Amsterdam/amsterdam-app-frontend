// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getEnvironment} from '../environment'
import {RootState} from '../store'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getEnvironment().apiUrl,
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.managerToken
      if (token) {
        headers.set('userauthorization', token)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Articles', 'Notifications'],
})
