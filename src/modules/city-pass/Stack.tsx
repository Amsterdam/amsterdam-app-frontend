import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {screenConfig} from '@/modules/city-pass/screenConfig'

const Stack = createStackNavigator()

export const CityPassStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={CityPassRouteName.dashboard}
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
