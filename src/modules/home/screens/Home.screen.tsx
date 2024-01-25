import {View} from 'react-native'
import {ReportProblemFigure} from '@/assets/images/errors/ReportProblemFigure'
import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {AddButton} from '@/components/ui/buttons/AddButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {ErrorScreen} from '@/components/ui/layout/ErrorScreen'
import {Screen} from '@/components/ui/layout/Screen'
import {Placement} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useModules} from '@/hooks/useModules'
import {Modules} from '@/modules/home/components/Modules'
import {HomeRouteName} from '@/modules/home/routes'

const ONBOARDING_TIP = 'Voeg onderwerpen toe of haal weg wat u niet wilt zien'

export const HomeScreen = () => {
  const navigation = useNavigation<HomeRouteName>()
  const {modulesError, modulesLoading, refetchModules} = useModules()

  if (modulesLoading) {
    return <PleaseWait />
  }

  if (modulesError) {
    return (
      <ErrorScreen
        buttonAccessibilityLabel="Laadt de modules opnieuw"
        buttonLabel="Laad opnieuw"
        Image={ReportProblemFigure}
        onPress={refetchModules}
        testId="HomeErrorScreen"
        text="Probeer het later opnieuw foutcode: 404/405/422/500"
        title="Helaas kan de inhoud niet geladen worden"
      />
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
