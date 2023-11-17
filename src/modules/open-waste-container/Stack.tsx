import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {OpenWasteContainerRouteName} from '@/modules/open-waste-container/routes'
import {screenConfig} from '@/modules/open-waste-container/screenConfig'

const Stack = createStackNavigator()

export const OpenWasteContainerStack = () => {
  const {defaultScreenOptions} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={OpenWasteContainerRouteName.openWasteContainer}
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
