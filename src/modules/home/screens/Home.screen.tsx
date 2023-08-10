import {AddButton} from '@/components/ui/buttons/AddButton'
import {Box} from '@/components/ui/containers/Box'
import {Screen} from '@/components/ui/layout/Screen'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {Modules} from '@/modules/home/components/Modules'
import {HomeRouteName} from '@/modules/home/routes'

export const HomeScreen = () => {
  const navigation = useNavigation<HomeRouteName>()

  return (
    <Screen
      stickyFooter={
        <Box>
          <AddButton
            accessibilityLabel="Instellingen"
            onPress={() => navigation.navigate(HomeRouteName.settings)}
            testID="HomeModuleSettingsButton"
          />
        </Box>
      }>
      <Modules />
    </Screen>
  )
}
