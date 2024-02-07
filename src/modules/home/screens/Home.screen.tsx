import {View} from 'react-native'
import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {AddButton} from '@/components/ui/buttons/AddButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {Screen} from '@/components/ui/layout/Screen'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'
import {Placement} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useModules} from '@/hooks/useModules'
import {Modules} from '@/modules/home/components/Modules'
import {HomeRouteName} from '@/modules/home/routes'

const ONBOARDING_TIP = 'Voeg onderwerpen toe of haal weg wat u niet wilt zien'

export const HomeScreen = () => {
  const navigation = useNavigation<HomeRouteName>()
  const {modulesError, modulesLoading, refetchModules} = useModules()
  const {isPortrait} = useDeviceContext()

  if (modulesLoading) {
    return <PleaseWait />
  }

  if (modulesError) {
    return (
      <Screen
        withLeftInset={isPortrait}
        withRightInset={isPortrait}>
        <FullScreenError
          buttonAccessibilityLabel="Laad de modules opnieuw"
          buttonLabel="Laad opnieuw"
          error={modulesError}
          Image={ModulesFigure}
          onPress={refetchModules}
          testId="HomeErrorScreen"
          text="Probeer het later opnieuw"
          title="Helaas kunnen de modules niet geladen worden"
        />
      </Screen>
    )
  }

  return (
    <Screen
      stickyFooter={
        <View>
          <ProductTourTipWrapper
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
          </ProductTourTipWrapper>
        </View>
      }>
      <Modules />
    </Screen>
  )
}
