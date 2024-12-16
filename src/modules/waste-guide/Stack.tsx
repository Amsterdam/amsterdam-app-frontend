import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {screenConfig} from '@/modules/waste-guide/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const WasteGuideStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteGuide}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
