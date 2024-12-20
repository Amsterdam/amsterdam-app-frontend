import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {UserRouteName} from '@/modules/user/routes'
import {screenConfig} from '@/modules/user/screenConfig'
import {capitalizeString} from '@/utils/capitalizeString'

const Stack = createStackNavigator<RootStackParams>()

export const UserStack = () => {
  const screenOptions = useScreenOptions({
    screenType: 'settings',
  })
  const {biometricsLabel} = useAccessCodeBiometrics()

  return (
    <Stack.Navigator
      initialRouteName={UserRouteName.user}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={{
            headerTitle:
              route.name === UserRouteName.userBiometrics && biometricsLabel
                ? capitalizeString(biometricsLabel)
                : route.options?.headerTitle,
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
