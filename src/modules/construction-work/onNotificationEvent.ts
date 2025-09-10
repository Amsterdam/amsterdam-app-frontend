import {ModuleClientConfig} from '@/modules/types'

export type PushNotificationRouteConfig = {
  id: PushNotificationType
  route: string
}

export type PushNotificationType =
  | 'NewsUpdatedByProjectManager'
  | 'ProjectWarningCreatedByProjectManager'

export const pushNotificationTypes: Record<
  PushNotificationType,
  PushNotificationRouteConfig
> = {
  NewsUpdatedByProjectManager: {
    id: 'NewsUpdatedByProjectManager',
    route: '/news',
  },
  ProjectWarningCreatedByProjectManager: {
    id: 'ProjectWarningCreatedByProjectManager',
    route: '/warning',
  },
}

export const onNotificationEvent: Required<
  ModuleClientConfig<{
    type: PushNotificationType
  }>
>['onNotificationEvent'] = (
  _type,
  {notification},
  isPushNotificationDeeplink,
  _dispatch,
) => {
  const notificationType =
    notification?.data?.type && pushNotificationTypes[notification.data.type]

  if (!notificationType?.route || !notification?.data?.linkSourceid) {
    return
  }

  const analyticsTitle = encodeURIComponent(
    `${notification.title ?? ''} - ${notification.body ?? ''}`,
  )

  return `${notificationType.route}/${notification.data.linkSourceid}/${encodeURIComponent(notification.title ?? '')}/${analyticsTitle}/${isPushNotificationDeeplink}`
}
