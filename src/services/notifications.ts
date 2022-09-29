import {baseApi} from '@/services/init'
import {
  Notification,
  NotificationQueryArg,
  NotificationsQueryArg,
} from '@/types'
import {formatQueryParams, generateRequestUrl} from '@/utils'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addNotification: builder.mutation<Notification, NotificationQueryArg>({
      invalidatesTags: ['Notifications'],
      query(body) {
        return {
          url: '/notification',
          method: 'POST',
          body,
        }
      },
    }),
    getNotifications: builder.query<Notification[], NotificationsQueryArg>({
      providesTags: ['Notifications'],
      query: params => {
        const q = formatQueryParams(params)
        return generateRequestUrl({path: '/notifications', params: q})
      },
      transformResponse: (response: {result: Notification[]}) =>
        response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useAddNotificationMutation, useGetNotificationsQuery} =
  notificationsApi
