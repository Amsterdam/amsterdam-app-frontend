import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getEnvironment} from '../environment'
import {selectAuthManagerToken} from '../store/authSlice'
import {RootState} from '../store/store'

const managerAuthorizedEndpoints = [
  'addNotification',
  'addProjectWarning',
  'addProjectWarningImage',
  'getProjectManager',
]

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getEnvironment().apiUrl,
    prepareHeaders: (headers, {endpoint, getState}) => {
      const token = selectAuthManagerToken(getState() as RootState)
      if (token && managerAuthorizedEndpoints.includes(endpoint)) {
        headers.set('userauthorization', token)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Articles', 'Modules', 'Notifications'],
})
