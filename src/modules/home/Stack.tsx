import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {HomeRouteName} from '@/modules/home/routes'
import {screenConfig} from '@/modules/home/screenConfig'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const screenOptionsHome = useScreenOptions()
  const screenOptions = useScreenOptions({screenType: 'settings'})

  return (
    <Stack.Navigator
      initialRouteName={HomeRouteName.home}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={
            route.name === HomeRouteName.settings
              ? {
                  ...screenOptions,
                  ...route.options,
                }
              : {
                  ...screenOptionsHome,
                  ...route.options,
                }
          }
        />
      ))}
    </Stack.Navigator>
  )
}
