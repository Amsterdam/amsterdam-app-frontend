import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {HomeRouteName} from '@/modules/home/routes'
import {screenConfig} from '@/modules/home/screenConfig'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={HomeRouteName.home}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={
            route.name === HomeRouteName.settings
              ? {
                  ...screenOptions(theme, {screenType: 'settings'}),
                  ...route.options,
                }
              : route.options
          }
        />
      ))}
    </Stack.Navigator>
  )
}
