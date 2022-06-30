import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import {getUniqueId} from 'react-native-device-info'
import {EnvironmentConfig} from '@/environment'
import {selectAuthManagerToken} from '@/store/authSlice'
import {selectEnvironment} from '@/store/environmentSlice'
import {RootState} from '@/store/store'
import {ProjectsEndpointName} from '@/types'
import {deviceAuthorizationToken} from '@/utils'

const managerAuthorizedEndpoints = [
  'addNotification',
  ProjectsEndpointName.addProjectWarning,
  ProjectsEndpointName.addProjectWarningImage,
  ProjectsEndpointName.getProjectManager,
]

const deviceIdRequestingEndpoints: string[] = [
  ProjectsEndpointName.followProject,
  ProjectsEndpointName.getProject,
  ProjectsEndpointName.getProjects,
  ProjectsEndpointName.unfollowProject,
]

const deviceAuthorizationHeaderEndpoints: string[] = [
  ProjectsEndpointName.followProject,
  ProjectsEndpointName.unfollowProject,
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

      token &&
        managerAuthorizedEndpoints.includes(endpoint) &&
        headers.set('userauthorization', token)

      deviceIdRequestingEndpoints.includes(endpoint) &&
        headers.set('deviceid', getUniqueId())

      deviceAuthorizationHeaderEndpoints.includes(endpoint) &&
        headers.set('DeviceAuthorization', deviceAuthorizationToken)

      return headers
    },
  })(args, baseQueryApi, extraOptions)
}

export const baseApi = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Articles', 'Modules', 'Notifications', 'Projects'],
})
