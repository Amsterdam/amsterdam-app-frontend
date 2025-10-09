import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  AboutRouteName,
  UserModalParams,
  UserRouteName,
  UserStackParams,
} from '@/modules/user/routes'
import {AboutTheAppDutchScreen} from '@/modules/user/screens/AboutTheAppDutch.screen'
import {AboutTheAppEnglishScreen} from '@/modules/user/screens/AboutTheAppEnglish.screen'
import {AccessibilityStatementScreen} from '@/modules/user/screens/AccessibilityStatement.screen'
import {FeedbackScreen} from '@/modules/user/screens/Feedback.screen'
import {ModuleSettingsScreen} from '@/modules/user/screens/ModuleSettings.screen'
import {NotificationSettingsScreen} from '@/modules/user/screens/NotificationSettings.screen'
import {PrivacyStatementScreen} from '@/modules/user/screens/PrivacyStatement.screen'
import {UserScreen} from '@/modules/user/screens/User.screen'
import {UserBiometricsScreen} from '@/modules/user/screens/UserBiometrics.screen'

export const screenConfig: StackNavigationRoutes<
  UserStackParams,
  AboutRouteName | UserRouteName
> = {
  [UserRouteName.moduleSettings]: {
    component: ModuleSettingsScreen,
    name: UserRouteName.moduleSettings,
    options: {
      headerTitle: 'Onderwerpen in de app',
    },
  },
  [UserRouteName.notificationSettings]: {
    component: NotificationSettingsScreen,
    name: UserRouteName.notificationSettings,
    options: {
      headerTitle: 'Pushmeldingen',
    },
  },
  [UserRouteName.user]: {
    component: UserScreen,
    name: UserRouteName.user,
    options: {
      headerTitle: 'Mijn profiel',
    },
  },
  [UserRouteName.userBiometrics]: {
    component: UserBiometricsScreen,
    name: UserRouteName.userBiometrics,
    options: {
      headerTitle: 'Biometrische gegevens',
    },
  },
  [AboutRouteName.appSummary]: {
    component: AboutTheAppDutchScreen,
    name: AboutRouteName.appSummary,
    options: {
      headerTitle: 'Over deze app',
    },
  },
  [AboutRouteName.aboutEnglish]: {
    component: AboutTheAppEnglishScreen,
    name: AboutRouteName.aboutEnglish,
    options: {
      accessibilityLanguage: 'en-US',
      headerTitle: 'About this app',
    },
  },
  [AboutRouteName.accessibilityStatement]: {
    component: AccessibilityStatementScreen,
    name: AboutRouteName.accessibilityStatement,
    options: {
      headerTitle: 'Toegankelijkheidsverklaring',
    },
  },
  [AboutRouteName.feedback]: {
    component: FeedbackScreen,
    name: AboutRouteName.feedback,
    options: {
      headerTitle: 'Uw mening',
    },
  },
  [AboutRouteName.privacyStatement]: {
    component: PrivacyStatementScreen,
    name: AboutRouteName.privacyStatement,
    options: {
      headerTitle: 'Privacyverklaring',
    },
  },
}

export const userModals: StackNavigationRoutes<UserModalParams> = {}
