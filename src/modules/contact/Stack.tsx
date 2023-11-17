import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {ContactRouteName} from '@/modules/contact/routes'
import {screenConfig} from '@/modules/contact/screenConfig'

const Stack = createStackNavigator()

export const ContactStack = () => {
  const {defaultScreenOptions} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={ContactRouteName.contact}
      screenOptions={defaultScreenOptions}>
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
