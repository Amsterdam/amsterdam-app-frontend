import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react'
import {ApiSlug} from '@/environment'
import {ProjectsEndpointName} from '@/modules/construction-work/types/api'
import {ConstructionWorkEditorEndpointName} from '@/modules/construction-work-editor/types'
import {selectAuthManagerToken} from '@/store/slices/auth'
import {selectApi} from '@/store/slices/environment'
import {RootState} from '@/store/types/rootState'
import {DeviceRegistrationEndpointName} from '@/types/device'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'
import {deviceAuthorizationToken} from '@/utils/getAuthToken'
import {VERSION_NUMBER} from '@/utils/version'

const managerAuthorizedEndpoints = [
  'addNotification',
  ConstructionWorkEditorEndpointName.getProjectManager,
  ConstructionWorkEditorEndpointName.addProjectWarning,
  ConstructionWorkEditorEndpointName.addProjectWarningImage,
]

const deviceIdRequestingEndpoints: string[] = [
  ProjectsEndpointName.projectFollow,
  ProjectsEndpointName.projectDetails,
  ProjectsEndpointName.projects,
  ProjectsEndpointName.projectsFollowedArticles,
  ProjectsEndpointName.projectUnfollow,
  DeviceRegistrationEndpointName.registerDevice,
  DeviceRegistrationEndpointName.unregisterDevice,
]

const dynamicBaseQuery: BaseQueryFn<
  FetchArgs & {slug: ApiSlug},
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) =>
  retry(
    async () => {
      const result = await fetchBaseQuery({
        baseUrl: selectApi(baseQueryApi.getState() as RootState, args.slug),
        prepareHeaders: (headers, {endpoint, getState}) => {
          const token = selectAuthManagerToken(getState() as RootState)

          token &&
            managerAuthorizedEndpoints.includes(endpoint) &&
            headers.set('userauthorization', token)

          deviceIdRequestingEndpoints.includes(endpoint) &&
            headers.set('deviceid', SHA256EncryptedDeviceId)

          headers.set('DeviceAuthorization', deviceAuthorizationToken)

          headers.set('releaseVersion', VERSION_NUMBER)

          return headers
        },
      })(args, baseQueryApi, extraOptions)

      if (result.error?.status === 404) {
        retry.fail(result.error)
      }

      return result
    },
    {maxRetries: 5},
  )(args, baseQueryApi, extraOptions as never)

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
