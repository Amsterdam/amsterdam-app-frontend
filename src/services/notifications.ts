import {
  DraftNotification,
  Notification,
  Notifications,
  NotificationsQueryArgs,
} from '../types'
import {generateRequestUrl} from '../utils'
import {formatQueryParams} from '../utils/formatQueryParams'
import {baseApi} from './init'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addNotification: builder.mutation<Notification, DraftNotification>({
      invalidatesTags: ['Notifications'],
      query(body) {
        return {
          url: '/notification',
          method: 'POST',
          body,
        }
      },
    }),
    getNotifications: builder.query<Notifications, NotificationsQueryArgs>({
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
