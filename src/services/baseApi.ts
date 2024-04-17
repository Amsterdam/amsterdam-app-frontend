import {API_KEY} from '@env'
import {
  BaseQueryApi,
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
import {devError} from '@/processes/development'
import {sentryLogRequestFailed} from '@/processes/sentry/logging'
import {isExpectedError} from '@/processes/sentry/utils'
import {selectAuthManagerToken} from '@/store/slices/auth'
import {selectApi} from '@/store/slices/environment'
import {RootState} from '@/store/types/rootState'
import {TimeOutDuration} from '@/types/api'
import {DeviceRegistrationEndpointName} from '@/types/device'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'
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

const prepareHeaders = (
  headers: Headers,
  {
    endpoint,
    getState,
  }: Pick<BaseQueryApi, 'endpoint' | 'getState' | 'type' | 'extra' | 'forced'>,
) => {
  const token = selectAuthManagerToken(getState() as RootState)

  token &&
    managerAuthorizedEndpoints.includes(endpoint) &&
    headers.set('userauthorization', token)

  deviceIdRequestingEndpoints.includes(endpoint) &&
    headers.set('deviceid', SHA256EncryptedDeviceId)

  if (API_KEY) {
    headers.set('X-API-KEY', API_KEY)
  } else {
    devError('No API key in .env.')
  }

  headers.set('releaseVersion', VERSION_NUMBER)

  return headers
}

const dynamicBaseQuery: BaseQueryFn<
  FetchArgs & {slug: ApiSlug},
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) =>
  retry(
    async () => {
      const result = await fetchBaseQuery({
        baseUrl: selectApi(baseQueryApi.getState() as RootState, args.slug),
        prepareHeaders,
        timeout: TimeOutDuration.medium,
      })(args, baseQueryApi, extraOptions)

      const {error, meta} = result

      if (error && !isExpectedError(baseQueryApi.endpoint, error)) {
        sentryLogRequestFailed(
          {
            meta: {
              arg: {endpointName: baseQueryApi.endpoint},
              baseQueryMeta: meta,
            },
            payload: {
              error: error,
              originalStatus: meta?.response?.status,
              status: error?.status.toString(),
            },
          },
          true,
        )
      }

      if (error?.status === 404) {
        retry.fail(error)
      }

      return result
    },
    {maxRetries: 2},
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
