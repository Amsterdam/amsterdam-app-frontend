import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {OpenWasteContainerRouteName} from '@/modules/open-waste-container/routes'
import {screenConfig} from '@/modules/open-waste-container/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const OpenWasteContainerStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={OpenWasteContainerRouteName.addWasteCard}
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
