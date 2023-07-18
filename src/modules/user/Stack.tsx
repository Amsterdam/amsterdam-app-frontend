import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {UserRouteName} from '@/modules/user/routes'
import {screenConfig} from '@/modules/user/screenConfig'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

export const UserStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={UserRouteName.user}
      screenOptions={screenOptions(theme, {
        screenType: 'settings',
      })}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
