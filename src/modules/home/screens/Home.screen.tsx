import {View} from 'react-native'
import {Tip} from '@/components/features/product-tour/types'
import {withProductTourTip} from '@/components/features/product-tour/withProductTourTip'
import {AddButton} from '@/components/ui/buttons/AddButton'
import {Box} from '@/components/ui/containers/Box'
import {Screen} from '@/components/ui/layout/Screen'
import {Placement} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {Modules} from '@/modules/home/components/Modules'
import {HomeRouteName} from '@/modules/home/routes'

const ONBOARDING_TIP = 'Voeg onderwerpen toe of haal weg wat u niet wilt zien'

const WithProductTourTip = withProductTourTip(View)

export const HomeScreen = () => {
  const navigation = useNavigation<HomeRouteName>()

  return (
    <Screen
      stickyFooter={
        <View>
          <WithProductTourTip
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
          </WithProductTourTip>
        </View>
      }>
      <Modules />
    </Screen>
  )
}
