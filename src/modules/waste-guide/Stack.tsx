import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {screenConfig} from '@/modules/waste-guide/screenConfig'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteGuide}
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
