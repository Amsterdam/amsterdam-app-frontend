import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import {EnvironmentConfig} from '../environment'
import {selectEnvironment} from '../store'
import {selectAuthManagerToken} from '../store/authSlice'
import {RootState} from '../store/store'

const managerAuthorizedEndpoints = [
  'addNotification',
  'addProjectWarning',
  'addProjectWarningImage',
  'getProjectManager',
]

const dynamicBaseQuery: BaseQueryFn<
  string | (FetchArgs & {api?: keyof EnvironmentConfig}),
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const api = typeof args !== 'string' && args.api ? args.api : 'apiUrl'

  return fetchBaseQuery({
    baseUrl: selectEnvironment(baseQueryApi.getState() as RootState)[api],
    prepareHeaders: (headers, {endpoint, getState}) => {
      const token = selectAuthManagerToken(getState() as RootState)

      if (token && managerAuthorizedEndpoints.includes(endpoint)) {
        headers.set('userauthorization', token)
      }

      return headers
    },
  })(args, baseQueryApi, extraOptions)
}

export const baseApi = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Articles', 'Modules', 'Notifications'],
})
