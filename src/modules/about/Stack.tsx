import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {AboutRouteName} from '@/modules/about/routes'
import {screenConfig} from '@/modules/about/screenConfig'

const Stack = createStackNavigator()

export const AboutStack = () => {
  const {defaultScreenOptions} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={AboutRouteName.about}
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
