import {StackNavigationRoutes} from '../../../../app/navigation'
import {NotificationFormScreen} from './NotificationForm.screen'
import {NotificationResponseScreen} from './NotificationResponse.screen'
import {ProjectWarningFormScreen} from './ProjectWarningForm.screen'
import {SelectNewsArticleScreen} from './SelectNewsArticle.screen'
import {VerifyMainImageScreen} from './VerifyMainImage.screen'
import {VerifyNotificationScreen} from './VerifyNotification.screen'
import {WritingGuideScreen} from './WritingGuide.screen'

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
