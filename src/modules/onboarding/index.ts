import {onboardingSlice} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const onboardingModule = createClientModule({
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
})
