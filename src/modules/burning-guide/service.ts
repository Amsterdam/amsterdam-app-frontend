import {
  BurningGuideEndpointName,
  type BurningGuideApiResponse,
  type BurningGuideNotificationSettings,
} from '@/modules/burning-guide/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'

export const burningGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [BurningGuideEndpointName.burningGuide]: builder.query<
      BurningGuideApiResponse,
      string
    >({
      query: postal_code => ({
        method: 'GET',
        params: {postal_code},
        slug: ModuleSlug['burning-guide'],
        url: '/advice',
      }),
    }),

    [BurningGuideEndpointName.getBurningGuideNotification]: builder.query<
      BurningGuideNotificationSettings,
      void
    >({
      query: () => ({
        slug: ModuleSlug['burning-guide'],
        url: '/notification',
        headers: deviceIdHeader,
      }),
      providesTags: ['BurningGuideNotifications'],
      keepUnusedDataFor: CacheLifetime.day,
    }),
    [BurningGuideEndpointName.postBurningGuideNotification]: builder.mutation<
      BurningGuideNotificationSettings,
      string
    >({
      query: postal_code => ({
        body: {postal_code},
        slug: ModuleSlug['burning-guide'],
        url: '/notifications',
        headers: deviceIdHeader,
        method: 'POST',
      }),
      invalidatesTags: ['BurningGuideNotifications'],
    }),
    [BurningGuideEndpointName.patchBurningGuideNotification]: builder.mutation<
      BurningGuideNotificationSettings,
      string
    >({
      query: postal_code => ({
        body: {postal_code},
        slug: ModuleSlug['burning-guide'],
        url: '/notification',
        headers: deviceIdHeader,
        method: 'PATCH',
      }),
      invalidatesTags: ['BurningGuideNotifications'],
    }),
    [BurningGuideEndpointName.deleteBurningGuideNotification]: builder.mutation<
      BurningGuideNotificationSettings,
      void
    >({
      query: () => ({
        slug: ModuleSlug['burning-guide'],
        url: '/notification',
        headers: deviceIdHeader,
        method: 'DELETE',
      }),
      invalidatesTags: ['BurningGuideNotifications'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useBurningGuideQuery,
  useGetBurningGuideNotificationQuery,
  usePostBurningGuideNotificationMutation,
  usePatchBurningGuideNotificationMutation,
  useDeleteBurningGuideNotificationMutation,
} = burningGuideApi
