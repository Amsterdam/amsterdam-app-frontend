import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {screenConfig} from '@/modules/redirects/screenConfig'

const Stack = createStackNavigator()

export const RedirectsStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={RedirectsRouteName.redirects}
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
