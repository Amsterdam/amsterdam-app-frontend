import type {UserMenuSection} from '@/modules/user/types'
import {OnboardingRouteName} from '@/modules/onboarding/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'

export const aboutSections: UserMenuSection[] = [
  {
    title: 'Hulp en informatie',
    navigationItems: [
      {
        label: 'Over deze app',
        route: UserRouteName.appSummary,
      },
      {
        label: 'About this app',
        route: UserRouteName.aboutEnglish,
      },
      {
        label: 'Zo werkt de app',
        route: OnboardingRouteName.onboarding,
        moduleSlug: ModuleSlug.onboarding,
      },
      {
        label: 'Geef uw mening over de app',
        route: UserRouteName.feedback,
      },
      {
        label: 'Privacyverklaring',
        route: UserRouteName.privacyStatement,
      },
      {
        label: 'Toegankelijkheidsverklaring',
        route: UserRouteName.accessibilityStatement,
      },
    ],
  },
]
