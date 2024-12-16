import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {UserRouteName} from '@/modules/user/routes'
import {screenConfig} from '@/modules/user/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const UserStack = () => {
  const screenOptions = useScreenOptions({
    screenType: 'settings',
  })

  return (
    <Stack.Navigator
      initialRouteName={UserRouteName.user}
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
