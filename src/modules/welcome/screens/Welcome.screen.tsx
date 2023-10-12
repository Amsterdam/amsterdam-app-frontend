import {Screen} from '@/components/ui/layout/Screen'
import {Onboarding} from '@/modules/welcome/components/Onboarding'

export const WelcomeScreen = () => (
  <Screen
    scroll={false}
    withBottomInset
    withLeftInset
    withRightInset
    withTopInset>
    <Onboarding />
  </Screen>
)
