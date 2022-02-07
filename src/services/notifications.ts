import {
  DraftNotification,
  Notification,
  Notifications,
  NotificationsApiQuery,
} from '../types'
import {generateRequestUrl} from '../utils'
import {formatQueryParams} from '../utils/formatQueryParams'
import {baseApi} from './init'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notifications, NotificationsApiQuery>({
      providesTags: ['Notifications'],
      query: params => {
        const q = formatQueryParams(params)
        return generateRequestUrl('/notifications', q)
      },
      transformResponse: (response: {result: Notifications}) => response.result,
    }),
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
  }),
})

export const {useAddNotificationMutation, useGetNotificationsQuery} =
  notificationsApi
