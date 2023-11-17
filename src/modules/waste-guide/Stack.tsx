import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {screenConfig} from '@/modules/waste-guide/screenConfig'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const {defaultScreenOptions} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteGuide}
      screenOptions={defaultScreenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
