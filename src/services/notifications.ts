import {
  DraftNotification,
  Notification,
  Notifications,
  ListQueryArgs,
  ProjectIdsQueryArgs,
} from '../types'
import {generateRequestUrl} from '../utils'
import {formatQueryParams} from '../utils/formatQueryParams'
import {emptySplitApi} from './init'

export const notificationsApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<
      Notifications,
      Partial<ProjectIdsQueryArgs & ListQueryArgs>
    >({
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
