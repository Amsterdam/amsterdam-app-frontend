import {ApiSlug, GlobalApiSlug} from '@/environment'
import {NotificationModulesResponse} from '@/modules/user/types'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {removeItemFromArray} from '@/utils/removeItemFromArray'

const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addDisabledPushModule: builder.mutation<{module_slug: ApiSlug}, ApiSlug>({
      invalidatesTags: ['Notifications'],
      onQueryStarted: async (module_slug, {dispatch, queryFulfilled}) => {
        // Optimistically update the cache
        const patchResult = dispatch(
          notificationApi.util.updateQueryData(
            'getDisabledPushModules',
            undefined,
            draft => {
              if (!draft.includes(module_slug)) {
                draft.push(module_slug)
              }
            },
          ),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: module_slug => ({
        body: {module_slug},
        headers: deviceIdHeader,
        method: 'POST',
        slug: GlobalApiSlug.notification,
        url: '/device/disabled_push_module',
      }),
    }),
    addDisabledPushType: builder.mutation<{notification_type: string}, string>({
      invalidatesTags: ['Notifications'],
      onQueryStarted: async (notification_type, {dispatch, queryFulfilled}) => {
        // Optimistically update the cache
        const patchResult = dispatch(
          notificationApi.util.updateQueryData(
            'getDisabledPushTypes',
            undefined,
            draft => {
              if (!draft.includes(notification_type)) {
                draft.push(notification_type)
              }
            },
          ),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: notification_type => ({
        body: {notification_type},
        headers: deviceIdHeader,
        method: 'POST',
        slug: GlobalApiSlug.notification,
        url: '/device/disabled_push_type',
      }),
    }),
    deleteDisabledPushModule: builder.mutation<{module_slug: ApiSlug}, ApiSlug>(
      {
        invalidatesTags: ['Notifications'],
        onQueryStarted: async (module_slug, {dispatch, queryFulfilled}) => {
          // Optimistically update the cache
          const patchResult = dispatch(
            notificationApi.util.updateQueryData(
              'getDisabledPushModules',
              undefined,
              draft => {
                removeItemFromArray(draft, module_slug)
              },
            ),
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: module_slug => ({
          headers: deviceIdHeader,
          method: 'DELETE',
          params: {module_slug},
          slug: GlobalApiSlug.notification,
          url: '/device/disabled_push_module',
        }),
      },
    ),
    deleteDisabledPushType: builder.mutation<
      {notification_type: string},
      string
    >({
      invalidatesTags: ['Notifications'],
      onQueryStarted: async (notification_type, {dispatch, queryFulfilled}) => {
        // Optimistically update the cache
        const patchResult = dispatch(
          notificationApi.util.updateQueryData(
            'getDisabledPushTypes',
            undefined,
            draft => {
              removeItemFromArray(draft, notification_type)
            },
          ),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: notification_type => ({
        headers: deviceIdHeader,
        method: 'DELETE',
        params: {notification_type},
        slug: GlobalApiSlug.notification,
        url: '/device/disabled_push_type',
      }),
    }),
    getNotificationModules: builder.query<NotificationModulesResponse, void>({
      query: () => ({
        slug: GlobalApiSlug.notification,
        url: '/modules',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
    getDisabledPushModules: builder.query<ApiSlug[], void>({
      providesTags: ['Notifications'],
      query: () => ({
        headers: deviceIdHeader,
        slug: GlobalApiSlug.notification,
        url: '/device/disabled_push_modules',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
    getDisabledPushTypes: builder.query<string[], void>({
      providesTags: ['Notifications'],
      query: () => ({
        headers: deviceIdHeader,
        slug: GlobalApiSlug.notification,
        url: '/device/disabled_push_types',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetNotificationModulesQuery,
  useGetDisabledPushModulesQuery,
  useAddDisabledPushModuleMutation,
  useDeleteDisabledPushModuleMutation,
  useAddDisabledPushTypeMutation,
  useDeleteDisabledPushTypeMutation,
  useGetDisabledPushTypesQuery,
} = notificationApi
