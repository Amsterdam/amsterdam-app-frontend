import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {UserRouteName} from '@/modules/user/routes'
import {screenConfig} from '@/modules/user/screenConfig'

const Stack = createStackNavigator()

export const UserStack = () => {
  const {settingsScreenOptions} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={UserRouteName.user}
      screenOptions={settingsScreenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
