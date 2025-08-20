import {ApiSlug, GlobalApiSlug} from '@/environment'
import {NotificationModulesResponse} from '@/modules/user/types'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'

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
                const idx = draft.indexOf(module_slug)

                if (idx !== -1) {
                  draft.splice(idx, 1)
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
          headers: deviceIdHeader,
          method: 'DELETE',
          params: {module_slug},
          slug: GlobalApiSlug.notification,
          url: '/device/disabled_push_module',
        }),
      },
    ),
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
  }),
  overrideExisting: true,
})

export const {
  useGetNotificationModulesQuery,
  useGetDisabledPushModulesQuery,
  useAddDisabledPushModuleMutation,
  useDeleteDisabledPushModuleMutation,
} = notificationApi
