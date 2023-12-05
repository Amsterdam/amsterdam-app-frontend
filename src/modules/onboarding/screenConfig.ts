import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  OnboardingRouteName,
  OnboardingStackParams,
} from '@/modules/onboarding/routes'
import {OnboardingScreen} from '@/modules/onboarding/screens/Onboarding.screen'

export const screenConfig: StackNavigationRoutes<
  OnboardingStackParams,
  OnboardingRouteName
> = {
  [OnboardingRouteName.onboarding]: {
    component: OnboardingScreen,
    name: OnboardingRouteName.onboarding,
    options: {
      headerShown: false,
    },
  },
}
