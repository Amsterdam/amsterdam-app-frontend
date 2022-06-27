import {StackNavigationRoutes} from '@/app/navigation'
import {
  NotificationFormScreen,
  NotificationResponseScreen,
  ProjectWarningFormScreen,
  SelectNewsArticleScreen,
  VerifyMainImageScreen,
  VerifyNotificationScreen,
  WritingGuideScreen,
} from '@/modules/construction-work/screens/create-notification'

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
    component: NotificationResponseScreen,
    name: CreateNotificationRouteName.notificationResponse,
  },
  [CreateNotificationRouteName.projectWarningForm]: {
    component: ProjectWarningFormScreen,
    name: CreateNotificationRouteName.projectWarningForm,
  },
  [CreateNotificationRouteName.selectNewsArticle]: {
    component: SelectNewsArticleScreen,
    name: CreateNotificationRouteName.selectNewsArticle,
  },
  [CreateNotificationRouteName.verifyMainImage]: {
    component: VerifyMainImageScreen,
    name: CreateNotificationRouteName.verifyMainImage,
  },
  [CreateNotificationRouteName.verifyNotification]: {
    component: VerifyNotificationScreen,
    name: CreateNotificationRouteName.verifyNotification,
  },
  [CreateNotificationRouteName.writingGuide]: {
    component: WritingGuideScreen,
    name: CreateNotificationRouteName.writingGuide,
  },
}
