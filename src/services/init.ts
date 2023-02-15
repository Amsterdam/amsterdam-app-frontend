import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react'
import {getUniqueId} from 'react-native-device-info'
// eslint-disable-next-line no-restricted-imports
import {version as appVersion} from '@/../package.json'
import {EnvironmentConfig} from '@/environment'
import {ProjectsEndpointName} from '@/modules/construction-work/types'
import {ConstructionWorkEditorEndpointName} from '@/modules/construction-work-editor/types'
import {selectAuthManagerToken} from '@/store/authSlice'
import {selectEnvironment} from '@/store/environmentSlice'
import {RootState} from '@/store/store'
import {DeviceRegistrationEndpointName} from '@/types'
import {deviceAuthorizationToken} from '@/utils'

const managerAuthorizedEndpoints = [
  'addNotification',
  ConstructionWorkEditorEndpointName.getProjectManager,
  ConstructionWorkEditorEndpointName.addProjectWarning,
  ConstructionWorkEditorEndpointName.addProjectWarningImage,
]

const deviceIdRequestingEndpoints: string[] = [
  ProjectsEndpointName.followProject,
  ProjectsEndpointName.getProject,
  ProjectsEndpointName.getProjects,
  ProjectsEndpointName.getProjectsFollowedArticles,
  ProjectsEndpointName.unfollowProject,
  DeviceRegistrationEndpointName.registerDevice,
  DeviceRegistrationEndpointName.unregisterDevice,
]

const deviceAuthorizationHeaderEndpoints: string[] = [
  ProjectsEndpointName.followProject,
  ProjectsEndpointName.unfollowProject,
  DeviceRegistrationEndpointName.registerDevice,
  DeviceRegistrationEndpointName.unregisterDevice,
]

const dynamicBaseQuery: BaseQueryFn<
  string | (FetchArgs & {api?: keyof EnvironmentConfig}),
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const api = typeof args !== 'string' && args.api ? args.api : 'apiUrl'

  return retry(
    fetchBaseQuery({
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

        headers.set('appVersion', appVersion)

        return headers
      },
    }),
    {maxRetries: 5},
  )(args, baseQueryApi, extraOptions)
}

export const baseApi = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: [
    'Articles',
    'FollowedProjects',
    'Modules',
    'Notifications',
    'Projects',
  ],
})
