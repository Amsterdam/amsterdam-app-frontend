import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {HomeRouteName} from '@/modules/home/routes'
import {screenConfig} from '@/modules/home/screenConfig'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {defaultScreenOptions, getSettingOptionsForRoutes} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={HomeRouteName.home}
      screenOptions={defaultScreenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          options={getSettingOptionsForRoutes([HomeRouteName.settings])}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
