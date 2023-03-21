import {screenOptions} from '@/app/navigation'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {screenConfig} from '@/modules/waste-guide/screenConfig'
import {useTheme} from '@/themes'
import {createStackNavigator} from '@/utils/navigation'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteGuide}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
