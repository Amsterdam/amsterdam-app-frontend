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
import {devError} from '@/processes/development'
import {sentryLogRequestFailed} from '@/processes/sentry/logging'
import {isExpectedError} from '@/processes/sentry/utils'
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

export type PrepareHeaders = (
  headers: Headers,
  api: Pick<
    BaseQueryApi,
    'endpoint' | 'getState' | 'type' | 'extra' | 'forced'
  >,
) => Headers

const prepareHeaders: PrepareHeaders = (headers, {endpoint}) => {
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
  FetchArgs & {
    prepareHeaders?: PrepareHeaders
    slug: ApiSlug
  },
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) =>
  retry(
    async () => {
      const result = await fetchBaseQuery({
        baseUrl: selectApi(args.slug)(baseQueryApi.getState() as RootState),
        prepareHeaders: (headers, api) =>
          args.prepareHeaders
            ? prepareHeaders(args.prepareHeaders(headers, api), api)
            : prepareHeaders(headers, api),
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
              error,
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

      if (
        error?.status === 'FETCH_ERROR' ||
        error?.status === 'TIMEOUT_ERROR'
      ) {
        await sleep(100)
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
