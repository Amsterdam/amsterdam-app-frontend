import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {screenConfig} from '@/modules/access-code/screenConfig'

const Stack = createStackNavigator()

export const AccessCodeStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={AccessCodeRouteName.setAccessCode}
      screenOptions={screenOptions}>
      <Stack.Group>
        {Object.entries(screenConfig).map(([key, route]) => (
          <Stack.Screen
            key={key}
            {...route}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
