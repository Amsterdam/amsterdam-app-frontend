import {
  NotificationQueryArg,
  Notification,
  Notifications,
  NotificationsQueryArg,
} from '../types'
import {formatQueryParams, generateRequestUrl} from '../utils'
import {baseApi} from './init'

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
    getNotifications: builder.query<Notifications, NotificationsQueryArg>({
      providesTags: ['Notifications'],
      query: params => {
        const q = formatQueryParams(params)
        return generateRequestUrl('/notifications', q)
      },
      transformResponse: (response: {result: Notifications}) => response.result,
    }),
  }),
})

export const {useAddNotificationMutation, useGetNotificationsQuery} =
  notificationsApi
