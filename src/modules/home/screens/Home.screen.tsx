import {View} from 'react-native'
import {Tip} from '@/components/features/onboarding/types'
import {withOnboardingTip} from '@/components/features/onboarding/withOnboardingTip'
import {AddButton} from '@/components/ui/buttons/AddButton'
import {Box} from '@/components/ui/containers/Box'
import {Screen} from '@/components/ui/layout/Screen'
import {Placement} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {Modules} from '@/modules/home/components/Modules'
import {HomeRouteName} from '@/modules/home/routes'

const ONBOARDING_TIP = 'Voeg onderwerpen toe of haal weg wat u niet wilt zien'

export const HomeScreen = () => {
  const navigation = useNavigation<HomeRouteName>()
  const WithOnboardingTip = withOnboardingTip(View)

  return (
    <Screen
      stickyFooter={
        <View>
          <WithOnboardingTip
            placement={Placement.above}
            testID="HomeModuleSettingsButtonTooltip"
            text={ONBOARDING_TIP}
            tipSlug={Tip.homeModuleSettingsButton}>
            <Box>
              <AddButton
                accessibilityHint={ONBOARDING_TIP}
                accessibilityLabel="Instellingen"
                onPress={() => navigation.navigate(HomeRouteName.settings)}
                testID="HomeModuleSettingsButton"
              />
            </Box>
          </WithOnboardingTip>
        </View>
      }>
      <Modules />
    </Screen>
  )
}
