import {StackNavigationRoutes} from '@/app/navigation'
import {AboutRouteName, AboutStackParams} from '@/modules/about/routes'
import {
  AboutScreen,
  AboutTheAppDutchScreen,
  AboutTheAppEnglishScreen,
  AccessibilityStatementScreen,
  PrivacyStatementScreen,
} from '@/modules/about/screens'

export const screenConfig: StackNavigationRoutes<
  AboutStackParams,
  AboutRouteName
> = {
  [AboutRouteName.about]: {
    component: AboutScreen,
    name: AboutRouteName.about,
    options: {
      headerTitle: 'Over deze app',
    },
  },
  [AboutRouteName.appSummary]: {
    component: AboutTheAppDutchScreen,
    name: AboutRouteName.appSummary,
    options: {
      headerTitle: 'Waarom deze app?',
    },
  },
  [AboutRouteName.aboutEnglish]: {
    component: AboutTheAppEnglishScreen,
    name: AboutRouteName.aboutEnglish,
    options: {
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
  [AboutRouteName.privacyStatement]: {
    component: PrivacyStatementScreen,
    name: AboutRouteName.privacyStatement,
    options: {
      headerTitle: 'Privacyverklaring',
    },
  },
}
