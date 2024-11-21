import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {NotificationHistoryRouteName} from '@/modules/notification-history/routes'
import {screenConfig} from '@/modules/notification-history/screenConfig'

const Stack = createStackNavigator()

export const NotificationHistoryStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={NotificationHistoryRouteName.NotificationHistory}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
