import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {Notification, NotificationQueryArg} from '@/types/notification'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addNotification: builder.mutation<Notification, NotificationQueryArg>({
      invalidatesTags: ['Notifications'],
      query: body => ({
        slug: ModuleSlug['construction-work'],
        url: '/notification',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useAddNotificationMutation} = notificationsApi
