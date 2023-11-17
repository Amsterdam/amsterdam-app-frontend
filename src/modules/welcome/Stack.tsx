import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {WelcomeRouteName} from '@/modules/welcome/routes'
import {screenConfig} from '@/modules/welcome/screenConfig'

const Stack = createStackNavigator()

export const WelcomeStack = () => {
  const {defaultScreenOptions} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={WelcomeRouteName.welcome}
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
