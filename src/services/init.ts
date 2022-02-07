import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getEnvironment} from '../environment'
import {RootState} from '../store'

const managerAuthorizedEndpoints = ['addNotification', 'addWarning']

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getEnvironment().apiUrl,
    prepareHeaders: (headers, {endpoint, getState}) => {
      const token = (getState() as RootState).auth.managerToken
      if (token && managerAuthorizedEndpoints.includes(endpoint)) {
        headers.set('userauthorization', token)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Articles', 'Notifications'],
})
