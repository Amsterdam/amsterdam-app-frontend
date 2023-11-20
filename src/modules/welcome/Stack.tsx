import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {WelcomeRouteName} from '@/modules/welcome/routes'
import {screenConfig} from '@/modules/welcome/screenConfig'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

export const WelcomeStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={WelcomeRouteName.welcome}
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
