import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {screenConfig} from '@/modules/redirects/screenConfig'

const Stack = createStackNavigator()

export const RedirectsStack = () => {
  const {defaultScreenOptions} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={RedirectsRouteName.redirects}
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
