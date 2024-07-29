import {API_KEY} from '@env'
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react'
import {ApiSlug} from '@/environment'
import {CityPassEndpointName} from '@/modules/city-pass/types'
import {ProjectsEndpointName} from '@/modules/construction-work/types/api'
import {devError, devInfo} from '@/processes/development'
import {PrepareHeaders, AfterBaseQueryFn} from '@/services/types'
import {selectApi} from '@/store/slices/environment'
import {RootState} from '@/store/types/rootState'
import {TimeOutDuration} from '@/types/api'
import {DeviceRegistrationEndpointName} from '@/types/device'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'
import {sleep} from '@/utils/sleep'
import {VERSION_NUMBER} from '@/utils/version'

const deviceIdRequestingEndpoints: string[] = [
  ProjectsEndpointName.projectFollow,
  ProjectsEndpointName.projectDetails,
  ProjectsEndpointName.projects,
  ProjectsEndpointName.projectsFollowedArticles,
  ProjectsEndpointName.projectUnfollow,
  DeviceRegistrationEndpointName.registerDevice,
  DeviceRegistrationEndpointName.unregisterDevice,
]

const prepareHeaders: PrepareHeaders = (headers, {endpoint}) => {
  deviceIdRequestingEndpoints.includes(endpoint) &&
    headers.set('deviceid', SHA256EncryptedDeviceId)

  if (API_KEY) {
    headers.set('X-API-KEY', API_KEY)

    // TODO: Remove this when the general API key is implemented on the backend for this endpoint
    if (endpoint === CityPassEndpointName.getAccessToken) {
      headers.set('X-API-KEY', '28170de1-4585-48fc-92e7-62d93176ed75')
    }
  } else {
    devError('No API key in .env.')
  }

  headers.set('releaseVersion', VERSION_NUMBER)

  return headers
}

const dynamicBaseQuery: BaseQueryFn<
  FetchArgs & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterError?: AfterBaseQueryFn<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterSuccess?: AfterBaseQueryFn<any>
    prepareHeaders?: PrepareHeaders
    slug: ApiSlug
  },
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) =>
  retry(
    async () => {
      const {
        slug,
        afterError,
        afterSuccess,
        prepareHeaders: argsPrepareHeaders = headers => headers,
      } = args

      const baseUrl = selectApi(slug)(baseQueryApi.getState() as RootState)

      const requestInfo = `${baseQueryApi.endpoint}: ${args.method ?? 'GET'} ${baseUrl}${args.url}`

      devInfo(`Request started: ${requestInfo}`)

      const result = await fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, api) =>
          prepareHeaders(argsPrepareHeaders(headers, api), api),
        timeout: TimeOutDuration.medium,
      })(args, baseQueryApi, extraOptions)

      const {error, meta} = result

      const status = meta?.response?.status ?? error?.status ?? 0

      if (!error) {
        devInfo(`Request success: ${requestInfo}`)
      } else {
        devError(`Request failed (${status}): ${requestInfo}`)
      }

      if (status === 404) {
        retry.fail(error)
      }

      if (
        error?.status === 'FETCH_ERROR' ||
        error?.status === 'TIMEOUT_ERROR' ||
        error?.status === 502
      ) {
        await sleep(100)
      }

      if (error) {
        afterError?.(result, baseQueryApi)
      } else {
        afterSuccess?.(result, baseQueryApi)
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
