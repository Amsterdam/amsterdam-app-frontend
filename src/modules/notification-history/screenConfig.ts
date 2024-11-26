import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  NotificationHistoryRouteName,
  type NotificationHistoryModalParams,
  type NotificationHistoryStackParams,
} from '@/modules/notification-history/routes'
import {NotificationHistoryScreen} from '@/modules/notification-history/screens/NotificationHistory.screen'

export const screenConfig: StackNavigationRoutes<
  NotificationHistoryStackParams,
  NotificationHistoryRouteName
> = {
  [NotificationHistoryRouteName.NotificationHistory]: {
    component: NotificationHistoryScreen,
    name: NotificationHistoryRouteName.NotificationHistory,
    options: {
      headerTitle: 'Meldingen',
    },
  },
}

export const notificationHistoryModals: StackNavigationRoutes<NotificationHistoryModalParams> =
  {}
