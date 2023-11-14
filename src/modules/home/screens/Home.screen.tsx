import {useState} from 'react'
import {LayoutRectangle} from 'react-native'
import {OnboardingTipWrapper} from '@/components/features/onboarding/OnboardingTipWrapper'
import {Tip} from '@/components/features/onboarding/types'
import {AddButton} from '@/components/ui/buttons/AddButton'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Screen} from '@/components/ui/layout/Screen'
import {Placement} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {Modules} from '@/modules/home/components/Modules'
import {HomeRouteName} from '@/modules/home/routes'
import {setHasSeenOnboarding} from '@/modules/onboarding/slice'

const ONBOARDING_TIP = 'Voeg onderwerpen toe of haal weg wat u niet wilt zien'

export const HomeScreen = () => {
  const navigation = useNavigation<HomeRouteName>()
  const [onboardingTipTargetLayout, setTipComponentLayout] =
    useState<LayoutRectangle>()

  const dispatch = useDispatch()

  return (
    <Screen
      stickyFooter={
        <OnboardingTipWrapper
          onboardingTipTargetLayout={onboardingTipTargetLayout}
          placement={Placement.above}
          testID="HomeModuleSettingsButtonTooltip"
          text={ONBOARDING_TIP}
          tipSlug={Tip.homeModuleSettingsButton}>
          <Box onLayout={e => setTipComponentLayout(e.nativeEvent.layout)}>
            <Button
              label="Onboarding"
              onPress={() => dispatch(setHasSeenOnboarding(false))}
            />
            <AddButton
              accessibilityHint={ONBOARDING_TIP}
              accessibilityLabel="Instellingen"
              onPress={() => navigation.navigate(HomeRouteName.settings)}
              testID="HomeModuleSettingsButton"
            />
          </Box>
        </OnboardingTipWrapper>
      }>
      <Modules />
    </Screen>
  )
}
