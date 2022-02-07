import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getEnvironment} from '../environment'
import {RootState} from '../store'

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getEnvironment().apiUrl,
    prepareHeaders: (headers, {getState}) => {
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
