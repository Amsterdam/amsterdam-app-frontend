import {screenOptions} from '@/app/navigation'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {OpenWasteContainerRouteName} from '@/modules/open-waste-container/routes'
import {screenConfig} from '@/modules/open-waste-container/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const OpenWasteContainerStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={OpenWasteContainerRouteName.openWasteContainer}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
