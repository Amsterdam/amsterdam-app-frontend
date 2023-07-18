import {screenOptions} from '@/app/navigation'
import {ContactRouteName} from '@/modules/contact/routes'
import {screenConfig} from '@/modules/contact/screenConfig'
import {useTheme} from '@/themes'
import {createStackNavigator} from '@/utils/navigation/createStackNavigator'

const Stack = createStackNavigator()

export const ContactStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ContactRouteName.contact}
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
