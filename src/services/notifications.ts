import {baseApi} from '@/services/init'
import {Notification, NotificationQueryArg} from '@/types'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addNotification: builder.mutation<Notification, NotificationQueryArg>({
      invalidatesTags: ['Notifications'],
      query: body => ({
        url: '/notification',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useAddNotificationMutation} = notificationsApi
