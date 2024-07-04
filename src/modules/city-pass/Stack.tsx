import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {screenConfig} from '@/modules/city-pass/screenConfig'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

export const CityPassStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={CityPassRouteName.dashboard}
      screenOptions={screenOptions(theme)}>
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
