import {GlobalApiSlug} from '@/environment'
import {GetNotificationsResult} from '@/modules/notification-history/types'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

const notificationHistoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<GetNotificationsResult | undefined, void>({
      query: () => ({
        slug: GlobalApiSlug.notification,
        url: generateRequestUrl({
          path: '/notifications',
          params: {},
        }),
        headers: deviceIdHeader,
      }),
      keepUnusedDataFor: CacheLifetime.minute,
    }),
  }),
  overrideExisting: true,
})

export const {useGetNotificationsQuery} = notificationHistoryApi
