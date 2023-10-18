import {onboardingSlice} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const onboardingModule: ModuleClientConfig = {
  // TODO: uncomment comments below
  // hiddenInMenu: true,
  // alwaysEnabled: true,
  name: 'OnboardingModule',
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  },
  reduxConfigs: [
    {
      key: ReduxKey.onboarding,
      persistVersion: 0,
      slice: onboardingSlice,
    },
  ],
  slug: ModuleSlug.onboarding,
}
