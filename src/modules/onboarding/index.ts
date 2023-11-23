import {onboardingSlice} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const onboardingModule: ModuleClientConfig = {
  alwaysEnabled: true,
  hiddenInMenu: true,
  name: 'OnboardingModule',
  reduxConfigs: [
    {
      key: ReduxKey.onboarding,
      persistVersion: -1,
      slice: onboardingSlice,
    },
  ],
  slug: ModuleSlug.onboarding,
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  },
}
