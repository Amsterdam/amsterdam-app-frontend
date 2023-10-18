import {Screen} from '@/components/ui/layout/Screen'
import {Onboarding} from '@/modules/onboarding/components/Onboarding'

export const OnboardingScreen = () => (
  <Screen
    scroll={false}
    withBottomInset={false}
    withLeftInset={false}
    withRightInset={false}
    withTopInset>
    <Onboarding />
  </Screen>
)
