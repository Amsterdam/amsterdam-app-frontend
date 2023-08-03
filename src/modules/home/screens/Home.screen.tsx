import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {AddButton} from '@/components/ui/buttons/AddButton'
import {Box} from '@/components/ui/containers/Box'
import {Screen} from '@/components/ui/layout/Screen'
import {Modules} from '@/modules/home/components/Modules'
import {HomeRouteName, HomeStackParams} from '@/modules/home/routes'

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParams, HomeRouteName>>()

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
