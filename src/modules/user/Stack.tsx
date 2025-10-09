import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {AboutRouteName, UserRouteName} from '@/modules/user/routes'
import {screenConfig} from '@/modules/user/screenConfig'
import {capitalizeString} from '@/utils/capitalizeString'

const Stack = createStackNavigator<RootStackParams>()

export const UserStack = () => {
  const screenOptions = useScreenOptions({
    screenType: 'settings',
  })
  const altScreenOptions = useScreenOptions({
    screenType: 'default',
  })

  const {biometricsLabel} = useAccessCodeBiometrics()

  return (
    <Stack.Navigator initialRouteName={UserRouteName.user}>
      {Object.entries(screenConfig).map(([key, route]) => {
        const isAboutRoute = Object.values(AboutRouteName).includes(
          route.name as AboutRouteName,
        )

        return (
          <Stack.Screen
            key={key}
            {...route}
            options={{
              ...(isAboutRoute ? altScreenOptions : screenOptions),
              headerTitle:
                route.name === UserRouteName.userBiometrics && biometricsLabel
                  ? capitalizeString(biometricsLabel)
                  : route.options?.headerTitle,
            }}
          />
        )
      })}
    </Stack.Navigator>
  )
}
