import {StackNavigationRoutes} from '../../../../app/navigation'
import {NotificationFormScreen} from './NotificationForm.screen'

export enum CreateNotificationRouteName {
  notificationForm = 'NotificationForm',
  notificationResponse = 'NotificationResponse',
  projectWarningForm = 'ProjectWarningForm',
  selectNewsArticle = 'SelectNewsArticle',
  verifyMainImage = 'VerifyMainImage',
  verifyNotification = 'VerifyNotification',
  writingGuide = 'WritingGuide',
}

export type CreateNotificationStackParams = {
  [CreateNotificationRouteName.notificationForm]: undefined
  [CreateNotificationRouteName.notificationResponse]: undefined
  [CreateNotificationRouteName.projectWarningForm]: undefined
  [CreateNotificationRouteName.selectNewsArticle]: undefined
  [CreateNotificationRouteName.verifyMainImage]: undefined
  [CreateNotificationRouteName.verifyNotification]: undefined
  [CreateNotificationRouteName.writingGuide]: undefined
}

export const createNotificationRoutes: StackNavigationRoutes<
  CreateNotificationStackParams,
  CreateNotificationRouteName
> = {
  [CreateNotificationRouteName.notificationForm]: {
    component: NotificationFormScreen,
    name: CreateNotificationRouteName.notificationForm,
  },
  [CreateNotificationRouteName.notificationResponse]: {
    component: NotificationFormScreen,
    name: CreateNotificationRouteName.notificationResponse,
  },
  [CreateNotificationRouteName.projectWarningForm]: {
    component: NotificationFormScreen,
    name: CreateNotificationRouteName.projectWarningForm,
  },
  [CreateNotificationRouteName.selectNewsArticle]: {
    component: NotificationFormScreen,
    name: CreateNotificationRouteName.selectNewsArticle,
  },
  [CreateNotificationRouteName.verifyMainImage]: {
    component: NotificationFormScreen,
    name: CreateNotificationRouteName.verifyMainImage,
  },
  [CreateNotificationRouteName.verifyNotification]: {
    component: NotificationFormScreen,
    name: CreateNotificationRouteName.verifyNotification,
  },
  [CreateNotificationRouteName.writingGuide]: {
    component: NotificationFormScreen,
    name: CreateNotificationRouteName.writingGuide,
  },
}
